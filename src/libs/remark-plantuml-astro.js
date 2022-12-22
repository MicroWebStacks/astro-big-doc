import {visit} from "unist-util-visit";
import plantumlEncoder from "plantuml-encoder";
import {writeFileSync} from 'fs'
import fetch from 'sync-fetch'
import {existsSync,statSync} from 'fs'
import { cache_file_url } from './utils'

const puml_server ="https://www.plantuml.com/plantuml/svg"

let counter = 0

function puml_text_to_svg_file(text,svg_file){
  const url = `${puml_server}/${plantumlEncoder.encode(text)}`;
  const svg_text = fetch(url).text()
  writeFileSync(svg_file,svg_text)
}

function update_puml_file(file,value,meta){
  //console.log("file = " + file)
  const mtime = statSync(file).mtime
  const puml_title = (meta)?meta:counter++;
  const svg_file = file + "." + puml_title + ".svg"

  const {targetfile:svg_target_file,url} = cache_file_url(svg_file)

  let do_update = true
  if(existsSync(svg_target_file)){
    const pmtime = statSync(svg_target_file).mtime
    if(pmtime > mtime){
      do_update = false
      //console.log(`svg file exist for puml ${puml_title}`)
    }
  }
  if(do_update){
    //console.log(`creating puml+svg files : ${puml_file} + .svg`)
    puml_text_to_svg_file(value,svg_target_file)
    console.log(`generated svg_file = ${svg_target_file} for url '${url}'`)
  }

  return url
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
  return function transformer(syntaxTree,file) {
    //console.log(` 'remarkPUMLAstro' * in file '${file.history}'`)
    visit(syntaxTree, "code", node => {
      if (!node.lang || !node.value || node.lang !== "plantuml") return;
      const url = update_puml_file(file.history[0],node.value,node.meta)
      node.type = "html";
      node.value = `<data data-url="${url}" > </data>`
      node.alt = node.meta;
      node.meta = undefined;
    });
    return syntaxTree;
  };
}

export{
  remarkPUMLAstro
}
