import * as adapter from '@astrojs/node/server.js';
/* empty css                           */import * as $$module2$2 from 'fs';
import { existsSync } from 'fs';
import * as $$module3$1 from 'path';
import { resolve } from 'path';

const $$module1$2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  get $$metadata () { return $$metadata$e; },
  get default () { return $$NavSubMenu; },
  get file () { return $$file$e; },
  get url () { return $$url$e; }
}, Symbol.toStringTag, { value: 'Module' }));
const $$module1$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  get $$metadata () { return $$metadata$c; },
  get default () { return $$ToCSubMenu; },
  get file () { return $$file$c; },
  get url () { return $$url$c; }
}, Symbol.toStringTag, { value: 'Module' }));

const ASTRO_VERSION = "1.4.2";
function createDeprecatedFetchContentFn() {
  return () => {
    throw new Error("Deprecated: Astro.fetchContent() has been replaced with Astro.glob().");
  };
}
function createAstroGlobFn() {
  const globHandler = (importMetaGlobResult, globValue) => {
    let allEntries = [...Object.values(importMetaGlobResult)];
    if (allEntries.length === 0) {
      throw new Error(`Astro.glob(${JSON.stringify(globValue())}) - no matches found.`);
    }
    return Promise.all(allEntries.map((fn) => fn()));
  };
  return globHandler;
}
function createAstro(filePathname, _site, projectRootStr) {
  const site = _site ? new URL(_site) : void 0;
  const referenceURL = new URL(filePathname, `http://localhost`);
  const projectRoot = new URL(projectRootStr);
  return {
    site,
    generator: `Astro v${ASTRO_VERSION}`,
    fetchContent: createDeprecatedFetchContentFn(),
    glob: createAstroGlobFn(),
    resolve(...segments) {
      let resolved = segments.reduce((u, segment) => new URL(segment, u), referenceURL).pathname;
      if (resolved.startsWith(projectRoot.pathname)) {
        resolved = "/" + resolved.slice(projectRoot.pathname.length);
      }
      return resolved;
    }
  };
}

/**
 * Copyright (C) 2017-present by Andrea Giammarchi - @WebReflection
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

const {replace} = '';
const ca = /[&<>'"]/g;

const esca = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  "'": '&#39;',
  '"': '&quot;'
};
const pe = m => esca[m];

/**
 * Safely escape HTML entities such as `&`, `<`, `>`, `"`, and `'`.
 * @param {string} es the input to safely escape
 * @returns {string} the escaped input, and it **throws** an error if
 *  the input type is unexpected, except for boolean and numbers,
 *  converted as string.
 */
const escape = es => replace.call(es, ca, pe);

const escapeHTML = escape;
class HTMLString extends String {
  get [Symbol.toStringTag]() {
    return "HTMLString";
  }
}
const markHTMLString = (value) => {
  if (value instanceof HTMLString) {
    return value;
  }
  if (typeof value === "string") {
    return new HTMLString(value);
  }
  return value;
};

class Metadata {
  constructor(filePathname, opts) {
    this.modules = opts.modules;
    this.hoisted = opts.hoisted;
    this.hydratedComponents = opts.hydratedComponents;
    this.clientOnlyComponents = opts.clientOnlyComponents;
    this.hydrationDirectives = opts.hydrationDirectives;
    this.mockURL = new URL(filePathname, "http://example.com");
    this.metadataCache = /* @__PURE__ */ new Map();
  }
  resolvePath(specifier) {
    if (specifier.startsWith(".")) {
      const resolved = new URL(specifier, this.mockURL).pathname;
      if (resolved.startsWith("/@fs") && resolved.endsWith(".jsx")) {
        return resolved.slice(0, resolved.length - 4);
      }
      return resolved;
    }
    return specifier;
  }
  getPath(Component) {
    const metadata = this.getComponentMetadata(Component);
    return (metadata == null ? void 0 : metadata.componentUrl) || null;
  }
  getExport(Component) {
    const metadata = this.getComponentMetadata(Component);
    return (metadata == null ? void 0 : metadata.componentExport) || null;
  }
  getComponentMetadata(Component) {
    if (this.metadataCache.has(Component)) {
      return this.metadataCache.get(Component);
    }
    const metadata = this.findComponentMetadata(Component);
    this.metadataCache.set(Component, metadata);
    return metadata;
  }
  findComponentMetadata(Component) {
    const isCustomElement = typeof Component === "string";
    for (const { module, specifier } of this.modules) {
      const id = this.resolvePath(specifier);
      for (const [key, value] of Object.entries(module)) {
        if (isCustomElement) {
          if (key === "tagName" && Component === value) {
            return {
              componentExport: key,
              componentUrl: id
            };
          }
        } else if (Component === value) {
          return {
            componentExport: key,
            componentUrl: id
          };
        }
      }
    }
    return null;
  }
}
function createMetadata(filePathname, options) {
  return new Metadata(filePathname, options);
}

const PROP_TYPE = {
  Value: 0,
  JSON: 1,
  RegExp: 2,
  Date: 3,
  Map: 4,
  Set: 5,
  BigInt: 6,
  URL: 7,
  Uint8Array: 8,
  Uint16Array: 9,
  Uint32Array: 10
};
function serializeArray(value, metadata = {}, parents = /* @__PURE__ */ new WeakSet()) {
  if (parents.has(value)) {
    throw new Error(`Cyclic reference detected while serializing props for <${metadata.displayName} client:${metadata.hydrate}>!

Cyclic references cannot be safely serialized for client-side usage. Please remove the cyclic reference.`);
  }
  parents.add(value);
  const serialized = value.map((v) => {
    return convertToSerializedForm(v, metadata, parents);
  });
  parents.delete(value);
  return serialized;
}
function serializeObject(value, metadata = {}, parents = /* @__PURE__ */ new WeakSet()) {
  if (parents.has(value)) {
    throw new Error(`Cyclic reference detected while serializing props for <${metadata.displayName} client:${metadata.hydrate}>!

Cyclic references cannot be safely serialized for client-side usage. Please remove the cyclic reference.`);
  }
  parents.add(value);
  const serialized = Object.fromEntries(
    Object.entries(value).map(([k, v]) => {
      return [k, convertToSerializedForm(v, metadata, parents)];
    })
  );
  parents.delete(value);
  return serialized;
}
function convertToSerializedForm(value, metadata = {}, parents = /* @__PURE__ */ new WeakSet()) {
  const tag = Object.prototype.toString.call(value);
  switch (tag) {
    case "[object Date]": {
      return [PROP_TYPE.Date, value.toISOString()];
    }
    case "[object RegExp]": {
      return [PROP_TYPE.RegExp, value.source];
    }
    case "[object Map]": {
      return [
        PROP_TYPE.Map,
        JSON.stringify(serializeArray(Array.from(value), metadata, parents))
      ];
    }
    case "[object Set]": {
      return [
        PROP_TYPE.Set,
        JSON.stringify(serializeArray(Array.from(value), metadata, parents))
      ];
    }
    case "[object BigInt]": {
      return [PROP_TYPE.BigInt, value.toString()];
    }
    case "[object URL]": {
      return [PROP_TYPE.URL, value.toString()];
    }
    case "[object Array]": {
      return [PROP_TYPE.JSON, JSON.stringify(serializeArray(value, metadata, parents))];
    }
    case "[object Uint8Array]": {
      return [PROP_TYPE.Uint8Array, JSON.stringify(Array.from(value))];
    }
    case "[object Uint16Array]": {
      return [PROP_TYPE.Uint16Array, JSON.stringify(Array.from(value))];
    }
    case "[object Uint32Array]": {
      return [PROP_TYPE.Uint32Array, JSON.stringify(Array.from(value))];
    }
    default: {
      if (value !== null && typeof value === "object") {
        return [PROP_TYPE.Value, serializeObject(value, metadata, parents)];
      } else {
        return [PROP_TYPE.Value, value];
      }
    }
  }
}
function serializeProps(props, metadata) {
  const serialized = JSON.stringify(serializeObject(props, metadata));
  return serialized;
}

function serializeListValue(value) {
  const hash = {};
  push(value);
  return Object.keys(hash).join(" ");
  function push(item) {
    if (item && typeof item.forEach === "function")
      item.forEach(push);
    else if (item === Object(item))
      Object.keys(item).forEach((name) => {
        if (item[name])
          push(name);
      });
    else {
      item = item === false || item == null ? "" : String(item).trim();
      if (item) {
        item.split(/\s+/).forEach((name) => {
          hash[name] = true;
        });
      }
    }
  }
}

const HydrationDirectivesRaw = ["load", "idle", "media", "visible", "only"];
const HydrationDirectives = new Set(HydrationDirectivesRaw);
const HydrationDirectiveProps = new Set(HydrationDirectivesRaw.map((n) => `client:${n}`));
function extractDirectives(inputProps) {
  let extracted = {
    isPage: false,
    hydration: null,
    props: {}
  };
  for (const [key, value] of Object.entries(inputProps)) {
    if (key.startsWith("server:")) {
      if (key === "server:root") {
        extracted.isPage = true;
      }
    }
    if (key.startsWith("client:")) {
      if (!extracted.hydration) {
        extracted.hydration = {
          directive: "",
          value: "",
          componentUrl: "",
          componentExport: { value: "" }
        };
      }
      switch (key) {
        case "client:component-path": {
          extracted.hydration.componentUrl = value;
          break;
        }
        case "client:component-export": {
          extracted.hydration.componentExport.value = value;
          break;
        }
        case "client:component-hydration": {
          break;
        }
        case "client:display-name": {
          break;
        }
        default: {
          extracted.hydration.directive = key.split(":")[1];
          extracted.hydration.value = value;
          if (!HydrationDirectives.has(extracted.hydration.directive)) {
            throw new Error(
              `Error: invalid hydration directive "${key}". Supported hydration methods: ${Array.from(
                HydrationDirectiveProps
              ).join(", ")}`
            );
          }
          if (extracted.hydration.directive === "media" && typeof extracted.hydration.value !== "string") {
            throw new Error(
              'Error: Media query must be provided for "client:media", similar to client:media="(max-width: 600px)"'
            );
          }
          break;
        }
      }
    } else if (key === "class:list") {
      if (value) {
        extracted.props[key.slice(0, -5)] = serializeListValue(value);
      }
    } else {
      extracted.props[key] = value;
    }
  }
  return extracted;
}
async function generateHydrateScript(scriptOptions, metadata) {
  const { renderer, result, astroId, props, attrs } = scriptOptions;
  const { hydrate, componentUrl, componentExport } = metadata;
  if (!componentExport.value) {
    throw new Error(
      `Unable to resolve a valid export for "${metadata.displayName}"! Please open an issue at https://astro.build/issues!`
    );
  }
  const island = {
    children: "",
    props: {
      uid: astroId
    }
  };
  if (attrs) {
    for (const [key, value] of Object.entries(attrs)) {
      island.props[key] = value;
    }
  }
  island.props["component-url"] = await result.resolve(decodeURI(componentUrl));
  if (renderer.clientEntrypoint) {
    island.props["component-export"] = componentExport.value;
    island.props["renderer-url"] = await result.resolve(decodeURI(renderer.clientEntrypoint));
    island.props["props"] = escapeHTML(serializeProps(props, metadata));
  }
  island.props["ssr"] = "";
  island.props["client"] = hydrate;
  let beforeHydrationUrl = await result.resolve("astro:scripts/before-hydration.js");
  if (beforeHydrationUrl.length) {
    island.props["before-hydration-url"] = beforeHydrationUrl;
  }
  island.props["opts"] = escapeHTML(
    JSON.stringify({
      name: metadata.displayName,
      value: metadata.hydrateArgs || ""
    })
  );
  return island;
}

class SlotString extends HTMLString {
  constructor(content, instructions) {
    super(content);
    this.instructions = instructions;
  }
}
async function renderSlot(_result, slotted, fallback) {
  if (slotted) {
    let iterator = renderChild(slotted);
    let content = "";
    let instructions = null;
    for await (const chunk of iterator) {
      if (chunk.type === "directive") {
        if (instructions === null) {
          instructions = [];
        }
        instructions.push(chunk);
      } else {
        content += chunk;
      }
    }
    return markHTMLString(new SlotString(content, instructions));
  }
  return fallback;
}
async function renderSlots(result, slots = {}) {
  let slotInstructions = null;
  let children = {};
  if (slots) {
    await Promise.all(
      Object.entries(slots).map(
        ([key, value]) => renderSlot(result, value).then((output) => {
          if (output.instructions) {
            if (slotInstructions === null) {
              slotInstructions = [];
            }
            slotInstructions.push(...output.instructions);
          }
          children[key] = output;
        })
      )
    );
  }
  return { slotInstructions, children };
}

async function* renderChild(child) {
  child = await child;
  if (child instanceof SlotString) {
    if (child.instructions) {
      yield* child.instructions;
    }
    yield child;
  } else if (child instanceof HTMLString) {
    yield child;
  } else if (Array.isArray(child)) {
    for (const value of child) {
      yield markHTMLString(await renderChild(value));
    }
  } else if (typeof child === "function") {
    yield* renderChild(child());
  } else if (typeof child === "string") {
    yield markHTMLString(escapeHTML(child));
  } else if (!child && child !== 0) ; else if (child instanceof AstroComponent || Object.prototype.toString.call(child) === "[object AstroComponent]") {
    yield* renderAstroComponent(child);
  } else if (ArrayBuffer.isView(child)) {
    yield child;
  } else if (typeof child === "object" && (Symbol.asyncIterator in child || Symbol.iterator in child)) {
    yield* child;
  } else {
    yield child;
  }
}

var idle_prebuilt_default = `(self.Astro=self.Astro||{}).idle=t=>{const e=async()=>{await(await t())()};"requestIdleCallback"in window?window.requestIdleCallback(e):setTimeout(e,200)},window.dispatchEvent(new Event("astro:idle"));`;

var load_prebuilt_default = `(self.Astro=self.Astro||{}).load=a=>{(async()=>await(await a())())()},window.dispatchEvent(new Event("astro:load"));`;

var media_prebuilt_default = `(self.Astro=self.Astro||{}).media=(s,a)=>{const t=async()=>{await(await s())()};if(a.value){const e=matchMedia(a.value);e.matches?t():e.addEventListener("change",t,{once:!0})}},window.dispatchEvent(new Event("astro:media"));`;

var only_prebuilt_default = `(self.Astro=self.Astro||{}).only=t=>{(async()=>await(await t())())()},window.dispatchEvent(new Event("astro:only"));`;

var visible_prebuilt_default = `(self.Astro=self.Astro||{}).visible=(s,c,n)=>{const r=async()=>{await(await s())()};let i=new IntersectionObserver(e=>{for(const t of e)if(!!t.isIntersecting){i.disconnect(),r();break}});for(let e=0;e<n.children.length;e++){const t=n.children[e];i.observe(t)}},window.dispatchEvent(new Event("astro:visible"));`;

var astro_island_prebuilt_default = `var l;{const c={0:t=>t,1:t=>JSON.parse(t,o),2:t=>new RegExp(t),3:t=>new Date(t),4:t=>new Map(JSON.parse(t,o)),5:t=>new Set(JSON.parse(t,o)),6:t=>BigInt(t),7:t=>new URL(t),8:t=>new Uint8Array(JSON.parse(t)),9:t=>new Uint16Array(JSON.parse(t)),10:t=>new Uint32Array(JSON.parse(t))},o=(t,s)=>{if(t===""||!Array.isArray(s))return s;const[e,n]=s;return e in c?c[e](n):void 0};customElements.get("astro-island")||customElements.define("astro-island",(l=class extends HTMLElement{constructor(){super(...arguments);this.hydrate=()=>{if(!this.hydrator||this.parentElement&&this.parentElement.closest("astro-island[ssr]"))return;const s=this.querySelectorAll("astro-slot"),e={},n=this.querySelectorAll("template[data-astro-template]");for(const r of n){const i=r.closest(this.tagName);!i||!i.isSameNode(this)||(e[r.getAttribute("data-astro-template")||"default"]=r.innerHTML,r.remove())}for(const r of s){const i=r.closest(this.tagName);!i||!i.isSameNode(this)||(e[r.getAttribute("name")||"default"]=r.innerHTML)}const a=this.hasAttribute("props")?JSON.parse(this.getAttribute("props"),o):{};this.hydrator(this)(this.Component,a,e,{client:this.getAttribute("client")}),this.removeAttribute("ssr"),window.removeEventListener("astro:hydrate",this.hydrate),window.dispatchEvent(new CustomEvent("astro:hydrate"))}}connectedCallback(){!this.hasAttribute("await-children")||this.firstChild?this.childrenConnectedCallback():new MutationObserver((s,e)=>{e.disconnect(),this.childrenConnectedCallback()}).observe(this,{childList:!0})}async childrenConnectedCallback(){window.addEventListener("astro:hydrate",this.hydrate);let s=this.getAttribute("before-hydration-url");s&&await import(s),this.start()}start(){const s=JSON.parse(this.getAttribute("opts")),e=this.getAttribute("client");if(Astro[e]===void 0){window.addEventListener(\`astro:\${e}\`,()=>this.start(),{once:!0});return}Astro[e](async()=>{const n=this.getAttribute("renderer-url"),[a,{default:r}]=await Promise.all([import(this.getAttribute("component-url")),n?import(n):()=>()=>{}]),i=this.getAttribute("component-export")||"default";if(!i.includes("."))this.Component=a[i];else{this.Component=a;for(const d of i.split("."))this.Component=this.Component[d]}return this.hydrator=r,this.hydrate},s,this)}attributeChangedCallback(){this.hydrator&&this.hydrate()}},l.observedAttributes=["props"],l))}`;

function determineIfNeedsHydrationScript(result) {
  if (result._metadata.hasHydrationScript) {
    return false;
  }
  return result._metadata.hasHydrationScript = true;
}
const hydrationScripts = {
  idle: idle_prebuilt_default,
  load: load_prebuilt_default,
  only: only_prebuilt_default,
  media: media_prebuilt_default,
  visible: visible_prebuilt_default
};
function determinesIfNeedsDirectiveScript(result, directive) {
  if (result._metadata.hasDirectives.has(directive)) {
    return false;
  }
  result._metadata.hasDirectives.add(directive);
  return true;
}
function getDirectiveScriptText(directive) {
  if (!(directive in hydrationScripts)) {
    throw new Error(`Unknown directive: ${directive}`);
  }
  const directiveScriptText = hydrationScripts[directive];
  return directiveScriptText;
}
function getPrescripts(type, directive) {
  switch (type) {
    case "both":
      return `<style>astro-island,astro-slot{display:contents}</style><script>${getDirectiveScriptText(directive) + astro_island_prebuilt_default}<\/script>`;
    case "directive":
      return `<script>${getDirectiveScriptText(directive)}<\/script>`;
  }
  return "";
}

const Fragment = Symbol.for("astro:fragment");
const Renderer = Symbol.for("astro:renderer");
const encoder = new TextEncoder();
const decoder = new TextDecoder();
function stringifyChunk(result, chunk) {
  switch (chunk.type) {
    case "directive": {
      const { hydration } = chunk;
      let needsHydrationScript = hydration && determineIfNeedsHydrationScript(result);
      let needsDirectiveScript = hydration && determinesIfNeedsDirectiveScript(result, hydration.directive);
      let prescriptType = needsHydrationScript ? "both" : needsDirectiveScript ? "directive" : null;
      if (prescriptType) {
        let prescripts = getPrescripts(prescriptType, hydration.directive);
        return markHTMLString(prescripts);
      } else {
        return "";
      }
    }
    default: {
      return chunk.toString();
    }
  }
}
class HTMLParts {
  constructor() {
    this.parts = [];
  }
  append(part, result) {
    if (ArrayBuffer.isView(part)) {
      this.parts.push(part);
    } else {
      this.parts.push(stringifyChunk(result, part));
    }
  }
  toString() {
    let html = "";
    for (const part of this.parts) {
      if (ArrayBuffer.isView(part)) {
        html += decoder.decode(part);
      } else {
        html += part;
      }
    }
    return html;
  }
  toArrayBuffer() {
    this.parts.forEach((part, i) => {
      if (!ArrayBuffer.isView(part)) {
        this.parts[i] = encoder.encode(String(part));
      }
    });
    return concatUint8Arrays(this.parts);
  }
}
function concatUint8Arrays(arrays) {
  let len = 0;
  arrays.forEach((arr) => len += arr.length);
  let merged = new Uint8Array(len);
  let offset = 0;
  arrays.forEach((arr) => {
    merged.set(arr, offset);
    offset += arr.length;
  });
  return merged;
}

function validateComponentProps(props, displayName) {
  var _a;
  if (((_a = {"BASE_URL":"/","MODE":"production","DEV":false,"PROD":true}) == null ? void 0 : _a.DEV) && props != null) {
    for (const prop of Object.keys(props)) {
      if (HydrationDirectiveProps.has(prop)) {
        console.warn(
          `You are attempting to render <${displayName} ${prop} />, but ${displayName} is an Astro component. Astro components do not render in the client and should not have a hydration directive. Please use a framework component for client rendering.`
        );
      }
    }
  }
}
class AstroComponent {
  constructor(htmlParts, expressions) {
    this.htmlParts = htmlParts;
    this.expressions = expressions;
  }
  get [Symbol.toStringTag]() {
    return "AstroComponent";
  }
  async *[Symbol.asyncIterator]() {
    const { htmlParts, expressions } = this;
    for (let i = 0; i < htmlParts.length; i++) {
      const html = htmlParts[i];
      const expression = expressions[i];
      yield markHTMLString(html);
      yield* renderChild(expression);
    }
  }
}
function isAstroComponent(obj) {
  return typeof obj === "object" && Object.prototype.toString.call(obj) === "[object AstroComponent]";
}
function isAstroComponentFactory(obj) {
  return obj == null ? false : !!obj.isAstroComponentFactory;
}
async function* renderAstroComponent(component) {
  for await (const value of component) {
    if (value || value === 0) {
      for await (const chunk of renderChild(value)) {
        switch (chunk.type) {
          case "directive": {
            yield chunk;
            break;
          }
          default: {
            yield markHTMLString(chunk);
            break;
          }
        }
      }
    }
  }
}
async function renderToString(result, componentFactory, props, children) {
  const Component = await componentFactory(result, props, children);
  if (!isAstroComponent(Component)) {
    const response = Component;
    throw response;
  }
  let parts = new HTMLParts();
  for await (const chunk of renderAstroComponent(Component)) {
    parts.append(chunk, result);
  }
  return parts.toString();
}
async function renderToIterable(result, componentFactory, displayName, props, children) {
  validateComponentProps(props, displayName);
  const Component = await componentFactory(result, props, children);
  if (!isAstroComponent(Component)) {
    console.warn(
      `Returning a Response is only supported inside of page components. Consider refactoring this logic into something like a function that can be used in the page.`
    );
    const response = Component;
    throw response;
  }
  return renderAstroComponent(Component);
}
async function renderTemplate(htmlParts, ...expressions) {
  return new AstroComponent(htmlParts, expressions);
}

/**
 * shortdash - https://github.com/bibig/node-shorthash
 *
 * @license
 *
 * (The MIT License)
 *
 * Copyright (c) 2013 Bibig <bibig@me.com>
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
const dictionary = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXY";
const binary = dictionary.length;
function bitwise(str) {
  let hash = 0;
  if (str.length === 0)
    return hash;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    hash = (hash << 5) - hash + ch;
    hash = hash & hash;
  }
  return hash;
}
function shorthash(text) {
  let num;
  let result = "";
  let integer = bitwise(text);
  const sign = integer < 0 ? "Z" : "";
  integer = Math.abs(integer);
  while (integer >= binary) {
    num = integer % binary;
    integer = Math.floor(integer / binary);
    result = dictionary[num] + result;
  }
  if (integer > 0) {
    result = dictionary[integer] + result;
  }
  return sign + result;
}

const voidElementNames = /^(area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/i;
const htmlBooleanAttributes = /^(allowfullscreen|async|autofocus|autoplay|controls|default|defer|disabled|disablepictureinpicture|disableremoteplayback|formnovalidate|hidden|loop|nomodule|novalidate|open|playsinline|readonly|required|reversed|scoped|seamless|itemscope)$/i;
const htmlEnumAttributes = /^(contenteditable|draggable|spellcheck|value)$/i;
const svgEnumAttributes = /^(autoReverse|externalResourcesRequired|focusable|preserveAlpha)$/i;
const STATIC_DIRECTIVES = /* @__PURE__ */ new Set(["set:html", "set:text"]);
const toIdent = (k) => k.trim().replace(/(?:(?!^)\b\w|\s+|[^\w]+)/g, (match, index) => {
  if (/[^\w]|\s/.test(match))
    return "";
  return index === 0 ? match : match.toUpperCase();
});
const toAttributeString = (value, shouldEscape = true) => shouldEscape ? String(value).replace(/&/g, "&#38;").replace(/"/g, "&#34;") : value;
const kebab = (k) => k.toLowerCase() === k ? k : k.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
const toStyleString = (obj) => Object.entries(obj).map(([k, v]) => `${kebab(k)}:${v}`).join(";");
function defineScriptVars(vars) {
  let output = "";
  for (const [key, value] of Object.entries(vars)) {
    output += `const ${toIdent(key)} = ${JSON.stringify(value)};
`;
  }
  return markHTMLString(output);
}
function formatList(values) {
  if (values.length === 1) {
    return values[0];
  }
  return `${values.slice(0, -1).join(", ")} or ${values[values.length - 1]}`;
}
function addAttribute(value, key, shouldEscape = true) {
  if (value == null) {
    return "";
  }
  if (value === false) {
    if (htmlEnumAttributes.test(key) || svgEnumAttributes.test(key)) {
      return markHTMLString(` ${key}="false"`);
    }
    return "";
  }
  if (STATIC_DIRECTIVES.has(key)) {
    console.warn(`[astro] The "${key}" directive cannot be applied dynamically at runtime. It will not be rendered as an attribute.

Make sure to use the static attribute syntax (\`${key}={value}\`) instead of the dynamic spread syntax (\`{...{ "${key}": value }}\`).`);
    return "";
  }
  if (key === "class:list") {
    const listValue = toAttributeString(serializeListValue(value));
    if (listValue === "") {
      return "";
    }
    return markHTMLString(` ${key.slice(0, -5)}="${listValue}"`);
  }
  if (key === "style" && !(value instanceof HTMLString) && typeof value === "object") {
    return markHTMLString(` ${key}="${toStyleString(value)}"`);
  }
  if (key === "className") {
    return markHTMLString(` class="${toAttributeString(value, shouldEscape)}"`);
  }
  if (value === true && (key.startsWith("data-") || htmlBooleanAttributes.test(key))) {
    return markHTMLString(` ${key}`);
  } else {
    return markHTMLString(` ${key}="${toAttributeString(value, shouldEscape)}"`);
  }
}
function internalSpreadAttributes(values, shouldEscape = true) {
  let output = "";
  for (const [key, value] of Object.entries(values)) {
    output += addAttribute(value, key, shouldEscape);
  }
  return markHTMLString(output);
}
function renderElement$1(name, { props: _props, children = "" }, shouldEscape = true) {
  const { lang: _, "data-astro-id": astroId, "define:vars": defineVars, ...props } = _props;
  if (defineVars) {
    if (name === "style") {
      delete props["is:global"];
      delete props["is:scoped"];
    }
    if (name === "script") {
      delete props.hoist;
      children = defineScriptVars(defineVars) + "\n" + children;
    }
  }
  if ((children == null || children == "") && voidElementNames.test(name)) {
    return `<${name}${internalSpreadAttributes(props, shouldEscape)} />`;
  }
  return `<${name}${internalSpreadAttributes(props, shouldEscape)}>${children}</${name}>`;
}

function componentIsHTMLElement(Component) {
  return typeof HTMLElement !== "undefined" && HTMLElement.isPrototypeOf(Component);
}
async function renderHTMLElement(result, constructor, props, slots) {
  const name = getHTMLElementName(constructor);
  let attrHTML = "";
  for (const attr in props) {
    attrHTML += ` ${attr}="${toAttributeString(await props[attr])}"`;
  }
  return markHTMLString(
    `<${name}${attrHTML}>${await renderSlot(result, slots == null ? void 0 : slots.default)}</${name}>`
  );
}
function getHTMLElementName(constructor) {
  const definedName = customElements.getName(constructor);
  if (definedName)
    return definedName;
  const assignedName = constructor.name.replace(/^HTML|Element$/g, "").replace(/[A-Z]/g, "-$&").toLowerCase().replace(/^-/, "html-");
  return assignedName;
}

const rendererAliases = /* @__PURE__ */ new Map([["solid", "solid-js"]]);
function guessRenderers(componentUrl) {
  const extname = componentUrl == null ? void 0 : componentUrl.split(".").pop();
  switch (extname) {
    case "svelte":
      return ["@astrojs/svelte"];
    case "vue":
      return ["@astrojs/vue"];
    case "jsx":
    case "tsx":
      return ["@astrojs/react", "@astrojs/preact", "@astrojs/vue (jsx)"];
    default:
      return ["@astrojs/react", "@astrojs/preact", "@astrojs/vue", "@astrojs/svelte"];
  }
}
function getComponentType(Component) {
  if (Component === Fragment) {
    return "fragment";
  }
  if (Component && typeof Component === "object" && Component["astro:html"]) {
    return "html";
  }
  if (isAstroComponentFactory(Component)) {
    return "astro-factory";
  }
  return "unknown";
}
async function renderComponent(result, displayName, Component, _props, slots = {}) {
  var _a;
  Component = await Component;
  switch (getComponentType(Component)) {
    case "fragment": {
      const children2 = await renderSlot(result, slots == null ? void 0 : slots.default);
      if (children2 == null) {
        return children2;
      }
      return markHTMLString(children2);
    }
    case "html": {
      const { slotInstructions: slotInstructions2, children: children2 } = await renderSlots(result, slots);
      const html2 = Component.render({ slots: children2 });
      const hydrationHtml = slotInstructions2 ? slotInstructions2.map((instr) => stringifyChunk(result, instr)).join("") : "";
      return markHTMLString(hydrationHtml + html2);
    }
    case "astro-factory": {
      async function* renderAstroComponentInline() {
        let iterable = await renderToIterable(result, Component, displayName, _props, slots);
        yield* iterable;
      }
      return renderAstroComponentInline();
    }
  }
  if (!Component && !_props["client:only"]) {
    throw new Error(
      `Unable to render ${displayName} because it is ${Component}!
Did you forget to import the component or is it possible there is a typo?`
    );
  }
  const { renderers } = result._metadata;
  const metadata = { displayName };
  const { hydration, isPage, props } = extractDirectives(_props);
  let html = "";
  let attrs = void 0;
  if (hydration) {
    metadata.hydrate = hydration.directive;
    metadata.hydrateArgs = hydration.value;
    metadata.componentExport = hydration.componentExport;
    metadata.componentUrl = hydration.componentUrl;
  }
  const probableRendererNames = guessRenderers(metadata.componentUrl);
  if (Array.isArray(renderers) && renderers.length === 0 && typeof Component !== "string" && !componentIsHTMLElement(Component)) {
    const message = `Unable to render ${metadata.displayName}!

There are no \`integrations\` set in your \`astro.config.mjs\` file.
Did you mean to add ${formatList(probableRendererNames.map((r) => "`" + r + "`"))}?`;
    throw new Error(message);
  }
  const { children, slotInstructions } = await renderSlots(result, slots);
  let renderer;
  if (metadata.hydrate !== "only") {
    if (Component && Component[Renderer]) {
      const rendererName = Component[Renderer];
      renderer = renderers.find(({ name }) => name === rendererName);
    }
    if (!renderer) {
      let error;
      for (const r of renderers) {
        try {
          if (await r.ssr.check.call({ result }, Component, props, children)) {
            renderer = r;
            break;
          }
        } catch (e) {
          error ?? (error = e);
        }
      }
      if (!renderer && error) {
        throw error;
      }
    }
    if (!renderer && typeof HTMLElement === "function" && componentIsHTMLElement(Component)) {
      const output = renderHTMLElement(result, Component, _props, slots);
      return output;
    }
  } else {
    if (metadata.hydrateArgs) {
      const passedName = metadata.hydrateArgs;
      const rendererName = rendererAliases.has(passedName) ? rendererAliases.get(passedName) : passedName;
      renderer = renderers.find(
        ({ name }) => name === `@astrojs/${rendererName}` || name === rendererName
      );
    }
    if (!renderer && renderers.length === 1) {
      renderer = renderers[0];
    }
    if (!renderer) {
      const extname = (_a = metadata.componentUrl) == null ? void 0 : _a.split(".").pop();
      renderer = renderers.filter(
        ({ name }) => name === `@astrojs/${extname}` || name === extname
      )[0];
    }
  }
  if (!renderer) {
    if (metadata.hydrate === "only") {
      throw new Error(`Unable to render ${metadata.displayName}!

Using the \`client:only\` hydration strategy, Astro needs a hint to use the correct renderer.
Did you mean to pass <${metadata.displayName} client:only="${probableRendererNames.map((r) => r.replace("@astrojs/", "")).join("|")}" />
`);
    } else if (typeof Component !== "string") {
      const matchingRenderers = renderers.filter((r) => probableRendererNames.includes(r.name));
      const plural = renderers.length > 1;
      if (matchingRenderers.length === 0) {
        throw new Error(`Unable to render ${metadata.displayName}!

There ${plural ? "are" : "is"} ${renderers.length} renderer${plural ? "s" : ""} configured in your \`astro.config.mjs\` file,
but ${plural ? "none were" : "it was not"} able to server-side render ${metadata.displayName}.

Did you mean to enable ${formatList(probableRendererNames.map((r) => "`" + r + "`"))}?`);
      } else if (matchingRenderers.length === 1) {
        renderer = matchingRenderers[0];
        ({ html, attrs } = await renderer.ssr.renderToStaticMarkup.call(
          { result },
          Component,
          props,
          children,
          metadata
        ));
      } else {
        throw new Error(`Unable to render ${metadata.displayName}!

This component likely uses ${formatList(probableRendererNames)},
but Astro encountered an error during server-side rendering.

Please ensure that ${metadata.displayName}:
1. Does not unconditionally access browser-specific globals like \`window\` or \`document\`.
   If this is unavoidable, use the \`client:only\` hydration directive.
2. Does not conditionally return \`null\` or \`undefined\` when rendered on the server.

If you're still stuck, please open an issue on GitHub or join us at https://astro.build/chat.`);
      }
    }
  } else {
    if (metadata.hydrate === "only") {
      html = await renderSlot(result, slots == null ? void 0 : slots.fallback);
    } else {
      ({ html, attrs } = await renderer.ssr.renderToStaticMarkup.call(
        { result },
        Component,
        props,
        children,
        metadata
      ));
    }
  }
  if (renderer && !renderer.clientEntrypoint && renderer.name !== "@astrojs/lit" && metadata.hydrate) {
    throw new Error(
      `${metadata.displayName} component has a \`client:${metadata.hydrate}\` directive, but no client entrypoint was provided by ${renderer.name}!`
    );
  }
  if (!html && typeof Component === "string") {
    const childSlots = Object.values(children).join("");
    const iterable = renderAstroComponent(
      await renderTemplate`<${Component}${internalSpreadAttributes(props)}${markHTMLString(
        childSlots === "" && voidElementNames.test(Component) ? `/>` : `>${childSlots}</${Component}>`
      )}`
    );
    html = "";
    for await (const chunk of iterable) {
      html += chunk;
    }
  }
  if (!hydration) {
    if (isPage || (renderer == null ? void 0 : renderer.name) === "astro:jsx") {
      return html;
    }
    return markHTMLString(html.replace(/\<\/?astro-slot\>/g, ""));
  }
  const astroId = shorthash(
    `<!--${metadata.componentExport.value}:${metadata.componentUrl}-->
${html}
${serializeProps(
      props,
      metadata
    )}`
  );
  const island = await generateHydrateScript(
    { renderer, result, astroId, props, attrs },
    metadata
  );
  let unrenderedSlots = [];
  if (html) {
    if (Object.keys(children).length > 0) {
      for (const key of Object.keys(children)) {
        if (!html.includes(key === "default" ? `<astro-slot>` : `<astro-slot name="${key}">`)) {
          unrenderedSlots.push(key);
        }
      }
    }
  } else {
    unrenderedSlots = Object.keys(children);
  }
  const template = unrenderedSlots.length > 0 ? unrenderedSlots.map(
    (key) => `<template data-astro-template${key !== "default" ? `="${key}"` : ""}>${children[key]}</template>`
  ).join("") : "";
  island.children = `${html ?? ""}${template}`;
  if (island.children) {
    island.props["await-children"] = "";
  }
  async function* renderAll() {
    if (slotInstructions) {
      yield* slotInstructions;
    }
    yield { type: "directive", hydration, result };
    yield markHTMLString(renderElement$1("astro-island", island, false));
  }
  return renderAll();
}

const uniqueElements = (item, index, all) => {
  const props = JSON.stringify(item.props);
  const children = item.children;
  return index === all.findIndex((i) => JSON.stringify(i.props) === props && i.children == children);
};
function renderHead(result) {
  result._metadata.hasRenderedHead = true;
  const styles = Array.from(result.styles).filter(uniqueElements).map((style) => renderElement$1("style", style));
  result.styles.clear();
  const scripts = Array.from(result.scripts).filter(uniqueElements).map((script, i) => {
    return renderElement$1("script", script, false);
  });
  const links = Array.from(result.links).filter(uniqueElements).map((link) => renderElement$1("link", link, false));
  return markHTMLString(links.join("\n") + styles.join("\n") + scripts.join("\n"));
}
async function* maybeRenderHead(result) {
  if (result._metadata.hasRenderedHead) {
    return;
  }
  yield renderHead(result);
}

typeof process === "object" && Object.prototype.toString.call(process) === "[object process]";

function createComponent(cb) {
  cb.isAstroComponentFactory = true;
  return cb;
}
function __astro_tag_component__(Component, rendererName) {
  if (!Component)
    return;
  if (typeof Component !== "function")
    return;
  Object.defineProperty(Component, Renderer, {
    value: rendererName,
    enumerable: false,
    writable: false
  });
}
function spreadAttributes(values, _name, { class: scopedClassName } = {}) {
  let output = "";
  if (scopedClassName) {
    if (typeof values.class !== "undefined") {
      values.class += ` ${scopedClassName}`;
    } else if (typeof values["class:list"] !== "undefined") {
      values["class:list"] = [values["class:list"], scopedClassName];
    } else {
      values.class = scopedClassName;
    }
  }
  for (const [key, value] of Object.entries(values)) {
    output += addAttribute(value, key, true);
  }
  return markHTMLString(output);
}

const AstroJSX = "astro:jsx";
const Empty = Symbol("empty");
const toSlotName = (str) => str.trim().replace(/[-_]([a-z])/g, (_, w) => w.toUpperCase());
function isVNode(vnode) {
  return vnode && typeof vnode === "object" && vnode[AstroJSX];
}
function transformSlots(vnode) {
  if (typeof vnode.type === "string")
    return vnode;
  const slots = {};
  if (isVNode(vnode.props.children)) {
    const child = vnode.props.children;
    if (!isVNode(child))
      return;
    if (!("slot" in child.props))
      return;
    const name = toSlotName(child.props.slot);
    slots[name] = [child];
    slots[name]["$$slot"] = true;
    delete child.props.slot;
    delete vnode.props.children;
  }
  if (Array.isArray(vnode.props.children)) {
    vnode.props.children = vnode.props.children.map((child) => {
      if (!isVNode(child))
        return child;
      if (!("slot" in child.props))
        return child;
      const name = toSlotName(child.props.slot);
      if (Array.isArray(slots[name])) {
        slots[name].push(child);
      } else {
        slots[name] = [child];
        slots[name]["$$slot"] = true;
      }
      delete child.props.slot;
      return Empty;
    }).filter((v) => v !== Empty);
  }
  Object.assign(vnode.props, slots);
}
function markRawChildren(child) {
  if (typeof child === "string")
    return markHTMLString(child);
  if (Array.isArray(child))
    return child.map((c) => markRawChildren(c));
  return child;
}
function transformSetDirectives(vnode) {
  if (!("set:html" in vnode.props || "set:text" in vnode.props))
    return;
  if ("set:html" in vnode.props) {
    const children = markRawChildren(vnode.props["set:html"]);
    delete vnode.props["set:html"];
    Object.assign(vnode.props, { children });
    return;
  }
  if ("set:text" in vnode.props) {
    const children = vnode.props["set:text"];
    delete vnode.props["set:text"];
    Object.assign(vnode.props, { children });
    return;
  }
}
function createVNode(type, props) {
  const vnode = {
    [Renderer]: "astro:jsx",
    [AstroJSX]: true,
    type,
    props: props ?? {}
  };
  transformSetDirectives(vnode);
  transformSlots(vnode);
  return vnode;
}

const ClientOnlyPlaceholder = "astro-client-only";
const skipAstroJSXCheck = /* @__PURE__ */ new WeakSet();
let originalConsoleError;
let consoleFilterRefs = 0;
async function renderJSX(result, vnode) {
  switch (true) {
    case vnode instanceof HTMLString:
      if (vnode.toString().trim() === "") {
        return "";
      }
      return vnode;
    case typeof vnode === "string":
      return markHTMLString(escapeHTML(vnode));
    case (!vnode && vnode !== 0):
      return "";
    case Array.isArray(vnode):
      return markHTMLString(
        (await Promise.all(vnode.map((v) => renderJSX(result, v)))).join("")
      );
  }
  if (isVNode(vnode)) {
    switch (true) {
      case !vnode.type: {
        throw new Error(`Unable to render ${result._metadata.pathname} because it contains an undefined Component!
Did you forget to import the component or is it possible there is a typo?`);
      }
      case vnode.type === Symbol.for("astro:fragment"):
        return renderJSX(result, vnode.props.children);
      case vnode.type.isAstroComponentFactory: {
        let props = {};
        let slots = {};
        for (const [key, value] of Object.entries(vnode.props ?? {})) {
          if (key === "children" || value && typeof value === "object" && value["$$slot"]) {
            slots[key === "children" ? "default" : key] = () => renderJSX(result, value);
          } else {
            props[key] = value;
          }
        }
        return markHTMLString(await renderToString(result, vnode.type, props, slots));
      }
      case (!vnode.type && vnode.type !== 0):
        return "";
      case (typeof vnode.type === "string" && vnode.type !== ClientOnlyPlaceholder):
        return markHTMLString(await renderElement(result, vnode.type, vnode.props ?? {}));
    }
    if (vnode.type) {
      let extractSlots2 = function(child) {
        if (Array.isArray(child)) {
          return child.map((c) => extractSlots2(c));
        }
        if (!isVNode(child)) {
          _slots.default.push(child);
          return;
        }
        if ("slot" in child.props) {
          _slots[child.props.slot] = [..._slots[child.props.slot] ?? [], child];
          delete child.props.slot;
          return;
        }
        _slots.default.push(child);
      };
      if (typeof vnode.type === "function" && vnode.type["astro:renderer"]) {
        skipAstroJSXCheck.add(vnode.type);
      }
      if (typeof vnode.type === "function" && vnode.props["server:root"]) {
        const output2 = await vnode.type(vnode.props ?? {});
        return await renderJSX(result, output2);
      }
      if (typeof vnode.type === "function" && !skipAstroJSXCheck.has(vnode.type)) {
        useConsoleFilter();
        try {
          const output2 = await vnode.type(vnode.props ?? {});
          if (output2 && output2[AstroJSX]) {
            return await renderJSX(result, output2);
          } else if (!output2) {
            return await renderJSX(result, output2);
          }
        } catch (e) {
          skipAstroJSXCheck.add(vnode.type);
        } finally {
          finishUsingConsoleFilter();
        }
      }
      const { children = null, ...props } = vnode.props ?? {};
      const _slots = {
        default: []
      };
      extractSlots2(children);
      for (const [key, value] of Object.entries(props)) {
        if (value["$$slot"]) {
          _slots[key] = value;
          delete props[key];
        }
      }
      const slotPromises = [];
      const slots = {};
      for (const [key, value] of Object.entries(_slots)) {
        slotPromises.push(
          renderJSX(result, value).then((output2) => {
            if (output2.toString().trim().length === 0)
              return;
            slots[key] = () => output2;
          })
        );
      }
      await Promise.all(slotPromises);
      let output;
      if (vnode.type === ClientOnlyPlaceholder && vnode.props["client:only"]) {
        output = await renderComponent(
          result,
          vnode.props["client:display-name"] ?? "",
          null,
          props,
          slots
        );
      } else {
        output = await renderComponent(
          result,
          typeof vnode.type === "function" ? vnode.type.name : vnode.type,
          vnode.type,
          props,
          slots
        );
      }
      if (typeof output !== "string" && Symbol.asyncIterator in output) {
        let parts = new HTMLParts();
        for await (const chunk of output) {
          parts.append(chunk, result);
        }
        return markHTMLString(parts.toString());
      } else {
        return markHTMLString(output);
      }
    }
  }
  return markHTMLString(`${vnode}`);
}
async function renderElement(result, tag, { children, ...props }) {
  return markHTMLString(
    `<${tag}${spreadAttributes(props)}${markHTMLString(
      (children == null || children == "") && voidElementNames.test(tag) ? `/>` : `>${children == null ? "" : await renderJSX(result, children)}</${tag}>`
    )}`
  );
}
function useConsoleFilter() {
  consoleFilterRefs++;
  if (!originalConsoleError) {
    originalConsoleError = console.error;
    try {
      console.error = filteredConsoleError;
    } catch (error) {
    }
  }
}
function finishUsingConsoleFilter() {
  consoleFilterRefs--;
}
function filteredConsoleError(msg, ...rest) {
  if (consoleFilterRefs > 0 && typeof msg === "string") {
    const isKnownReactHookError = msg.includes("Warning: Invalid hook call.") && msg.includes("https://reactjs.org/link/invalid-hook-call");
    if (isKnownReactHookError)
      return;
  }
  originalConsoleError(msg, ...rest);
}

const slotName = (str) => str.trim().replace(/[-_]([a-z])/g, (_, w) => w.toUpperCase());
async function check(Component, props, { default: children = null, ...slotted } = {}) {
  if (typeof Component !== "function")
    return false;
  const slots = {};
  for (const [key, value] of Object.entries(slotted)) {
    const name = slotName(key);
    slots[name] = value;
  }
  try {
    const result = await Component({ ...props, ...slots, children });
    return result[AstroJSX];
  } catch (e) {
  }
  return false;
}
async function renderToStaticMarkup(Component, props = {}, { default: children = null, ...slotted } = {}) {
  const slots = {};
  for (const [key, value] of Object.entries(slotted)) {
    const name = slotName(key);
    slots[name] = value;
  }
  const { result } = this;
  const html = await renderJSX(result, createVNode(Component, { ...props, ...slots, children }));
  return { html };
}
var server_default = {
  check,
  renderToStaticMarkup
};

const raw_menu = [
	{
		text: "Markdown",
		href: "/",
		items: [
			{
				text: "Simple Markdown",
				href: "/"
			},
			{
				text: "MDX",
				href: "/components"
			},
			{
				text: "Code Highlight",
				href: "/code"
			},
			{
				text: "Readme",
				href: "/readme"
			}
		]
	},
	{
		text: "Astro",
		href: "/astro/deep_toc",
		items: [
			{
				text: "Deep ToC",
				href: "/astro/deep_toc"
			},
			{
				text: "Page 1",
				href: "/astro/page1"
			},
			{
				text: "Page 2",
				href: "/astro/page2"
			},
			{
				text: "Domain 1",
				items: [
					{
						text: "Sub Page 1",
						href: "/astro/domain1/subpage1"
					},
					{
						text: "Sub Page 2",
						href: "/astro/domain1/subpage2"
					}
				]
			},
			{
				text: "Page 3",
				href: "/astro/page3"
			},
			{
				text: "Domain 2",
				items: [
					{
						text: "Sub Page 4",
						href: "/astro/domain2/subpage4"
					},
					{
						text: "Sub Domain 2",
						items: [
							{
								text: "s page5",
								href: "/astro/domain2/subdomain2/spage5"
							}
						]
					}
				]
			}
		]
	},
	{
		text: "Blog",
		href: "/blog/file1.md"
	},
	{
		text: "About",
		href: "/about/"
	}
];

const $$module4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: raw_menu
}, Symbol.toStringTag, { value: 'Module' }));

function root_page(url){
    let str = String(url);
    if(str.includes("//")){
        str = str.split("//")[1];
    }
    if(str.includes("/")){
        str = str.split("/")[1];
    }else {
        str = "";
    }
    return `/${str}`
}

function get_base(href){
    const last_slash = href.lastIndexOf('/');
    return href.substring(0,last_slash)
}

function url_path(url){
    let str = String(url);
    if(str.includes("//")){
        str = str.split("//")[1];
    }
    if(str.includes("/")){
        const start = str.indexOf("/")+1;
        str = str.substring(start);
    }else {
        str = "";
    }
    return `/${str}`
}

function active_page(url, raw_menu){
    const page = root_page(url);
    raw_menu.forEach((item)=>{item.base = get_base(item.href);});
    let active_page_index = raw_menu.map(item=>item.base).indexOf(page);
    //assumption is that the first page (index 0) is always the Home root '/'
    if(active_page_index == -1){
        active_page_index = 0;
    }
    return active_page_index
}

function active_subpage(url,submenu){
    const path = url_path(url);
    let res_index = -1;
    submenu.forEach((element,index) => {
        //console.log(`path(${path}) == href(${element.href})`)
        if(path.startsWith(element.href)){
            res_index = index;
        }
    });
    return res_index
}

/** bad idea - incomplete - due complexity of unlinked children management
 */
function process_menu_list(url,raw_menu){
    let side_menu = {items:[],visible:false};

    const active_section_index = active_page(url,raw_menu);
    side_menu.visible = ("items" in raw_menu[active_section_index]);
    if(side_menu.visible == false)    {
        return side_menu
    }
    side_menu.items = raw_menu[active_section_index].items;

    const active_subpage_index = active_subpage(url,side_menu.items);
    side_menu.items.forEach((item,index)=>{
        item.classes = (index == active_subpage_index)?"active":"";
        item.paddingLeft = item.depth?item.depth*10+10:10;
    });
    

    return side_menu
}

function set_classes_recursive(url,items){
    items.forEach((item)=>{
        item.active = (url_path(url) == item.href);
        if("items" in item){
            item.parent = true;
            item.expanded = true;
            set_classes_recursive(url,item.items);
        }
    });
}

/**  Topmenu  : depth 0
 *  Sidemenu : depths 1,2,...
 *  Sidemenu items : parent,(children)expanded
 */
function process_menu_tree(url,raw_menu){
    let side_menu = {items:[],visible:false};

    const active_section_index = active_page(url,raw_menu);
    side_menu.visible = ("items" in raw_menu[active_section_index]);
    if(side_menu.visible == false)    {
        return side_menu
    }
    side_menu.items = raw_menu[active_section_index].items;

    set_classes_recursive(url,side_menu.items);

    return side_menu
}

function find_parent(index,headings){
    const element_depth = headings[index].depth;
    if(index == 0){
        return null
    }else {
        for(let rev_i = index-1;rev_i>=0;rev_i--){
            if(headings[rev_i].depth<element_depth){
                return headings[rev_i]
            }
        }
    }
}

/* not recursive o(n²)
*/
function heading_list_to_tree(headings){
    for(let element of headings){
        element.items=[];
        element.parent=true;
        element.expanded=true;
        element.href = `#${element.slug}`;
    }

    let tree = [];

    for(let index=0; index<headings.length;index++){
        let element = headings[index];
        let parent = find_parent(index,headings);
        if(parent){
            parent.items.push(element);
        }else {
            tree.push(element);
        }
    }

    for(let element of headings){
        if (element.items.length == 0){
            element.parent = false;
            delete element.items;
            delete element.expanded;
        }
    }
    return tree
}

/** headings start at Sidemenu
 * 
 */
function process_toc_list(headings){
    if(typeof headings == 'undefined' || headings.length == 0){
        return {items:[],visible:false}
    }

    let side_menu = {items:[],visible:false};
    side_menu.items = heading_list_to_tree(headings);//also .slug=>.href
    side_menu.visible = true;
    return side_menu
}

const $$module5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  process_menu_list,
  process_menu_tree,
  process_toc_list,
  active_page
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$f = createMetadata("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/layout/AppBar.astro", { modules: [{ module: $$module4, specifier: "../config/menu.json", assert: {} }, { module: $$module5, specifier: "@/components/menu_utils", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$g = createAstro("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/layout/AppBar.astro", "", "file:///D:/Dev/MicroWebStacks/astro_nav_menus/");
const $$AppBar = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$g, $$props, $$slots);
  Astro2.self = $$AppBar;
  const active_page_index = active_page(Astro2.url, raw_menu);
  raw_menu.forEach((item, index) => {
    item.active_class = index == active_page_index ? "active" : "";
  });
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "class": "astro-3LDIVNZW" })}${raw_menu.map((item) => renderTemplate`${maybeRenderHead($$result)}<a${addAttribute(item.href, "href")}${addAttribute(item.active_class + " astro-3LDIVNZW", "class")}>${item.text}</a>`)}


`;
});

const $$file$f = "D:/Dev/MicroWebStacks/astro_nav_menus/src/layout/AppBar.astro";
const $$url$f = undefined;

const $$module1$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  $$metadata: $$metadata$f,
  default: $$AppBar,
  file: $$file$f,
  url: $$url$f
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$e = createMetadata("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/layout/NavSubMenu.astro", { modules: [{ module: $$module1$2, specifier: "./NavSubMenu.astro", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [{ type: "inline", value: `
    //This script is here and not under Submenu to make it run only once
    let toggler = document.getElementsByClassName("nav_expand");
    for (let i = 0; i < toggler.length; i++) {
      toggler[i].addEventListener("click", function(e) {
        const ul = this.parentElement.querySelector("ul")
        ul.classList.toggle("hidden");
        if(ul.classList.contains("hidden")){
            this.classList.remove("expanded");
        }else{
            this.classList.add("expanded");
        }
        e.preventDefault()
      });
    }
` }] });
const $$Astro$f = createAstro("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/layout/NavSubMenu.astro", "", "file:///D:/Dev/MicroWebStacks/astro_nav_menus/");
const $$NavSubMenu = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$f, $$props, $$slots);
  Astro2.self = $$NavSubMenu;
  const { items, root = true } = Astro2.props;
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return renderTemplate`${items && renderTemplate`${maybeRenderHead($$result)}<ul${addAttribute((root ? "root" : "nested") + " astro-COITU7UG", "class")}>
        ${items.map((item) => renderTemplate`<li class="astro-COITU7UG">
                <a${addAttribute(item.parent ? "" : item.href, "href")}${addAttribute([[{ active: item.active, parent: item.parent, expanded: item.expanded, nav_expand: item.parent }], "astro-COITU7UG"], "class:list")}>
                    ${item.parent && renderTemplate`<span class="icon astro-COITU7UG">
                            <svg viewBox="0 0 100 100" width="60" height="60" fill="#00000000" xmlns="http://www.w3.org/2000/svg" class="astro-COITU7UG">
                                <path d="M 20,10 L 70,50 L 20,90" stroke-width="20px" stroke="#d0d0d0" stroke-linecap="round" stroke-linejoin="round" class="astro-COITU7UG"></path>
                            </svg>
                        </span>`}
                    <span class="text astro-COITU7UG">
                        ${item.text}
                    </span>
                </a>
                ${renderComponent($$result, "NavSubMenu", $$NavSubMenu, { "items": item.items, "root": false, "class": "astro-COITU7UG" })}
            </li>`)}
    </ul>`}



${maybeRenderHead($$result)}`;
});

const $$file$e = "D:/Dev/MicroWebStacks/astro_nav_menus/src/layout/NavSubMenu.astro";
const $$url$e = undefined;

const $$metadata$d = createMetadata("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/layout/NavMenu.astro", { modules: [{ module: $$module1$2, specifier: "./NavSubMenu.astro", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$e = createAstro("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/layout/NavMenu.astro", "", "file:///D:/Dev/MicroWebStacks/astro_nav_menus/");
const $$NavMenu = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$e, $$props, $$slots);
  Astro2.self = $$NavMenu;
  let { items } = Astro2.props;
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return renderTemplate`${maybeRenderHead($$result)}<nav class="left-nav astro-MADNGOYV" data-width="20vw" data-state="open">
    ${renderComponent($$result, "NavSubMenu", $$NavSubMenu, { "items": items, "class": "astro-MADNGOYV" })}
</nav>

`;
});

const $$file$d = "D:/Dev/MicroWebStacks/astro_nav_menus/src/layout/NavMenu.astro";
const $$url$d = undefined;

const $$module2$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  $$metadata: $$metadata$d,
  default: $$NavMenu,
  file: $$file$d,
  url: $$url$d
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$c = createMetadata("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/layout/ToCSubMenu.astro", { modules: [{ module: $$module1$1, specifier: "./ToCSubMenu.astro", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [{ type: "inline", value: `
    //This script is here and not under Submenu to make it run only once
    let toggler = document.getElementsByClassName("toc_expand");
    for (let i = 0; i < toggler.length; i++) {
      toggler[i].addEventListener("click", function(e) {
        this.parentElement.parentElement.querySelector("ul")?.classList.toggle("hidden");
        this.parentElement.classList.toggle("expanded");
        e.preventDefault()
      });
    }
` }] });
const $$Astro$d = createAstro("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/layout/ToCSubMenu.astro", "", "file:///D:/Dev/MicroWebStacks/astro_nav_menus/");
const $$ToCSubMenu = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$d, $$props, $$slots);
  Astro2.self = $$ToCSubMenu;
  const { items, root = true } = Astro2.props;
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return renderTemplate`${items && renderTemplate`${maybeRenderHead($$result)}<ul${addAttribute((root ? "root" : "nested") + " astro-ZXOBRMHW", "class")}>
        ${items.map((item) => renderTemplate`<li class="astro-ZXOBRMHW">
                <a${addAttribute(item.href, "href")}${addAttribute([[{ active: item.active, parent: item.parent, expanded: item.expanded }], "astro-ZXOBRMHW"], "class:list")}>
                    ${item.parent && renderTemplate`<span class="icon toc_expand astro-ZXOBRMHW">
                            <svg viewBox="0 0 100 100" width="60" height="60" fill="#00000000" xmlns="http://www.w3.org/2000/svg" class="astro-ZXOBRMHW">
                                <path d="M 20,10 L 70,50 L 20,90" stroke-width="20px" stroke="#d0d0d0" stroke-linecap="round" stroke-linejoin="round" class="astro-ZXOBRMHW"></path>
                            </svg>
                        </span>`}
                    <span${addAttribute([[{ "text": true, href_hover: item.parent }], "astro-ZXOBRMHW"], "class:list")}>
                        ${item.text}
                    </span>
                </a>
                ${renderComponent($$result, "ToCSubMenu", $$ToCSubMenu, { "items": item.items, "root": false, "class": "astro-ZXOBRMHW" })}
            </li>`)}
    </ul>`}



${maybeRenderHead($$result)}`;
});

const $$file$c = "D:/Dev/MicroWebStacks/astro_nav_menus/src/layout/ToCSubMenu.astro";
const $$url$c = undefined;

const $$metadata$b = createMetadata("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/layout/ToCMenu.astro", { modules: [{ module: $$module1$1, specifier: "./ToCSubMenu.astro", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$c = createAstro("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/layout/ToCMenu.astro", "", "file:///D:/Dev/MicroWebStacks/astro_nav_menus/");
const $$ToCMenu = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$c, $$props, $$slots);
  Astro2.self = $$ToCMenu;
  let { items } = Astro2.props;
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return renderTemplate`${maybeRenderHead($$result)}<nav class="right-toc astro-CGS27VIX" data-width="20vw" data-state="open">
    ${renderComponent($$result, "ToCSubMenu", $$ToCSubMenu, { "items": items, "class": "astro-CGS27VIX" })}
</nav>

`;
});

const $$file$b = "D:/Dev/MicroWebStacks/astro_nav_menus/src/layout/ToCMenu.astro";
const $$url$b = undefined;

const $$module3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  $$metadata: $$metadata$b,
  default: $$ToCMenu,
  file: $$file$b,
  url: $$url$b
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$a = createMetadata("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/layout/Layout.astro", { modules: [{ module: $$module1$3, specifier: "./AppBar.astro", assert: {} }, { module: $$module2$1, specifier: "./NavMenu.astro", assert: {} }, { module: $$module3, specifier: "./ToCMenu.astro", assert: {} }, { module: $$module4, specifier: "../config/menu.json", assert: {} }, { module: $$module5, specifier: "../components/menu_utils", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [{ type: "inline", value: `
	
	function configure_nav(fixed_el,resize_el,nav_el,left_to_right){
		fixed_el.addEventListener("click",(e)=>{
			const current_state = nav_el.getAttribute("data-state")
			if(current_state == "open"){
				nav_el.setAttribute("data-state","closed")
				nav_el.style.width = "0vw"
			}else if(current_state == "closed"){
				nav_el.setAttribute("data-state","open")
				nav_el.style.width = nav_el.getAttribute("data-width")
			}
			e.preventDefault()
		})

		var global_resize_state = false
		var x_down
		var start_width
		
		function finish_mouse(){
			global_resize_state = false
			nav_el.style.transition = "width 0.5s"
		if(nav_el.clientWidth < 20){
			nav_el.setAttribute("data-state","closed")
			nav_el.setAttribute("data-width","20vw")
		}else{
			nav_el.setAttribute("data-state","open")
		}
		resize_el.style.backgroundColor = "#1E1E1E"
		}
		
		resize_el.addEventListener("mouseenter",(e)=>{
			resize_el.style.backgroundColor = "#007ACC"
		})
		resize_el.addEventListener("mouseleave",(e)=>{
			resize_el.style.backgroundColor = "#1E1E1E"
		})
		resize_el.addEventListener("mousedown",(e)=>{
			global_resize_state = true
			x_down = e.x
			start_width = nav_el.clientWidth
			nav_el.style.transition = "none"
		})
		resize_el.addEventListener("mouseup",(e)=>{
			finish_mouse()
		})
		document.addEventListener("mouseup",(e)=>{
			if(global_resize_state == true){
				finish_mouse()
			}
		})
		document.addEventListener("mousemove",(e)=>{
			if(global_resize_state == true){
				const new_width = left_to_right?(start_width + e.x - x_down):(start_width - e.x + x_down)
				if(new_width <= 60){//snap effect
					nav_el.style.width = "0px"
					nav_el.setAttribute("data-width","0px")
					resize_el.style.backgroundColor = "#007ACC"
				}else if(new_width < 160){
					//do nothing here
				}else if(new_width < (document.documentElement.clientWidth)*0.4){
					nav_el.style.width = new_width+"px"
					nav_el.setAttribute("data-width",new_width+"px")
					resize_el.style.backgroundColor = "#007ACC"
				}else{
					resize_el.style.backgroundColor = "red"
				}
				e.preventDefault()
			}
		})
	}
	
	const fixed_left = document.getElementById("fixed-left")
	if(fixed_left.classList.contains("active")){
		const resize_left = document.getElementById("resize-left")
		const nav = resize_left.previousElementSibling
		configure_nav(fixed_left,resize_left,nav,true)
	}
	const fixed_right = document.getElementById("fixed-right")
	if(fixed_right.classList.contains("active")){
		const resize_right = document.getElementById("resize-right")
		const nav = resize_right.nextElementSibling
		configure_nav(fixed_right,resize_right,nav,false)
	}

` }] });
const $$Astro$b = createAstro("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/layout/Layout.astro", "", "file:///D:/Dev/MicroWebStacks/astro_nav_menus/");
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$Layout;
  const { headings } = Astro2.props;
  const { title } = Astro2.props.frontmatter || Astro2.props;
  const left_nav_menu = process_menu_tree(Astro2.url, raw_menu);
  const right_toc_menu = process_toc_list(headings);
  const STYLES = [];
  for (const STYLE of STYLES)
    $$result.styles.add(STYLE);
  return renderTemplate`<html lang="en" class="astro-DO5WJOJM">
	<head>
		<meta charset="utf-8">
		<link rel="icon" type="image/svg+xml" href="/favicon.svg">
		<meta name="viewport" content="width=device-width">
		<meta name="generator"${addAttribute(Astro2.generator, "content")}>
		<title>${title}</title>
	${renderHead($$result)}</head>
	<body class="astro-DO5WJOJM">
		<div id="fixed-left"${addAttribute(`fixed-nav ${left_nav_menu.visible ? "active" : ""} astro-DO5WJOJM`, "class")}></div>
		<div class="appbar-nav_content-footer astro-DO5WJOJM">
			<header class="astro-DO5WJOJM">
				${renderComponent($$result, "AppBar", $$AppBar, { "class": "astro-DO5WJOJM" })}
			</header>
			<main class="astro-DO5WJOJM">
				${left_nav_menu.visible && renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "class": "astro-DO5WJOJM" }, { "default": () => renderTemplate`${renderComponent($$result, "NavMenu", $$NavMenu, { "items": left_nav_menu.items, "class": "astro-DO5WJOJM" })}<div id="resize-left" class="nav-resize active astro-DO5WJOJM"></div>` })}`}
	 			<article class="content astro-DO5WJOJM">
					${renderSlot($$result, $$slots["default"])}
				</article>
				${right_toc_menu.visible && renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "class": "astro-DO5WJOJM" }, { "default": () => renderTemplate`<div id="resize-right" class="nav-resize active astro-DO5WJOJM"></div>${renderComponent($$result, "ToCMenu", $$ToCMenu, { "items": right_toc_menu.items, "class": "astro-DO5WJOJM" })}` })}`}
			</main>
			<footer class="astro-DO5WJOJM">
				<p class="astro-DO5WJOJM">footer</p>
			</footer>
		</div>
		<div id="fixed-right"${addAttribute(`fixed-nav ${right_toc_menu.visible ? "active" : ""} astro-DO5WJOJM`, "class")}></div>
	

<style>
	.content * > a{
			color:#3794FF;
	}

</style>

${maybeRenderHead($$result)}
</body></html>`;
});

const $$file$a = "D:/Dev/MicroWebStacks/astro_nav_menus/src/layout/Layout.astro";
const $$url$a = undefined;

const $$module1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  $$metadata: $$metadata$a,
  default: $$Layout,
  file: $$file$a,
  url: $$url$a
}, Symbol.toStringTag, { value: 'Module' }));

const html$3 = "<h1 id=\"title-1\">Title 1</h1>\n<h2 id=\"smaller-title\">Smaller Title</h2>\n<p>Teext describing the paragraph content</p>\n<h2 id=\"another-small-title\">Another small title</h2>\n<p>1</p>\n<p>2</p>\n<p>3</p>\n<p>4</p>\n<p>5</p>\n<p>6</p>\n<p>7</p>\n<p>8</p>\n<p>9</p>\n<p>10</p>\n<h2 id=\"3rd-small-title\">3rd small title</h2>\n<p>1</p>\n<p>2</p>\n<p>3</p>\n<p>4</p>\n<p>5</p>\n<p>6</p>\n<p>7</p>\n<p>8</p>\n<p>9</p>\n<p>10</p>\n<p>11</p>\n<p>12</p>\n<p>13</p>\n<p>14</p>\n<p>15</p>\n<p>16</p>\n<h1 id=\"big-section-2\">Big section 2</h1>\n<h2 id=\"smaller-title-1\">Smaller Title</h2>\n<p>Teext describing the paragraph content</p>\n<h2 id=\"another-small-title-1\">Another small title</h2>\n<p>11</p>\n<p>12</p>\n<p>13</p>\n<p>14</p>\n<p>15</p>\n<p>16</p>\n<p>17</p>\n<p>18</p>\n<p>19</p>\n<p>110</p>\n<h2 id=\"3rd-small-title-1\">3rd small title</h2>\n<p>11</p>\n<p>12</p>\n<p>13</p>\n<p>14</p>\n<p>15</p>\n<p>16</p>\n<p>17</p>\n<p>18</p>\n<p>19</p>\n<p>110</p>\n<p>111</p>\n<p>112</p>\n<p>113</p>\n<p>114</p>\n<p>115</p>\n<p>116</p>\n<p>1</p>\n<p>1</p>\n<p>1</p>\n<p>1</p>\n<p>1</p>\n<p>1</p>\n<p>1</p>\n<p>1</p>\n<p>1</p>\n<p>1</p>\n<p>1</p>\n<p>last</p>";

				const frontmatter$4 = {"layout":"@/layout/Layout.astro","title":"Simple Markdown"};
				const file$4 = "D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/index.md";
				const url$4 = "";
				function rawContent$4() {
					return "# Title 1\r\n## Smaller Title\r\nTeext describing the paragraph content\r\n## Another small title\r\n\r\n1\r\n\r\n2\r\n\r\n3\r\n\r\n4\r\n\r\n5\r\n\r\n6\r\n\r\n7\r\n\r\n8\r\n\r\n9\r\n\r\n10\r\n## 3rd small title\r\n\r\n1\r\n\r\n2\r\n\r\n3\r\n\r\n4\r\n\r\n5\r\n\r\n6\r\n\r\n7\r\n\r\n8\r\n\r\n9\r\n\r\n10\r\n\r\n11\r\n\r\n12\r\n\r\n13\r\n\r\n14\r\n\r\n15\r\n\r\n16\r\n\r\n# Big section 2\r\n## Smaller Title\r\nTeext describing the paragraph content\r\n## Another small title\r\n\r\n11\r\n\r\n12\r\n\r\n13\r\n\r\n14\r\n\r\n15\r\n\r\n16\r\n\r\n17\r\n\r\n18\r\n\r\n19\r\n\r\n110\r\n## 3rd small title\r\n\r\n11\r\n\r\n12\r\n\r\n13\r\n\r\n14\r\n\r\n15\r\n\r\n16\r\n\r\n17\r\n\r\n18\r\n\r\n19\r\n\r\n110\r\n\r\n111\r\n\r\n112\r\n\r\n113\r\n\r\n114\r\n\r\n115\r\n\r\n116\r\n\r\n1\r\n\r\n1\r\n\r\n1\r\n\r\n1\r\n\r\n1\r\n\r\n1\r\n\r\n1\r\n\r\n1\r\n\r\n1\r\n\r\n1\r\n\r\n1\r\n\r\nlast\r\n";
				}
				function compiledContent$4() {
					return html$3;
				}
				function getHeadings$4() {
					return [{"depth":1,"slug":"title-1","text":"Title 1"},{"depth":2,"slug":"smaller-title","text":"Smaller Title"},{"depth":2,"slug":"another-small-title","text":"Another small title"},{"depth":2,"slug":"3rd-small-title","text":"3rd small title"},{"depth":1,"slug":"big-section-2","text":"Big section 2"},{"depth":2,"slug":"smaller-title-1","text":"Smaller Title"},{"depth":2,"slug":"another-small-title-1","text":"Another small title"},{"depth":2,"slug":"3rd-small-title-1","text":"3rd small title"}];
				}
				function getHeaders$3() {
					console.warn('getHeaders() have been deprecated. Use getHeadings() function instead.');
					return getHeadings$4();
				}				async function Content$4() {
					const { layout, ...content } = frontmatter$4;
					content.file = file$4;
					content.url = url$4;
					content.astro = {};
					Object.defineProperty(content.astro, 'headings', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."')
						}
					});
					Object.defineProperty(content.astro, 'html', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."')
						}
					});
					Object.defineProperty(content.astro, 'source', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."')
						}
					});
					const contentFragment = createVNode(Fragment, { 'set:html': html$3 });
					return createVNode($$Layout, {
									file: file$4,
									url: url$4,
									content,
									frontmatter: content,
									headings: getHeadings$4(),
									rawContent: rawContent$4,
									compiledContent: compiledContent$4,
									'server:root': true,
									children: contentFragment
								});
				}
				Content$4[Symbol.for('astro.needsHeadRendering')] = false;

const _page0 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  frontmatter: frontmatter$4,
  file: file$4,
  url: url$4,
  rawContent: rawContent$4,
  compiledContent: compiledContent$4,
  getHeadings: getHeadings$4,
  getHeaders: getHeaders$3,
  Content: Content$4,
  default: Content$4
}, Symbol.toStringTag, { value: 'Module' }));

createMetadata("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/svg/hamburger.astro", { modules: [], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$a = createAstro("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/svg/hamburger.astro", "", "file:///D:/Dev/MicroWebStacks/astro_nav_menus/");
const $$Hamburger = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$Hamburger;
  return renderTemplate`${maybeRenderHead($$result)}<svg viewBox="0 0 100 80" width="25" height="25" fill="#d0d0d0">
    <rect width="100" height="20" rx="10" ry="10"></rect>
    <rect y="30" width="100" height="20" rx="10" ry="10"></rect>
    <rect y="60" width="100" height="20" rx="10" ry="10"></rect>
</svg>`;
});

const MDXLayout = async function ({
  children
}) {
  const Layout = (await Promise.resolve().then(() => $$module1)).default;
  const {
    layout,
    ...content
  } = frontmatter$3;
  content.file = file$3;
  content.url = url$3;
  content.astro = {};
  Object.defineProperty(content.astro, "headings", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."');
    }

  });
  Object.defineProperty(content.astro, "html", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."');
    }

  });
  Object.defineProperty(content.astro, "source", {
    get() {
      throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."');
    }

  });
  return createVNode(Layout, {
    file: file$3,
    url: url$3,
    content,
    frontmatter: content,
    headings: getHeadings$3(),
    "server:root": true,
    children
  });
};
const frontmatter$3 = {
  "layout": "@/layout/Layout.astro",
  "title": "MDX with Components"
};
function getHeadings$3() {
  return [{
    "depth": 1,
    "slug": "title-1",
    "text": "Title 1"
  }];
}

function _createMdxContent(props) {
  const _components = Object.assign({
    h1: "h1",
    p: "p"
  }, props.components);

  return createVNode(Fragment, {
    children: [createVNode(_components.h1, {
      id: "title-1",
      children: "Title 1"
    }), "\n", createVNode(_components.p, {
      children: "This is an astro component"
    }), "\n", createVNode($$Hamburger, {})]
  });
}

function MDXContent(props = {}) {
  return createVNode(MDXLayout, { ...props,
    children: createVNode(_createMdxContent, { ...props
    })
  });
}

__astro_tag_component__(getHeadings$3, "astro:jsx");

__astro_tag_component__(MDXContent, "astro:jsx");
MDXContent[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter$3.layout);
const url$3 = "/components";
const file$3 = "D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/components.mdx";
function rawContent$3() { throw new Error("MDX does not support rawContent()! If you need to read the Markdown contents to calculate values (ex. reading time), we suggest injecting frontmatter via remark plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }function compiledContent$3() { throw new Error("MDX does not support compiledContent()! If you need to read the HTML contents to calculate values (ex. reading time), we suggest injecting frontmatter via rehype plugins. Learn more on our docs: https://docs.astro.build/en/guides/integrations-guide/mdx/#inject-frontmatter-via-remark-or-rehype-plugins") }const Content$3 = MDXContent;

const _page1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  frontmatter: frontmatter$3,
  getHeadings: getHeadings$3,
  default: MDXContent,
  url: url$3,
  file: file$3,
  rawContent: rawContent$3,
  compiledContent: compiledContent$3,
  Content: Content$3
}, Symbol.toStringTag, { value: 'Module' }));

const html$2 = "<h1 id=\"astro_nav_menus\">astro_nav_menus</h1>\n<p>Live demo : <a href=\"https://astro-nav-menus.deno.dev/\">https://astro-nav-menus.deno.dev/</a></p>\n<p>Astro Theme that can scale for big documentation websites. Includes a top appbar for sections navigation, left tree menu for section pages and right tree menu for a page table of content.</p>\n<p>Performance oriented, built with native astro components, no dependencies to any extenal framework, no virtual dom. Fully static with no client side rendering. Javascript is for minial manipulations connecting events and classes.</p>\n<h2 id=\"features\">Features</h2>\n<ul>\n<li>astro components (.astro) html css js</li>\n<li>article content immediatly searchable with native browser search, no lazy loading or custom content cache manipulations</li>\n<li>Left Menu pages Tree Navigation</li>\n<li>Right Menu Table of Content</li>\n<li>Menus consist of Trees with unlimited depth and recursively expandable sections</li>\n<li>Menus can be opened, closed and resized by the user</li>\n<li>Menus are built by astro and seen as readable html by the client</li>\n<li>markdown\n<ul>\n<li>Supports md and mdx</li>\n<li>Right Menu ToC for src/pages markdown</li>\n<li>Right Menu ToC for imported <code>import *</code> markdown</li>\n</ul>\n</li>\n<li>Top menu must have href from items</li>\n<li>Submenu should not have href href to keep pages / directories distinction</li>\n</ul>\n<h1 id=\"dev\">Dev</h1>\n<h2 id=\"creation\">Creation</h2>\n<pre is:raw=\"\" class=\"astro-code\" style=\"background-color: #0d1117; overflow-x: auto;\"><code><span class=\"line\"><span style=\"color: #c9d1d9\">pnpm create astro@latest</span></span></code></pre>\n<ul>\n<li>Name, Empty Project, No Typescript</li>\n<li>move to root git repo</li>\n<li>delete node_modules</li>\n</ul>\n<pre is:raw=\"\" class=\"astro-code\" style=\"background-color: #0d1117; overflow-x: auto;\"><code><span class=\"line\"><span style=\"color: #c9d1d9\">pnpm install</span></span>\n<span class=\"line\"><span style=\"color: #c9d1d9\">pnpm astro add deno</span></span></code></pre>\n<ul>\n<li>add deno and server config to <code>astro.config.mjs</code></li>\n<li>prepare <code>.github/workflows/deploy.yml</code></li>\n</ul>\n<h2 id=\"todos\">Todos</h2>\n<ul>\n<li>panzoom component</li>\n<li>gallery</li>\n<li>authentication\n<ul>\n<li>AppBar right float icons</li>\n<li>ssr mode signin with github</li>\n</ul>\n</li>\n<li>markdown\n<ul>\n<li>markdown embeds (puml and others)</li>\n<li>add href links icons to markdown headings id slugs</li>\n</ul>\n</li>\n<li>menus\n<ul>\n<li>Structure : generation of left nav menu from src/pages</li>\n<li>Structure : Update menu from getStaticPatsh() [slug] for a hierarchy of files</li>\n<li>pages types and icons</li>\n<li>open close on nav-resize click</li>\n<li>menu auto depth adjust</li>\n<li>current page depth always open</li>\n<li>all level items or nothing</li>\n<li>depth slider or depth selector</li>\n<li>store nav menu width / prevent reset on same page reload</li>\n<li>Menu height transition MUI example is working</li>\n</ul>\n</li>\n</ul>\n<h2 id=\"thoughts\">Thoughts</h2>\n<ul>\n<li>allow index pages but do not use them to keep consistent nav menu of folders/items</li>\n<li>adding interactive SVGs that can be styled with css is challenging\n<ul>\n<li><code>svg.astro</code> uses the innerHTML fragment which breaks visibility of <code>style</code> tag no longer scoping imported SVG</li>\n<li>import of <code>rightarrow.astro</code> still requires style to be either global or inline</li>\n<li>Tree menu collapse transition :\n<ul>\n<li>display block/none does not animate the height</li>\n<li>scaleY does not bring the height down to 0 due to remaining padding margin</li>\n<li>height can be animated but must be set initially</li>\n<li>max-height can be animated but must be set to max value which breaks the transition timing</li>\n<li>max-height adjusting with js requires high complexity depending on state of expanded children hierarchy</li>\n<li>clip also needs defined start stop</li>\n<li>flex can also animate but then the flex container height must be set explicitely</li>\n</ul>\n</li>\n</ul>\n</li>\n</ul>\n<h1 id=\"survey\">survey</h1>\n<p>Analysis of existing Themes for Astro, focus is on documentation</p>\n<h2 id=\"astro-docs\">astro docs</h2>\n<p><a href=\"https://github.com/withastro/astro/tree/main/examples/docs\">https://github.com/withastro/astro/tree/main/examples/docs</a></p>\n<p>Advantages :</p>\n<p>Official example, clean html structure, light and dark toggle, left side pages and right side Table Of Content.</p>\n<p>Limitations :</p>\n<ul>\n<li>react and preact dependencies, despite island architecture this can exclude potential use cases</li>\n<li>Left Menu\n<ul>\n<li>handcoded <code>SIDEBAR</code> in <code>config.ts</code></li>\n<li>first level is map and not list so relying on ordered map</li>\n<li>fixed 2 levels structure</li>\n</ul>\n</li>\n<li>ToC is dynamically parsing the DOM on client side, this reduces astro’s advantage of zero js and server side generation and rendering</li>\n<li>ToC does not take h1 and limited down to h4</li>\n</ul>\n<h2 id=\"hello-astro\">hello astro</h2>\n<p><a href=\"https://github.com/hellotham/hello-astro\">https://github.com/hellotham/hello-astro</a></p>\n<p>built upon astro-docs with differences :</p>\n<ul>\n<li>\n<p>advantage : right side ToC is not DOM client side like astro-docs but built with native astro component taking the <code>headings</code> Markdown Layout Prop <a href=\"https://docs.astro.build/en/guides/markdown-content/#markdown-layout-props\">https://docs.astro.build/en/guides/markdown-content/#markdown-layout-props</a></p>\n</li>\n<li>\n<p>limitation: all svg integrations are either hardcoded or wrapped in images through svgimg</p>\n</li>\n</ul>\n<h1 id=\"license\">License</h1>\n<ul>\n<li>MIT</li>\n</ul>\n<h2 id=\"icons\">icons</h2>\n<p>Apache License</p>\n<ul>\n<li><a href=\"https://www.svgrepo.com/svg/19947/folders\">https://www.svgrepo.com/svg/19947/folders</a></li>\n<li><a href=\"https://www.svgrepo.com/svg/400563/openfilefolder\">https://www.svgrepo.com/svg/400563/openfilefolder</a></li>\n</ul>";

				const frontmatter$2 = {};
				const file$2 = "D:/Dev/MicroWebStacks/astro_nav_menus/readme.md";
				const url$2 = undefined;
				function rawContent$2() {
					return "# astro_nav_menus\n\nLive demo : https://astro-nav-menus.deno.dev/\n\nAstro Theme that can scale for big documentation websites. Includes a top appbar for sections navigation, left tree menu for section pages and right tree menu for a page table of content.\n\nPerformance oriented, built with native astro components, no dependencies to any extenal framework, no virtual dom. Fully static with no client side rendering. Javascript is for minial manipulations connecting events and classes.\n## Features\n- astro components (.astro) html css js\n- article content immediatly searchable with native browser search, no lazy loading or custom content cache manipulations\n- Left Menu pages Tree Navigation\n- Right Menu Table of Content\n- Menus consist of Trees with unlimited depth and recursively expandable sections\n- Menus can be opened, closed and resized by the user\n- Menus are built by astro and seen as readable html by the client\n- markdown \n  - Supports md and mdx\n  - Right Menu ToC for src/pages markdown\n  - Right Menu ToC for imported `import *` markdown\n- Top menu must have href from items\n- Submenu should not have href href to keep pages / directories distinction\n\n\n# Dev\n## Creation\n```\npnpm create astro@latest\n```\n - Name, Empty Project, No Typescript\n - move to root git repo\n - delete node_modules\n```\npnpm install\npnpm astro add deno\n```\n - add deno and server config to `astro.config.mjs`\n - prepare `.github/workflows/deploy.yml`\n\n## Todos\n- panzoom component\n- gallery\n- authentication\n  - AppBar right float icons\n  - ssr mode signin with github\n- markdown\n  - markdown embeds (puml and others)\n  - add href links icons to markdown headings id slugs\n- menus\n  - Structure : generation of left nav menu from src/pages\n  - Structure : Update menu from getStaticPatsh() [slug] for a hierarchy of files\n  - pages types and icons\n  - open close on nav-resize click\n  - menu auto depth adjust \n  - current page depth always open\n  - all level items or nothing\n  - depth slider or depth selector\n  - store nav menu width / prevent reset on same page reload\n  - Menu height transition MUI example is working\n\n## Thoughts\n- allow index pages but do not use them to keep consistent nav menu of folders/items\n- adding interactive SVGs that can be styled with css is challenging\n  - `svg.astro` uses the innerHTML fragment which breaks visibility of `style` tag no longer scoping imported SVG\n  - import of `rightarrow.astro` still requires style to be either global or inline\n  - Tree menu collapse transition :\n    - display block/none does not animate the height\n    - scaleY does not bring the height down to 0 due to remaining padding margin\n    - height can be animated but must be set initially\n    - max-height can be animated but must be set to max value which breaks the transition timing\n    - max-height adjusting with js requires high complexity depending on state of expanded children hierarchy\n    - clip also needs defined start stop\n    - flex can also animate but then the flex container height must be set explicitely\n# survey\nAnalysis of existing Themes for Astro, focus is on documentation\n## astro docs\nhttps://github.com/withastro/astro/tree/main/examples/docs\n\nAdvantages :\n\nOfficial example, clean html structure, light and dark toggle, left side pages and right side Table Of Content.\n\nLimitations :\n - react and preact dependencies, despite island architecture this can exclude potential use cases\n - Left Menu\n   - handcoded `SIDEBAR` in `config.ts`\n   - first level is map and not list so relying on ordered map\n   - fixed 2 levels structure\n - ToC is dynamically parsing the DOM on client side, this reduces astro's advantage of zero js and server side generation and rendering\n - ToC does not take h1 and limited down to h4\n\n## hello astro\n\nhttps://github.com/hellotham/hello-astro\n\nbuilt upon astro-docs with differences :\n \n - advantage : right side ToC is not DOM client side like astro-docs but built with native astro component taking the `headings` Markdown Layout Prop https://docs.astro.build/en/guides/markdown-content/#markdown-layout-props\n\n - limitation: all svg integrations are either hardcoded or wrapped in images through svgimg\n\n# License\n- MIT\n## icons\nApache License\n- https://www.svgrepo.com/svg/19947/folders\n- https://www.svgrepo.com/svg/400563/openfilefolder\n\n";
				}
				function compiledContent$2() {
					return html$2;
				}
				function getHeadings$2() {
					return [{"depth":1,"slug":"astro_nav_menus","text":"astro_nav_menus"},{"depth":2,"slug":"features","text":"Features"},{"depth":1,"slug":"dev","text":"Dev"},{"depth":2,"slug":"creation","text":"Creation"},{"depth":2,"slug":"todos","text":"Todos"},{"depth":2,"slug":"thoughts","text":"Thoughts"},{"depth":1,"slug":"survey","text":"survey"},{"depth":2,"slug":"astro-docs","text":"astro docs"},{"depth":2,"slug":"hello-astro","text":"hello astro"},{"depth":1,"slug":"license","text":"License"},{"depth":2,"slug":"icons","text":"icons"}];
				}
				function getHeaders$2() {
					console.warn('getHeaders() have been deprecated. Use getHeadings() function instead.');
					return getHeadings$2();
				}				async function Content$2() {
					const { layout, ...content } = frontmatter$2;
					content.file = file$2;
					content.url = url$2;
					content.astro = {};
					Object.defineProperty(content.astro, 'headings', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."')
						}
					});
					Object.defineProperty(content.astro, 'html', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."')
						}
					});
					Object.defineProperty(content.astro, 'source', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."')
						}
					});
					const contentFragment = createVNode(Fragment, { 'set:html': html$2 });
					return contentFragment;
				}
				Content$2[Symbol.for('astro.needsHeadRendering')] = true;

const $$module2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  frontmatter: frontmatter$2,
  file: file$2,
  url: url$2,
  rawContent: rawContent$2,
  compiledContent: compiledContent$2,
  getHeadings: getHeadings$2,
  getHeaders: getHeaders$2,
  Content: Content$2,
  default: Content$2
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$9 = createMetadata("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/readme.astro", { modules: [{ module: $$module1, specifier: "@/layout/Layout.astro", assert: {} }, { module: $$module2, specifier: "../../readme.md", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$9 = createAstro("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/readme.astro", "", "file:///D:/Dev/MicroWebStacks/astro_nav_menus/");
const $$Readme = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$Readme;
  return renderTemplate`<!-- how to get headings and pass them as props -->${renderComponent($$result, "Layout", $$Layout, { "title": "Readme", "headings": getHeadings$2() }, { "default": () => renderTemplate`${renderComponent($$result, "Readme.Content", Content$2, {})}` })}`;
});

const $$file$9 = "D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/readme.astro";
const $$url$9 = "/readme";

const _page2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  $$metadata: $$metadata$9,
  default: $$Readme,
  file: $$file$9,
  url: $$url$9
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$8 = createMetadata("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/about/index.astro", { modules: [{ module: $$module1, specifier: "@/layout/Layout.astro", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$8 = createAstro("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/about/index.astro", "", "file:///D:/Dev/MicroWebStacks/astro_nav_menus/");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$Index;
  const title = "About";
  console.log("Hello About");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title }, { "default": () => renderTemplate`${maybeRenderHead($$result)}<h1>About</h1><a>This is 'About' page</a>` })}`;
});

const $$file$8 = "D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/about/index.astro";
const $$url$8 = "/about";

const _page3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  $$metadata: $$metadata$8,
  default: $$Index,
  file: $$file$8,
  url: $$url$8
}, Symbol.toStringTag, { value: 'Module' }));

const html$1 = "<h1 id=\"title-1\">Title 1</h1>\n<h2 id=\"smaller-title\">Smaller Title</h2>\n<p>Teext describing the paragraph content</p>\n<h2 id=\"another-small-title\">Another small title</h2>\n<p>1</p>\n<p>2</p>\n<p>3</p>\n<p>4</p>\n<p>5</p>\n<h3 id=\"deeper-content\">Deeper Content</h3>\n<p>1</p>\n<p>2</p>\n<p>3</p>\n<p>4</p>\n<p>5</p>\n<h2 id=\"back-to-small-title\">Back to small title</h2>\n<p>6</p>\n<p>7</p>\n<p>8</p>\n<p>9</p>\n<p>10</p>\n<h2 id=\"3rd-small-title\">3rd small title</h2>\n<p>1</p>\n<p>2</p>\n<p>3</p>\n<p>4</p>\n<p>5</p>\n<p>6</p>\n<p>7</p>\n<p>8</p>\n<p>9</p>\n<p>10</p>\n<p>11</p>\n<p>12</p>\n<p>13</p>\n<p>14</p>\n<p>15</p>\n<p>16</p>\n<h1 id=\"big-section-2\">Big section 2</h1>\n<h2 id=\"smaller-title-1\">Smaller Title</h2>\n<p>Teext describing the paragraph content</p>\n<h2 id=\"another-small-title-1\">Another small title</h2>\n<p>11</p>\n<p>12</p>\n<p>13</p>\n<p>14</p>\n<p>15</p>\n<p>16</p>\n<p>17</p>\n<p>18</p>\n<p>19</p>\n<p>110</p>\n<h2 id=\"3rd-small-title-1\">3rd small title</h2>\n<p>11</p>\n<p>12</p>\n<p>13</p>\n<p>14</p>\n<p>15</p>\n<p>16</p>\n<p>17</p>\n<p>18</p>\n<p>19</p>\n<p>110</p>\n<p>111</p>\n<p>112</p>\n<p>113</p>\n<p>114</p>\n<p>115</p>\n<p>116</p>\n<p>1</p>\n<p>1</p>\n<p>1</p>\n<p>1</p>\n<p>1</p>\n<p>1</p>\n<p>1</p>\n<p>1</p>\n<p>1</p>\n<p>1</p>\n<p>1</p>\n<p>last</p>";

				const frontmatter$1 = {"layout":"@/layout/Layout.astro","title":"Simple Markdown"};
				const file$1 = "D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/astro/deep_toc.md";
				const url$1 = "/astro/deep_toc";
				function rawContent$1() {
					return "# Title 1\r\n## Smaller Title\r\nTeext describing the paragraph content\r\n## Another small title\r\n\r\n1\r\n\r\n2\r\n\r\n3\r\n\r\n4\r\n\r\n5\r\n\r\n### Deeper Content\r\n1\r\n\r\n2\r\n\r\n3\r\n\r\n4\r\n\r\n5\r\n\r\n## Back to small title\r\n\r\n6\r\n\r\n7\r\n\r\n8\r\n\r\n9\r\n\r\n10\r\n## 3rd small title\r\n\r\n1\r\n\r\n2\r\n\r\n3\r\n\r\n4\r\n\r\n5\r\n\r\n6\r\n\r\n7\r\n\r\n8\r\n\r\n9\r\n\r\n10\r\n\r\n11\r\n\r\n12\r\n\r\n13\r\n\r\n14\r\n\r\n15\r\n\r\n16\r\n\r\n# Big section 2\r\n## Smaller Title\r\nTeext describing the paragraph content\r\n## Another small title\r\n\r\n11\r\n\r\n12\r\n\r\n13\r\n\r\n14\r\n\r\n15\r\n\r\n16\r\n\r\n17\r\n\r\n18\r\n\r\n19\r\n\r\n110\r\n## 3rd small title\r\n\r\n11\r\n\r\n12\r\n\r\n13\r\n\r\n14\r\n\r\n15\r\n\r\n16\r\n\r\n17\r\n\r\n18\r\n\r\n19\r\n\r\n110\r\n\r\n111\r\n\r\n112\r\n\r\n113\r\n\r\n114\r\n\r\n115\r\n\r\n116\r\n\r\n1\r\n\r\n1\r\n\r\n1\r\n\r\n1\r\n\r\n1\r\n\r\n1\r\n\r\n1\r\n\r\n1\r\n\r\n1\r\n\r\n1\r\n\r\n1\r\n\r\nlast\r\n";
				}
				function compiledContent$1() {
					return html$1;
				}
				function getHeadings$1() {
					return [{"depth":1,"slug":"title-1","text":"Title 1"},{"depth":2,"slug":"smaller-title","text":"Smaller Title"},{"depth":2,"slug":"another-small-title","text":"Another small title"},{"depth":3,"slug":"deeper-content","text":"Deeper Content"},{"depth":2,"slug":"back-to-small-title","text":"Back to small title"},{"depth":2,"slug":"3rd-small-title","text":"3rd small title"},{"depth":1,"slug":"big-section-2","text":"Big section 2"},{"depth":2,"slug":"smaller-title-1","text":"Smaller Title"},{"depth":2,"slug":"another-small-title-1","text":"Another small title"},{"depth":2,"slug":"3rd-small-title-1","text":"3rd small title"}];
				}
				function getHeaders$1() {
					console.warn('getHeaders() have been deprecated. Use getHeadings() function instead.');
					return getHeadings$1();
				}				async function Content$1() {
					const { layout, ...content } = frontmatter$1;
					content.file = file$1;
					content.url = url$1;
					content.astro = {};
					Object.defineProperty(content.astro, 'headings', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."')
						}
					});
					Object.defineProperty(content.astro, 'html', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."')
						}
					});
					Object.defineProperty(content.astro, 'source', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."')
						}
					});
					const contentFragment = createVNode(Fragment, { 'set:html': html$1 });
					return createVNode($$Layout, {
									file: file$1,
									url: url$1,
									content,
									frontmatter: content,
									headings: getHeadings$1(),
									rawContent: rawContent$1,
									compiledContent: compiledContent$1,
									'server:root': true,
									children: contentFragment
								});
				}
				Content$1[Symbol.for('astro.needsHeadRendering')] = false;

const _page4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  frontmatter: frontmatter$1,
  file: file$1,
  url: url$1,
  rawContent: rawContent$1,
  compiledContent: compiledContent$1,
  getHeadings: getHeadings$1,
  getHeaders: getHeaders$1,
  Content: Content$1,
  default: Content$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$7 = createMetadata("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/astro/domain1/subpage1.astro", { modules: [{ module: $$module1, specifier: "@/layout/Layout.astro", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$7 = createAstro("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/astro/domain1/subpage1.astro", "", "file:///D:/Dev/MicroWebStacks/astro_nav_menus/");
const $$Subpage1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$Subpage1;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Sub Page 1" }, { "default": () => renderTemplate`${maybeRenderHead($$result)}<p>I'm in sub page 1</p>` })}`;
});

const $$file$7 = "D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/astro/domain1/subpage1.astro";
const $$url$7 = "/astro/domain1/subpage1";

const _page5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  $$metadata: $$metadata$7,
  default: $$Subpage1,
  file: $$file$7,
  url: $$url$7
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$6 = createMetadata("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/astro/domain1/subpage2.astro", { modules: [{ module: $$module1, specifier: "@/layout/Layout.astro", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$6 = createAstro("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/astro/domain1/subpage2.astro", "", "file:///D:/Dev/MicroWebStacks/astro_nav_menus/");
const $$Subpage2 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Subpage2;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Sub Page 2" }, { "default": () => renderTemplate`${maybeRenderHead($$result)}<p>I'm in sub page 2</p>` })}`;
});

const $$file$6 = "D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/astro/domain1/subpage2.astro";
const $$url$6 = "/astro/domain1/subpage2";

const _page6 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  $$metadata: $$metadata$6,
  default: $$Subpage2,
  file: $$file$6,
  url: $$url$6
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$5 = createMetadata("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/astro/domain2/subdomain2/spage5.astro", { modules: [{ module: $$module1, specifier: "@/layout/Layout.astro", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$5 = createAstro("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/astro/domain2/subdomain2/spage5.astro", "", "file:///D:/Dev/MicroWebStacks/astro_nav_menus/");
const $$Spage5 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Spage5;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "S Page 5" }, { "default": () => renderTemplate`${maybeRenderHead($$result)}<p>I'm in s page 5</p>` })}`;
});

const $$file$5 = "D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/astro/domain2/subdomain2/spage5.astro";
const $$url$5 = "/astro/domain2/subdomain2/spage5";

const _page7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  $$metadata: $$metadata$5,
  default: $$Spage5,
  file: $$file$5,
  url: $$url$5
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$4 = createMetadata("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/astro/domain2/subpage4.astro", { modules: [{ module: $$module1, specifier: "@/layout/Layout.astro", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$4 = createAstro("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/astro/domain2/subpage4.astro", "", "file:///D:/Dev/MicroWebStacks/astro_nav_menus/");
const $$Subpage4 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Subpage4;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Sub Page 4" }, { "default": () => renderTemplate`${maybeRenderHead($$result)}<p>I'm in sub page 4</p>` })}`;
});

const $$file$4 = "D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/astro/domain2/subpage4.astro";
const $$url$4 = "/astro/domain2/subpage4";

const _page8 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  $$metadata: $$metadata$4,
  default: $$Subpage4,
  file: $$file$4,
  url: $$url$4
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$3 = createMetadata("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/astro/page1.astro", { modules: [{ module: $$module1, specifier: "@/layout/Layout.astro", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$3 = createAstro("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/astro/page1.astro", "", "file:///D:/Dev/MicroWebStacks/astro_nav_menus/");
const $$Page1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Page1;
  const title = "Astro Nav Menus";
  console.log("Hello from Server");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title }, { "default": () => renderTemplate`${maybeRenderHead($$result)}<h1>Demo Home</h1><p>index page</p>${new Array(100).fill(0).map((id, index) => renderTemplate`<div>${index}</div>`)}` })}`;
});

const $$file$3 = "D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/astro/page1.astro";
const $$url$3 = "/astro/page1";

const _page9 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  $$metadata: $$metadata$3,
  default: $$Page1,
  file: $$file$3,
  url: $$url$3
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$2 = createMetadata("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/astro/page2.astro", { modules: [{ module: $$module1, specifier: "@/layout/Layout.astro", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$2 = createAstro("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/astro/page2.astro", "", "file:///D:/Dev/MicroWebStacks/astro_nav_menus/");
const $$Page2 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Page2;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Page 2" }, { "default": () => renderTemplate`${maybeRenderHead($$result)}<p>I'm in page 2</p>` })}`;
});

const $$file$2 = "D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/astro/page2.astro";
const $$url$2 = "/astro/page2";

const _page10 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  $$metadata: $$metadata$2,
  default: $$Page2,
  file: $$file$2,
  url: $$url$2
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$1 = createMetadata("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/astro/page3.astro", { modules: [{ module: $$module1, specifier: "@/layout/Layout.astro", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$1 = createAstro("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/astro/page3.astro", "", "file:///D:/Dev/MicroWebStacks/astro_nav_menus/");
const $$Page3 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Page3;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Page 3" }, { "default": () => renderTemplate`${maybeRenderHead($$result)}<p>I'm in page 3</p>` })}`;
});

const $$file$1 = "D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/astro/page3.astro";
const $$url$1 = "/astro/page3";

const _page11 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  $$metadata: $$metadata$1,
  default: $$Page3,
  file: $$file$1,
  url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const _page12 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata = createMetadata("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/blog/[...page].astro", { modules: [{ module: $$module1, specifier: "@/layout/Layout.astro", assert: {} }, { module: $$module2$2, specifier: "fs", assert: {} }, { module: $$module3$1, specifier: "path", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro = createAstro("/@fs/D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/blog/[...page].astro", "", "file:///D:/Dev/MicroWebStacks/astro_nav_menus/");
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const { page } = Astro2.params;
  const page_path = resolve(process.cwd() + "/data/blog/" + page);
  console.log(page_path);
  if (!existsSync(page_path)) {
    console.log(`${page} does not exist`);
    return Astro2.redirect("/");
  }
  const posts = await Astro2.glob(
    /* #__PURE__ */ Object.assign({"../../../data/blog/file1.md": () => import('./chunks/file1.6231a67e.mjs'),"../../../data/blog/file2.md": () => import('./chunks/file2.babd7310.mjs')}),
    () => "../../../data/blog/**/*.{md,mdx}"
  );
  const Post = posts.find((post) => resolve(post.file) == page_path);
  if (typeof Post == "undefined") {
    console.log(`${page} could not be parsed by Astro.glob`);
    return Astro2.redirect("/");
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": Post.frontmatter.title, "headings": Post.getHeadings() }, { "default": () => renderTemplate`${renderComponent($$result, "Post.Content", Post.Content, {})}` })}`;
});

const $$file = "D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/blog/[...page].astro";
const $$url = "/blog/[...page]";

const _page13 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  $$metadata,
  default: $$,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const html = "<h1 id=\"title-1\">Title 1</h1>\n<p>here is a code section</p>\n<pre is:raw=\"\" class=\"astro-code\" style=\"background-color: #0d1117; overflow-x: auto;\"><code><span class=\"line\"><span style=\"color: #FF7B72\">for</span><span style=\"color: #C9D1D9\"> key,val </span><span style=\"color: #FF7B72\">in</span><span style=\"color: #C9D1D9\"> members.item():</span></span>\n<span class=\"line\"><span style=\"color: #C9D1D9\">    </span><span style=\"color: #79C0FF\">print</span><span style=\"color: #C9D1D9\">(</span><span style=\"color: #FF7B72\">f</span><span style=\"color: #A5D6FF\">\"</span><span style=\"color: #79C0FF\">{</span><span style=\"color: #C9D1D9\">key</span><span style=\"color: #79C0FF\">}</span><span style=\"color: #A5D6FF\"> has </span><span style=\"color: #79C0FF\">{</span><span style=\"color: #C9D1D9\">val.info</span><span style=\"color: #79C0FF\">}</span><span style=\"color: #A5D6FF\">\"</span><span style=\"color: #C9D1D9\">)</span></span></code></pre>\n<p>more explanation after the code</p>";

				const frontmatter = {"layout":"@/layout/Layout.astro","title":"Code Highlight"};
				const file = "D:/Dev/MicroWebStacks/astro_nav_menus/src/pages/code.md";
				const url = "/code";
				function rawContent() {
					return "# Title 1\r\nhere is a code section\r\n```python\r\nfor key,val in members.item():\r\n    print(f\"{key} has {val.info}\")\r\n```\r\nmore explanation after the code\r\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":1,"slug":"title-1","text":"Title 1"}];
				}
				function getHeaders() {
					console.warn('getHeaders() have been deprecated. Use getHeadings() function instead.');
					return getHeadings();
				}				async function Content() {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;
					content.astro = {};
					Object.defineProperty(content.astro, 'headings', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."')
						}
					});
					Object.defineProperty(content.astro, 'html', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."')
						}
					});
					Object.defineProperty(content.astro, 'source', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."')
						}
					});
					const contentFragment = createVNode(Fragment, { 'set:html': html });
					return createVNode($$Layout, {
									file,
									url,
									content,
									frontmatter: content,
									headings: getHeadings(),
									rawContent,
									compiledContent,
									'server:root': true,
									children: contentFragment
								});
				}
				Content[Symbol.for('astro.needsHeadRendering')] = false;

const _page14 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  frontmatter,
  file,
  url,
  rawContent,
  compiledContent,
  getHeadings,
  getHeaders,
  Content,
  default: Content
}, Symbol.toStringTag, { value: 'Module' }));

const pageMap = new Map([['src/pages/index.md', _page0],['src/pages/components.mdx', _page1],['src/pages/readme.astro', _page2],['src/pages/about/index.astro', _page3],['src/pages/astro/deep_toc.md', _page4],['src/pages/astro/domain1/subpage1.astro', _page5],['src/pages/astro/domain1/subpage2.astro', _page6],['src/pages/astro/domain2/subdomain2/spage5.astro', _page7],['src/pages/astro/domain2/subpage4.astro', _page8],['src/pages/astro/page1.astro', _page9],['src/pages/astro/page2.astro', _page10],['src/pages/astro/page3.astro', _page11],['src/pages/blog/test.js', _page12],['src/pages/blog/[...page].astro', _page13],['src/pages/code.md', _page14],]);
const renderers = [Object.assign({"name":"astro:jsx","serverEntrypoint":"astro/jsx/server.js","jsxImportSource":"astro"}, { ssr: server_default }),];

/**
 * @param typeMap [Object] Map of MIME type -> Array[extensions]
 * @param ...
 */
function Mime$1() {
  this._types = Object.create(null);
  this._extensions = Object.create(null);

  for (let i = 0; i < arguments.length; i++) {
    this.define(arguments[i]);
  }

  this.define = this.define.bind(this);
  this.getType = this.getType.bind(this);
  this.getExtension = this.getExtension.bind(this);
}

/**
 * Define mimetype -> extension mappings.  Each key is a mime-type that maps
 * to an array of extensions associated with the type.  The first extension is
 * used as the default extension for the type.
 *
 * e.g. mime.define({'audio/ogg', ['oga', 'ogg', 'spx']});
 *
 * If a type declares an extension that has already been defined, an error will
 * be thrown.  To suppress this error and force the extension to be associated
 * with the new type, pass `force`=true.  Alternatively, you may prefix the
 * extension with "*" to map the type to extension, without mapping the
 * extension to the type.
 *
 * e.g. mime.define({'audio/wav', ['wav']}, {'audio/x-wav', ['*wav']});
 *
 *
 * @param map (Object) type definitions
 * @param force (Boolean) if true, force overriding of existing definitions
 */
Mime$1.prototype.define = function(typeMap, force) {
  for (let type in typeMap) {
    let extensions = typeMap[type].map(function(t) {
      return t.toLowerCase();
    });
    type = type.toLowerCase();

    for (let i = 0; i < extensions.length; i++) {
      const ext = extensions[i];

      // '*' prefix = not the preferred type for this extension.  So fixup the
      // extension, and skip it.
      if (ext[0] === '*') {
        continue;
      }

      if (!force && (ext in this._types)) {
        throw new Error(
          'Attempt to change mapping for "' + ext +
          '" extension from "' + this._types[ext] + '" to "' + type +
          '". Pass `force=true` to allow this, otherwise remove "' + ext +
          '" from the list of extensions for "' + type + '".'
        );
      }

      this._types[ext] = type;
    }

    // Use first extension as default
    if (force || !this._extensions[type]) {
      const ext = extensions[0];
      this._extensions[type] = (ext[0] !== '*') ? ext : ext.substr(1);
    }
  }
};

/**
 * Lookup a mime type based on extension
 */
Mime$1.prototype.getType = function(path) {
  path = String(path);
  let last = path.replace(/^.*[/\\]/, '').toLowerCase();
  let ext = last.replace(/^.*\./, '').toLowerCase();

  let hasPath = last.length < path.length;
  let hasDot = ext.length < last.length - 1;

  return (hasDot || !hasPath) && this._types[ext] || null;
};

/**
 * Return file extension associated with a mime type
 */
Mime$1.prototype.getExtension = function(type) {
  type = /^\s*([^;\s]*)/.test(type) && RegExp.$1;
  return type && this._extensions[type.toLowerCase()] || null;
};

var Mime_1 = Mime$1;

var standard = {"application/andrew-inset":["ez"],"application/applixware":["aw"],"application/atom+xml":["atom"],"application/atomcat+xml":["atomcat"],"application/atomdeleted+xml":["atomdeleted"],"application/atomsvc+xml":["atomsvc"],"application/atsc-dwd+xml":["dwd"],"application/atsc-held+xml":["held"],"application/atsc-rsat+xml":["rsat"],"application/bdoc":["bdoc"],"application/calendar+xml":["xcs"],"application/ccxml+xml":["ccxml"],"application/cdfx+xml":["cdfx"],"application/cdmi-capability":["cdmia"],"application/cdmi-container":["cdmic"],"application/cdmi-domain":["cdmid"],"application/cdmi-object":["cdmio"],"application/cdmi-queue":["cdmiq"],"application/cu-seeme":["cu"],"application/dash+xml":["mpd"],"application/davmount+xml":["davmount"],"application/docbook+xml":["dbk"],"application/dssc+der":["dssc"],"application/dssc+xml":["xdssc"],"application/ecmascript":["es","ecma"],"application/emma+xml":["emma"],"application/emotionml+xml":["emotionml"],"application/epub+zip":["epub"],"application/exi":["exi"],"application/express":["exp"],"application/fdt+xml":["fdt"],"application/font-tdpfr":["pfr"],"application/geo+json":["geojson"],"application/gml+xml":["gml"],"application/gpx+xml":["gpx"],"application/gxf":["gxf"],"application/gzip":["gz"],"application/hjson":["hjson"],"application/hyperstudio":["stk"],"application/inkml+xml":["ink","inkml"],"application/ipfix":["ipfix"],"application/its+xml":["its"],"application/java-archive":["jar","war","ear"],"application/java-serialized-object":["ser"],"application/java-vm":["class"],"application/javascript":["js","mjs"],"application/json":["json","map"],"application/json5":["json5"],"application/jsonml+json":["jsonml"],"application/ld+json":["jsonld"],"application/lgr+xml":["lgr"],"application/lost+xml":["lostxml"],"application/mac-binhex40":["hqx"],"application/mac-compactpro":["cpt"],"application/mads+xml":["mads"],"application/manifest+json":["webmanifest"],"application/marc":["mrc"],"application/marcxml+xml":["mrcx"],"application/mathematica":["ma","nb","mb"],"application/mathml+xml":["mathml"],"application/mbox":["mbox"],"application/mediaservercontrol+xml":["mscml"],"application/metalink+xml":["metalink"],"application/metalink4+xml":["meta4"],"application/mets+xml":["mets"],"application/mmt-aei+xml":["maei"],"application/mmt-usd+xml":["musd"],"application/mods+xml":["mods"],"application/mp21":["m21","mp21"],"application/mp4":["mp4s","m4p"],"application/msword":["doc","dot"],"application/mxf":["mxf"],"application/n-quads":["nq"],"application/n-triples":["nt"],"application/node":["cjs"],"application/octet-stream":["bin","dms","lrf","mar","so","dist","distz","pkg","bpk","dump","elc","deploy","exe","dll","deb","dmg","iso","img","msi","msp","msm","buffer"],"application/oda":["oda"],"application/oebps-package+xml":["opf"],"application/ogg":["ogx"],"application/omdoc+xml":["omdoc"],"application/onenote":["onetoc","onetoc2","onetmp","onepkg"],"application/oxps":["oxps"],"application/p2p-overlay+xml":["relo"],"application/patch-ops-error+xml":["xer"],"application/pdf":["pdf"],"application/pgp-encrypted":["pgp"],"application/pgp-signature":["asc","sig"],"application/pics-rules":["prf"],"application/pkcs10":["p10"],"application/pkcs7-mime":["p7m","p7c"],"application/pkcs7-signature":["p7s"],"application/pkcs8":["p8"],"application/pkix-attr-cert":["ac"],"application/pkix-cert":["cer"],"application/pkix-crl":["crl"],"application/pkix-pkipath":["pkipath"],"application/pkixcmp":["pki"],"application/pls+xml":["pls"],"application/postscript":["ai","eps","ps"],"application/provenance+xml":["provx"],"application/pskc+xml":["pskcxml"],"application/raml+yaml":["raml"],"application/rdf+xml":["rdf","owl"],"application/reginfo+xml":["rif"],"application/relax-ng-compact-syntax":["rnc"],"application/resource-lists+xml":["rl"],"application/resource-lists-diff+xml":["rld"],"application/rls-services+xml":["rs"],"application/route-apd+xml":["rapd"],"application/route-s-tsid+xml":["sls"],"application/route-usd+xml":["rusd"],"application/rpki-ghostbusters":["gbr"],"application/rpki-manifest":["mft"],"application/rpki-roa":["roa"],"application/rsd+xml":["rsd"],"application/rss+xml":["rss"],"application/rtf":["rtf"],"application/sbml+xml":["sbml"],"application/scvp-cv-request":["scq"],"application/scvp-cv-response":["scs"],"application/scvp-vp-request":["spq"],"application/scvp-vp-response":["spp"],"application/sdp":["sdp"],"application/senml+xml":["senmlx"],"application/sensml+xml":["sensmlx"],"application/set-payment-initiation":["setpay"],"application/set-registration-initiation":["setreg"],"application/shf+xml":["shf"],"application/sieve":["siv","sieve"],"application/smil+xml":["smi","smil"],"application/sparql-query":["rq"],"application/sparql-results+xml":["srx"],"application/srgs":["gram"],"application/srgs+xml":["grxml"],"application/sru+xml":["sru"],"application/ssdl+xml":["ssdl"],"application/ssml+xml":["ssml"],"application/swid+xml":["swidtag"],"application/tei+xml":["tei","teicorpus"],"application/thraud+xml":["tfi"],"application/timestamped-data":["tsd"],"application/toml":["toml"],"application/trig":["trig"],"application/ttml+xml":["ttml"],"application/ubjson":["ubj"],"application/urc-ressheet+xml":["rsheet"],"application/urc-targetdesc+xml":["td"],"application/voicexml+xml":["vxml"],"application/wasm":["wasm"],"application/widget":["wgt"],"application/winhlp":["hlp"],"application/wsdl+xml":["wsdl"],"application/wspolicy+xml":["wspolicy"],"application/xaml+xml":["xaml"],"application/xcap-att+xml":["xav"],"application/xcap-caps+xml":["xca"],"application/xcap-diff+xml":["xdf"],"application/xcap-el+xml":["xel"],"application/xcap-ns+xml":["xns"],"application/xenc+xml":["xenc"],"application/xhtml+xml":["xhtml","xht"],"application/xliff+xml":["xlf"],"application/xml":["xml","xsl","xsd","rng"],"application/xml-dtd":["dtd"],"application/xop+xml":["xop"],"application/xproc+xml":["xpl"],"application/xslt+xml":["*xsl","xslt"],"application/xspf+xml":["xspf"],"application/xv+xml":["mxml","xhvml","xvml","xvm"],"application/yang":["yang"],"application/yin+xml":["yin"],"application/zip":["zip"],"audio/3gpp":["*3gpp"],"audio/adpcm":["adp"],"audio/amr":["amr"],"audio/basic":["au","snd"],"audio/midi":["mid","midi","kar","rmi"],"audio/mobile-xmf":["mxmf"],"audio/mp3":["*mp3"],"audio/mp4":["m4a","mp4a"],"audio/mpeg":["mpga","mp2","mp2a","mp3","m2a","m3a"],"audio/ogg":["oga","ogg","spx","opus"],"audio/s3m":["s3m"],"audio/silk":["sil"],"audio/wav":["wav"],"audio/wave":["*wav"],"audio/webm":["weba"],"audio/xm":["xm"],"font/collection":["ttc"],"font/otf":["otf"],"font/ttf":["ttf"],"font/woff":["woff"],"font/woff2":["woff2"],"image/aces":["exr"],"image/apng":["apng"],"image/avif":["avif"],"image/bmp":["bmp"],"image/cgm":["cgm"],"image/dicom-rle":["drle"],"image/emf":["emf"],"image/fits":["fits"],"image/g3fax":["g3"],"image/gif":["gif"],"image/heic":["heic"],"image/heic-sequence":["heics"],"image/heif":["heif"],"image/heif-sequence":["heifs"],"image/hej2k":["hej2"],"image/hsj2":["hsj2"],"image/ief":["ief"],"image/jls":["jls"],"image/jp2":["jp2","jpg2"],"image/jpeg":["jpeg","jpg","jpe"],"image/jph":["jph"],"image/jphc":["jhc"],"image/jpm":["jpm"],"image/jpx":["jpx","jpf"],"image/jxr":["jxr"],"image/jxra":["jxra"],"image/jxrs":["jxrs"],"image/jxs":["jxs"],"image/jxsc":["jxsc"],"image/jxsi":["jxsi"],"image/jxss":["jxss"],"image/ktx":["ktx"],"image/ktx2":["ktx2"],"image/png":["png"],"image/sgi":["sgi"],"image/svg+xml":["svg","svgz"],"image/t38":["t38"],"image/tiff":["tif","tiff"],"image/tiff-fx":["tfx"],"image/webp":["webp"],"image/wmf":["wmf"],"message/disposition-notification":["disposition-notification"],"message/global":["u8msg"],"message/global-delivery-status":["u8dsn"],"message/global-disposition-notification":["u8mdn"],"message/global-headers":["u8hdr"],"message/rfc822":["eml","mime"],"model/3mf":["3mf"],"model/gltf+json":["gltf"],"model/gltf-binary":["glb"],"model/iges":["igs","iges"],"model/mesh":["msh","mesh","silo"],"model/mtl":["mtl"],"model/obj":["obj"],"model/step+xml":["stpx"],"model/step+zip":["stpz"],"model/step-xml+zip":["stpxz"],"model/stl":["stl"],"model/vrml":["wrl","vrml"],"model/x3d+binary":["*x3db","x3dbz"],"model/x3d+fastinfoset":["x3db"],"model/x3d+vrml":["*x3dv","x3dvz"],"model/x3d+xml":["x3d","x3dz"],"model/x3d-vrml":["x3dv"],"text/cache-manifest":["appcache","manifest"],"text/calendar":["ics","ifb"],"text/coffeescript":["coffee","litcoffee"],"text/css":["css"],"text/csv":["csv"],"text/html":["html","htm","shtml"],"text/jade":["jade"],"text/jsx":["jsx"],"text/less":["less"],"text/markdown":["markdown","md"],"text/mathml":["mml"],"text/mdx":["mdx"],"text/n3":["n3"],"text/plain":["txt","text","conf","def","list","log","in","ini"],"text/richtext":["rtx"],"text/rtf":["*rtf"],"text/sgml":["sgml","sgm"],"text/shex":["shex"],"text/slim":["slim","slm"],"text/spdx":["spdx"],"text/stylus":["stylus","styl"],"text/tab-separated-values":["tsv"],"text/troff":["t","tr","roff","man","me","ms"],"text/turtle":["ttl"],"text/uri-list":["uri","uris","urls"],"text/vcard":["vcard"],"text/vtt":["vtt"],"text/xml":["*xml"],"text/yaml":["yaml","yml"],"video/3gpp":["3gp","3gpp"],"video/3gpp2":["3g2"],"video/h261":["h261"],"video/h263":["h263"],"video/h264":["h264"],"video/iso.segment":["m4s"],"video/jpeg":["jpgv"],"video/jpm":["*jpm","jpgm"],"video/mj2":["mj2","mjp2"],"video/mp2t":["ts"],"video/mp4":["mp4","mp4v","mpg4"],"video/mpeg":["mpeg","mpg","mpe","m1v","m2v"],"video/ogg":["ogv"],"video/quicktime":["qt","mov"],"video/webm":["webm"]};

var other = {"application/prs.cww":["cww"],"application/vnd.1000minds.decision-model+xml":["1km"],"application/vnd.3gpp.pic-bw-large":["plb"],"application/vnd.3gpp.pic-bw-small":["psb"],"application/vnd.3gpp.pic-bw-var":["pvb"],"application/vnd.3gpp2.tcap":["tcap"],"application/vnd.3m.post-it-notes":["pwn"],"application/vnd.accpac.simply.aso":["aso"],"application/vnd.accpac.simply.imp":["imp"],"application/vnd.acucobol":["acu"],"application/vnd.acucorp":["atc","acutc"],"application/vnd.adobe.air-application-installer-package+zip":["air"],"application/vnd.adobe.formscentral.fcdt":["fcdt"],"application/vnd.adobe.fxp":["fxp","fxpl"],"application/vnd.adobe.xdp+xml":["xdp"],"application/vnd.adobe.xfdf":["xfdf"],"application/vnd.ahead.space":["ahead"],"application/vnd.airzip.filesecure.azf":["azf"],"application/vnd.airzip.filesecure.azs":["azs"],"application/vnd.amazon.ebook":["azw"],"application/vnd.americandynamics.acc":["acc"],"application/vnd.amiga.ami":["ami"],"application/vnd.android.package-archive":["apk"],"application/vnd.anser-web-certificate-issue-initiation":["cii"],"application/vnd.anser-web-funds-transfer-initiation":["fti"],"application/vnd.antix.game-component":["atx"],"application/vnd.apple.installer+xml":["mpkg"],"application/vnd.apple.keynote":["key"],"application/vnd.apple.mpegurl":["m3u8"],"application/vnd.apple.numbers":["numbers"],"application/vnd.apple.pages":["pages"],"application/vnd.apple.pkpass":["pkpass"],"application/vnd.aristanetworks.swi":["swi"],"application/vnd.astraea-software.iota":["iota"],"application/vnd.audiograph":["aep"],"application/vnd.balsamiq.bmml+xml":["bmml"],"application/vnd.blueice.multipass":["mpm"],"application/vnd.bmi":["bmi"],"application/vnd.businessobjects":["rep"],"application/vnd.chemdraw+xml":["cdxml"],"application/vnd.chipnuts.karaoke-mmd":["mmd"],"application/vnd.cinderella":["cdy"],"application/vnd.citationstyles.style+xml":["csl"],"application/vnd.claymore":["cla"],"application/vnd.cloanto.rp9":["rp9"],"application/vnd.clonk.c4group":["c4g","c4d","c4f","c4p","c4u"],"application/vnd.cluetrust.cartomobile-config":["c11amc"],"application/vnd.cluetrust.cartomobile-config-pkg":["c11amz"],"application/vnd.commonspace":["csp"],"application/vnd.contact.cmsg":["cdbcmsg"],"application/vnd.cosmocaller":["cmc"],"application/vnd.crick.clicker":["clkx"],"application/vnd.crick.clicker.keyboard":["clkk"],"application/vnd.crick.clicker.palette":["clkp"],"application/vnd.crick.clicker.template":["clkt"],"application/vnd.crick.clicker.wordbank":["clkw"],"application/vnd.criticaltools.wbs+xml":["wbs"],"application/vnd.ctc-posml":["pml"],"application/vnd.cups-ppd":["ppd"],"application/vnd.curl.car":["car"],"application/vnd.curl.pcurl":["pcurl"],"application/vnd.dart":["dart"],"application/vnd.data-vision.rdz":["rdz"],"application/vnd.dbf":["dbf"],"application/vnd.dece.data":["uvf","uvvf","uvd","uvvd"],"application/vnd.dece.ttml+xml":["uvt","uvvt"],"application/vnd.dece.unspecified":["uvx","uvvx"],"application/vnd.dece.zip":["uvz","uvvz"],"application/vnd.denovo.fcselayout-link":["fe_launch"],"application/vnd.dna":["dna"],"application/vnd.dolby.mlp":["mlp"],"application/vnd.dpgraph":["dpg"],"application/vnd.dreamfactory":["dfac"],"application/vnd.ds-keypoint":["kpxx"],"application/vnd.dvb.ait":["ait"],"application/vnd.dvb.service":["svc"],"application/vnd.dynageo":["geo"],"application/vnd.ecowin.chart":["mag"],"application/vnd.enliven":["nml"],"application/vnd.epson.esf":["esf"],"application/vnd.epson.msf":["msf"],"application/vnd.epson.quickanime":["qam"],"application/vnd.epson.salt":["slt"],"application/vnd.epson.ssf":["ssf"],"application/vnd.eszigno3+xml":["es3","et3"],"application/vnd.ezpix-album":["ez2"],"application/vnd.ezpix-package":["ez3"],"application/vnd.fdf":["fdf"],"application/vnd.fdsn.mseed":["mseed"],"application/vnd.fdsn.seed":["seed","dataless"],"application/vnd.flographit":["gph"],"application/vnd.fluxtime.clip":["ftc"],"application/vnd.framemaker":["fm","frame","maker","book"],"application/vnd.frogans.fnc":["fnc"],"application/vnd.frogans.ltf":["ltf"],"application/vnd.fsc.weblaunch":["fsc"],"application/vnd.fujitsu.oasys":["oas"],"application/vnd.fujitsu.oasys2":["oa2"],"application/vnd.fujitsu.oasys3":["oa3"],"application/vnd.fujitsu.oasysgp":["fg5"],"application/vnd.fujitsu.oasysprs":["bh2"],"application/vnd.fujixerox.ddd":["ddd"],"application/vnd.fujixerox.docuworks":["xdw"],"application/vnd.fujixerox.docuworks.binder":["xbd"],"application/vnd.fuzzysheet":["fzs"],"application/vnd.genomatix.tuxedo":["txd"],"application/vnd.geogebra.file":["ggb"],"application/vnd.geogebra.tool":["ggt"],"application/vnd.geometry-explorer":["gex","gre"],"application/vnd.geonext":["gxt"],"application/vnd.geoplan":["g2w"],"application/vnd.geospace":["g3w"],"application/vnd.gmx":["gmx"],"application/vnd.google-apps.document":["gdoc"],"application/vnd.google-apps.presentation":["gslides"],"application/vnd.google-apps.spreadsheet":["gsheet"],"application/vnd.google-earth.kml+xml":["kml"],"application/vnd.google-earth.kmz":["kmz"],"application/vnd.grafeq":["gqf","gqs"],"application/vnd.groove-account":["gac"],"application/vnd.groove-help":["ghf"],"application/vnd.groove-identity-message":["gim"],"application/vnd.groove-injector":["grv"],"application/vnd.groove-tool-message":["gtm"],"application/vnd.groove-tool-template":["tpl"],"application/vnd.groove-vcard":["vcg"],"application/vnd.hal+xml":["hal"],"application/vnd.handheld-entertainment+xml":["zmm"],"application/vnd.hbci":["hbci"],"application/vnd.hhe.lesson-player":["les"],"application/vnd.hp-hpgl":["hpgl"],"application/vnd.hp-hpid":["hpid"],"application/vnd.hp-hps":["hps"],"application/vnd.hp-jlyt":["jlt"],"application/vnd.hp-pcl":["pcl"],"application/vnd.hp-pclxl":["pclxl"],"application/vnd.hydrostatix.sof-data":["sfd-hdstx"],"application/vnd.ibm.minipay":["mpy"],"application/vnd.ibm.modcap":["afp","listafp","list3820"],"application/vnd.ibm.rights-management":["irm"],"application/vnd.ibm.secure-container":["sc"],"application/vnd.iccprofile":["icc","icm"],"application/vnd.igloader":["igl"],"application/vnd.immervision-ivp":["ivp"],"application/vnd.immervision-ivu":["ivu"],"application/vnd.insors.igm":["igm"],"application/vnd.intercon.formnet":["xpw","xpx"],"application/vnd.intergeo":["i2g"],"application/vnd.intu.qbo":["qbo"],"application/vnd.intu.qfx":["qfx"],"application/vnd.ipunplugged.rcprofile":["rcprofile"],"application/vnd.irepository.package+xml":["irp"],"application/vnd.is-xpr":["xpr"],"application/vnd.isac.fcs":["fcs"],"application/vnd.jam":["jam"],"application/vnd.jcp.javame.midlet-rms":["rms"],"application/vnd.jisp":["jisp"],"application/vnd.joost.joda-archive":["joda"],"application/vnd.kahootz":["ktz","ktr"],"application/vnd.kde.karbon":["karbon"],"application/vnd.kde.kchart":["chrt"],"application/vnd.kde.kformula":["kfo"],"application/vnd.kde.kivio":["flw"],"application/vnd.kde.kontour":["kon"],"application/vnd.kde.kpresenter":["kpr","kpt"],"application/vnd.kde.kspread":["ksp"],"application/vnd.kde.kword":["kwd","kwt"],"application/vnd.kenameaapp":["htke"],"application/vnd.kidspiration":["kia"],"application/vnd.kinar":["kne","knp"],"application/vnd.koan":["skp","skd","skt","skm"],"application/vnd.kodak-descriptor":["sse"],"application/vnd.las.las+xml":["lasxml"],"application/vnd.llamagraphics.life-balance.desktop":["lbd"],"application/vnd.llamagraphics.life-balance.exchange+xml":["lbe"],"application/vnd.lotus-1-2-3":["123"],"application/vnd.lotus-approach":["apr"],"application/vnd.lotus-freelance":["pre"],"application/vnd.lotus-notes":["nsf"],"application/vnd.lotus-organizer":["org"],"application/vnd.lotus-screencam":["scm"],"application/vnd.lotus-wordpro":["lwp"],"application/vnd.macports.portpkg":["portpkg"],"application/vnd.mapbox-vector-tile":["mvt"],"application/vnd.mcd":["mcd"],"application/vnd.medcalcdata":["mc1"],"application/vnd.mediastation.cdkey":["cdkey"],"application/vnd.mfer":["mwf"],"application/vnd.mfmp":["mfm"],"application/vnd.micrografx.flo":["flo"],"application/vnd.micrografx.igx":["igx"],"application/vnd.mif":["mif"],"application/vnd.mobius.daf":["daf"],"application/vnd.mobius.dis":["dis"],"application/vnd.mobius.mbk":["mbk"],"application/vnd.mobius.mqy":["mqy"],"application/vnd.mobius.msl":["msl"],"application/vnd.mobius.plc":["plc"],"application/vnd.mobius.txf":["txf"],"application/vnd.mophun.application":["mpn"],"application/vnd.mophun.certificate":["mpc"],"application/vnd.mozilla.xul+xml":["xul"],"application/vnd.ms-artgalry":["cil"],"application/vnd.ms-cab-compressed":["cab"],"application/vnd.ms-excel":["xls","xlm","xla","xlc","xlt","xlw"],"application/vnd.ms-excel.addin.macroenabled.12":["xlam"],"application/vnd.ms-excel.sheet.binary.macroenabled.12":["xlsb"],"application/vnd.ms-excel.sheet.macroenabled.12":["xlsm"],"application/vnd.ms-excel.template.macroenabled.12":["xltm"],"application/vnd.ms-fontobject":["eot"],"application/vnd.ms-htmlhelp":["chm"],"application/vnd.ms-ims":["ims"],"application/vnd.ms-lrm":["lrm"],"application/vnd.ms-officetheme":["thmx"],"application/vnd.ms-outlook":["msg"],"application/vnd.ms-pki.seccat":["cat"],"application/vnd.ms-pki.stl":["*stl"],"application/vnd.ms-powerpoint":["ppt","pps","pot"],"application/vnd.ms-powerpoint.addin.macroenabled.12":["ppam"],"application/vnd.ms-powerpoint.presentation.macroenabled.12":["pptm"],"application/vnd.ms-powerpoint.slide.macroenabled.12":["sldm"],"application/vnd.ms-powerpoint.slideshow.macroenabled.12":["ppsm"],"application/vnd.ms-powerpoint.template.macroenabled.12":["potm"],"application/vnd.ms-project":["mpp","mpt"],"application/vnd.ms-word.document.macroenabled.12":["docm"],"application/vnd.ms-word.template.macroenabled.12":["dotm"],"application/vnd.ms-works":["wps","wks","wcm","wdb"],"application/vnd.ms-wpl":["wpl"],"application/vnd.ms-xpsdocument":["xps"],"application/vnd.mseq":["mseq"],"application/vnd.musician":["mus"],"application/vnd.muvee.style":["msty"],"application/vnd.mynfc":["taglet"],"application/vnd.neurolanguage.nlu":["nlu"],"application/vnd.nitf":["ntf","nitf"],"application/vnd.noblenet-directory":["nnd"],"application/vnd.noblenet-sealer":["nns"],"application/vnd.noblenet-web":["nnw"],"application/vnd.nokia.n-gage.ac+xml":["*ac"],"application/vnd.nokia.n-gage.data":["ngdat"],"application/vnd.nokia.n-gage.symbian.install":["n-gage"],"application/vnd.nokia.radio-preset":["rpst"],"application/vnd.nokia.radio-presets":["rpss"],"application/vnd.novadigm.edm":["edm"],"application/vnd.novadigm.edx":["edx"],"application/vnd.novadigm.ext":["ext"],"application/vnd.oasis.opendocument.chart":["odc"],"application/vnd.oasis.opendocument.chart-template":["otc"],"application/vnd.oasis.opendocument.database":["odb"],"application/vnd.oasis.opendocument.formula":["odf"],"application/vnd.oasis.opendocument.formula-template":["odft"],"application/vnd.oasis.opendocument.graphics":["odg"],"application/vnd.oasis.opendocument.graphics-template":["otg"],"application/vnd.oasis.opendocument.image":["odi"],"application/vnd.oasis.opendocument.image-template":["oti"],"application/vnd.oasis.opendocument.presentation":["odp"],"application/vnd.oasis.opendocument.presentation-template":["otp"],"application/vnd.oasis.opendocument.spreadsheet":["ods"],"application/vnd.oasis.opendocument.spreadsheet-template":["ots"],"application/vnd.oasis.opendocument.text":["odt"],"application/vnd.oasis.opendocument.text-master":["odm"],"application/vnd.oasis.opendocument.text-template":["ott"],"application/vnd.oasis.opendocument.text-web":["oth"],"application/vnd.olpc-sugar":["xo"],"application/vnd.oma.dd2+xml":["dd2"],"application/vnd.openblox.game+xml":["obgx"],"application/vnd.openofficeorg.extension":["oxt"],"application/vnd.openstreetmap.data+xml":["osm"],"application/vnd.openxmlformats-officedocument.presentationml.presentation":["pptx"],"application/vnd.openxmlformats-officedocument.presentationml.slide":["sldx"],"application/vnd.openxmlformats-officedocument.presentationml.slideshow":["ppsx"],"application/vnd.openxmlformats-officedocument.presentationml.template":["potx"],"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":["xlsx"],"application/vnd.openxmlformats-officedocument.spreadsheetml.template":["xltx"],"application/vnd.openxmlformats-officedocument.wordprocessingml.document":["docx"],"application/vnd.openxmlformats-officedocument.wordprocessingml.template":["dotx"],"application/vnd.osgeo.mapguide.package":["mgp"],"application/vnd.osgi.dp":["dp"],"application/vnd.osgi.subsystem":["esa"],"application/vnd.palm":["pdb","pqa","oprc"],"application/vnd.pawaafile":["paw"],"application/vnd.pg.format":["str"],"application/vnd.pg.osasli":["ei6"],"application/vnd.picsel":["efif"],"application/vnd.pmi.widget":["wg"],"application/vnd.pocketlearn":["plf"],"application/vnd.powerbuilder6":["pbd"],"application/vnd.previewsystems.box":["box"],"application/vnd.proteus.magazine":["mgz"],"application/vnd.publishare-delta-tree":["qps"],"application/vnd.pvi.ptid1":["ptid"],"application/vnd.quark.quarkxpress":["qxd","qxt","qwd","qwt","qxl","qxb"],"application/vnd.rar":["rar"],"application/vnd.realvnc.bed":["bed"],"application/vnd.recordare.musicxml":["mxl"],"application/vnd.recordare.musicxml+xml":["musicxml"],"application/vnd.rig.cryptonote":["cryptonote"],"application/vnd.rim.cod":["cod"],"application/vnd.rn-realmedia":["rm"],"application/vnd.rn-realmedia-vbr":["rmvb"],"application/vnd.route66.link66+xml":["link66"],"application/vnd.sailingtracker.track":["st"],"application/vnd.seemail":["see"],"application/vnd.sema":["sema"],"application/vnd.semd":["semd"],"application/vnd.semf":["semf"],"application/vnd.shana.informed.formdata":["ifm"],"application/vnd.shana.informed.formtemplate":["itp"],"application/vnd.shana.informed.interchange":["iif"],"application/vnd.shana.informed.package":["ipk"],"application/vnd.simtech-mindmapper":["twd","twds"],"application/vnd.smaf":["mmf"],"application/vnd.smart.teacher":["teacher"],"application/vnd.software602.filler.form+xml":["fo"],"application/vnd.solent.sdkm+xml":["sdkm","sdkd"],"application/vnd.spotfire.dxp":["dxp"],"application/vnd.spotfire.sfs":["sfs"],"application/vnd.stardivision.calc":["sdc"],"application/vnd.stardivision.draw":["sda"],"application/vnd.stardivision.impress":["sdd"],"application/vnd.stardivision.math":["smf"],"application/vnd.stardivision.writer":["sdw","vor"],"application/vnd.stardivision.writer-global":["sgl"],"application/vnd.stepmania.package":["smzip"],"application/vnd.stepmania.stepchart":["sm"],"application/vnd.sun.wadl+xml":["wadl"],"application/vnd.sun.xml.calc":["sxc"],"application/vnd.sun.xml.calc.template":["stc"],"application/vnd.sun.xml.draw":["sxd"],"application/vnd.sun.xml.draw.template":["std"],"application/vnd.sun.xml.impress":["sxi"],"application/vnd.sun.xml.impress.template":["sti"],"application/vnd.sun.xml.math":["sxm"],"application/vnd.sun.xml.writer":["sxw"],"application/vnd.sun.xml.writer.global":["sxg"],"application/vnd.sun.xml.writer.template":["stw"],"application/vnd.sus-calendar":["sus","susp"],"application/vnd.svd":["svd"],"application/vnd.symbian.install":["sis","sisx"],"application/vnd.syncml+xml":["xsm"],"application/vnd.syncml.dm+wbxml":["bdm"],"application/vnd.syncml.dm+xml":["xdm"],"application/vnd.syncml.dmddf+xml":["ddf"],"application/vnd.tao.intent-module-archive":["tao"],"application/vnd.tcpdump.pcap":["pcap","cap","dmp"],"application/vnd.tmobile-livetv":["tmo"],"application/vnd.trid.tpt":["tpt"],"application/vnd.triscape.mxs":["mxs"],"application/vnd.trueapp":["tra"],"application/vnd.ufdl":["ufd","ufdl"],"application/vnd.uiq.theme":["utz"],"application/vnd.umajin":["umj"],"application/vnd.unity":["unityweb"],"application/vnd.uoml+xml":["uoml"],"application/vnd.vcx":["vcx"],"application/vnd.visio":["vsd","vst","vss","vsw"],"application/vnd.visionary":["vis"],"application/vnd.vsf":["vsf"],"application/vnd.wap.wbxml":["wbxml"],"application/vnd.wap.wmlc":["wmlc"],"application/vnd.wap.wmlscriptc":["wmlsc"],"application/vnd.webturbo":["wtb"],"application/vnd.wolfram.player":["nbp"],"application/vnd.wordperfect":["wpd"],"application/vnd.wqd":["wqd"],"application/vnd.wt.stf":["stf"],"application/vnd.xara":["xar"],"application/vnd.xfdl":["xfdl"],"application/vnd.yamaha.hv-dic":["hvd"],"application/vnd.yamaha.hv-script":["hvs"],"application/vnd.yamaha.hv-voice":["hvp"],"application/vnd.yamaha.openscoreformat":["osf"],"application/vnd.yamaha.openscoreformat.osfpvg+xml":["osfpvg"],"application/vnd.yamaha.smaf-audio":["saf"],"application/vnd.yamaha.smaf-phrase":["spf"],"application/vnd.yellowriver-custom-menu":["cmp"],"application/vnd.zul":["zir","zirz"],"application/vnd.zzazz.deck+xml":["zaz"],"application/x-7z-compressed":["7z"],"application/x-abiword":["abw"],"application/x-ace-compressed":["ace"],"application/x-apple-diskimage":["*dmg"],"application/x-arj":["arj"],"application/x-authorware-bin":["aab","x32","u32","vox"],"application/x-authorware-map":["aam"],"application/x-authorware-seg":["aas"],"application/x-bcpio":["bcpio"],"application/x-bdoc":["*bdoc"],"application/x-bittorrent":["torrent"],"application/x-blorb":["blb","blorb"],"application/x-bzip":["bz"],"application/x-bzip2":["bz2","boz"],"application/x-cbr":["cbr","cba","cbt","cbz","cb7"],"application/x-cdlink":["vcd"],"application/x-cfs-compressed":["cfs"],"application/x-chat":["chat"],"application/x-chess-pgn":["pgn"],"application/x-chrome-extension":["crx"],"application/x-cocoa":["cco"],"application/x-conference":["nsc"],"application/x-cpio":["cpio"],"application/x-csh":["csh"],"application/x-debian-package":["*deb","udeb"],"application/x-dgc-compressed":["dgc"],"application/x-director":["dir","dcr","dxr","cst","cct","cxt","w3d","fgd","swa"],"application/x-doom":["wad"],"application/x-dtbncx+xml":["ncx"],"application/x-dtbook+xml":["dtb"],"application/x-dtbresource+xml":["res"],"application/x-dvi":["dvi"],"application/x-envoy":["evy"],"application/x-eva":["eva"],"application/x-font-bdf":["bdf"],"application/x-font-ghostscript":["gsf"],"application/x-font-linux-psf":["psf"],"application/x-font-pcf":["pcf"],"application/x-font-snf":["snf"],"application/x-font-type1":["pfa","pfb","pfm","afm"],"application/x-freearc":["arc"],"application/x-futuresplash":["spl"],"application/x-gca-compressed":["gca"],"application/x-glulx":["ulx"],"application/x-gnumeric":["gnumeric"],"application/x-gramps-xml":["gramps"],"application/x-gtar":["gtar"],"application/x-hdf":["hdf"],"application/x-httpd-php":["php"],"application/x-install-instructions":["install"],"application/x-iso9660-image":["*iso"],"application/x-iwork-keynote-sffkey":["*key"],"application/x-iwork-numbers-sffnumbers":["*numbers"],"application/x-iwork-pages-sffpages":["*pages"],"application/x-java-archive-diff":["jardiff"],"application/x-java-jnlp-file":["jnlp"],"application/x-keepass2":["kdbx"],"application/x-latex":["latex"],"application/x-lua-bytecode":["luac"],"application/x-lzh-compressed":["lzh","lha"],"application/x-makeself":["run"],"application/x-mie":["mie"],"application/x-mobipocket-ebook":["prc","mobi"],"application/x-ms-application":["application"],"application/x-ms-shortcut":["lnk"],"application/x-ms-wmd":["wmd"],"application/x-ms-wmz":["wmz"],"application/x-ms-xbap":["xbap"],"application/x-msaccess":["mdb"],"application/x-msbinder":["obd"],"application/x-mscardfile":["crd"],"application/x-msclip":["clp"],"application/x-msdos-program":["*exe"],"application/x-msdownload":["*exe","*dll","com","bat","*msi"],"application/x-msmediaview":["mvb","m13","m14"],"application/x-msmetafile":["*wmf","*wmz","*emf","emz"],"application/x-msmoney":["mny"],"application/x-mspublisher":["pub"],"application/x-msschedule":["scd"],"application/x-msterminal":["trm"],"application/x-mswrite":["wri"],"application/x-netcdf":["nc","cdf"],"application/x-ns-proxy-autoconfig":["pac"],"application/x-nzb":["nzb"],"application/x-perl":["pl","pm"],"application/x-pilot":["*prc","*pdb"],"application/x-pkcs12":["p12","pfx"],"application/x-pkcs7-certificates":["p7b","spc"],"application/x-pkcs7-certreqresp":["p7r"],"application/x-rar-compressed":["*rar"],"application/x-redhat-package-manager":["rpm"],"application/x-research-info-systems":["ris"],"application/x-sea":["sea"],"application/x-sh":["sh"],"application/x-shar":["shar"],"application/x-shockwave-flash":["swf"],"application/x-silverlight-app":["xap"],"application/x-sql":["sql"],"application/x-stuffit":["sit"],"application/x-stuffitx":["sitx"],"application/x-subrip":["srt"],"application/x-sv4cpio":["sv4cpio"],"application/x-sv4crc":["sv4crc"],"application/x-t3vm-image":["t3"],"application/x-tads":["gam"],"application/x-tar":["tar"],"application/x-tcl":["tcl","tk"],"application/x-tex":["tex"],"application/x-tex-tfm":["tfm"],"application/x-texinfo":["texinfo","texi"],"application/x-tgif":["*obj"],"application/x-ustar":["ustar"],"application/x-virtualbox-hdd":["hdd"],"application/x-virtualbox-ova":["ova"],"application/x-virtualbox-ovf":["ovf"],"application/x-virtualbox-vbox":["vbox"],"application/x-virtualbox-vbox-extpack":["vbox-extpack"],"application/x-virtualbox-vdi":["vdi"],"application/x-virtualbox-vhd":["vhd"],"application/x-virtualbox-vmdk":["vmdk"],"application/x-wais-source":["src"],"application/x-web-app-manifest+json":["webapp"],"application/x-x509-ca-cert":["der","crt","pem"],"application/x-xfig":["fig"],"application/x-xliff+xml":["*xlf"],"application/x-xpinstall":["xpi"],"application/x-xz":["xz"],"application/x-zmachine":["z1","z2","z3","z4","z5","z6","z7","z8"],"audio/vnd.dece.audio":["uva","uvva"],"audio/vnd.digital-winds":["eol"],"audio/vnd.dra":["dra"],"audio/vnd.dts":["dts"],"audio/vnd.dts.hd":["dtshd"],"audio/vnd.lucent.voice":["lvp"],"audio/vnd.ms-playready.media.pya":["pya"],"audio/vnd.nuera.ecelp4800":["ecelp4800"],"audio/vnd.nuera.ecelp7470":["ecelp7470"],"audio/vnd.nuera.ecelp9600":["ecelp9600"],"audio/vnd.rip":["rip"],"audio/x-aac":["aac"],"audio/x-aiff":["aif","aiff","aifc"],"audio/x-caf":["caf"],"audio/x-flac":["flac"],"audio/x-m4a":["*m4a"],"audio/x-matroska":["mka"],"audio/x-mpegurl":["m3u"],"audio/x-ms-wax":["wax"],"audio/x-ms-wma":["wma"],"audio/x-pn-realaudio":["ram","ra"],"audio/x-pn-realaudio-plugin":["rmp"],"audio/x-realaudio":["*ra"],"audio/x-wav":["*wav"],"chemical/x-cdx":["cdx"],"chemical/x-cif":["cif"],"chemical/x-cmdf":["cmdf"],"chemical/x-cml":["cml"],"chemical/x-csml":["csml"],"chemical/x-xyz":["xyz"],"image/prs.btif":["btif"],"image/prs.pti":["pti"],"image/vnd.adobe.photoshop":["psd"],"image/vnd.airzip.accelerator.azv":["azv"],"image/vnd.dece.graphic":["uvi","uvvi","uvg","uvvg"],"image/vnd.djvu":["djvu","djv"],"image/vnd.dvb.subtitle":["*sub"],"image/vnd.dwg":["dwg"],"image/vnd.dxf":["dxf"],"image/vnd.fastbidsheet":["fbs"],"image/vnd.fpx":["fpx"],"image/vnd.fst":["fst"],"image/vnd.fujixerox.edmics-mmr":["mmr"],"image/vnd.fujixerox.edmics-rlc":["rlc"],"image/vnd.microsoft.icon":["ico"],"image/vnd.ms-dds":["dds"],"image/vnd.ms-modi":["mdi"],"image/vnd.ms-photo":["wdp"],"image/vnd.net-fpx":["npx"],"image/vnd.pco.b16":["b16"],"image/vnd.tencent.tap":["tap"],"image/vnd.valve.source.texture":["vtf"],"image/vnd.wap.wbmp":["wbmp"],"image/vnd.xiff":["xif"],"image/vnd.zbrush.pcx":["pcx"],"image/x-3ds":["3ds"],"image/x-cmu-raster":["ras"],"image/x-cmx":["cmx"],"image/x-freehand":["fh","fhc","fh4","fh5","fh7"],"image/x-icon":["*ico"],"image/x-jng":["jng"],"image/x-mrsid-image":["sid"],"image/x-ms-bmp":["*bmp"],"image/x-pcx":["*pcx"],"image/x-pict":["pic","pct"],"image/x-portable-anymap":["pnm"],"image/x-portable-bitmap":["pbm"],"image/x-portable-graymap":["pgm"],"image/x-portable-pixmap":["ppm"],"image/x-rgb":["rgb"],"image/x-tga":["tga"],"image/x-xbitmap":["xbm"],"image/x-xpixmap":["xpm"],"image/x-xwindowdump":["xwd"],"message/vnd.wfa.wsc":["wsc"],"model/vnd.collada+xml":["dae"],"model/vnd.dwf":["dwf"],"model/vnd.gdl":["gdl"],"model/vnd.gtw":["gtw"],"model/vnd.mts":["mts"],"model/vnd.opengex":["ogex"],"model/vnd.parasolid.transmit.binary":["x_b"],"model/vnd.parasolid.transmit.text":["x_t"],"model/vnd.sap.vds":["vds"],"model/vnd.usdz+zip":["usdz"],"model/vnd.valve.source.compiled-map":["bsp"],"model/vnd.vtu":["vtu"],"text/prs.lines.tag":["dsc"],"text/vnd.curl":["curl"],"text/vnd.curl.dcurl":["dcurl"],"text/vnd.curl.mcurl":["mcurl"],"text/vnd.curl.scurl":["scurl"],"text/vnd.dvb.subtitle":["sub"],"text/vnd.fly":["fly"],"text/vnd.fmi.flexstor":["flx"],"text/vnd.graphviz":["gv"],"text/vnd.in3d.3dml":["3dml"],"text/vnd.in3d.spot":["spot"],"text/vnd.sun.j2me.app-descriptor":["jad"],"text/vnd.wap.wml":["wml"],"text/vnd.wap.wmlscript":["wmls"],"text/x-asm":["s","asm"],"text/x-c":["c","cc","cxx","cpp","h","hh","dic"],"text/x-component":["htc"],"text/x-fortran":["f","for","f77","f90"],"text/x-handlebars-template":["hbs"],"text/x-java-source":["java"],"text/x-lua":["lua"],"text/x-markdown":["mkd"],"text/x-nfo":["nfo"],"text/x-opml":["opml"],"text/x-org":["*org"],"text/x-pascal":["p","pas"],"text/x-processing":["pde"],"text/x-sass":["sass"],"text/x-scss":["scss"],"text/x-setext":["etx"],"text/x-sfv":["sfv"],"text/x-suse-ymp":["ymp"],"text/x-uuencode":["uu"],"text/x-vcalendar":["vcs"],"text/x-vcard":["vcf"],"video/vnd.dece.hd":["uvh","uvvh"],"video/vnd.dece.mobile":["uvm","uvvm"],"video/vnd.dece.pd":["uvp","uvvp"],"video/vnd.dece.sd":["uvs","uvvs"],"video/vnd.dece.video":["uvv","uvvv"],"video/vnd.dvb.file":["dvb"],"video/vnd.fvt":["fvt"],"video/vnd.mpegurl":["mxu","m4u"],"video/vnd.ms-playready.media.pyv":["pyv"],"video/vnd.uvvu.mp4":["uvu","uvvu"],"video/vnd.vivo":["viv"],"video/x-f4v":["f4v"],"video/x-fli":["fli"],"video/x-flv":["flv"],"video/x-m4v":["m4v"],"video/x-matroska":["mkv","mk3d","mks"],"video/x-mng":["mng"],"video/x-ms-asf":["asf","asx"],"video/x-ms-vob":["vob"],"video/x-ms-wm":["wm"],"video/x-ms-wmv":["wmv"],"video/x-ms-wmx":["wmx"],"video/x-ms-wvx":["wvx"],"video/x-msvideo":["avi"],"video/x-sgi-movie":["movie"],"video/x-smv":["smv"],"x-conference/x-cooltalk":["ice"]};

let Mime = Mime_1;
new Mime(standard, other);

if (typeof process !== 'undefined') {
	(process.env || {});
	process.stdout && process.stdout.isTTY;
}

var eastasianwidth = {exports: {}};

(function (module) {
	var eaw = {};

	{
	  module.exports = eaw;
	}

	eaw.eastAsianWidth = function(character) {
	  var x = character.charCodeAt(0);
	  var y = (character.length == 2) ? character.charCodeAt(1) : 0;
	  var codePoint = x;
	  if ((0xD800 <= x && x <= 0xDBFF) && (0xDC00 <= y && y <= 0xDFFF)) {
	    x &= 0x3FF;
	    y &= 0x3FF;
	    codePoint = (x << 10) | y;
	    codePoint += 0x10000;
	  }

	  if ((0x3000 == codePoint) ||
	      (0xFF01 <= codePoint && codePoint <= 0xFF60) ||
	      (0xFFE0 <= codePoint && codePoint <= 0xFFE6)) {
	    return 'F';
	  }
	  if ((0x20A9 == codePoint) ||
	      (0xFF61 <= codePoint && codePoint <= 0xFFBE) ||
	      (0xFFC2 <= codePoint && codePoint <= 0xFFC7) ||
	      (0xFFCA <= codePoint && codePoint <= 0xFFCF) ||
	      (0xFFD2 <= codePoint && codePoint <= 0xFFD7) ||
	      (0xFFDA <= codePoint && codePoint <= 0xFFDC) ||
	      (0xFFE8 <= codePoint && codePoint <= 0xFFEE)) {
	    return 'H';
	  }
	  if ((0x1100 <= codePoint && codePoint <= 0x115F) ||
	      (0x11A3 <= codePoint && codePoint <= 0x11A7) ||
	      (0x11FA <= codePoint && codePoint <= 0x11FF) ||
	      (0x2329 <= codePoint && codePoint <= 0x232A) ||
	      (0x2E80 <= codePoint && codePoint <= 0x2E99) ||
	      (0x2E9B <= codePoint && codePoint <= 0x2EF3) ||
	      (0x2F00 <= codePoint && codePoint <= 0x2FD5) ||
	      (0x2FF0 <= codePoint && codePoint <= 0x2FFB) ||
	      (0x3001 <= codePoint && codePoint <= 0x303E) ||
	      (0x3041 <= codePoint && codePoint <= 0x3096) ||
	      (0x3099 <= codePoint && codePoint <= 0x30FF) ||
	      (0x3105 <= codePoint && codePoint <= 0x312D) ||
	      (0x3131 <= codePoint && codePoint <= 0x318E) ||
	      (0x3190 <= codePoint && codePoint <= 0x31BA) ||
	      (0x31C0 <= codePoint && codePoint <= 0x31E3) ||
	      (0x31F0 <= codePoint && codePoint <= 0x321E) ||
	      (0x3220 <= codePoint && codePoint <= 0x3247) ||
	      (0x3250 <= codePoint && codePoint <= 0x32FE) ||
	      (0x3300 <= codePoint && codePoint <= 0x4DBF) ||
	      (0x4E00 <= codePoint && codePoint <= 0xA48C) ||
	      (0xA490 <= codePoint && codePoint <= 0xA4C6) ||
	      (0xA960 <= codePoint && codePoint <= 0xA97C) ||
	      (0xAC00 <= codePoint && codePoint <= 0xD7A3) ||
	      (0xD7B0 <= codePoint && codePoint <= 0xD7C6) ||
	      (0xD7CB <= codePoint && codePoint <= 0xD7FB) ||
	      (0xF900 <= codePoint && codePoint <= 0xFAFF) ||
	      (0xFE10 <= codePoint && codePoint <= 0xFE19) ||
	      (0xFE30 <= codePoint && codePoint <= 0xFE52) ||
	      (0xFE54 <= codePoint && codePoint <= 0xFE66) ||
	      (0xFE68 <= codePoint && codePoint <= 0xFE6B) ||
	      (0x1B000 <= codePoint && codePoint <= 0x1B001) ||
	      (0x1F200 <= codePoint && codePoint <= 0x1F202) ||
	      (0x1F210 <= codePoint && codePoint <= 0x1F23A) ||
	      (0x1F240 <= codePoint && codePoint <= 0x1F248) ||
	      (0x1F250 <= codePoint && codePoint <= 0x1F251) ||
	      (0x20000 <= codePoint && codePoint <= 0x2F73F) ||
	      (0x2B740 <= codePoint && codePoint <= 0x2FFFD) ||
	      (0x30000 <= codePoint && codePoint <= 0x3FFFD)) {
	    return 'W';
	  }
	  if ((0x0020 <= codePoint && codePoint <= 0x007E) ||
	      (0x00A2 <= codePoint && codePoint <= 0x00A3) ||
	      (0x00A5 <= codePoint && codePoint <= 0x00A6) ||
	      (0x00AC == codePoint) ||
	      (0x00AF == codePoint) ||
	      (0x27E6 <= codePoint && codePoint <= 0x27ED) ||
	      (0x2985 <= codePoint && codePoint <= 0x2986)) {
	    return 'Na';
	  }
	  if ((0x00A1 == codePoint) ||
	      (0x00A4 == codePoint) ||
	      (0x00A7 <= codePoint && codePoint <= 0x00A8) ||
	      (0x00AA == codePoint) ||
	      (0x00AD <= codePoint && codePoint <= 0x00AE) ||
	      (0x00B0 <= codePoint && codePoint <= 0x00B4) ||
	      (0x00B6 <= codePoint && codePoint <= 0x00BA) ||
	      (0x00BC <= codePoint && codePoint <= 0x00BF) ||
	      (0x00C6 == codePoint) ||
	      (0x00D0 == codePoint) ||
	      (0x00D7 <= codePoint && codePoint <= 0x00D8) ||
	      (0x00DE <= codePoint && codePoint <= 0x00E1) ||
	      (0x00E6 == codePoint) ||
	      (0x00E8 <= codePoint && codePoint <= 0x00EA) ||
	      (0x00EC <= codePoint && codePoint <= 0x00ED) ||
	      (0x00F0 == codePoint) ||
	      (0x00F2 <= codePoint && codePoint <= 0x00F3) ||
	      (0x00F7 <= codePoint && codePoint <= 0x00FA) ||
	      (0x00FC == codePoint) ||
	      (0x00FE == codePoint) ||
	      (0x0101 == codePoint) ||
	      (0x0111 == codePoint) ||
	      (0x0113 == codePoint) ||
	      (0x011B == codePoint) ||
	      (0x0126 <= codePoint && codePoint <= 0x0127) ||
	      (0x012B == codePoint) ||
	      (0x0131 <= codePoint && codePoint <= 0x0133) ||
	      (0x0138 == codePoint) ||
	      (0x013F <= codePoint && codePoint <= 0x0142) ||
	      (0x0144 == codePoint) ||
	      (0x0148 <= codePoint && codePoint <= 0x014B) ||
	      (0x014D == codePoint) ||
	      (0x0152 <= codePoint && codePoint <= 0x0153) ||
	      (0x0166 <= codePoint && codePoint <= 0x0167) ||
	      (0x016B == codePoint) ||
	      (0x01CE == codePoint) ||
	      (0x01D0 == codePoint) ||
	      (0x01D2 == codePoint) ||
	      (0x01D4 == codePoint) ||
	      (0x01D6 == codePoint) ||
	      (0x01D8 == codePoint) ||
	      (0x01DA == codePoint) ||
	      (0x01DC == codePoint) ||
	      (0x0251 == codePoint) ||
	      (0x0261 == codePoint) ||
	      (0x02C4 == codePoint) ||
	      (0x02C7 == codePoint) ||
	      (0x02C9 <= codePoint && codePoint <= 0x02CB) ||
	      (0x02CD == codePoint) ||
	      (0x02D0 == codePoint) ||
	      (0x02D8 <= codePoint && codePoint <= 0x02DB) ||
	      (0x02DD == codePoint) ||
	      (0x02DF == codePoint) ||
	      (0x0300 <= codePoint && codePoint <= 0x036F) ||
	      (0x0391 <= codePoint && codePoint <= 0x03A1) ||
	      (0x03A3 <= codePoint && codePoint <= 0x03A9) ||
	      (0x03B1 <= codePoint && codePoint <= 0x03C1) ||
	      (0x03C3 <= codePoint && codePoint <= 0x03C9) ||
	      (0x0401 == codePoint) ||
	      (0x0410 <= codePoint && codePoint <= 0x044F) ||
	      (0x0451 == codePoint) ||
	      (0x2010 == codePoint) ||
	      (0x2013 <= codePoint && codePoint <= 0x2016) ||
	      (0x2018 <= codePoint && codePoint <= 0x2019) ||
	      (0x201C <= codePoint && codePoint <= 0x201D) ||
	      (0x2020 <= codePoint && codePoint <= 0x2022) ||
	      (0x2024 <= codePoint && codePoint <= 0x2027) ||
	      (0x2030 == codePoint) ||
	      (0x2032 <= codePoint && codePoint <= 0x2033) ||
	      (0x2035 == codePoint) ||
	      (0x203B == codePoint) ||
	      (0x203E == codePoint) ||
	      (0x2074 == codePoint) ||
	      (0x207F == codePoint) ||
	      (0x2081 <= codePoint && codePoint <= 0x2084) ||
	      (0x20AC == codePoint) ||
	      (0x2103 == codePoint) ||
	      (0x2105 == codePoint) ||
	      (0x2109 == codePoint) ||
	      (0x2113 == codePoint) ||
	      (0x2116 == codePoint) ||
	      (0x2121 <= codePoint && codePoint <= 0x2122) ||
	      (0x2126 == codePoint) ||
	      (0x212B == codePoint) ||
	      (0x2153 <= codePoint && codePoint <= 0x2154) ||
	      (0x215B <= codePoint && codePoint <= 0x215E) ||
	      (0x2160 <= codePoint && codePoint <= 0x216B) ||
	      (0x2170 <= codePoint && codePoint <= 0x2179) ||
	      (0x2189 == codePoint) ||
	      (0x2190 <= codePoint && codePoint <= 0x2199) ||
	      (0x21B8 <= codePoint && codePoint <= 0x21B9) ||
	      (0x21D2 == codePoint) ||
	      (0x21D4 == codePoint) ||
	      (0x21E7 == codePoint) ||
	      (0x2200 == codePoint) ||
	      (0x2202 <= codePoint && codePoint <= 0x2203) ||
	      (0x2207 <= codePoint && codePoint <= 0x2208) ||
	      (0x220B == codePoint) ||
	      (0x220F == codePoint) ||
	      (0x2211 == codePoint) ||
	      (0x2215 == codePoint) ||
	      (0x221A == codePoint) ||
	      (0x221D <= codePoint && codePoint <= 0x2220) ||
	      (0x2223 == codePoint) ||
	      (0x2225 == codePoint) ||
	      (0x2227 <= codePoint && codePoint <= 0x222C) ||
	      (0x222E == codePoint) ||
	      (0x2234 <= codePoint && codePoint <= 0x2237) ||
	      (0x223C <= codePoint && codePoint <= 0x223D) ||
	      (0x2248 == codePoint) ||
	      (0x224C == codePoint) ||
	      (0x2252 == codePoint) ||
	      (0x2260 <= codePoint && codePoint <= 0x2261) ||
	      (0x2264 <= codePoint && codePoint <= 0x2267) ||
	      (0x226A <= codePoint && codePoint <= 0x226B) ||
	      (0x226E <= codePoint && codePoint <= 0x226F) ||
	      (0x2282 <= codePoint && codePoint <= 0x2283) ||
	      (0x2286 <= codePoint && codePoint <= 0x2287) ||
	      (0x2295 == codePoint) ||
	      (0x2299 == codePoint) ||
	      (0x22A5 == codePoint) ||
	      (0x22BF == codePoint) ||
	      (0x2312 == codePoint) ||
	      (0x2460 <= codePoint && codePoint <= 0x24E9) ||
	      (0x24EB <= codePoint && codePoint <= 0x254B) ||
	      (0x2550 <= codePoint && codePoint <= 0x2573) ||
	      (0x2580 <= codePoint && codePoint <= 0x258F) ||
	      (0x2592 <= codePoint && codePoint <= 0x2595) ||
	      (0x25A0 <= codePoint && codePoint <= 0x25A1) ||
	      (0x25A3 <= codePoint && codePoint <= 0x25A9) ||
	      (0x25B2 <= codePoint && codePoint <= 0x25B3) ||
	      (0x25B6 <= codePoint && codePoint <= 0x25B7) ||
	      (0x25BC <= codePoint && codePoint <= 0x25BD) ||
	      (0x25C0 <= codePoint && codePoint <= 0x25C1) ||
	      (0x25C6 <= codePoint && codePoint <= 0x25C8) ||
	      (0x25CB == codePoint) ||
	      (0x25CE <= codePoint && codePoint <= 0x25D1) ||
	      (0x25E2 <= codePoint && codePoint <= 0x25E5) ||
	      (0x25EF == codePoint) ||
	      (0x2605 <= codePoint && codePoint <= 0x2606) ||
	      (0x2609 == codePoint) ||
	      (0x260E <= codePoint && codePoint <= 0x260F) ||
	      (0x2614 <= codePoint && codePoint <= 0x2615) ||
	      (0x261C == codePoint) ||
	      (0x261E == codePoint) ||
	      (0x2640 == codePoint) ||
	      (0x2642 == codePoint) ||
	      (0x2660 <= codePoint && codePoint <= 0x2661) ||
	      (0x2663 <= codePoint && codePoint <= 0x2665) ||
	      (0x2667 <= codePoint && codePoint <= 0x266A) ||
	      (0x266C <= codePoint && codePoint <= 0x266D) ||
	      (0x266F == codePoint) ||
	      (0x269E <= codePoint && codePoint <= 0x269F) ||
	      (0x26BE <= codePoint && codePoint <= 0x26BF) ||
	      (0x26C4 <= codePoint && codePoint <= 0x26CD) ||
	      (0x26CF <= codePoint && codePoint <= 0x26E1) ||
	      (0x26E3 == codePoint) ||
	      (0x26E8 <= codePoint && codePoint <= 0x26FF) ||
	      (0x273D == codePoint) ||
	      (0x2757 == codePoint) ||
	      (0x2776 <= codePoint && codePoint <= 0x277F) ||
	      (0x2B55 <= codePoint && codePoint <= 0x2B59) ||
	      (0x3248 <= codePoint && codePoint <= 0x324F) ||
	      (0xE000 <= codePoint && codePoint <= 0xF8FF) ||
	      (0xFE00 <= codePoint && codePoint <= 0xFE0F) ||
	      (0xFFFD == codePoint) ||
	      (0x1F100 <= codePoint && codePoint <= 0x1F10A) ||
	      (0x1F110 <= codePoint && codePoint <= 0x1F12D) ||
	      (0x1F130 <= codePoint && codePoint <= 0x1F169) ||
	      (0x1F170 <= codePoint && codePoint <= 0x1F19A) ||
	      (0xE0100 <= codePoint && codePoint <= 0xE01EF) ||
	      (0xF0000 <= codePoint && codePoint <= 0xFFFFD) ||
	      (0x100000 <= codePoint && codePoint <= 0x10FFFD)) {
	    return 'A';
	  }

	  return 'N';
	};

	eaw.characterLength = function(character) {
	  var code = this.eastAsianWidth(character);
	  if (code == 'F' || code == 'W' || code == 'A') {
	    return 2;
	  } else {
	    return 1;
	  }
	};

	// Split a string considering surrogate-pairs.
	function stringToArray(string) {
	  return string.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\uD800-\uDFFF]/g) || [];
	}

	eaw.length = function(string) {
	  var characters = stringToArray(string);
	  var len = 0;
	  for (var i = 0; i < characters.length; i++) {
	    len = len + this.characterLength(characters[i]);
	  }
	  return len;
	};

	eaw.slice = function(text, start, end) {
	  textLen = eaw.length(text);
	  start = start ? start : 0;
	  end = end ? end : 1;
	  if (start < 0) {
	      start = textLen + start;
	  }
	  if (end < 0) {
	      end = textLen + end;
	  }
	  var result = '';
	  var eawLen = 0;
	  var chars = stringToArray(text);
	  for (var i = 0; i < chars.length; i++) {
	    var char = chars[i];
	    var charLen = eaw.length(char);
	    if (eawLen >= start - (charLen == 2 ? 1 : 0)) {
	        if (eawLen + charLen <= end) {
	            result += char;
	        } else {
	            break;
	        }
	    }
	    eawLen += charLen;
	  }
	  return result;
	};
} (eastasianwidth));

if (typeof process !== "undefined") {
  if (process.argv.includes("--verbose")) ; else if (process.argv.includes("--silent")) ; else ;
}

const SCRIPT_EXTENSIONS = /* @__PURE__ */ new Set([".js", ".ts"]);
new RegExp(
  `\\.(${Array.from(SCRIPT_EXTENSIONS).map((s) => s.slice(1)).join("|")})($|\\?)`
);

const STYLE_EXTENSIONS = /* @__PURE__ */ new Set([
  ".css",
  ".pcss",
  ".postcss",
  ".scss",
  ".sass",
  ".styl",
  ".stylus",
  ".less"
]);
new RegExp(
  `\\.(${Array.from(STYLE_EXTENSIONS).map((s) => s.slice(1)).join("|")})($|\\?)`
);

function assertPath(path) {
  if (typeof path !== 'string') {
    throw new TypeError('Path must be a string. Received ' + JSON.stringify(path));
  }
}

// Resolves . and .. elements in a path with directory names
function normalizeStringPosix(path, allowAboveRoot) {
  var res = '';
  var lastSegmentLength = 0;
  var lastSlash = -1;
  var dots = 0;
  var code;
  for (var i = 0; i <= path.length; ++i) {
    if (i < path.length)
      code = path.charCodeAt(i);
    else if (code === 47 /*/*/)
      break;
    else
      code = 47 /*/*/;
    if (code === 47 /*/*/) {
      if (lastSlash === i - 1 || dots === 1) ; else if (lastSlash !== i - 1 && dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 /*.*/ || res.charCodeAt(res.length - 2) !== 46 /*.*/) {
          if (res.length > 2) {
            var lastSlashIndex = res.lastIndexOf('/');
            if (lastSlashIndex !== res.length - 1) {
              if (lastSlashIndex === -1) {
                res = '';
                lastSegmentLength = 0;
              } else {
                res = res.slice(0, lastSlashIndex);
                lastSegmentLength = res.length - 1 - res.lastIndexOf('/');
              }
              lastSlash = i;
              dots = 0;
              continue;
            }
          } else if (res.length === 2 || res.length === 1) {
            res = '';
            lastSegmentLength = 0;
            lastSlash = i;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          if (res.length > 0)
            res += '/..';
          else
            res = '..';
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0)
          res += '/' + path.slice(lastSlash + 1, i);
        else
          res = path.slice(lastSlash + 1, i);
        lastSegmentLength = i - lastSlash - 1;
      }
      lastSlash = i;
      dots = 0;
    } else if (code === 46 /*.*/ && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}

function _format(sep, pathObject) {
  var dir = pathObject.dir || pathObject.root;
  var base = pathObject.base || (pathObject.name || '') + (pathObject.ext || '');
  if (!dir) {
    return base;
  }
  if (dir === pathObject.root) {
    return dir + base;
  }
  return dir + sep + base;
}

var posix = {
  // path.resolve([from ...], to)
  resolve: function resolve() {
    var resolvedPath = '';
    var resolvedAbsolute = false;
    var cwd;

    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path;
      if (i >= 0)
        path = arguments[i];
      else {
        if (cwd === undefined)
          cwd = process.cwd();
        path = cwd;
      }

      assertPath(path);

      // Skip empty entries
      if (path.length === 0) {
        continue;
      }

      resolvedPath = path + '/' + resolvedPath;
      resolvedAbsolute = path.charCodeAt(0) === 47 /*/*/;
    }

    // At this point the path should be resolved to a full absolute path, but
    // handle relative paths to be safe (might happen when process.cwd() fails)

    // Normalize the path
    resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);

    if (resolvedAbsolute) {
      if (resolvedPath.length > 0)
        return '/' + resolvedPath;
      else
        return '/';
    } else if (resolvedPath.length > 0) {
      return resolvedPath;
    } else {
      return '.';
    }
  },

  normalize: function normalize(path) {
    assertPath(path);

    if (path.length === 0) return '.';

    var isAbsolute = path.charCodeAt(0) === 47 /*/*/;
    var trailingSeparator = path.charCodeAt(path.length - 1) === 47 /*/*/;

    // Normalize the path
    path = normalizeStringPosix(path, !isAbsolute);

    if (path.length === 0 && !isAbsolute) path = '.';
    if (path.length > 0 && trailingSeparator) path += '/';

    if (isAbsolute) return '/' + path;
    return path;
  },

  isAbsolute: function isAbsolute(path) {
    assertPath(path);
    return path.length > 0 && path.charCodeAt(0) === 47 /*/*/;
  },

  join: function join() {
    if (arguments.length === 0)
      return '.';
    var joined;
    for (var i = 0; i < arguments.length; ++i) {
      var arg = arguments[i];
      assertPath(arg);
      if (arg.length > 0) {
        if (joined === undefined)
          joined = arg;
        else
          joined += '/' + arg;
      }
    }
    if (joined === undefined)
      return '.';
    return posix.normalize(joined);
  },

  relative: function relative(from, to) {
    assertPath(from);
    assertPath(to);

    if (from === to) return '';

    from = posix.resolve(from);
    to = posix.resolve(to);

    if (from === to) return '';

    // Trim any leading backslashes
    var fromStart = 1;
    for (; fromStart < from.length; ++fromStart) {
      if (from.charCodeAt(fromStart) !== 47 /*/*/)
        break;
    }
    var fromEnd = from.length;
    var fromLen = fromEnd - fromStart;

    // Trim any leading backslashes
    var toStart = 1;
    for (; toStart < to.length; ++toStart) {
      if (to.charCodeAt(toStart) !== 47 /*/*/)
        break;
    }
    var toEnd = to.length;
    var toLen = toEnd - toStart;

    // Compare paths to find the longest common path from root
    var length = fromLen < toLen ? fromLen : toLen;
    var lastCommonSep = -1;
    var i = 0;
    for (; i <= length; ++i) {
      if (i === length) {
        if (toLen > length) {
          if (to.charCodeAt(toStart + i) === 47 /*/*/) {
            // We get here if `from` is the exact base path for `to`.
            // For example: from='/foo/bar'; to='/foo/bar/baz'
            return to.slice(toStart + i + 1);
          } else if (i === 0) {
            // We get here if `from` is the root
            // For example: from='/'; to='/foo'
            return to.slice(toStart + i);
          }
        } else if (fromLen > length) {
          if (from.charCodeAt(fromStart + i) === 47 /*/*/) {
            // We get here if `to` is the exact base path for `from`.
            // For example: from='/foo/bar/baz'; to='/foo/bar'
            lastCommonSep = i;
          } else if (i === 0) {
            // We get here if `to` is the root.
            // For example: from='/foo'; to='/'
            lastCommonSep = 0;
          }
        }
        break;
      }
      var fromCode = from.charCodeAt(fromStart + i);
      var toCode = to.charCodeAt(toStart + i);
      if (fromCode !== toCode)
        break;
      else if (fromCode === 47 /*/*/)
        lastCommonSep = i;
    }

    var out = '';
    // Generate the relative path based on the path difference between `to`
    // and `from`
    for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
      if (i === fromEnd || from.charCodeAt(i) === 47 /*/*/) {
        if (out.length === 0)
          out += '..';
        else
          out += '/..';
      }
    }

    // Lastly, append the rest of the destination (`to`) path that comes after
    // the common path parts
    if (out.length > 0)
      return out + to.slice(toStart + lastCommonSep);
    else {
      toStart += lastCommonSep;
      if (to.charCodeAt(toStart) === 47 /*/*/)
        ++toStart;
      return to.slice(toStart);
    }
  },

  _makeLong: function _makeLong(path) {
    return path;
  },

  dirname: function dirname(path) {
    assertPath(path);
    if (path.length === 0) return '.';
    var code = path.charCodeAt(0);
    var hasRoot = code === 47 /*/*/;
    var end = -1;
    var matchedSlash = true;
    for (var i = path.length - 1; i >= 1; --i) {
      code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          if (!matchedSlash) {
            end = i;
            break;
          }
        } else {
        // We saw the first non-path separator
        matchedSlash = false;
      }
    }

    if (end === -1) return hasRoot ? '/' : '.';
    if (hasRoot && end === 1) return '//';
    return path.slice(0, end);
  },

  basename: function basename(path, ext) {
    if (ext !== undefined && typeof ext !== 'string') throw new TypeError('"ext" argument must be a string');
    assertPath(path);

    var start = 0;
    var end = -1;
    var matchedSlash = true;
    var i;

    if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
      if (ext.length === path.length && ext === path) return '';
      var extIdx = ext.length - 1;
      var firstNonSlashEnd = -1;
      for (i = path.length - 1; i >= 0; --i) {
        var code = path.charCodeAt(i);
        if (code === 47 /*/*/) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else {
          if (firstNonSlashEnd === -1) {
            // We saw the first non-path separator, remember this index in case
            // we need it if the extension ends up not matching
            matchedSlash = false;
            firstNonSlashEnd = i + 1;
          }
          if (extIdx >= 0) {
            // Try to match the explicit extension
            if (code === ext.charCodeAt(extIdx)) {
              if (--extIdx === -1) {
                // We matched the extension, so mark this as the end of our path
                // component
                end = i;
              }
            } else {
              // Extension does not match, so our result is the entire path
              // component
              extIdx = -1;
              end = firstNonSlashEnd;
            }
          }
        }
      }

      if (start === end) end = firstNonSlashEnd;else if (end === -1) end = path.length;
      return path.slice(start, end);
    } else {
      for (i = path.length - 1; i >= 0; --i) {
        if (path.charCodeAt(i) === 47 /*/*/) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else if (end === -1) {
          // We saw the first non-path separator, mark this as the end of our
          // path component
          matchedSlash = false;
          end = i + 1;
        }
      }

      if (end === -1) return '';
      return path.slice(start, end);
    }
  },

  extname: function extname(path) {
    assertPath(path);
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;
    for (var i = path.length - 1; i >= 0; --i) {
      var code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46 /*.*/) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1)
            startDot = i;
          else if (preDotState !== 1)
            preDotState = 1;
      } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 ||
        // We saw a non-dot character immediately before the dot
        preDotState === 0 ||
        // The (right-most) trimmed path component is exactly '..'
        preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      return '';
    }
    return path.slice(startDot, end);
  },

  format: function format(pathObject) {
    if (pathObject === null || typeof pathObject !== 'object') {
      throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
    }
    return _format('/', pathObject);
  },

  parse: function parse(path) {
    assertPath(path);

    var ret = { root: '', dir: '', base: '', ext: '', name: '' };
    if (path.length === 0) return ret;
    var code = path.charCodeAt(0);
    var isAbsolute = code === 47 /*/*/;
    var start;
    if (isAbsolute) {
      ret.root = '/';
      start = 1;
    } else {
      start = 0;
    }
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    var i = path.length - 1;

    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;

    // Get non-dir info
    for (; i >= start; --i) {
      code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46 /*.*/) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1) startDot = i;else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 ||
    // We saw a non-dot character immediately before the dot
    preDotState === 0 ||
    // The (right-most) trimmed path component is exactly '..'
    preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      if (end !== -1) {
        if (startPart === 0 && isAbsolute) ret.base = ret.name = path.slice(1, end);else ret.base = ret.name = path.slice(startPart, end);
      }
    } else {
      if (startPart === 0 && isAbsolute) {
        ret.name = path.slice(1, startDot);
        ret.base = path.slice(1, end);
      } else {
        ret.name = path.slice(startPart, startDot);
        ret.base = path.slice(startPart, end);
      }
      ret.ext = path.slice(startDot, end);
    }

    if (startPart > 0) ret.dir = path.slice(0, startPart - 1);else if (isAbsolute) ret.dir = '/';

    return ret;
  },

  sep: '/',
  delimiter: ':',
  win32: null,
  posix: null
};

posix.posix = posix;

/**
 * Tokenize input string.
 */
function lexer(str) {
    var tokens = [];
    var i = 0;
    while (i < str.length) {
        var char = str[i];
        if (char === "*" || char === "+" || char === "?") {
            tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
            continue;
        }
        if (char === "\\") {
            tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
            continue;
        }
        if (char === "{") {
            tokens.push({ type: "OPEN", index: i, value: str[i++] });
            continue;
        }
        if (char === "}") {
            tokens.push({ type: "CLOSE", index: i, value: str[i++] });
            continue;
        }
        if (char === ":") {
            var name = "";
            var j = i + 1;
            while (j < str.length) {
                var code = str.charCodeAt(j);
                if (
                // `0-9`
                (code >= 48 && code <= 57) ||
                    // `A-Z`
                    (code >= 65 && code <= 90) ||
                    // `a-z`
                    (code >= 97 && code <= 122) ||
                    // `_`
                    code === 95) {
                    name += str[j++];
                    continue;
                }
                break;
            }
            if (!name)
                throw new TypeError("Missing parameter name at ".concat(i));
            tokens.push({ type: "NAME", index: i, value: name });
            i = j;
            continue;
        }
        if (char === "(") {
            var count = 1;
            var pattern = "";
            var j = i + 1;
            if (str[j] === "?") {
                throw new TypeError("Pattern cannot start with \"?\" at ".concat(j));
            }
            while (j < str.length) {
                if (str[j] === "\\") {
                    pattern += str[j++] + str[j++];
                    continue;
                }
                if (str[j] === ")") {
                    count--;
                    if (count === 0) {
                        j++;
                        break;
                    }
                }
                else if (str[j] === "(") {
                    count++;
                    if (str[j + 1] !== "?") {
                        throw new TypeError("Capturing groups are not allowed at ".concat(j));
                    }
                }
                pattern += str[j++];
            }
            if (count)
                throw new TypeError("Unbalanced pattern at ".concat(i));
            if (!pattern)
                throw new TypeError("Missing pattern at ".concat(i));
            tokens.push({ type: "PATTERN", index: i, value: pattern });
            i = j;
            continue;
        }
        tokens.push({ type: "CHAR", index: i, value: str[i++] });
    }
    tokens.push({ type: "END", index: i, value: "" });
    return tokens;
}
/**
 * Parse a string for the raw tokens.
 */
function parse(str, options) {
    if (options === void 0) { options = {}; }
    var tokens = lexer(str);
    var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a;
    var defaultPattern = "[^".concat(escapeString(options.delimiter || "/#?"), "]+?");
    var result = [];
    var key = 0;
    var i = 0;
    var path = "";
    var tryConsume = function (type) {
        if (i < tokens.length && tokens[i].type === type)
            return tokens[i++].value;
    };
    var mustConsume = function (type) {
        var value = tryConsume(type);
        if (value !== undefined)
            return value;
        var _a = tokens[i], nextType = _a.type, index = _a.index;
        throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
    };
    var consumeText = function () {
        var result = "";
        var value;
        while ((value = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR"))) {
            result += value;
        }
        return result;
    };
    while (i < tokens.length) {
        var char = tryConsume("CHAR");
        var name = tryConsume("NAME");
        var pattern = tryConsume("PATTERN");
        if (name || pattern) {
            var prefix = char || "";
            if (prefixes.indexOf(prefix) === -1) {
                path += prefix;
                prefix = "";
            }
            if (path) {
                result.push(path);
                path = "";
            }
            result.push({
                name: name || key++,
                prefix: prefix,
                suffix: "",
                pattern: pattern || defaultPattern,
                modifier: tryConsume("MODIFIER") || "",
            });
            continue;
        }
        var value = char || tryConsume("ESCAPED_CHAR");
        if (value) {
            path += value;
            continue;
        }
        if (path) {
            result.push(path);
            path = "";
        }
        var open = tryConsume("OPEN");
        if (open) {
            var prefix = consumeText();
            var name_1 = tryConsume("NAME") || "";
            var pattern_1 = tryConsume("PATTERN") || "";
            var suffix = consumeText();
            mustConsume("CLOSE");
            result.push({
                name: name_1 || (pattern_1 ? key++ : ""),
                pattern: name_1 && !pattern_1 ? defaultPattern : pattern_1,
                prefix: prefix,
                suffix: suffix,
                modifier: tryConsume("MODIFIER") || "",
            });
            continue;
        }
        mustConsume("END");
    }
    return result;
}
/**
 * Compile a string to a template function for the path.
 */
function compile(str, options) {
    return tokensToFunction(parse(str, options), options);
}
/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction(tokens, options) {
    if (options === void 0) { options = {}; }
    var reFlags = flags(options);
    var _a = options.encode, encode = _a === void 0 ? function (x) { return x; } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
    // Compile all the tokens into regexps.
    var matches = tokens.map(function (token) {
        if (typeof token === "object") {
            return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
        }
    });
    return function (data) {
        var path = "";
        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            if (typeof token === "string") {
                path += token;
                continue;
            }
            var value = data ? data[token.name] : undefined;
            var optional = token.modifier === "?" || token.modifier === "*";
            var repeat = token.modifier === "*" || token.modifier === "+";
            if (Array.isArray(value)) {
                if (!repeat) {
                    throw new TypeError("Expected \"".concat(token.name, "\" to not repeat, but got an array"));
                }
                if (value.length === 0) {
                    if (optional)
                        continue;
                    throw new TypeError("Expected \"".concat(token.name, "\" to not be empty"));
                }
                for (var j = 0; j < value.length; j++) {
                    var segment = encode(value[j], token);
                    if (validate && !matches[i].test(segment)) {
                        throw new TypeError("Expected all \"".concat(token.name, "\" to match \"").concat(token.pattern, "\", but got \"").concat(segment, "\""));
                    }
                    path += token.prefix + segment + token.suffix;
                }
                continue;
            }
            if (typeof value === "string" || typeof value === "number") {
                var segment = encode(String(value), token);
                if (validate && !matches[i].test(segment)) {
                    throw new TypeError("Expected \"".concat(token.name, "\" to match \"").concat(token.pattern, "\", but got \"").concat(segment, "\""));
                }
                path += token.prefix + segment + token.suffix;
                continue;
            }
            if (optional)
                continue;
            var typeOfMessage = repeat ? "an array" : "a string";
            throw new TypeError("Expected \"".concat(token.name, "\" to be ").concat(typeOfMessage));
        }
        return path;
    };
}
/**
 * Escape a regular expression string.
 */
function escapeString(str) {
    return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
/**
 * Get the flags for a regexp from the options.
 */
function flags(options) {
    return options && options.sensitive ? "" : "i";
}

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return segment[0].spread ? `/:${segment[0].content.slice(3)}(.*)?` : "/" + segment.map((part) => {
      if (part)
        return part.dynamic ? `:${part.content}` : part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return toPath;
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  return {
    ...serializedManifest,
    assets,
    routes
  };
}

const _manifest = Object.assign(deserializeManifest({"adapterName":"@astrojs/node","routes":[{"file":"","links":["assets/28967f64.924451e0.css"],"scripts":[{"type":"inline","value":"function g(s,e,t,m){s.addEventListener(\"click\",n=>{const i=t.getAttribute(\"data-state\");i==\"open\"?(t.setAttribute(\"data-state\",\"closed\"),t.style.width=\"0vw\"):i==\"closed\"&&(t.setAttribute(\"data-state\",\"open\"),t.style.width=t.getAttribute(\"data-width\")),n.preventDefault()});var d=!1,o,a;function l(){d=!1,t.style.transition=\"width 0.5s\",t.clientWidth<20?(t.setAttribute(\"data-state\",\"closed\"),t.setAttribute(\"data-width\",\"20vw\")):t.setAttribute(\"data-state\",\"open\"),e.style.backgroundColor=\"#1E1E1E\"}e.addEventListener(\"mouseenter\",n=>{e.style.backgroundColor=\"#007ACC\"}),e.addEventListener(\"mouseleave\",n=>{e.style.backgroundColor=\"#1E1E1E\"}),e.addEventListener(\"mousedown\",n=>{d=!0,o=n.x,a=t.clientWidth,t.style.transition=\"none\"}),e.addEventListener(\"mouseup\",n=>{l()}),document.addEventListener(\"mouseup\",n=>{d==!0&&l()}),document.addEventListener(\"mousemove\",n=>{if(d==!0){const i=m?a+n.x-o:a-n.x+o;i<=60?(t.style.width=\"0px\",t.setAttribute(\"data-width\",\"0px\"),e.style.backgroundColor=\"#007ACC\"):i<160||(i<document.documentElement.clientWidth*.4?(t.style.width=i+\"px\",t.setAttribute(\"data-width\",i+\"px\"),e.style.backgroundColor=\"#007ACC\"):e.style.backgroundColor=\"red\"),n.preventDefault()}})}const r=document.getElementById(\"fixed-left\");if(r.classList.contains(\"active\")){const s=document.getElementById(\"resize-left\"),e=s.previousElementSibling;g(r,s,e,!0)}const c=document.getElementById(\"fixed-right\");if(c.classList.contains(\"active\")){const s=document.getElementById(\"resize-right\"),e=s.nextElementSibling;g(c,s,e,!1)}let u=document.getElementsByClassName(\"toc_expand\");for(let s=0;s<u.length;s++)u[s].addEventListener(\"click\",function(e){this.parentElement.parentElement.querySelector(\"ul\")?.classList.toggle(\"hidden\"),this.parentElement.classList.toggle(\"expanded\"),e.preventDefault()});let f=document.getElementsByClassName(\"nav_expand\");for(let s=0;s<f.length;s++)f[s].addEventListener(\"click\",function(e){const t=this.parentElement.querySelector(\"ul\");t.classList.toggle(\"hidden\"),t.classList.contains(\"hidden\")?this.classList.remove(\"expanded\"):this.classList.add(\"expanded\"),e.preventDefault()});\n"}],"routeData":{"route":"/","type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.md","pathname":"/","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/28967f64.924451e0.css"],"scripts":[{"type":"inline","value":"function g(s,e,t,m){s.addEventListener(\"click\",n=>{const i=t.getAttribute(\"data-state\");i==\"open\"?(t.setAttribute(\"data-state\",\"closed\"),t.style.width=\"0vw\"):i==\"closed\"&&(t.setAttribute(\"data-state\",\"open\"),t.style.width=t.getAttribute(\"data-width\")),n.preventDefault()});var d=!1,o,a;function l(){d=!1,t.style.transition=\"width 0.5s\",t.clientWidth<20?(t.setAttribute(\"data-state\",\"closed\"),t.setAttribute(\"data-width\",\"20vw\")):t.setAttribute(\"data-state\",\"open\"),e.style.backgroundColor=\"#1E1E1E\"}e.addEventListener(\"mouseenter\",n=>{e.style.backgroundColor=\"#007ACC\"}),e.addEventListener(\"mouseleave\",n=>{e.style.backgroundColor=\"#1E1E1E\"}),e.addEventListener(\"mousedown\",n=>{d=!0,o=n.x,a=t.clientWidth,t.style.transition=\"none\"}),e.addEventListener(\"mouseup\",n=>{l()}),document.addEventListener(\"mouseup\",n=>{d==!0&&l()}),document.addEventListener(\"mousemove\",n=>{if(d==!0){const i=m?a+n.x-o:a-n.x+o;i<=60?(t.style.width=\"0px\",t.setAttribute(\"data-width\",\"0px\"),e.style.backgroundColor=\"#007ACC\"):i<160||(i<document.documentElement.clientWidth*.4?(t.style.width=i+\"px\",t.setAttribute(\"data-width\",i+\"px\"),e.style.backgroundColor=\"#007ACC\"):e.style.backgroundColor=\"red\"),n.preventDefault()}})}const r=document.getElementById(\"fixed-left\");if(r.classList.contains(\"active\")){const s=document.getElementById(\"resize-left\"),e=s.previousElementSibling;g(r,s,e,!0)}const c=document.getElementById(\"fixed-right\");if(c.classList.contains(\"active\")){const s=document.getElementById(\"resize-right\"),e=s.nextElementSibling;g(c,s,e,!1)}let u=document.getElementsByClassName(\"toc_expand\");for(let s=0;s<u.length;s++)u[s].addEventListener(\"click\",function(e){this.parentElement.parentElement.querySelector(\"ul\")?.classList.toggle(\"hidden\"),this.parentElement.classList.toggle(\"expanded\"),e.preventDefault()});let f=document.getElementsByClassName(\"nav_expand\");for(let s=0;s<f.length;s++)f[s].addEventListener(\"click\",function(e){const t=this.parentElement.querySelector(\"ul\");t.classList.toggle(\"hidden\"),t.classList.contains(\"hidden\")?this.classList.remove(\"expanded\"):this.classList.add(\"expanded\"),e.preventDefault()});\n"}],"routeData":{"route":"/components","type":"page","pattern":"^\\/components\\/?$","segments":[[{"content":"components","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/components.mdx","pathname":"/components","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/28967f64.924451e0.css"],"scripts":[{"type":"inline","value":"function g(s,e,t,m){s.addEventListener(\"click\",n=>{const i=t.getAttribute(\"data-state\");i==\"open\"?(t.setAttribute(\"data-state\",\"closed\"),t.style.width=\"0vw\"):i==\"closed\"&&(t.setAttribute(\"data-state\",\"open\"),t.style.width=t.getAttribute(\"data-width\")),n.preventDefault()});var d=!1,o,a;function l(){d=!1,t.style.transition=\"width 0.5s\",t.clientWidth<20?(t.setAttribute(\"data-state\",\"closed\"),t.setAttribute(\"data-width\",\"20vw\")):t.setAttribute(\"data-state\",\"open\"),e.style.backgroundColor=\"#1E1E1E\"}e.addEventListener(\"mouseenter\",n=>{e.style.backgroundColor=\"#007ACC\"}),e.addEventListener(\"mouseleave\",n=>{e.style.backgroundColor=\"#1E1E1E\"}),e.addEventListener(\"mousedown\",n=>{d=!0,o=n.x,a=t.clientWidth,t.style.transition=\"none\"}),e.addEventListener(\"mouseup\",n=>{l()}),document.addEventListener(\"mouseup\",n=>{d==!0&&l()}),document.addEventListener(\"mousemove\",n=>{if(d==!0){const i=m?a+n.x-o:a-n.x+o;i<=60?(t.style.width=\"0px\",t.setAttribute(\"data-width\",\"0px\"),e.style.backgroundColor=\"#007ACC\"):i<160||(i<document.documentElement.clientWidth*.4?(t.style.width=i+\"px\",t.setAttribute(\"data-width\",i+\"px\"),e.style.backgroundColor=\"#007ACC\"):e.style.backgroundColor=\"red\"),n.preventDefault()}})}const r=document.getElementById(\"fixed-left\");if(r.classList.contains(\"active\")){const s=document.getElementById(\"resize-left\"),e=s.previousElementSibling;g(r,s,e,!0)}const c=document.getElementById(\"fixed-right\");if(c.classList.contains(\"active\")){const s=document.getElementById(\"resize-right\"),e=s.nextElementSibling;g(c,s,e,!1)}let u=document.getElementsByClassName(\"toc_expand\");for(let s=0;s<u.length;s++)u[s].addEventListener(\"click\",function(e){this.parentElement.parentElement.querySelector(\"ul\")?.classList.toggle(\"hidden\"),this.parentElement.classList.toggle(\"expanded\"),e.preventDefault()});let f=document.getElementsByClassName(\"nav_expand\");for(let s=0;s<f.length;s++)f[s].addEventListener(\"click\",function(e){const t=this.parentElement.querySelector(\"ul\");t.classList.toggle(\"hidden\"),t.classList.contains(\"hidden\")?this.classList.remove(\"expanded\"):this.classList.add(\"expanded\"),e.preventDefault()});\n"}],"routeData":{"route":"/readme","type":"page","pattern":"^\\/readme\\/?$","segments":[[{"content":"readme","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/readme.astro","pathname":"/readme","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/28967f64.924451e0.css"],"scripts":[{"type":"inline","value":"function g(s,e,t,m){s.addEventListener(\"click\",n=>{const i=t.getAttribute(\"data-state\");i==\"open\"?(t.setAttribute(\"data-state\",\"closed\"),t.style.width=\"0vw\"):i==\"closed\"&&(t.setAttribute(\"data-state\",\"open\"),t.style.width=t.getAttribute(\"data-width\")),n.preventDefault()});var d=!1,o,a;function l(){d=!1,t.style.transition=\"width 0.5s\",t.clientWidth<20?(t.setAttribute(\"data-state\",\"closed\"),t.setAttribute(\"data-width\",\"20vw\")):t.setAttribute(\"data-state\",\"open\"),e.style.backgroundColor=\"#1E1E1E\"}e.addEventListener(\"mouseenter\",n=>{e.style.backgroundColor=\"#007ACC\"}),e.addEventListener(\"mouseleave\",n=>{e.style.backgroundColor=\"#1E1E1E\"}),e.addEventListener(\"mousedown\",n=>{d=!0,o=n.x,a=t.clientWidth,t.style.transition=\"none\"}),e.addEventListener(\"mouseup\",n=>{l()}),document.addEventListener(\"mouseup\",n=>{d==!0&&l()}),document.addEventListener(\"mousemove\",n=>{if(d==!0){const i=m?a+n.x-o:a-n.x+o;i<=60?(t.style.width=\"0px\",t.setAttribute(\"data-width\",\"0px\"),e.style.backgroundColor=\"#007ACC\"):i<160||(i<document.documentElement.clientWidth*.4?(t.style.width=i+\"px\",t.setAttribute(\"data-width\",i+\"px\"),e.style.backgroundColor=\"#007ACC\"):e.style.backgroundColor=\"red\"),n.preventDefault()}})}const r=document.getElementById(\"fixed-left\");if(r.classList.contains(\"active\")){const s=document.getElementById(\"resize-left\"),e=s.previousElementSibling;g(r,s,e,!0)}const c=document.getElementById(\"fixed-right\");if(c.classList.contains(\"active\")){const s=document.getElementById(\"resize-right\"),e=s.nextElementSibling;g(c,s,e,!1)}let u=document.getElementsByClassName(\"toc_expand\");for(let s=0;s<u.length;s++)u[s].addEventListener(\"click\",function(e){this.parentElement.parentElement.querySelector(\"ul\")?.classList.toggle(\"hidden\"),this.parentElement.classList.toggle(\"expanded\"),e.preventDefault()});let f=document.getElementsByClassName(\"nav_expand\");for(let s=0;s<f.length;s++)f[s].addEventListener(\"click\",function(e){const t=this.parentElement.querySelector(\"ul\");t.classList.toggle(\"hidden\"),t.classList.contains(\"hidden\")?this.classList.remove(\"expanded\"):this.classList.add(\"expanded\"),e.preventDefault()});\n"}],"routeData":{"route":"/about","type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about/index.astro","pathname":"/about","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/28967f64.924451e0.css"],"scripts":[{"type":"inline","value":"function g(s,e,t,m){s.addEventListener(\"click\",n=>{const i=t.getAttribute(\"data-state\");i==\"open\"?(t.setAttribute(\"data-state\",\"closed\"),t.style.width=\"0vw\"):i==\"closed\"&&(t.setAttribute(\"data-state\",\"open\"),t.style.width=t.getAttribute(\"data-width\")),n.preventDefault()});var d=!1,o,a;function l(){d=!1,t.style.transition=\"width 0.5s\",t.clientWidth<20?(t.setAttribute(\"data-state\",\"closed\"),t.setAttribute(\"data-width\",\"20vw\")):t.setAttribute(\"data-state\",\"open\"),e.style.backgroundColor=\"#1E1E1E\"}e.addEventListener(\"mouseenter\",n=>{e.style.backgroundColor=\"#007ACC\"}),e.addEventListener(\"mouseleave\",n=>{e.style.backgroundColor=\"#1E1E1E\"}),e.addEventListener(\"mousedown\",n=>{d=!0,o=n.x,a=t.clientWidth,t.style.transition=\"none\"}),e.addEventListener(\"mouseup\",n=>{l()}),document.addEventListener(\"mouseup\",n=>{d==!0&&l()}),document.addEventListener(\"mousemove\",n=>{if(d==!0){const i=m?a+n.x-o:a-n.x+o;i<=60?(t.style.width=\"0px\",t.setAttribute(\"data-width\",\"0px\"),e.style.backgroundColor=\"#007ACC\"):i<160||(i<document.documentElement.clientWidth*.4?(t.style.width=i+\"px\",t.setAttribute(\"data-width\",i+\"px\"),e.style.backgroundColor=\"#007ACC\"):e.style.backgroundColor=\"red\"),n.preventDefault()}})}const r=document.getElementById(\"fixed-left\");if(r.classList.contains(\"active\")){const s=document.getElementById(\"resize-left\"),e=s.previousElementSibling;g(r,s,e,!0)}const c=document.getElementById(\"fixed-right\");if(c.classList.contains(\"active\")){const s=document.getElementById(\"resize-right\"),e=s.nextElementSibling;g(c,s,e,!1)}let u=document.getElementsByClassName(\"toc_expand\");for(let s=0;s<u.length;s++)u[s].addEventListener(\"click\",function(e){this.parentElement.parentElement.querySelector(\"ul\")?.classList.toggle(\"hidden\"),this.parentElement.classList.toggle(\"expanded\"),e.preventDefault()});let f=document.getElementsByClassName(\"nav_expand\");for(let s=0;s<f.length;s++)f[s].addEventListener(\"click\",function(e){const t=this.parentElement.querySelector(\"ul\");t.classList.toggle(\"hidden\"),t.classList.contains(\"hidden\")?this.classList.remove(\"expanded\"):this.classList.add(\"expanded\"),e.preventDefault()});\n"}],"routeData":{"route":"/astro/deep_toc","type":"page","pattern":"^\\/astro\\/deep_toc\\/?$","segments":[[{"content":"astro","dynamic":false,"spread":false}],[{"content":"deep_toc","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/astro/deep_toc.md","pathname":"/astro/deep_toc","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/28967f64.924451e0.css"],"scripts":[{"type":"inline","value":"function g(s,e,t,m){s.addEventListener(\"click\",n=>{const i=t.getAttribute(\"data-state\");i==\"open\"?(t.setAttribute(\"data-state\",\"closed\"),t.style.width=\"0vw\"):i==\"closed\"&&(t.setAttribute(\"data-state\",\"open\"),t.style.width=t.getAttribute(\"data-width\")),n.preventDefault()});var d=!1,o,a;function l(){d=!1,t.style.transition=\"width 0.5s\",t.clientWidth<20?(t.setAttribute(\"data-state\",\"closed\"),t.setAttribute(\"data-width\",\"20vw\")):t.setAttribute(\"data-state\",\"open\"),e.style.backgroundColor=\"#1E1E1E\"}e.addEventListener(\"mouseenter\",n=>{e.style.backgroundColor=\"#007ACC\"}),e.addEventListener(\"mouseleave\",n=>{e.style.backgroundColor=\"#1E1E1E\"}),e.addEventListener(\"mousedown\",n=>{d=!0,o=n.x,a=t.clientWidth,t.style.transition=\"none\"}),e.addEventListener(\"mouseup\",n=>{l()}),document.addEventListener(\"mouseup\",n=>{d==!0&&l()}),document.addEventListener(\"mousemove\",n=>{if(d==!0){const i=m?a+n.x-o:a-n.x+o;i<=60?(t.style.width=\"0px\",t.setAttribute(\"data-width\",\"0px\"),e.style.backgroundColor=\"#007ACC\"):i<160||(i<document.documentElement.clientWidth*.4?(t.style.width=i+\"px\",t.setAttribute(\"data-width\",i+\"px\"),e.style.backgroundColor=\"#007ACC\"):e.style.backgroundColor=\"red\"),n.preventDefault()}})}const r=document.getElementById(\"fixed-left\");if(r.classList.contains(\"active\")){const s=document.getElementById(\"resize-left\"),e=s.previousElementSibling;g(r,s,e,!0)}const c=document.getElementById(\"fixed-right\");if(c.classList.contains(\"active\")){const s=document.getElementById(\"resize-right\"),e=s.nextElementSibling;g(c,s,e,!1)}let u=document.getElementsByClassName(\"toc_expand\");for(let s=0;s<u.length;s++)u[s].addEventListener(\"click\",function(e){this.parentElement.parentElement.querySelector(\"ul\")?.classList.toggle(\"hidden\"),this.parentElement.classList.toggle(\"expanded\"),e.preventDefault()});let f=document.getElementsByClassName(\"nav_expand\");for(let s=0;s<f.length;s++)f[s].addEventListener(\"click\",function(e){const t=this.parentElement.querySelector(\"ul\");t.classList.toggle(\"hidden\"),t.classList.contains(\"hidden\")?this.classList.remove(\"expanded\"):this.classList.add(\"expanded\"),e.preventDefault()});\n"}],"routeData":{"route":"/astro/domain1/subpage1","type":"page","pattern":"^\\/astro\\/domain1\\/subpage1\\/?$","segments":[[{"content":"astro","dynamic":false,"spread":false}],[{"content":"domain1","dynamic":false,"spread":false}],[{"content":"subpage1","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/astro/domain1/subpage1.astro","pathname":"/astro/domain1/subpage1","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/28967f64.924451e0.css"],"scripts":[{"type":"inline","value":"function g(s,e,t,m){s.addEventListener(\"click\",n=>{const i=t.getAttribute(\"data-state\");i==\"open\"?(t.setAttribute(\"data-state\",\"closed\"),t.style.width=\"0vw\"):i==\"closed\"&&(t.setAttribute(\"data-state\",\"open\"),t.style.width=t.getAttribute(\"data-width\")),n.preventDefault()});var d=!1,o,a;function l(){d=!1,t.style.transition=\"width 0.5s\",t.clientWidth<20?(t.setAttribute(\"data-state\",\"closed\"),t.setAttribute(\"data-width\",\"20vw\")):t.setAttribute(\"data-state\",\"open\"),e.style.backgroundColor=\"#1E1E1E\"}e.addEventListener(\"mouseenter\",n=>{e.style.backgroundColor=\"#007ACC\"}),e.addEventListener(\"mouseleave\",n=>{e.style.backgroundColor=\"#1E1E1E\"}),e.addEventListener(\"mousedown\",n=>{d=!0,o=n.x,a=t.clientWidth,t.style.transition=\"none\"}),e.addEventListener(\"mouseup\",n=>{l()}),document.addEventListener(\"mouseup\",n=>{d==!0&&l()}),document.addEventListener(\"mousemove\",n=>{if(d==!0){const i=m?a+n.x-o:a-n.x+o;i<=60?(t.style.width=\"0px\",t.setAttribute(\"data-width\",\"0px\"),e.style.backgroundColor=\"#007ACC\"):i<160||(i<document.documentElement.clientWidth*.4?(t.style.width=i+\"px\",t.setAttribute(\"data-width\",i+\"px\"),e.style.backgroundColor=\"#007ACC\"):e.style.backgroundColor=\"red\"),n.preventDefault()}})}const r=document.getElementById(\"fixed-left\");if(r.classList.contains(\"active\")){const s=document.getElementById(\"resize-left\"),e=s.previousElementSibling;g(r,s,e,!0)}const c=document.getElementById(\"fixed-right\");if(c.classList.contains(\"active\")){const s=document.getElementById(\"resize-right\"),e=s.nextElementSibling;g(c,s,e,!1)}let u=document.getElementsByClassName(\"toc_expand\");for(let s=0;s<u.length;s++)u[s].addEventListener(\"click\",function(e){this.parentElement.parentElement.querySelector(\"ul\")?.classList.toggle(\"hidden\"),this.parentElement.classList.toggle(\"expanded\"),e.preventDefault()});let f=document.getElementsByClassName(\"nav_expand\");for(let s=0;s<f.length;s++)f[s].addEventListener(\"click\",function(e){const t=this.parentElement.querySelector(\"ul\");t.classList.toggle(\"hidden\"),t.classList.contains(\"hidden\")?this.classList.remove(\"expanded\"):this.classList.add(\"expanded\"),e.preventDefault()});\n"}],"routeData":{"route":"/astro/domain1/subpage2","type":"page","pattern":"^\\/astro\\/domain1\\/subpage2\\/?$","segments":[[{"content":"astro","dynamic":false,"spread":false}],[{"content":"domain1","dynamic":false,"spread":false}],[{"content":"subpage2","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/astro/domain1/subpage2.astro","pathname":"/astro/domain1/subpage2","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/28967f64.924451e0.css"],"scripts":[{"type":"inline","value":"function g(s,e,t,m){s.addEventListener(\"click\",n=>{const i=t.getAttribute(\"data-state\");i==\"open\"?(t.setAttribute(\"data-state\",\"closed\"),t.style.width=\"0vw\"):i==\"closed\"&&(t.setAttribute(\"data-state\",\"open\"),t.style.width=t.getAttribute(\"data-width\")),n.preventDefault()});var d=!1,o,a;function l(){d=!1,t.style.transition=\"width 0.5s\",t.clientWidth<20?(t.setAttribute(\"data-state\",\"closed\"),t.setAttribute(\"data-width\",\"20vw\")):t.setAttribute(\"data-state\",\"open\"),e.style.backgroundColor=\"#1E1E1E\"}e.addEventListener(\"mouseenter\",n=>{e.style.backgroundColor=\"#007ACC\"}),e.addEventListener(\"mouseleave\",n=>{e.style.backgroundColor=\"#1E1E1E\"}),e.addEventListener(\"mousedown\",n=>{d=!0,o=n.x,a=t.clientWidth,t.style.transition=\"none\"}),e.addEventListener(\"mouseup\",n=>{l()}),document.addEventListener(\"mouseup\",n=>{d==!0&&l()}),document.addEventListener(\"mousemove\",n=>{if(d==!0){const i=m?a+n.x-o:a-n.x+o;i<=60?(t.style.width=\"0px\",t.setAttribute(\"data-width\",\"0px\"),e.style.backgroundColor=\"#007ACC\"):i<160||(i<document.documentElement.clientWidth*.4?(t.style.width=i+\"px\",t.setAttribute(\"data-width\",i+\"px\"),e.style.backgroundColor=\"#007ACC\"):e.style.backgroundColor=\"red\"),n.preventDefault()}})}const r=document.getElementById(\"fixed-left\");if(r.classList.contains(\"active\")){const s=document.getElementById(\"resize-left\"),e=s.previousElementSibling;g(r,s,e,!0)}const c=document.getElementById(\"fixed-right\");if(c.classList.contains(\"active\")){const s=document.getElementById(\"resize-right\"),e=s.nextElementSibling;g(c,s,e,!1)}let u=document.getElementsByClassName(\"toc_expand\");for(let s=0;s<u.length;s++)u[s].addEventListener(\"click\",function(e){this.parentElement.parentElement.querySelector(\"ul\")?.classList.toggle(\"hidden\"),this.parentElement.classList.toggle(\"expanded\"),e.preventDefault()});let f=document.getElementsByClassName(\"nav_expand\");for(let s=0;s<f.length;s++)f[s].addEventListener(\"click\",function(e){const t=this.parentElement.querySelector(\"ul\");t.classList.toggle(\"hidden\"),t.classList.contains(\"hidden\")?this.classList.remove(\"expanded\"):this.classList.add(\"expanded\"),e.preventDefault()});\n"}],"routeData":{"route":"/astro/domain2/subdomain2/spage5","type":"page","pattern":"^\\/astro\\/domain2\\/subdomain2\\/spage5\\/?$","segments":[[{"content":"astro","dynamic":false,"spread":false}],[{"content":"domain2","dynamic":false,"spread":false}],[{"content":"subdomain2","dynamic":false,"spread":false}],[{"content":"spage5","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/astro/domain2/subdomain2/spage5.astro","pathname":"/astro/domain2/subdomain2/spage5","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/28967f64.924451e0.css"],"scripts":[{"type":"inline","value":"function g(s,e,t,m){s.addEventListener(\"click\",n=>{const i=t.getAttribute(\"data-state\");i==\"open\"?(t.setAttribute(\"data-state\",\"closed\"),t.style.width=\"0vw\"):i==\"closed\"&&(t.setAttribute(\"data-state\",\"open\"),t.style.width=t.getAttribute(\"data-width\")),n.preventDefault()});var d=!1,o,a;function l(){d=!1,t.style.transition=\"width 0.5s\",t.clientWidth<20?(t.setAttribute(\"data-state\",\"closed\"),t.setAttribute(\"data-width\",\"20vw\")):t.setAttribute(\"data-state\",\"open\"),e.style.backgroundColor=\"#1E1E1E\"}e.addEventListener(\"mouseenter\",n=>{e.style.backgroundColor=\"#007ACC\"}),e.addEventListener(\"mouseleave\",n=>{e.style.backgroundColor=\"#1E1E1E\"}),e.addEventListener(\"mousedown\",n=>{d=!0,o=n.x,a=t.clientWidth,t.style.transition=\"none\"}),e.addEventListener(\"mouseup\",n=>{l()}),document.addEventListener(\"mouseup\",n=>{d==!0&&l()}),document.addEventListener(\"mousemove\",n=>{if(d==!0){const i=m?a+n.x-o:a-n.x+o;i<=60?(t.style.width=\"0px\",t.setAttribute(\"data-width\",\"0px\"),e.style.backgroundColor=\"#007ACC\"):i<160||(i<document.documentElement.clientWidth*.4?(t.style.width=i+\"px\",t.setAttribute(\"data-width\",i+\"px\"),e.style.backgroundColor=\"#007ACC\"):e.style.backgroundColor=\"red\"),n.preventDefault()}})}const r=document.getElementById(\"fixed-left\");if(r.classList.contains(\"active\")){const s=document.getElementById(\"resize-left\"),e=s.previousElementSibling;g(r,s,e,!0)}const c=document.getElementById(\"fixed-right\");if(c.classList.contains(\"active\")){const s=document.getElementById(\"resize-right\"),e=s.nextElementSibling;g(c,s,e,!1)}let u=document.getElementsByClassName(\"toc_expand\");for(let s=0;s<u.length;s++)u[s].addEventListener(\"click\",function(e){this.parentElement.parentElement.querySelector(\"ul\")?.classList.toggle(\"hidden\"),this.parentElement.classList.toggle(\"expanded\"),e.preventDefault()});let f=document.getElementsByClassName(\"nav_expand\");for(let s=0;s<f.length;s++)f[s].addEventListener(\"click\",function(e){const t=this.parentElement.querySelector(\"ul\");t.classList.toggle(\"hidden\"),t.classList.contains(\"hidden\")?this.classList.remove(\"expanded\"):this.classList.add(\"expanded\"),e.preventDefault()});\n"}],"routeData":{"route":"/astro/domain2/subpage4","type":"page","pattern":"^\\/astro\\/domain2\\/subpage4\\/?$","segments":[[{"content":"astro","dynamic":false,"spread":false}],[{"content":"domain2","dynamic":false,"spread":false}],[{"content":"subpage4","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/astro/domain2/subpage4.astro","pathname":"/astro/domain2/subpage4","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/28967f64.924451e0.css"],"scripts":[{"type":"inline","value":"function g(s,e,t,m){s.addEventListener(\"click\",n=>{const i=t.getAttribute(\"data-state\");i==\"open\"?(t.setAttribute(\"data-state\",\"closed\"),t.style.width=\"0vw\"):i==\"closed\"&&(t.setAttribute(\"data-state\",\"open\"),t.style.width=t.getAttribute(\"data-width\")),n.preventDefault()});var d=!1,o,a;function l(){d=!1,t.style.transition=\"width 0.5s\",t.clientWidth<20?(t.setAttribute(\"data-state\",\"closed\"),t.setAttribute(\"data-width\",\"20vw\")):t.setAttribute(\"data-state\",\"open\"),e.style.backgroundColor=\"#1E1E1E\"}e.addEventListener(\"mouseenter\",n=>{e.style.backgroundColor=\"#007ACC\"}),e.addEventListener(\"mouseleave\",n=>{e.style.backgroundColor=\"#1E1E1E\"}),e.addEventListener(\"mousedown\",n=>{d=!0,o=n.x,a=t.clientWidth,t.style.transition=\"none\"}),e.addEventListener(\"mouseup\",n=>{l()}),document.addEventListener(\"mouseup\",n=>{d==!0&&l()}),document.addEventListener(\"mousemove\",n=>{if(d==!0){const i=m?a+n.x-o:a-n.x+o;i<=60?(t.style.width=\"0px\",t.setAttribute(\"data-width\",\"0px\"),e.style.backgroundColor=\"#007ACC\"):i<160||(i<document.documentElement.clientWidth*.4?(t.style.width=i+\"px\",t.setAttribute(\"data-width\",i+\"px\"),e.style.backgroundColor=\"#007ACC\"):e.style.backgroundColor=\"red\"),n.preventDefault()}})}const r=document.getElementById(\"fixed-left\");if(r.classList.contains(\"active\")){const s=document.getElementById(\"resize-left\"),e=s.previousElementSibling;g(r,s,e,!0)}const c=document.getElementById(\"fixed-right\");if(c.classList.contains(\"active\")){const s=document.getElementById(\"resize-right\"),e=s.nextElementSibling;g(c,s,e,!1)}let u=document.getElementsByClassName(\"toc_expand\");for(let s=0;s<u.length;s++)u[s].addEventListener(\"click\",function(e){this.parentElement.parentElement.querySelector(\"ul\")?.classList.toggle(\"hidden\"),this.parentElement.classList.toggle(\"expanded\"),e.preventDefault()});let f=document.getElementsByClassName(\"nav_expand\");for(let s=0;s<f.length;s++)f[s].addEventListener(\"click\",function(e){const t=this.parentElement.querySelector(\"ul\");t.classList.toggle(\"hidden\"),t.classList.contains(\"hidden\")?this.classList.remove(\"expanded\"):this.classList.add(\"expanded\"),e.preventDefault()});\n"}],"routeData":{"route":"/astro/page1","type":"page","pattern":"^\\/astro\\/page1\\/?$","segments":[[{"content":"astro","dynamic":false,"spread":false}],[{"content":"page1","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/astro/page1.astro","pathname":"/astro/page1","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/28967f64.924451e0.css"],"scripts":[{"type":"inline","value":"function g(s,e,t,m){s.addEventListener(\"click\",n=>{const i=t.getAttribute(\"data-state\");i==\"open\"?(t.setAttribute(\"data-state\",\"closed\"),t.style.width=\"0vw\"):i==\"closed\"&&(t.setAttribute(\"data-state\",\"open\"),t.style.width=t.getAttribute(\"data-width\")),n.preventDefault()});var d=!1,o,a;function l(){d=!1,t.style.transition=\"width 0.5s\",t.clientWidth<20?(t.setAttribute(\"data-state\",\"closed\"),t.setAttribute(\"data-width\",\"20vw\")):t.setAttribute(\"data-state\",\"open\"),e.style.backgroundColor=\"#1E1E1E\"}e.addEventListener(\"mouseenter\",n=>{e.style.backgroundColor=\"#007ACC\"}),e.addEventListener(\"mouseleave\",n=>{e.style.backgroundColor=\"#1E1E1E\"}),e.addEventListener(\"mousedown\",n=>{d=!0,o=n.x,a=t.clientWidth,t.style.transition=\"none\"}),e.addEventListener(\"mouseup\",n=>{l()}),document.addEventListener(\"mouseup\",n=>{d==!0&&l()}),document.addEventListener(\"mousemove\",n=>{if(d==!0){const i=m?a+n.x-o:a-n.x+o;i<=60?(t.style.width=\"0px\",t.setAttribute(\"data-width\",\"0px\"),e.style.backgroundColor=\"#007ACC\"):i<160||(i<document.documentElement.clientWidth*.4?(t.style.width=i+\"px\",t.setAttribute(\"data-width\",i+\"px\"),e.style.backgroundColor=\"#007ACC\"):e.style.backgroundColor=\"red\"),n.preventDefault()}})}const r=document.getElementById(\"fixed-left\");if(r.classList.contains(\"active\")){const s=document.getElementById(\"resize-left\"),e=s.previousElementSibling;g(r,s,e,!0)}const c=document.getElementById(\"fixed-right\");if(c.classList.contains(\"active\")){const s=document.getElementById(\"resize-right\"),e=s.nextElementSibling;g(c,s,e,!1)}let u=document.getElementsByClassName(\"toc_expand\");for(let s=0;s<u.length;s++)u[s].addEventListener(\"click\",function(e){this.parentElement.parentElement.querySelector(\"ul\")?.classList.toggle(\"hidden\"),this.parentElement.classList.toggle(\"expanded\"),e.preventDefault()});let f=document.getElementsByClassName(\"nav_expand\");for(let s=0;s<f.length;s++)f[s].addEventListener(\"click\",function(e){const t=this.parentElement.querySelector(\"ul\");t.classList.toggle(\"hidden\"),t.classList.contains(\"hidden\")?this.classList.remove(\"expanded\"):this.classList.add(\"expanded\"),e.preventDefault()});\n"}],"routeData":{"route":"/astro/page2","type":"page","pattern":"^\\/astro\\/page2\\/?$","segments":[[{"content":"astro","dynamic":false,"spread":false}],[{"content":"page2","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/astro/page2.astro","pathname":"/astro/page2","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/28967f64.924451e0.css"],"scripts":[{"type":"inline","value":"function g(s,e,t,m){s.addEventListener(\"click\",n=>{const i=t.getAttribute(\"data-state\");i==\"open\"?(t.setAttribute(\"data-state\",\"closed\"),t.style.width=\"0vw\"):i==\"closed\"&&(t.setAttribute(\"data-state\",\"open\"),t.style.width=t.getAttribute(\"data-width\")),n.preventDefault()});var d=!1,o,a;function l(){d=!1,t.style.transition=\"width 0.5s\",t.clientWidth<20?(t.setAttribute(\"data-state\",\"closed\"),t.setAttribute(\"data-width\",\"20vw\")):t.setAttribute(\"data-state\",\"open\"),e.style.backgroundColor=\"#1E1E1E\"}e.addEventListener(\"mouseenter\",n=>{e.style.backgroundColor=\"#007ACC\"}),e.addEventListener(\"mouseleave\",n=>{e.style.backgroundColor=\"#1E1E1E\"}),e.addEventListener(\"mousedown\",n=>{d=!0,o=n.x,a=t.clientWidth,t.style.transition=\"none\"}),e.addEventListener(\"mouseup\",n=>{l()}),document.addEventListener(\"mouseup\",n=>{d==!0&&l()}),document.addEventListener(\"mousemove\",n=>{if(d==!0){const i=m?a+n.x-o:a-n.x+o;i<=60?(t.style.width=\"0px\",t.setAttribute(\"data-width\",\"0px\"),e.style.backgroundColor=\"#007ACC\"):i<160||(i<document.documentElement.clientWidth*.4?(t.style.width=i+\"px\",t.setAttribute(\"data-width\",i+\"px\"),e.style.backgroundColor=\"#007ACC\"):e.style.backgroundColor=\"red\"),n.preventDefault()}})}const r=document.getElementById(\"fixed-left\");if(r.classList.contains(\"active\")){const s=document.getElementById(\"resize-left\"),e=s.previousElementSibling;g(r,s,e,!0)}const c=document.getElementById(\"fixed-right\");if(c.classList.contains(\"active\")){const s=document.getElementById(\"resize-right\"),e=s.nextElementSibling;g(c,s,e,!1)}let u=document.getElementsByClassName(\"toc_expand\");for(let s=0;s<u.length;s++)u[s].addEventListener(\"click\",function(e){this.parentElement.parentElement.querySelector(\"ul\")?.classList.toggle(\"hidden\"),this.parentElement.classList.toggle(\"expanded\"),e.preventDefault()});let f=document.getElementsByClassName(\"nav_expand\");for(let s=0;s<f.length;s++)f[s].addEventListener(\"click\",function(e){const t=this.parentElement.querySelector(\"ul\");t.classList.toggle(\"hidden\"),t.classList.contains(\"hidden\")?this.classList.remove(\"expanded\"):this.classList.add(\"expanded\"),e.preventDefault()});\n"}],"routeData":{"route":"/astro/page3","type":"page","pattern":"^\\/astro\\/page3\\/?$","segments":[[{"content":"astro","dynamic":false,"spread":false}],[{"content":"page3","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/astro/page3.astro","pathname":"/astro/page3","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"routeData":{"route":"/blog/test","type":"endpoint","pattern":"^\\/blog\\/test$","segments":[[{"content":"blog","dynamic":false,"spread":false}],[{"content":"test","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog/test.js","pathname":"/blog/test","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/28967f64.924451e0.css"],"scripts":[{"type":"inline","value":"function g(s,e,t,m){s.addEventListener(\"click\",n=>{const i=t.getAttribute(\"data-state\");i==\"open\"?(t.setAttribute(\"data-state\",\"closed\"),t.style.width=\"0vw\"):i==\"closed\"&&(t.setAttribute(\"data-state\",\"open\"),t.style.width=t.getAttribute(\"data-width\")),n.preventDefault()});var d=!1,o,a;function l(){d=!1,t.style.transition=\"width 0.5s\",t.clientWidth<20?(t.setAttribute(\"data-state\",\"closed\"),t.setAttribute(\"data-width\",\"20vw\")):t.setAttribute(\"data-state\",\"open\"),e.style.backgroundColor=\"#1E1E1E\"}e.addEventListener(\"mouseenter\",n=>{e.style.backgroundColor=\"#007ACC\"}),e.addEventListener(\"mouseleave\",n=>{e.style.backgroundColor=\"#1E1E1E\"}),e.addEventListener(\"mousedown\",n=>{d=!0,o=n.x,a=t.clientWidth,t.style.transition=\"none\"}),e.addEventListener(\"mouseup\",n=>{l()}),document.addEventListener(\"mouseup\",n=>{d==!0&&l()}),document.addEventListener(\"mousemove\",n=>{if(d==!0){const i=m?a+n.x-o:a-n.x+o;i<=60?(t.style.width=\"0px\",t.setAttribute(\"data-width\",\"0px\"),e.style.backgroundColor=\"#007ACC\"):i<160||(i<document.documentElement.clientWidth*.4?(t.style.width=i+\"px\",t.setAttribute(\"data-width\",i+\"px\"),e.style.backgroundColor=\"#007ACC\"):e.style.backgroundColor=\"red\"),n.preventDefault()}})}const r=document.getElementById(\"fixed-left\");if(r.classList.contains(\"active\")){const s=document.getElementById(\"resize-left\"),e=s.previousElementSibling;g(r,s,e,!0)}const c=document.getElementById(\"fixed-right\");if(c.classList.contains(\"active\")){const s=document.getElementById(\"resize-right\"),e=s.nextElementSibling;g(c,s,e,!1)}let u=document.getElementsByClassName(\"toc_expand\");for(let s=0;s<u.length;s++)u[s].addEventListener(\"click\",function(e){this.parentElement.parentElement.querySelector(\"ul\")?.classList.toggle(\"hidden\"),this.parentElement.classList.toggle(\"expanded\"),e.preventDefault()});let f=document.getElementsByClassName(\"nav_expand\");for(let s=0;s<f.length;s++)f[s].addEventListener(\"click\",function(e){const t=this.parentElement.querySelector(\"ul\");t.classList.toggle(\"hidden\"),t.classList.contains(\"hidden\")?this.classList.remove(\"expanded\"):this.classList.add(\"expanded\"),e.preventDefault()});\n"}],"routeData":{"route":"/blog/[...page]","type":"page","pattern":"^\\/blog(?:\\/(.*?))?\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}],[{"content":"...page","dynamic":true,"spread":true}]],"params":["...page"],"component":"src/pages/blog/[...page].astro","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/28967f64.924451e0.css"],"scripts":[{"type":"inline","value":"function g(s,e,t,m){s.addEventListener(\"click\",n=>{const i=t.getAttribute(\"data-state\");i==\"open\"?(t.setAttribute(\"data-state\",\"closed\"),t.style.width=\"0vw\"):i==\"closed\"&&(t.setAttribute(\"data-state\",\"open\"),t.style.width=t.getAttribute(\"data-width\")),n.preventDefault()});var d=!1,o,a;function l(){d=!1,t.style.transition=\"width 0.5s\",t.clientWidth<20?(t.setAttribute(\"data-state\",\"closed\"),t.setAttribute(\"data-width\",\"20vw\")):t.setAttribute(\"data-state\",\"open\"),e.style.backgroundColor=\"#1E1E1E\"}e.addEventListener(\"mouseenter\",n=>{e.style.backgroundColor=\"#007ACC\"}),e.addEventListener(\"mouseleave\",n=>{e.style.backgroundColor=\"#1E1E1E\"}),e.addEventListener(\"mousedown\",n=>{d=!0,o=n.x,a=t.clientWidth,t.style.transition=\"none\"}),e.addEventListener(\"mouseup\",n=>{l()}),document.addEventListener(\"mouseup\",n=>{d==!0&&l()}),document.addEventListener(\"mousemove\",n=>{if(d==!0){const i=m?a+n.x-o:a-n.x+o;i<=60?(t.style.width=\"0px\",t.setAttribute(\"data-width\",\"0px\"),e.style.backgroundColor=\"#007ACC\"):i<160||(i<document.documentElement.clientWidth*.4?(t.style.width=i+\"px\",t.setAttribute(\"data-width\",i+\"px\"),e.style.backgroundColor=\"#007ACC\"):e.style.backgroundColor=\"red\"),n.preventDefault()}})}const r=document.getElementById(\"fixed-left\");if(r.classList.contains(\"active\")){const s=document.getElementById(\"resize-left\"),e=s.previousElementSibling;g(r,s,e,!0)}const c=document.getElementById(\"fixed-right\");if(c.classList.contains(\"active\")){const s=document.getElementById(\"resize-right\"),e=s.nextElementSibling;g(c,s,e,!1)}let u=document.getElementsByClassName(\"toc_expand\");for(let s=0;s<u.length;s++)u[s].addEventListener(\"click\",function(e){this.parentElement.parentElement.querySelector(\"ul\")?.classList.toggle(\"hidden\"),this.parentElement.classList.toggle(\"expanded\"),e.preventDefault()});let f=document.getElementsByClassName(\"nav_expand\");for(let s=0;s<f.length;s++)f[s].addEventListener(\"click\",function(e){const t=this.parentElement.querySelector(\"ul\");t.classList.toggle(\"hidden\"),t.classList.contains(\"hidden\")?this.classList.remove(\"expanded\"):this.classList.add(\"expanded\"),e.preventDefault()});\n"}],"routeData":{"route":"/code","type":"page","pattern":"^\\/code\\/?$","segments":[[{"content":"code","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/code.md","pathname":"/code","_meta":{"trailingSlash":"ignore"}}}],"base":"/","markdown":{"drafts":false,"syntaxHighlight":"shiki","shikiConfig":{"langs":[],"theme":"github-dark","wrap":false},"remarkPlugins":[],"rehypePlugins":[],"remarkRehype":{},"extendDefaultPlugins":false,"isAstroFlavoredMd":false},"pageMap":null,"renderers":[],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","D:/Dev/MicroWebStacks/astro_nav_menus/data/blog/file1.md":"chunks/file1.6231a67e.mjs","D:/Dev/MicroWebStacks/astro_nav_menus/data/blog/file2.md":"chunks/file2.babd7310.mjs","/astro/hoisted.js?q=0":"hoisted.ba5f86e6.js","astro:scripts/before-hydration.js":""},"assets":["/assets/28967f64.924451e0.css","/favicon.svg","/folders-svgrepo-com.svg","/openfilefolder-svgrepo-com.svg"]}), {
	pageMap: pageMap,
	renderers: renderers
});
const _args = {"mode":"standalone","client":"file:///D:/Dev/MicroWebStacks/astro_nav_menus/dist/client/","server":"file:///D:/Dev/MicroWebStacks/astro_nav_menus/dist/server/","host":false,"port":3000};

const _exports = adapter.createExports(_manifest, _args);
const handler = _exports['handler'];

const _start = 'start';
if(_start in adapter) {
	adapter[_start](_manifest, _args);
}

export { Fragment as F, createVNode as c, handler };
