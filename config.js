//in DEV Mode process.env does not have .env content
import * as dotenv from 'dotenv'

dotenv.config()

const config = {
    mode:process.env.MODE,
    site:process.env.SITE,
    base:process.env.BASE,  //for the js code, Astro components can use imp*ort.me*ta.en*v.BA*SE_URL
    port:process.env.PORT,
}

if(process.env.MODE == "MIDDLEWARE"){
    config.base = ""
}

export {
    config
}
