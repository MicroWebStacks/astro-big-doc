//in DEV Mode process.env does not have .env content
import * as dotenv from 'dotenv'

const rootdir = process.cwd()

dotenv.config()

let protocol = process.env.PROTOCOL
let content_out = process.env.OUT_DIR
if(import.meta.env.DEV){
    protocol = "http"
    content_out = "public"
}

const config = {
    port:process.env.PORT,
    url:`${protocol}://${process.env.HOST}:${process.env.PORT}`,
    rootdir: rootdir,
    outDir: process.env.OUT_DIR,
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
    extensions:["md"],
    rel_outdir:"public",//because integrations cannot persist on dist before start of build
    raw_menu:"menu.yaml",
    debug:true,
    tags:{
        page:'page::([\\w-.]+)'
    }
}

console.log(config)

export {
    config
}
