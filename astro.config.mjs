import node from '@astrojs/node'
import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";
import {remarkPUMLObj} from './src/libs/remark-plantuml-object'
import {remarkPUMLSvg} from './src/libs/remark-plantuml-svg'
import {remarkPUMLAstro} from './src/libs/remark-plantuml-astro'
import {remarkImage} from './src/libs/remark-image-pz'
import {remarkPanzoom} from './src/libs/remark-panzoom'
import {remarkGallery} from './src/libs/remark-gallery'
import {config} from './config'
import {replaceFiledir} from './src/libs/vite-plugin-filedir'
import {generate_menu} from './integrations/nav_menu/integration-generate-menu'


var config_options = {
  markdown:{
    syntaxHighlight: false,
    remarkPlugins: [
      remarkImage,
      remarkPanzoom,
      remarkGallery,
      remarkPUMLObj,
      remarkPUMLSvg,
      remarkPUMLAstro,// in MD though MDX only otherwise syntax highlight from MD takes over MDX
    ],
    rehypePlugins: [
    ],
    extendDefaultPlugins: true
  },
  integrations: [mdx(),generate_menu()],
  vite:{
    plugins:[
      replaceFiledir()
    ]
  },
  output: "static",
  outDir: config.outdir,
  trailingSlash: 'ignore'
};

if(config.site != null){
  config_options.site = config.site
}

export default defineConfig(config_options);
