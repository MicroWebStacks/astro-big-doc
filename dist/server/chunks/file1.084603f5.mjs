import { c as createVNode, F as Fragment } from '../entry.mjs';
import '@astrojs/node/server.js';
/* empty css                    */import 'fs';
import 'path';

const html = "<h1 id=\"title\">title</h1>\n<p>hello file1</p>\n<h2 id=\"sequence\">Sequence</h2>\n<object type=\"image/svg+xml\" data=\"https://www.plantuml.com/plantuml/svg/SoWkIImgAStDuUKg038oapCB4lDA50AGs8d52cxv-RnSIVcbUIc9HPKAG12KcfnQK9APdmVYG1GOyd81IGLTEp17mKh1DxMuE34zLSCZKvENoo4rBmLe2m00\"></object>";

				const frontmatter = {"title":"Great Post"};
				const file = "D:/Dev/MicroWebStacks/astro_nav_menus/data/blog/file1.md";
				const url = undefined;
				function rawContent() {
					return "# title\r\nhello file1\r\n\r\n\r\n## Sequence\r\n\r\n```plantuml Testing\r\n@startuml\r\nparticipant Participant as Foo\r\nboundary    Reception    as Foo1\r\nFoo -> Foo1 : Message(Hi)\r\n@enduml\r\n```\r\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":1,"slug":"title","text":"title"},{"depth":2,"slug":"sequence","text":"Sequence"}];
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
