//in DEV Mode process.env does not have .env content
import * as dotenv from 'dotenv'
import {join} from 'path'

dotenv.config()
const rootdir = process.cwd()

const outdir = (process.env.OUT_DIR==null)?"dist":process.env.OUT_DIR
const base = (process.env.PUBLIC_BASE==null)?"":process.env.PUBLIC_BASE
const structuredir = (process.env.STRUCTURE==null)?join(rootdir,".structure"):process.env.STRUCTURE
const contentdir = (process.env.CONTENT==null)?join(rootdir,"content"):process.env.CONTENT

const config = {
    rootdir: rootdir,
    outDir: outdir,
    base: base,
    content_path: contentdir,
    code_path: `${rootdir}/${outdir}/codes`,
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
    contentdir:contentdir,
    content_ext:["md"],
    assets_ext:["svg","webp","png","jpeg","jpg","xlsx","glb","hdr","ico","puml"],
    outdir:structuredir,//dist does not persist before build
    out_menu:"public/menu.json",//used by src\layout\client_nav_menu.js
    debug:false
}

console.log(config)

export {
    config
}
