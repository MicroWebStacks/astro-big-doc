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
import {int_test} from './src/libs/integration-test'

const default_options = {
  markdown:{
    syntaxHighlight: 'shiki',
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
  integrations: [mdx(),int_test()]
}

var config_options = {}

if(config.out_mode == "MIDDLEWARE"){
  config_options = {
    ...default_options,
    output: "server",
    server:{
      port:parseInt(config.port)
    },
    adapter: node({
      mode: 'middleware'
    })
  };
}else if(config.out_mode == "STATIC"){
  config_options   = {
    ...default_options,
    output: "static",
    outDir: "./docs",
    site: config.site,
    base: config.base,
    trailingSlash: 'ignore'
  };
}

export default defineConfig(config_options);
