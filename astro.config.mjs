import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";
import {remarkPlantUML} from './src/libs/remark-object-plantuml'
import {remarkPUML} from './src/libs/remark-svg-plantuml'

export default defineConfig({
  output: "static",
  site: 'http://localhost',
  base: '',
  trailingSlash: 'ignore',
  markdown:{
    syntaxHighlight: 'shiki',
    remarkPlugins: [
      remarkPUML,
      remarkPlantUML,
    ],
    rehypePlugins: [],
    extendDefaultPlugins: true
  },
  integrations: [mdx()]
});
