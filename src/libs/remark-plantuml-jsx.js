import {visit} from "unist-util-visit";
import plantumlEncoder from "plantuml-encoder";
import {existsSync,writeFileSync,statSync, readFileSync} from 'fs'
import {basename,dirname} from 'path'
import fetch from 'sync-fetch'

const DEFAULT_OPTIONS = {
  baseUrl: "https://www.plantuml.com/plantuml/svg"
};

let counter = 0

function update_puml_file(file,value,meta,baseUrl){
  const mtime = statSync(file).mtime
  const puml_title = (meta)?meta:counter++;
  const puml_file = file + "." + puml_title + ".puml"
  const svg_file = file + "." + puml_title + ".svg"

  let do_update = true
  if(existsSync(svg_file)){
    const pmtime = statSync(svg_file).mtime
    if(pmtime > mtime){
      do_update = false
      console.log(`  plantuml-astro update : svg file exist for puml ${puml_title}`)
    }
  }
  if(do_update){
    console.log(`  plantuml-astro update : creating puml+svg files : ${puml_file} + .svg`)
    writeFileSync(puml_file,value)
    const url = `${baseUrl}/${plantumlEncoder.encode(value)}`;
    const svg_text = fetch(url).text()
    writeFileSync(svg_file,svg_text)
  }
  return basename(svg_file)
}

function createPanzoom(filename, filedir){
  //mdxJsxFlowElement or mdxjsEsm
  return {
    type: "mdxjsEsm",
    name: 'Panzoom',
    attributes: [
      {
        type: 'mdxJsxAttribute',
        name: 'data-filename',
        value: filename
      },
      {
        type: 'mdxJsxAttribute',
        name: 'data-filedir',
        value: filedir
      }
    ],    
  }
}

/**
 * Plugin for remark-js
 *
 * See details about plugin API:
 * https://github.com/unifiedjs/unified#plugin
 *
 * You can specify the endpoint of PlantUML with the option 'baseUrl'
 *
 * @param {Object} pluginOptions Remark plugin options.
 */
function remarkPUMLAstro(pluginOptions) {
  const options = { ...DEFAULT_OPTIONS, ...pluginOptions };
  const baseUrl = options.baseUrl.replace(/\/$/, "")
  return function transformer(syntaxTree,file) {
    visit(syntaxTree, "code",node => {
      if (!node.lang || !node.value || node.lang !== "plantuml") {
        console.log("  nooo, returning now!")
        return;
      }
      console.log ("continue")
      const svg_file = update_puml_file(file.history[0],node.value,node.meta,baseUrl)
      const filedir = dirname(file.history[0])
      console.log(`plantuml-astro dir : ${filedir}`)
      node = createPanzoom(svg_file,filedir)
    });
    return syntaxTree;
  };
}

export{
  remarkPUMLAstro
}
