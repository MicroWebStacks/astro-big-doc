import {visit} from "unist-util-visit";
import {dirname} from 'path'

function remarkRelSvg() {
  return function transformer(syntaxTree,file) {
    visit(syntaxTree,  node => {
      if(node.name != 'SvgPz'){
        return
      }
      if(node.type == "mdxJsxFlowElement"){
        const filedir = dirname(file.history[0])
        node.attributes.push({type:'mdxJsxAttribute',name:'data-filedir',value:filedir})
      }
      else if(node.type == "html"){
        //console.log(node)
      }
    });
    return syntaxTree;
  };
}

export{
  remarkRelSvg
}
