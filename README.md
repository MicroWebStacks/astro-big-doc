# astro_nav_menus
Astro Theme that can scale for big documentation websites. Includes a top appbar for sections navigation, left tree menu for section pages and right tree menu for a page table of content.

Performance oriented, built with native astro components, no dependencies to any extenal framework, no virtual dom. Fully static with no client side rendering. Javascript is for minial manipulations connecting events and classes.
## Features
- astro components (.astro) html css js
- article content immediatly searchable with native browser search, no lazy loading or custom content cache manipulations
- Left pages Tree menu
- Right Table of Content menu
- Menus consist of Trees with unlimited depth and recursively expandable sections
- Menus can be opened, closed and resized by the user
- Menus are built by astro and seen as read html by the client

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

# Todos
- store nav menu width / prevent reset on same page reload
- open close on nav-resize click
- Arrow icon on fixed-nav when menu can be opened/collapsed
- evaluate css resize if it can resolve resize mouse events usage

# survey
Analysis of existing Themes for Astro, focus is on documentation
## astro docs
https://github.com/withastro/astro/tree/main/examples/docs

Advantages :

Official example, clean html structure, light and dark toggle, left side pages and right side Table Of Content.

Limitations :
 - react and preact dependencies, despite island architecture this can exclude potential use cases
 - Left Menu
   - handcoded `SIDEBAR` in `config.ts`
   - first level is map and not list so relying on ordered map
   - fixed 2 levels structure
 - ToC is dynamically parsing the DOM on client side, this reduces astro's advantage of zero js and server side generation and rendering
 - ToC does not take h1 and limited down to h4

## hello astro

https://github.com/hellotham/hello-astro

built upon astro-docs but adds advantages :
 
 - right side ToC is not DOM client side like astro-docs but built with native astro component taking the `headings` Markdown Layout Prop https://docs.astro.build/en/guides/markdown-content/#markdown-layout-props


