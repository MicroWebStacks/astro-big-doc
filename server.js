import express from 'express';
import { handler as ssrHandler } from './dist/server/entry.mjs';
import {authRouter} from './src/auth/passport.js'

const app = express();
app.use(express.static('dist/client/'))
app.use(express.static('dist/client/raw'))
app.use(authRouter)
app.use(ssrHandler);

app.listen(3000);
