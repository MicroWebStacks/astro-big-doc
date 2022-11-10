# astro big doc

Live demo : https://microwebstacks.github.io/astro-big-doc/

Astro Theme that can scale for big documentation websites. Includes an unimited depth config menu that starts with a top appbar for sections navigation, then continues on a tree left  menu for pages. Each page then has a tree right menu for its table of content.

User friendly even for large menus as both left and right ones are collapsible and width adjustable by the user.

Performance oriented, using astro components only, no virtual DOM, no extenal css framework (you can add your own though). Focus on static generation on build time, no client side rendering. Javascript is for minial manipulations connecting events and classes.

UX friendly Markdown without import and referencing local images, enhancements with components for panzoom, gallery, and code embeds.
## Features
- astro components (.astro) html css js
- article page full content as html ready for browser search
- Menus
  - Built by astro and seen as readable html hierarchy by the client
  - Trees with unlimited depth and recursively expandable sections
  - Can be opened, collapsed and width adjusted by the user
  - Navigation Menu (Left Menu)
    - can have pages or directories similar to file system browsing experience
    - Auto expands decendance of active page only
  - Table Of Content (Right Menu)
    - ScrollSpy highlight of current section
- markdown 
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
- authentication signin with github
- SSR Node : how to add baseURL
- menus
  - ToC auto-expand : open scroll spy, close all others
  - Left and right : min (disabled) or expand to level slider or selector
  - Left and right : auto expand depth adjust to available vertical space (all level or nothing)
  - Structure : generation of left nav menu from src/pages
  - Structure : Update menu from getStaticPatsh() [slug] for a hierarchy of files
  - pages types and icons
  - open close on nav-resize click
  - Issue: Menu height transition MUI example is working
  - (optional) store nav menu width / prevent reset on same page reload
  - minor issue : Expand arrow rotates for nothing on page reload
- Markdown
  - pass MD as MDX (workaround, rename .md to .mdx)
  - Enhance headings with Astro component, hover highlight and icons for id slugs
  - add more code formats, e.g. mermaid,...
- Components : test panzoom with wide svgs that have been max-width adjusetd to the page

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
## curious script import behaviour
This code event commented crashes the build
```javascript
  import '../../node_modules/panzoom/dist/panzoom';
  //import "import.meta.env.BASE_URL/panzoom.min";
```
This does not
```javascript
  import '../../node_modules/panzoom/dist/panzoom';
```
Full cases
```javascript
  //0) works fine in dev and build but hardcoded
  import '/astro-big-doc/panzoom.js';
  //1) does not work when component used from another one e.g. from Markdown on another path resolves to relative markdown path
  import "./panzoom.js";
  //2) works in dev mode only, not deployed
  import '../../node_modules/panzoom/dist/panzoom';
  //3) unexpected template string
  import `${baseUrl}/panzoom.min`; 
  //4)
  import "import.meta.env.BASE_URL/panzoom.min";
  //5) warning : files in the public directory are served at the root path.  Instead of /public/panzoom, use /panzoom.
	import '../../public/panzoom';
```

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
