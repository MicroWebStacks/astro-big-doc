//in DEV Mode process.env does not have .env content
import * as dotenv from 'dotenv'
import { fileURLToPath } from 'url';
import {join,dirname} from 'path'

const __filename = fileURLToPath(import.meta.url);
let __dirname = dirname(__filename);
console.log(`__dirname = ${__dirname}`)
if(import.meta.env?.MODE == "production"){
	__dirname = join(__dirname,'../../..')
}

dotenv.config()

let protocol = process.env.PROTOCOL

if(import.meta.env.MODE == "development"){
    protocol = "http"
}

const config = {
    site:process.env.SITE,
    port:process.env.PORT,
    url:`${protocol}://${process.env.HOST}:${process.env.PORT}`,
    rootdir: __dirname,
    outDir: "dist",
    content: "content",
    content_out: "dist",
    plantuml_server: "https://www.plantuml.com/plantuml/svg",
    kroki_server: "https://kroki.io",
    hashed_assets:false,
    copy_astro:false,
}

config.collect_content = {
    rootdir:config.rootdir,
    rel_contentdir:config.content,
    rel_outdir:config.content_out,
    debug:true,
    tags:{
        page:'page::([\\w-.]+)'
    }
}

console.log(config)

export {
    config
}
