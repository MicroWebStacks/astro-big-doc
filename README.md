# astro big doc

Live demo : https://astro-big-doc.netlify.app

Astro Theme for big documentation websites. Hierarchical pages menu from files structure and table of content, Markdown rendered as CMS with Astro components for panzoom, 3D, links, interactive tables, diagrams from code, VSCode like highlighter.

Enhances native markdown '.md' files with Astro components, enables parsing of content from a configurable directory in the file system, and allows relative assets paths usage.

User friendly side menus collapsible and width adjustable with the mouse.

## Features list
- enhance images with panzoom function
- image directive for images size defintion in markdown
- use relative assets in markdown
- Active data tables with [DataTables](https://datatables.net/)
  - from Markdown table
  - from xlsx file link
- 3D Model viewer
  - from .glb link
  - from yaml parameters
- external links identification and rendering with an arrow
- VSCode like highlighting using [Shikiji](https://github.com/antfu/shikiji)

# Usage
```
pnpm install
pnpm run dev
pnpm run build
```

## github action usage
- test locally with https://nektosact.com/installation/index.html

# Ideas
- auto generate menu from markdown titles
  - icon file with link in config
- refactor all config in config.yaml, all config must be optional

- light and dark mode toggle
- check potential replacement of scrollspy with intersection Observer API
- sync with Astro utilities for url resolution and astro image integration

- Cards as a yaml code
  - markdown format : for referencing existing pages through their front matter
  - markdown_card format : for rendering markdown with body
- Details
- Gallery
  - support two galleries types from code config: svgs and slides
  - Expand open close with images inside
  - images as masonry, with close to real size factors
  - dynamic adjust on container resize
  - scale items
  - can use thumbnails, no search to avoid double hit
  - click to open panzoom with images mini thumbs
  - examples usage
    - lightbox integration
    - slides presentation
  - libraries
    - https://github.com/desandro/masonry
    - https://github.com/dimsemenov/photoswipe
    - https://github.com/haltu/muuri
- menus
  - store menu scroll position
  - store menus width
  - use view transition to give menu persistence impression on page navigation
- content Structure
  - parse yaml tags and orgnaize menu with tags order hierarchy
- caching
  - SSR render on page hash condition, using ETag
  - page hash with depndencies hashes, include assets hash as attribute


- use declarative shadow dom to be able to retrieve data from it and reuse it
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

- tried to serve different directories on different bas without modifying website build base path
  - used referrer to differentiate requests, and created a middleware preceesing the static use that redirects to base
  - failed due to some fetches still fail, not clear why as not reported without referer

## assets management
* User content can be placed in a configurable relative path to the repo root usually `./content` set in these variables
  * config.content_path
  * config.collect_content.contentdir
* Zerop copy assets management
  * during dev, an API endpoint exposes `./content/*` under `/assets/*`
* Generated content by pages frontmatter (e.g. svg diagrams from code and text code for highlighter client copy) :
  * `./public/codes/*` during dev, served under `/codes/*` with `./src/pages/codes/[...path].js`
  * `./dist/codes` during build, served under `/codes/*`
  * Note : since Astro4/Vite5 `./public/*` does not watch and serve newly generated content by pages frontmatter, that's why an endpoint API is needed
* Generated content by integrations
  * if only needed by the integration or pages build then gets generated in `.structure/` folder (e.g.`documents_list.json`,...)
  * the menu needed by the client gets generated in config.collect_content.out_menu `./public/menu.json` for both dev and build served on `/menu.json`
    * Note : integrations cannot directly generate on `dist` because they cannot persist there before start of build

# Notes
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

- express subdomain usage
instead of
```javascript
app.use(express.static(outdir))
```
use
```javascript
app.use(testRouter)
app.set('subdomain offset', 1); // Adjust based on your domain structure
app.use((req, res, next) => {
  const subdomain = req.subdomains[0]; // Get the first subdomain
  switch (subdomain) {
    case 'website1':
      express.static(outdir)(req, res, next);
      break;
    default:
      next(); // Continue to other routes if no subdomain matches
  }
});
```
# Express Server guide
Express server in `server\server.js` can optionally be used to serve the generated static site. It adds an authentication layer on top using Express passport.

## .env config
This project uses environment variables as unified config to astro.config.mjs and to the express server. The environment variabels are also loaded by a `config.js` to allow their usage from any file in astro including .js

It is possible to build with zero config, the default mode is 'STATIC' See also an example in [.env.example](.env.example).

Astro variables
* `OUT_DIR` : directory where the build will be genrated
* `PORT` : maps to astro.config.mjs [server.port](https://docs.astro.build/en/reference/configuration-reference/#serverport)

Express general variables
* `PROTOCOL` : either of htp or https for express server usage
* `CERT_FILE` : required when https is used
* `KEY_FILE` : required when https is used

Express authentication variables
* `HOST` : Express passport callbackURL
* `PORT` : Express passport callbackURL
* `GITHUB_CLIENT_ID`      : Express passport Github strategy configuration
* `GITHUB_CLIENT_SECRET`  : Express passport Github strategy configuration
* `SESSION_SECRET`        : used by 'express-session' handler

## authentication doc
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


# References
* https://github.com/syntax-tree/mdast
* https://github.com/syntax-tree/mdast#code
* https://github.com/syntax-tree/mdast#html
* https://github.com/remarkjs/remark/blob/main/doc/plugins.md
* https://github.com/syntax-tree/unist-util-visit
* https://github.com/akebifiky/remark-simple-plantuml

# License
- MIT
## images
- https://www.svgrepo.com/svg/19947/folders
- https://www.svgrepo.com/svg/400563/openfilefolder
- https://freesvg.org/1542512156 : tree
- https://www.svgrepo.com/svg/75085/full-screen
- https://uxwing.com/text-file-icon/

# Issues
- title conflicting with path, url and slug in `create_raw_menu()`
