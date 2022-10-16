import { defineConfig } from 'astro/config';
import deno from "@astrojs/deno";
import mdx from "@astrojs/mdx";

export default defineConfig({
  output: "server",
  server: {
    port: 3000,
    host: true
  },
  adapter: deno({
    port: 3000,
    hostname: 'localhost'
  }),
  site: 'http://localhost',
  base: '',
  trailingSlash: 'ignore',
  markdown: {
    // Can be 'shiki' (default), 'prism' or false to disable highlighting
    syntaxHighlight: 'shiki'
  },
  integrations: [mdx()]
});
