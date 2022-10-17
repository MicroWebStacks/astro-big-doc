import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";
import node from "@astrojs/node";
import remarkPlantUML from '@akebifiky/remark-simple-plantuml';

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel(),
  markdown: {
    // Can be 'shiki' (default), 'prism' or false to disable highlighting
    syntaxHighlight: 'shiki',
    remarkPlugins: [[remarkPlantUML, {
      baseUrl: "https://www.plantuml.com/plantuml/svg"
    }]]
  },
  integrations: [mdx()]
});