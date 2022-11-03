import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";
import {remarkPUMLObj} from './src/libs/remark-plantuml-object'
import {remarkPUMLSvg} from './src/libs/remark-plantuml-svg'
import {remarkPUMLAstro} from './src/libs/remark-plantuml-astro'
import {remarkRelDir} from './src/libs/remark-rel-dir'

export default defineConfig({
  output: "static",
  outDir: "./docs",
  site: 'http://microwebstacks.github.io',
  base: 'astro-big-doc',
  trailingSlash: 'ignore',
  markdown:{
    syntaxHighlight: 'shiki',
    remarkPlugins: [
      remarkRelDir,
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
