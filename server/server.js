import express from 'express';
import https from 'https'
import { handler as ssrHandler } from '../dist/server/entry.mjs';
import {authRouter} from './auth/auth_router.js'
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import { readFileSync, } from 'fs';

import * as dotenv from 'dotenv'
dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.static('dist/client/'))
app.use(express.static('dist/client/raw'))
app.use(authRouter)
app.use(ssrHandler);
app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!")
  })


const use_https = ["true","1"].includes(process.env.USE_HTTPS.toLowerCase())

if(use_https){
    const key = readFileSync(join(__dirname, process.env.KEY_FILE),'utf8')
    const cert = readFileSync(join(__dirname, process.env.CERT_FILE),'utf8')
    const httpsServer = https.createServer({key,cert},app)
    console.log(`listening on ${process.env.HOST}:${process.env.PORT}`)
    httpsServer.listen(3000);//443 for clear url
}else{
    app.listen(3000);
}
