import node from '@astrojs/node'
import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";
import {remarkPUMLObj} from './src/libs/remark-plantuml-object'
import {remarkPUMLSvg} from './src/libs/remark-plantuml-svg'
import {remarkPUMLAstro} from './src/libs/remark-plantuml-astro'
import {remarkRelSvg} from './src/libs/remark-rel-svg'

export default defineConfig({
  output: "server",
  adapter: node({
    mode: 'standalone'
  }),
  markdown:{
    syntaxHighlight: 'shiki',
    remarkPlugins: [
      remarkRelSvg,
      remarkPUMLObj,
      remarkPUMLSvg,
      remarkPUMLAstro,
    ],
    rehypePlugins: [
    ],
    extendDefaultPlugins: true
  },
  integrations: [mdx()]
});
