import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";
import {remarkPlantUML} from './src/libs/remark-object-plantuml'
import {remarkPUML} from './src/libs/remark-astro-plantuml'

export default defineConfig({
  output: "static",
  site: 'http://localhost',
  base: '',
  trailingSlash: 'ignore',
  markdown:{
    // Can be 'shiki' (default), 'prism' or false to disable highlighting
    syntaxHighlight: 'shiki',
    remarkPlugins: [
      remarkPUML,
      remarkPlantUML,
    ]
  },
  integrations: [mdx()]
});
