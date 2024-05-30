# astro big doc

Live demo : https://microwebstacks.github.io/astro-big-doc/

Astro Theme for big documentation websites. Hierarchical pages menu from files structure and table of content, Markdown rendered as CMS with Astro components for panzoom, 3D, links, interactive tables, diagrams from code, VSCode like highlighter.

Enhances native markdown '.md' files with Astro components, enables parsing of content from a configurable directory in the file system, and allows relative assets paths usage.

User friendly side menus collapsible and width adjustable with the mouse.

## Features
- Render standard markdown .md with custom Astro components
- Markdown images enhanced with Modal and panzoom function
- Markdown image directive for centering and image size defintion
- Markdown tables become interactive with data tables with [DataTables](https://datatables.net/)
  - from Markdown table
  - from xlsx file link
- Markdown Code blocks
  - VSCode like highlighting using [Shikiji](https://github.com/antfu/shikiji)
  - code copy button
- Markdown diagrams rendering
  - from code block
  - from code file link
  - swap between diagram and highlighted code
- Markdown 3D Model viewer
  - from .glb link
  - from yaml code block parameters
- Markdown Note aside (Note, Tip, Caution, Danger)
- Markdown Details collapse block
- Markdown external links identification and rendering with an arrow
- Markdown relative assets with zero copy in dev

# User guide
```
pnpm install
pnpm run dev
pnpm run build
```
## Environment variables
This project uses unified environment variables that can be configured in a `.env` file, see `.env.example`. All variables will be captured in a `config` structure exported from `config.js` and then used in `astro.config.mjs`, in the express `server.js` and can be imported from any file. A `client_config.js` exports variables that can be used by client code e.g. `PUBLIC_BASE`.

* `OUT_DIR` : directory where the build will be genrated, defaults to `dist`
* `PUBLIC_BASE` : base url for the website, defaults to ""
* `CONTENT` : input directory for the markdown content, defaults to `content`
* `STRUCTURE` : output directory markdown parser content-structure, defaults to `.structure`

## Markdown content
* `icons.yaml` can contain an icon with a link to be placed on the App bar right side
* `url_type` will be automatically defined to `dir` or `file` so that e.g. `./example/readme.md` as type `dir` will be served on `/example`
* `readme.md` or `REAMDME.md` on the content root will be considered as home page served on url root `/`
* markdown front-matter
  * `title` : will be used for the menu as well as a browser page title. For url_type file, the title can also derive the slug, but not for url_type folder.
  *  `slug` : if not available, a slug can be derived from the title of file name. Slug is unused in url_type folder to keep child pages paths similar in file system and url.
  * `order` : defines the menu order of the pages

## Express js Server
Express js server in `server\server.js` can optionally be used to serve the generated static site. It adds an authentication layer on top using Express js passport.

* `PORT` : used for the express server and also needed by the auth callback when auth is enabled, defaults to `3001`
* `HOST` : used for the express server and also needed by the auth callback when auth is enabled, defaults to `0.0.0.0` to listen on all interfaces when no auth is enabled
* `PROTOCOL` : either of http or https, defaults to `http`
* `ENABLE_AUTH` : activates the express atuhentication router, not enabled when not defined
* `ENABLE_CORS` : allows cross origns resource sharing, if you want other websites to use your APIs, not allowed when not defined
* `CERT_FILE` : ssl certificate file path, required when https is used
* `KEY_FILE` : key file for the ssl certificate, required when https is used
* `GITHUB_CLIENT_ID`      : Express passport Github strategy configuration
* `GITHUB_CLIENT_SECRET`  : Express passport Github strategy configuration
* `SESSION_SECRET`        : used by 'express-session' handler

# Developper guide
## Ideas
- support different icon types (.svg, .ico, .png) and allow it in content root
- public folder inside content and ignored by content structure
- .structureignore to allow e.g. .git/workflow/deploy.yaml
- fix consistency of top menu folder name different than slug
- Code
  - keep separate plantuml and kroki (due to perf reason)
- SVG
  - meta data from filename.yaml or (code meta).yaml
  - list of links : label, link
  - list of dependencies : map, highlight list on key hover
- PanZoom
  - URL params, zoom on text, multiple hits counter
  - update pan zoom status in url on mouse up
- watch and regenrate .structure on save for modified files only
- check potential replacement of scrollspy with intersection Observer API
  - enhance intersection to cover a path of all visible sections from the page in the toc : start heading, stop heading

- light and dark mode toggle
- sync with Astro utilities for url resolution and astro image integration

- Gallery
  - Expand open close with images inside
  - dynamic adjust on container resize
  - scale items
  - can use thumbnails, no search to avoid double hit
  - click to open panzoom with images mini thumbs
- menus
  - store menu scroll position
  - store menus width
  - use view transition to give menu persistence impression on page navigation
- content Structure
  - parse yaml tags and orgnaize menu with tags order hierarchy
- caching
  - SSR render on page hash condition, using ETag
  - page hash with depndencies hashes, include assets hash as attribute
- menus
  - ToC auto-expand : open scroll spy, close all others
  - Left and right : min (disabled) or expand to level slider or selector
  - Left and right : auto expand depth adjust to available vertical space (all level or nothing)
  - pages types and icons
  - open close on nav-resize click
  - Issue: Menu height transition MUI example is working
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

## Notes
- SVGs
  - if missing viewbox canot be resized
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

## local github action
- test locally with https://nektosact.com/installation/index.html

# content-structure Development
for development of content-structure it is possible to replace the registry version with the submodule version
```json
  "content-structure": "file:packages/content-structure",
```

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

## images
- https://www.svgrepo.com/svg/19947/folders
- https://www.svgrepo.com/svg/400563/openfilefolder
- https://freesvg.org/1542512156 : tree
- https://www.svgrepo.com/svg/75085/full-screen
- https://uxwing.com/text-file-icon/

# License
- MIT

