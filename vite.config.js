import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  resolve:{
    alias:{
        "@libs": resolve(process.cwd(), "src/libs"),
    }
  }
})
