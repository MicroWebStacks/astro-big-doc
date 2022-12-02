import node from '@astrojs/node'
import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";
import {remarkPUMLObj} from '@libs/remark-plantuml-object'
import {remarkPUMLSvg} from '@libs/remark-plantuml-svg'
import {remarkPUMLAstro} from '@libs/remark-plantuml-astro'
import {remarkImage} from '@libs/remark-image-pz'
import {remarkPanzoom} from '@libs/remark-panzoom'
import {remarkGallery} from '@libs/remark-gallery'
import {rehypeCheck} from '@libs/rehype-check'

import * as dotenv from 'dotenv'
dotenv.config()

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
  integrations: [mdx()]
}

if(process.env.MODE == "MIDDLEWARE"){
  var config_options = {
    ...default_options,
    output: "server",
    server:{
      port:parseInt(process.env.PORT)
    },
    adapter: node({
      mode: 'middleware'
    })
  };
}else if(process.env.MODE == "STATIC"){
  var config_options   = {
    ...default_options,
    output: "static",
    outDir: "./docs",
    site: process.env.SITE,
    base: process.env.BASE,
    trailingSlash: 'ignore'
  };
}

export default defineConfig(config_options);
