import {visit} from "unist-util-visit";
import plantumlEncoder from "plantuml-encoder";
import {existsSync,writeFileSync,statSync} from 'fs'
import {basename} from 'path'
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
      console.log(`svg file exist for puml ${puml_title}`)
    }
  }
  if(do_update){
    console.log(`creating puml+svg files : ${puml_file} + .svg`)
    writeFileSync(puml_file,value)
    const url = `${baseUrl}/${plantumlEncoder.encode(value)}`;
    const svg_text = fetch(url).text()
    writeFileSync(svg_file,svg_text)
  }
  return basename(svg_file)
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
function remarkPUML(pluginOptions) {
  const options = { ...DEFAULT_OPTIONS, ...pluginOptions };
  const baseUrl = options.baseUrl.replace(/\/$/, "")
  return function transformer(syntaxTree,file) {
    visit(syntaxTree, "code", node => {
      if (!node.lang || !node.value || node.lang !== "plantuml") return;
      const svg_file = update_puml_file(file.history[0],node.value,node.meta,baseUrl)
      node.type = "html";
      node.value = `<Svgb filename="${svg_file}" />`
      node.alt = node.meta;
      node.meta = undefined;
    });
    return syntaxTree;
  };
}

export{
  remarkPUML
}
