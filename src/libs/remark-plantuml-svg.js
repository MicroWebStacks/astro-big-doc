import {visit} from "unist-util-visit";
import plantumlEncoder from "plantuml-encoder";
import {existsSync,writeFileSync,statSync, readFileSync} from 'fs'
import {basename} from 'path'
import fetch from 'sync-fetch'

const puml_server ="https://www.plantuml.com/plantuml/svg"

let counter = 0

function puml_text_to_svg(text){
  const url = `${puml_server}/${plantumlEncoder.encode(text)}`;
  const svg_text = fetch(url).text()
  return svg_text
}


function update_puml_file(file,value,meta,baseUrl){
  const mtime = statSync(file).mtime
  const puml_title = (meta)?meta:counter++;
  const svg_file = file + "." + puml_title + ".svg"
  let do_update = true
  if(existsSync(svg_file)){
    const pmtime = statSync(svg_file).mtime
    if(pmtime > mtime){
      do_update = false
      //console.log(`svg file exist for puml ${puml_title}`)
    }
  }
  if(do_update){
    console.log(`creating svg files : ${svg_file}`)
    const url = `${baseUrl}/${plantumlEncoder.encode(value)}`;
    const svg_text = fetch(url).text()
    writeFileSync(svg_file,svg_text)
    return svg_text
  }else{
    return readFileSync(svg_file).toString()
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
function remarkPUMLSvg() {
  return function transformer(syntaxTree,file) {
    visit(syntaxTree, "code", node => {
      if (!node.lang || !node.value || node.lang !== "plantumlsvg") return;
      const svg_text = puml_text_to_svg(node.value)
      node.type = "html";
      node.value = svg_text
      node.alt = node.meta;
      node.meta = undefined;
    });
    return syntaxTree;
  };
}

export{
  remarkPUMLSvg
}
