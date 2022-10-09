import { defineConfig } from 'astro/config';
import deno from "@astrojs/deno";

let serverConfig = defineConfig({
  output: "server",
  server: { port: 3000, host: true},
  adapter: deno({
    port: 3000,
    hostname: 'localhost'
  }),
  site: 'http://localhost',
  base: '',
  trailingSlash: 'ignore'
});

let staticConfig = defineConfig({
  output: "static",
  site: 'http://localhost',
  base: '',
  trailingSlash: 'ignore'
});

//select 'static'/'server' by uncommenting the corresponding default export
//export default staticConfig
export default serverConfig

export {
  serverConfig,
  staticConfig
}
