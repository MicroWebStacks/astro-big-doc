import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";
import {remarkPUMLObj} from './src/libs/remark-plantuml-object'
import {remarkPUMLSvg} from './src/libs/remark-plantuml-svg'
import {remarkPUMLAstro} from './src/libs/remark-plantuml-astro'
import {remarkRelDir} from './src/libs/remark-rel-dir'
import {remarkRelAsset} from './src/libs/remark-rel-asset'
import {rehypeCheck} from './src/libs/rehype-check'

export default defineConfig({
  output: "static",
  outDir: "./docs",
  site: 'http://microwebstacks.github.io',
  base: 'astro-big-doc',
  trailingSlash: 'ignore',
  markdown:{
    syntaxHighlight: 'shiki',
    remarkPlugins: [
      remarkRelAsset,
      remarkRelDir,
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
