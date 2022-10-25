import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";
import {remarkPUMLObj} from './src/libs/remark-plantuml-object'
import {remarkPUMLSvg} from './src/libs/remark-plantuml-svg'
import {remarkPUMLAstro} from './src/libs/remark-plantuml-astro'
import {remarkRelSvg} from './src/libs/remark-rel-svg'

export default defineConfig({
  output: "static",
  outDir: "./docs",
  site: 'http://microwebstacks.github.io',
  base: 'astro-big-doc',
  trailingSlash: 'ignore',
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
