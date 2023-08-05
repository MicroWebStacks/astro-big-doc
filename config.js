//in DEV Mode process.env does not have .env content
import * as dotenv from 'dotenv'

dotenv.config()

const config = {
    site:process.env.SITE,
    port:process.env.PORT,
    rootdir: (process.env.ROOT_DIR==null)?process.cwd():process.env.ROOT_DIR,
    outdir: (process.env.OUT_DIR==null)?"./temp":process.env.OUT_DIR
}

export {
    config
}
