import { defineConfig } from 'astro/config';
import {config} from './config.js'
import {collect_content} from './integrations/integration-content-structure.js'


export default defineConfig({
  integrations: [collect_content(config.collect_content)],
  output: "static",
  outDir: config.outDir,
  base: config.base,
  trailingSlash: 'ignore'
});
