//in DEV Mode process.env does not have .env content
import * as dotenv from 'dotenv'

dotenv.config()
const rootdir = process.cwd()

const outdir = (process.env.OUT_DIR==null)?"dist":process.env.OUT_DIR
const base = (process.env.PUBLIC_BASE==null)?"":process.env.PUBLIC_BASE
const contentdir = "content"

const config = {
    rootdir: rootdir,
    outDir: outdir,
    base: base,
    content_path: `${rootdir}/${contentdir}`,
    code_path: `${rootdir}/${outdir}/codes`,
    plantuml_server: "https://www.plantuml.com/plantuml/svg",
    kroki_server: "https://kroki.io",
    client_menu:true,
    highlighter:{
        theme:"dark-plus",
        langs:['javascript','js','python','yaml']
    },
    copy_assets:false,
    copy_assets_dir: "_astro",
    assets_hash_dir:true    //N.A. if(copy_assets == false)
}

config.collect_content = {
    rootdir:config.rootdir,
    rel_contentdir:contentdir,
    content_ext:["md"],
    assets_ext:["svg","webp","png","jpeg","jpg","xlsx","glb","hdr"],
    rel_outdir:".structure",//dist does not persist before build
    raw_menu:"menu.yaml",
    out_menu:"public/menu.json",//used by src\layout\client_nav_menu.js
    debug:false
}

console.log(config)

export {
    config
}
