import { c as createVNode, F as Fragment } from '../entry.mjs';
import '@astrojs/node/server.js';
/* empty css                    */import 'fs';
import 'path';

const html = "<h1 id=\"title\">title</h1>\n<h2 id=\"subtitle\">subtitle</h2>\n<p>hello file2</p>";

				const frontmatter = {};
				const file = "D:/Dev/MicroWebStacks/astro_nav_menus/data/blog/file2.md";
				const url = undefined;
				function rawContent() {
					return "# title\r\n## subtitle\r\nhello file2\r\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":1,"slug":"title","text":"title"},{"depth":2,"slug":"subtitle","text":"subtitle"}];
				}
				function getHeaders() {
					console.warn('getHeaders() have been deprecated. Use getHeadings() function instead.');
					return getHeadings();
				}				async function Content() {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;
					content.astro = {};
					Object.defineProperty(content.astro, 'headings', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "headings" from your layout, try using "Astro.props.headings."')
						}
					});
					Object.defineProperty(content.astro, 'html', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "html" from your layout, try using "Astro.props.compiledContent()."')
						}
					});
					Object.defineProperty(content.astro, 'source', {
						get() {
							throw new Error('The "astro" property is no longer supported! To access "source" from your layout, try using "Astro.props.rawContent()."')
						}
					});
					const contentFragment = createVNode(Fragment, { 'set:html': html });
					return contentFragment;
				}
				Content[Symbol.for('astro.needsHeadRendering')] = true;

export { Content, compiledContent, Content as default, file, frontmatter, getHeaders, getHeadings, rawContent, url };
