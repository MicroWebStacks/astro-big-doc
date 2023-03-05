//in DEV Mode process.env does not have .env content
import * as dotenv from 'dotenv'

dotenv.config()

const config = {
    out_mode:process.env.OUT_MODE,//STATIC,MIDDLEWARE
    site:process.env.SITE,
    base    :(process.env.BASE==null)?'':process.env.BASE,  //for the js code, Astro components can use imp*ort.me*ta.en*v.BA*SE_URL
    port:process.env.PORT,
    rootdir: (process.env.ROOTDIR==null)?process.cwd():process.env.ROOTDIR
}

if(process.env.OUT_MODE == "MIDDLEWARE"){
    config.base = ""
}

export {
    config
}
