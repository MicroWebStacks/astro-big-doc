import { exec } from 'node:child_process';
import * as dotenv from 'dotenv'
dotenv.config()

if(process.env.OUT_MODE == "STATIC"){
    exec('astro preview',{ stdio: 'inherit' })  //todo not working, need to forward everything to stdio
}else if(process.env.OUT_MODE == "MIDDLEWARE"){
    exec('node server/server.js')
}
