//in DEV Mode process.env does not have .env content
import * as dotenv from 'dotenv'

dotenv.config()

const config = {
    out_mode:process.env.OUT_MODE,//STATIC,MIDDLEWARE
    site:process.env.SITE,
    port:process.env.PORT,
    rootdir: (process.env.ROOTDIR==null)?process.cwd():process.env.ROOTDIR
}

export {
    config
}
