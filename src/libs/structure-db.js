import {existsSync, readFileSync} from 'fs';
import {join, dirname, extname} from 'path';
import {gunzipSync} from 'zlib';
import {config} from '../../config.js';
import {shortMD5} from './utils.js';
import {openDatabase} from 'content-structure/src/sqlite_utils/index.js';

const dbPath = join(config.collect_content.outdir, 'structure.db');
let cachedDb;
const blobCache = new Map();

function ensureDb() {
    if (!cachedDb) {
        if (!existsSync(dbPath)) {
            throw new Error(`structure-db: missing database at ${dbPath}`);
        }
        cachedDb = openDatabase(dbPath, {readonly: true});
    }
    return cachedDb;
}

function parseJson(value, fallback = {}) {
    if (!value) {
        return fallback;
    }
    try {
        return JSON.parse(value);
    } catch {
        return fallback;
    }
}

function normalizeDocumentRow(row) {
    if (!row) {
        return null;
    }
    const tags = parseJson(row.tags, []);
    const meta = parseJson(row.meta_data, {});
    const format = row.format ?? 'markdown';
    return {
        ...row,
        format,
        tags,
        meta_data: meta
    };
}

function getDocuments(options = {}) {
    const db = ensureDb();
    const rows = db.prepare('SELECT * FROM documents ORDER BY level, "order", url').all();
    const normalized = rows.map(normalizeDocumentRow).filter(Boolean);
    const {format} = options;
    if (!format) {
        return normalized;
    }
    const target = String(format);
    return normalized.filter((row) => (row.format ?? 'markdown') === target);
}

function getDocument(match) {
    const db = ensureDb();
    if (match?.uid) {
        const row = db.prepare('SELECT * FROM documents WHERE uid = ?').get(match.uid);
        return normalizeDocumentRow(row);
    }
    const urlValue = typeof match?.url === 'string' ? match.url : '';
    const row = db.prepare('SELECT * FROM documents WHERE url = ?').get(urlValue);
    return normalizeDocumentRow(row);
}

function getItemsForDocument(docSid) {
    const db = ensureDb();
    return db
        .prepare('SELECT type, level, order_index, body_text, ast FROM items WHERE doc_sid = ? ORDER BY order_index')
        .all(docSid);
}

function getAssetsForDocument(docUid) {
    const db = ensureDb();
    const assets = db.prepare('SELECT * FROM asset_info WHERE parent_doc_uid = ?').all(docUid);
    const map = new Map();
    for (const asset of assets) {
        map.set(asset.uid, asset);
    }
    return map;
}

function loadBlob(blobUid) {
    if (!blobUid) {
        return null;
    }
    if (blobCache.has(blobUid)) {
        return blobCache.get(blobUid);
    }
    const db = ensureDb();
    const row = db
        .prepare('SELECT blob_uid, hash, path, payload, compression FROM blob_store WHERE blob_uid = ?')
        .get(blobUid);
    blobCache.set(blobUid, row ?? null);
    return row ?? null;
}

function loadBlobBuffer(asset) {
    if (!asset?.blob_uid) {
        return null;
    }
    const blob = loadBlob(asset.blob_uid);
    if (!blob) {
        return null;
    }
    let buffer = null;
    if (blob.payload) {
        buffer = Buffer.from(blob.payload);
    } else if (blob.path && blob.hash) {
        const absPath = join(config.collect_content.outdir, 'blobs', blob.path, blob.hash);
        try {
            buffer = readFileSync(absPath);
        } catch {
            buffer = null;
        }
    }
    if (!buffer) {
        return null;
    }
    if (blob.compression) {
        try {
            buffer = gunzipSync(buffer);
        } catch {
            /* silently ignore decompression errors */
        }
    }
    return buffer;
}

function slugifyText(text) {
    const normalized = String(text ?? '')
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
    return normalized || 'section';
}

function uniqueSlug(slug, tracker) {
    const count = tracker.get(slug) ?? 0;
    tracker.set(slug, count + 1);
    if (count === 0) {
        return slug;
    }
    return `${slug}-${count + 1}`;
}

function parseAssetLink(body) {
    if (typeof body !== 'string') {
        return null;
    }
    const match = /!\[([^\]]*)\]\(asset:\/\/\/([^)]+)\)/.exec(body);
    if (!match) {
        return null;
    }
    return {
        alt: match[1] || '',
        uid: match[2]
    };
}

function guessLanguageFromAsset(asset, fallback) {
    if (asset?.ext) {
        return asset.ext;
    }
    const uid = asset?.uid ?? '';
    const slugPart = uid.split('#')[1] ?? uid;
    const ext = slugPart.includes('.') ? slugPart.substring(slugPart.lastIndexOf('.') + 1) : '';
    return ext || fallback || null;
}

function inferMetaFromAsset(asset) {
    const slugPart = (asset?.uid ?? '').split('#')[1] ?? '';
    const base = slugPart.includes('.') ? slugPart.slice(0, slugPart.lastIndexOf('.')) : slugPart;
    if (!base.startsWith('code-')) {
        return null;
    }
    const remainder = base.slice('code-'.length);
    if (!remainder || /^\d+$/.test(remainder)) {
        return null;
    }
    return remainder;
}

function parseCodePayload(text, asset) {
    const content = String(text ?? '');
    const fenceMatch = content.match(/^```([^\s`]+)?(?:\s+([^\n`][^\n]*))?\n([\s\S]*?)\n```$/s);
    const inferredMeta = inferMetaFromAsset(asset);
    if (fenceMatch) {
        return {
            lang: fenceMatch[1] ?? guessLanguageFromAsset(asset, null),
            meta: fenceMatch[2] ?? inferredMeta ?? null,
            value: fenceMatch[3] ?? ''
        };
    }
    return {
        lang: guessLanguageFromAsset(asset, null),
        meta: inferredMeta ?? null,
        value: content
    };
}

function buildTableNode(dataRows) {
    const rows = Array.isArray(dataRows) ? dataRows : [];
    if (rows.length === 0) {
        return null;
    }
    const headers = Object.keys(rows[0] ?? {});
    const normalizedRows = rows.map((row) => headers.map((header) => row?.[header] ?? ''));
    const tableChildren = [headers, ...normalizedRows].map((cells) => ({
        type: 'tableRow',
        children: cells.map((value) => ({
            type: 'tableCell',
            children: [{type: 'text', value: String(value)}]
        }))
    }));
    return {type: 'table', children: tableChildren};
}

function bufferToDataUrl(buffer, ext) {
    if (!buffer) {
        return null;
    }
    const extension = ext ?? '';
    let mime = 'application/octet-stream';
    const normalizedExt = extension.startsWith('.') ? extension.slice(1) : extension;
    if (normalizedExt) {
        const lower = normalizedExt.toLowerCase();
        const mapping = {
            svg: 'image/svg+xml',
            png: 'image/png',
            jpg: 'image/jpeg',
            jpeg: 'image/jpeg',
            webp: 'image/webp',
            gif: 'image/gif',
            bmp: 'image/bmp'
        };
        mime = mapping[lower] ?? mime;
    }
    const base64 = buffer.toString('base64');
    return `data:${mime};base64,${base64}`;
}

function normalizeAssetPath(assetPath, documentPath) {
    if (!assetPath || !documentPath) {
        return assetPath ?? null;
    }
    const docDir = dirname(documentPath);
    if (!docDir || docDir === '.' || assetPath.startsWith('../../')) {
        return assetPath;
    }
    const normalizedDocDir = docDir.endsWith('/') ? docDir : `${docDir}/`;
    if (assetPath.startsWith(normalizedDocDir)) {
        return assetPath.slice(normalizedDocDir.length);
    }
    return assetPath;
}

function buildNodes(items, assets, docUid, documentPath) {
    const nodes = [];
    const headings = [];
    const slugTracker = new Map();
    let lineCounter = 1;
    for (const item of items) {
        const line = lineCounter++;
        switch (item.type) {
            case 'heading': {
                const text = item.body_text ?? '';
                const slug = uniqueSlug(slugifyText(text), slugTracker);
                const uid = `${docUid}#${slug}`;
                headings.push({
                    label: text,
                    slug,
                    uid,
                    sid: shortMD5(uid),
                    depth: item.level ?? 1,
                    line
                });
                nodes.push({
                    type: 'heading',
                    depth: item.level ?? 1,
                    children: [{type: 'text', value: text}],
                    position: {start: {line}}
                });
                break;
            }
            case 'paragraph': {
                let node = null;
                if (item.ast) {
                    try {
                        node = JSON.parse(item.ast);
                    } catch {
                        node = null;
                    }
                }
                if (!node) {
                    node = {
                        type: 'paragraph',
                        children: [{type: 'text', value: item.body_text ?? ''}]
                    };
                }
                if (!node.position) {
                    node.position = {start: {line}};
                }
                nodes.push(node);
                break;
            }
            case 'image': {
                const link = parseAssetLink(item.body_text);
                const asset = link ? assets.get(link.uid) : null;
                let url = asset?.path ? normalizeAssetPath(asset.path, documentPath) : null;
                if (!url && asset) {
                    const buffer = loadBlobBuffer(asset);
                    url = bufferToDataUrl(buffer, asset.ext ?? (asset.path ? extname(asset.path) : null));
                }
                nodes.push({
                    type: 'image',
                    url: url ?? '',
                    alt: link?.alt ?? 'image',
                    title: asset?.title ?? null,
                    position: {start: {line}}
                });
                break;
            }
            case 'code': {
                const link = parseAssetLink(item.body_text);
                const asset = link ? assets.get(link.uid) : null;
                const buffer = asset ? loadBlobBuffer(asset) : null;
                const codeText = buffer ? buffer.toString('utf-8') : '';
                const parsed = parseCodePayload(codeText, asset);
                nodes.push({
                    type: 'code',
                    lang: parsed.lang ?? undefined,
                    meta: parsed.meta ?? undefined,
                    value: parsed.value ?? '',
                    position: {start: {line}}
                });
                break;
            }
            case 'link': {
                const link = parseAssetLink(item.body_text);
                const asset = link ? assets.get(link.uid) : null;
                let url = asset?.path ? normalizeAssetPath(asset.path, documentPath) : '';
                if (!url && asset) {
                    const buffer = loadBlobBuffer(asset);
                    url = bufferToDataUrl(buffer, asset.ext ?? (asset.path ? extname(asset.path) : null)) ?? '';
                }
                const label = link?.alt ?? asset?.path ?? asset?.uid ?? '';
                nodes.push({
                    type: 'link',
                    url,
                    title: asset?.title ?? null,
                    children: [{type: 'text', value: label}],
                    position: {start: {line}}
                });
                break;
            }
            case 'table': {
                const link = parseAssetLink(item.body_text);
                const asset = link ? assets.get(link.uid) : null;
                const buffer = asset ? loadBlobBuffer(asset) : null;
                let data = [];
                if (buffer) {
                    try {
                        data = JSON.parse(buffer.toString('utf-8'));
                    } catch {
                        data = [];
                    }
                }
                const tableNode = buildTableNode(data);
                if (tableNode) {
                    tableNode.position = {start: {line}};
                    nodes.push(tableNode);
                }
                break;
            }
            default:
                break;
        }
    }
    return {
        tree: {type: 'root', children: nodes},
        headings
    };
}

function getEntry(match) {
    const document = getDocument(match);
    if (!document) {
        return null;
    }
    const items = getItemsForDocument(document.sid);
    const assets = getAssetsForDocument(document.uid);
    const {tree, headings} = buildNodes(items, assets, document.uid, document.path);
    const data = {
        ...document.meta_data,
        ...document,
        headings
    };
    return {
        data,
        tree
    };
}

function getAssetInfo(options = {}) {
    const db = ensureDb();
    const conditions = [];
    const params = [];
    if (options.type) {
        conditions.push('type = ?');
        params.push(options.type);
    }
    if (options.hasPath) {
        conditions.push('path IS NOT NULL');
    }
    const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
    const query = `SELECT * FROM asset_info ${whereClause}`;
    return db.prepare(query).all(...params);
}

function getFileAssets() {
    return getAssetInfo({hasPath: true});
}

function getCodeAssetSummaries() {
    const assets = getAssetInfo({type: 'codeblock'});
    return assets.map((asset) => {
        const buffer = loadBlobBuffer(asset);
        const content = buffer ? buffer.toString('utf-8') : '';
        const parsed = parseCodePayload(content, asset);
        const hash = shortMD5(content);
        return {
            ...asset,
            content,
            hash,
            language: parsed.lang ?? null,
            meta: parsed.meta ?? null
        };
    });
}

export {getDocuments, getEntry, getFileAssets, getCodeAssetSummaries, getAssetInfo};
