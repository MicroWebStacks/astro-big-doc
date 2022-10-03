# astro_nav_menus
Astro native css js svg with optional tailwind components for navbar side menu tree menu table of content
## concept
- native or bare minimal web components (.astro)
- performance oriented, scalable to huge trees and pages
- content must be immediatly searchable with native browser search
- no lazy loading or custom content cache manipulations

# creation
```
pnpm create astro@latest
```
 - Name, Empty Project, No Typescript
 - move to root git repo
 - delete node_modules
```
pnpm install
pnpm astro add deno
pnpm astro add tailwind
```
 - add deno and server config to `astro.config.mjs`
 - prepare `.github/workflows/deploy.yml`
