import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";
import node from "@astrojs/node";
import remarkPlantUML from '@akebifiky/remark-simple-plantuml'

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({
    mode: 'standalone'
  }),
  markdown: {
    // Can be 'shiki' (default), 'prism' or false to disable highlighting
    syntaxHighlight: 'shiki',
    remarkPlugins:[
      [
        remarkPlantUML,{ baseUrl: "https://www.plantuml.com/plantuml/svg" }
      ]
    ]
  },
  integrations: [mdx()]
});
