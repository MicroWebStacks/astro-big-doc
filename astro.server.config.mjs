import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";
import {remarkPlantUML} from './src/libs/remark-object-plantuml'
import {remarkPUML} from './src/libs/remark-svg-plantuml'

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({
    mode: 'standalone'
  }),
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
