import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";

export default defineConfig({
  output: "static",
  site: 'http://localhost',
  base: '',
  trailingSlash: 'ignore',
  markdown:{
    // Can be 'shiki' (default), 'prism' or false to disable highlighting
    syntaxHighlight: 'shiki'
  },
  integrations: [mdx()]
}); //select 'static'/'server' by uncommenting the corresponding default export
//export default staticConfig
