import express from 'express';
import { handler as ssrHandler } from './dist/server/entry.mjs';

const app = express();
app.use(express.static('dist/client/'))
app.use(express.static('dist/client/raw'))
app.use(ssrHandler);

app.listen(3000);