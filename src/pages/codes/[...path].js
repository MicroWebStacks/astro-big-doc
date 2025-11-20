import { createReadStream } from 'fs';
import {resolve,join} from 'path'
import { config } from "@/config";
import {file_mime,hashed_path_content}from '@/libs/assets.js'
import {getAssetInfo, getCodeAssetSummaries} from '@/libs/structure-db.js'
import kroki from '@/components/markdown/code/kroki.yaml'

export async function GET({params}){
    const imagePath = resolve(join(config.code_path,params.path));
    console.log(`codes> serving '${imagePath}'`)
    try {
        const stream = createReadStream(imagePath);
        const contentType = file_mime(imagePath)
        return new Response(stream, {
            status: 200,
            headers: {'Content-Type': contentType}
        });
    } catch (error) {
        return new Response('File not found', { status: 404 });
    }
}

export async function getStaticPaths(){
    if(import.meta.env.DEV){
        const codeAssets = getCodeAssetSummaries()
        const diagrams = codeAssets
            .filter((asset)=>asset.language && kroki.languages.includes(asset.language))
            .map((entry)=>(`${entry.hash}/diagram.svg`))
        console.log(`serving API endpoit ${diagrams.length} svg code-block diagrams`)
        
        let link_diagrams_hashes = []
        const link_diagrams = getAssetInfo({type:'linked_file'}).filter((asset)=>
            (asset.path && (Object.keys(kroki.formats).includes(asset.ext ?? "")))
        )
        if(link_diagrams.length>0){
            const hashPromises = link_diagrams.map(asset => hashed_path_content(join(config.content_path,asset.path)));
            const hashes = await Promise.all(hashPromises);
            link_diagrams_hashes = hashes.map((hash)=>(`${hash}/diagram.svg`))
            console.log(`serving API endpoit ${link_diagrams.length} svg code-link diagrams`)
        }

        const codes = codeAssets.map((entry)=>(`${entry.hash}/code.txt`))
        console.log(`serving API endpoit ${codes.length} text code-blocks`)
        const paths = [...new Set([...diagrams, ...codes, ...link_diagrams_hashes])]
        return paths.map((path)=>({params:{path:path}}))
    }else{
        return []
    }
}
