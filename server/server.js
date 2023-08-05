import express from 'express';
import https from 'https'
import {authRouter} from './auth/auth_router.js'
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import { readFileSync, } from 'fs';

import * as dotenv from 'dotenv'
dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const outdir = (process.env.OUT_DIR==null)?"temp":process.env.OUT_DIR

const app = express();
app.use(authRouter)
app.use(express.static(outdir))
app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!")
  })


const use_https = ["true","1"].includes(process.env.USE_HTTPS.toLowerCase())

if(use_https){
    const key = readFileSync(join(__dirname, process.env.KEY_FILE),'utf8')
    const cert = readFileSync(join(__dirname, process.env.CERT_FILE),'utf8')
    const httpsServer = https.createServer({key,cert},app)
    console.log(`listening on ${process.env.HOST}:${process.env.PORT}`)
    httpsServer.listen(process.env.PORT);//443 for clear url
}else{
    app.listen(process.env.PORT);
}
