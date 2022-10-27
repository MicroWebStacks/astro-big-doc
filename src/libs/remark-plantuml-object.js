//https://www.npmjs.com/package/@akebifiky/remark-simple-plantuml
//adapted to replace img svg with an object svg

import {visit} from "unist-util-visit";
import plantumlEncoder from "plantuml-encoder";

const DEFAULT_OPTIONS = {
  baseUrl: "https://www.plantuml.com/plantuml/svg"
};

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
function remarkPUMLObj(pluginOptions) {
  const options = { ...DEFAULT_OPTIONS, ...pluginOptions };

  return function transformer(syntaxTree) {
    visit(syntaxTree, "code", node => {
      let { lang, value, meta } = node;
      if (!lang || !value || lang !== "plantumlobj") return;
      node.type = "html";
      const val = `${options.baseUrl.replace(/\/$/, "")}/${plantumlEncoder.encode(value)}`;
      node.value = `<object type="image/svg+xml"  data="${val}" > </object>`
      node.alt = meta;
      node.meta = undefined;
    });
    return syntaxTree;
  };
}

export{
  remarkPUMLObj
}
