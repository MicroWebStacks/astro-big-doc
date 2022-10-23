import node from '@astrojs/node'
import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";
import {remarkPUMLObj} from './src/libs/remark-plantuml-object'
import {remarkPUMLSvg} from './src/libs/remark-plantuml-svg'
import {remarkPUMLAstro} from './src/libs/remark-plantuml-astro'


// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({
    mode: 'standalone'
  }),
  markdown:{
    syntaxHighlight: 'shiki',
    remarkPlugins: [
      remarkPUMLObj,
      remarkPUMLSvg,
      remarkPUMLAstro
    ],
    rehypePlugins: [],
    extendDefaultPlugins: true
  },
  integrations: [mdx()]
});
