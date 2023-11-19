import { defineConfig } from 'astro/config';
import {config} from './config.js'
import {collect_content} from './integrations/integration-content-structure.js'


var config_options = {
  integrations: [collect_content(config.collect_content)],
  output: "static",
  outDir: config.outDir,
  trailingSlash: 'ignore'
};

if(config.site != null){
  config_options.site = config.site
}

export default defineConfig(config_options);
