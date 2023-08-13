//in DEV Mode process.env does not have .env content
import * as dotenv from 'dotenv'

dotenv.config()

let outdir = (process.env.OUT_DIR==null)?"./temp":process.env.OUT_DIR
let protocol = process.env.PROTOCOL

if(import.meta.env.MODE == "development"){
    protocol = "http"
}

const config = {
    site:process.env.SITE,
    port:process.env.PORT,
    url:`${protocol}://${process.env.HOST}:${process.env.PORT}`,
    rootdir: (process.env.ROOT_DIR==null)?process.cwd():process.env.ROOT_DIR,
    outdir: outdir
}

export {
    config
}
