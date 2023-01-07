import {visit} from "unist-util-visit";
import plantumlEncoder from "plantuml-encoder";
import fetch from 'sync-fetch'

const puml_server ="https://www.plantuml.com/plantuml/svg"

function puml_text_to_svg(text){
  const url = `${puml_server}/${plantumlEncoder.encode(text)}`;
  const svg_text = fetch(url).text()
  return svg_text
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
