import node from '@astrojs/node'
import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";
import {remarkPUMLObj} from './src/libs/remark-plantuml-object'
import {remarkPUMLSvg} from './src/libs/remark-plantuml-svg'
import {remarkPUMLAstro} from './src/libs/remark-plantuml-astro'
import {remarkImage} from './src/libs/remark-image-pz'
import {remarkPanzoom} from './src/libs/remark-panzoom'
import {remarkGallery} from './src/libs/remark-gallery'
import {rehypeCheck} from './src/libs/rehype-check'

import * as dotenv from 'dotenv'
dotenv.config()

export default defineConfig({
  output: "server",
  server:{
    port:parseInt(process.env.SERVER_PORT)
  },
  adapter: node({
    mode: 'middleware'
  }),
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
});
