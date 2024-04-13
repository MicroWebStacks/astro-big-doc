import express from 'express';
import https from 'https'
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import { readFileSync, } from 'fs';
import cors from 'cors';

import * as dotenv from 'dotenv'
dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const outdir = (process.env.OUT_DIR==null)?"dist":process.env.OUT_DIR
const protocol = (process.env.PROTOCOL==null)?"http":process.env.PROTOCOL
const host = (process.env.HOST==null)?"0.0.0.0":process.env.HOST
const port = (process.env.PORT==null)?"3001":process.env.PORT

const app = express();
if(process.env.ENABLE_CORS == "true"){
    app.use(cors());      
    console.log("\n -- !!! CORS enabled !!! -- APIs can be used from other sites --\n")
}

if(process.env.ENABLE_AUTH === "true"){
    const { authRouter } = await import('./auth/auth_router.js');
    app.use(authRouter)
    console.log(" with auth")
}else{
    console.log("\n -- !!! no auth !!! -- Authentication is disabled -- \n")
}
app.use(express.static(outdir))

app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!")
  })



console.log(`listening on ${protocol}://${host}:${port}`)

if(protocol == "https"){
    const key = readFileSync(join(__dirname, process.env.KEY_FILE),'utf8')
    const cert = readFileSync(join(__dirname, process.env.CERT_FILE),'utf8')
    const httpsServer = https.createServer({key,cert},app)
    httpsServer.listen(port);//443 for clear url
}else{
    app.listen(port);
}
