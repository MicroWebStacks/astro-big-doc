# astro big doc

Live demo : https://microwebstacks.github.io/astro-big-doc/

Astro Theme that can scale for big documentation websites. Includes an unimited depth config menu that starts with a top appbar for sections navigation, then continues on a tree left  menu for pages. Each page then has a tree right menu for its table of content.

User friendly even for large menus as both left and right ones are collapsible and width adjustable by the user.

Performance oriented, using astro components only, no virtual DOM, no extenal css framework (you can add your own though). Focus on static generation on build time, no client side rendering. Javascript is for minial manipulations connecting events and classes.

UX friendly Markdown without import and referencing local images, enhancements with components for panzoom, gallery, and code embeds.
## Features
- Pure astro components (.astro) html css js
- static or server with authentication middleware (express, passport, github strategy)
- Menus
  - menu generation from file system
  - Built by astro and seen as readable html hierarchy by the client
  - Trees with unlimited depth and recursively expandable sections
  - Can be opened, collapsed and width adjusted by the user
  - Navigation Menu (Left Menu)
    - can have pages or directories similar to file system browsing experience
    - Auto expands decendance of active page only
  - Table Of Content (Right Menu)
    - ScrollSpy highlight of current section
- Markdown
  - Supports md and mdx
  - Automatic Right Menu ToC generation for all markdown pages
  - Markdown pages can be either in `scr/pages` or on any other server local path e.g. `data/blog` or `../../content/markdown`
  - Plantuml with dynamic and static Svg in MD, Astro component in MDX
  - allows local file referencing with automatic assets management
- components
  - Panzoom for SVGs and images
  - Gallery with json list of SVGs and images
- Mobile layout
## Todos
- root dir from process not reliable use `root_abs()`
- check potential replacement of scrollspy with intersection Observer API
- sync with Astro utilities for url resolution and astro image integration
## ideas
- Markdown
  - pass MD as MDX (workaround, rename .md to .mdx)
- content Structure
  - parse yaml tags and orgnaize menu with tags order hierarchy
  - Structure : generation of left nav menu from src/pages
  - Structure : Update menu from getStaticPatsh() [slug] for a hierarchy of files
  - support slugs for pages instead of filenames
- caching
  - SSR render on page hash condition, using ETag
  - page hash with depndencies hashes, include assets hash as attribute
- menus
  - store nav menu width / prevent reset on same page reload
## more ideas
- Markdown
  - add more code formats, e.g. mermaid, D2, ...
- menus
  - ToC auto-expand : open scroll spy, close all others
  - Left and right : min (disabled) or expand to level slider or selector
  - Left and right : auto expand depth adjust to available vertical space (all level or nothing)
  - Structure : generation of left nav menu from src/pages
  - Structure : Update menu from getStaticPatsh() [slug] for a hierarchy of files
  - pages types and icons
  - open close on nav-resize click
  - Issue: Menu height transition MUI example is working
  - minor issue : Expand arrow rotates for nothing on page reload


# Developer guide
## getting started
```
pnpm install
pnpm run dev
pnpm run build
```
## creation
This project was created as follows
```
pnpm create astro@latest
```
 - Name, Empty Project, No Typescript
 - move to root git repo
 - delete node_modules
 - add deno and server config to `astro.config.mjs`
 - prepare `.github/workflows/deploy.yml`

## plantuml SVG
* `remark-plantuml-object` : Dynamic, the client needs to wait for svg generation when the page is loaded. The plugin only replace plantuml code with html `object` tag pointing on server with encoded text in url.
* `remark-plantuml-svg` : Static, svg generated on build time. The plugin extracts plantuml code, place it on extrnal `.puml` file for vs code preview convenience and convert it to `.svg` on build time. The puml and svg files are cached and only regenerated on new builds if the md file has been changed.
* `remark-plantuml-astro` : Same as svg, adds an Astro component with top right button to open svg in modal

## Authentication
- Github OAuth : https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps
- express-session : 
  - repo https://github.com/expressjs/session
  - doc https://expressjs.com/en/resources/middleware/session.html
- passport OAuth doc : http://www.passportjs.org/concepts/authentication/oauth/
- passport-github : https://github.com/jaredhanson/passport-github
- passport-github doc : http://www.passportjs.org/packages/passport-github/
- passport example : https://github.com/passport/todos-express-facebook/blob/master/app.js
- jwo example : https://gist.github.com/jwo/ea79620b5229e7821e4ae61055899cf9

- using self signed keys with `server/create.sh` result in browser warning 'your connection is not private' (NET::ERR_CERT_AUTHORITY_INVALID)
- for 'Let's Encrypt' certificates, ownership has to be proven by visibility of the host from the public internet which makes it not usable for internal domains and local network hosts

## Hints
- SVGs
  - missing viewbox canot be resized
  - should not have `preserveAspectRatio="none"`
- menu config allows index pages but do not use them to keep consistent nav menu of folders/items
- adding interactive SVGs that can be styled with css is challenging
  - `svg.astro` uses the innerHTML fragment which breaks visibility of `style` tag no longer scoping imported SVG
  - import of `rightarrow.astro` still requires style to be either global or inline
  - Tree menu collapse transition :
    - display block/none does not animate the height
    - scaleY does not bring the height down to 0 due to remaining padding margin
    - height can be animated but must be set initially
    - max-height can be animated but must be set to max value which breaks the transition timing
    - max-height adjusting with js requires high complexity depending on state of expanded children hierarchy
    - clip also needs defined start stop
    - flex can also animate but then the flex container height must be set explicitely
- node js modules filename not in `__filename` but in `import.meta.url`
- Markdown
  - It is not possible to handle a custom code section with an Astro component in native Astro markdown integration (unless you rewrite the Astro component in remark and rehype). It is only possible in imported markdown where remarked custom components e.g. `<data />` can be replaced on the custom render call with an Astro component. see `blog/[...page].astro`. Fix RFC : https://github.com/withastro/rfcs/pull/285
  - `<Content components={{}}/>` only replaces html items injected from plugins and not items written in markdown page
  - `<Content components={{}}/>` does not replace Astro components in MD, only in MDX
  - `import.meta.glob('./file1.md',{as:'mdx'})` => error despite correct file?mdx `no such file or directory`
  - ``await import(`file:///file.mdx`)`` works ``await import(`file:///${page}.mdx`)`` does not, cannot find file that actuall exist
  - `import 'module.js'` instead of `import 'module'` takes `import.meta.env.PROD` away, env becomes undefined
- baseUrl usage on hoisted script only possible with Dynamic import : https://github.com/withastro/astro/issues/5381

# References
* https://github.com/syntax-tree/mdast
* https://github.com/syntax-tree/mdast#code
* https://github.com/syntax-tree/mdast#html
* https://github.com/remarkjs/remark/blob/main/doc/plugins.md
* https://github.com/syntax-tree/unist-util-visit
* https://github.com/akebifiky/remark-simple-plantuml

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

built upon astro-docs with differences :
 
 - advantage : right side ToC is not DOM client side like astro-docs but built with native astro component taking the `headings` Markdown Layout Prop https://docs.astro.build/en/guides/markdown-content/#markdown-layout-props

 - limitation: all svg integrations are either hardcoded or wrapped in images through svgimg

# License
- MIT
## images
- https://www.svgrepo.com/svg/19947/folders
- https://www.svgrepo.com/svg/400563/openfilefolder
- https://freesvg.org/1542512156 : tree
- https://www.svgrepo.com/svg/75085/full-screen
