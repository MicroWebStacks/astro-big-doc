import express from 'express';
import { handler as ssrHandler } from './dist/server/entry.mjs';
import {router} from './passport.js'

const app = express();
app.use(express.static('dist/client/'))
app.use(express.static('dist/client/raw'))
app.use(ssrHandler);
app.use(router)

app.listen(3000);
