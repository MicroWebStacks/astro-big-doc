import express from 'express';
import https from 'https'
import { handler as ssrHandler } from '../dist/server/entry.mjs';
import {authRouter} from './auth/auth_router.js'
import {rel_to_abs} from '../src/libs/utils.js'
import { readFileSync, } from 'fs';

import * as dotenv from 'dotenv'
dotenv.config()


const app = express();
app.use(express.static('dist/client/'))
app.use(express.static('dist/client/raw'))
app.use(authRouter)
app.use(ssrHandler);

const use_https = ["true","1"].includes(process.env.USE_HTTPS.toLowerCase())

if(use_https){
    const key = readFileSync(rel_to_abs(import.meta.url,process.env.CERT_FILE),'utf8')
    const cert = readFileSync(rel_to_abs(import.meta.url,process.env.KEY_FILE),'utf8')
    const httpsServer = https.createServer({key,cert},app)
    httpsServer.listen(3000);//443 for clear url
}else{
    app.listen(3000);
}
