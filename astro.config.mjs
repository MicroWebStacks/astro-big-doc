import { defineConfig } from 'astro/config';
import {config} from './config.js'
import {collect_content} from './integrations/integration-content-structure.js'
import yaml from '@rollup/plugin-yaml';

export default defineConfig({
  integrations: [collect_content(config.collect_content)],
  output: "static",
  outDir: config.outDir,
  base: config.base,
  trailingSlash: 'ignore',
  vite: {
    plugins: [yaml()]
  }
});
