//in DEV Mode process.env does not have .env content
import * as dotenv from 'dotenv'

const rootdir = process.cwd()

dotenv.config()

const outdir = (process.env.OUT_DIR==null)?"dist":process.env.OUT_DIR
let content_out = outdir
if(import.meta.env.DEV){
    content_out = "public"
}

const config = {
    rootdir: rootdir,
    outDir: outdir,
    content: "content",
    content_out: content_out,
    plantuml_server: "https://www.plantuml.com/plantuml/svg",
    kroki_server: "https://kroki.io",
    client_menu:true,
    assets_hash_dir:false,
    highlighter:{
        theme:"dark-plus",
        langs:['javascript','js','python','yaml']
    }
}

config.collect_content = {
    rootdir:config.rootdir,
    rel_contentdir:config.content,
    content_ext:["md"],
    assets_ext:["svg","webp","png","jpeg","jpg","xlsx","glb","hdr"],
    rel_outdir:".structure",//dist does not persist before build
    raw_menu:"menu.yaml",
    out_menu:"public/menu.json",//used by src\layout\client_nav_menu.js
    debug:true
}

console.log(config)

export {
    config
}
