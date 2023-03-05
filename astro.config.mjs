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

const default_options = {
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
  integrations: [mdx()],
  vite:{
    plugins:[
      replaceFiledir()
    ]
  }
}

var config_options = {}

if(config.out_mode == "MIDDLEWARE")
{
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
}else// if(config.out_mode == "STATIC")
{
  config_options   = {
    ...default_options,
    output: "static",
    outDir: "./temp",
    base: config.base,
    trailingSlash: 'ignore'
  };
  if(config.site != null){
    config_options.site = config.site
  }
}

export default defineConfig(config_options);
