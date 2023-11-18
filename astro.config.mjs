import { defineConfig } from 'astro/config';
import {config} from './config.js'
import {generate_menu} from './integrations/nav_menu/integration-generate-menu'
import {collect_content} from './integrations/integration-content-structure.js'


var config_options = {
  integrations: [collect_content(config.collect_content),generate_menu()],
  output: "static",
  outDir: config.outDir,
  trailingSlash: 'ignore'
};

if(config.site != null){
  config_options.site = config.site
}

export default defineConfig(config_options);
