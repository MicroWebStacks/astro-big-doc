import {visit} from "unist-util-visit";
import {dirname} from 'path'

function remarkRelDir() {
  return function transformer(syntaxTree,file) {
    //console.log(` 'remarkRelDir' * in file '${file.history}'`)
    visit(syntaxTree,  node => {
      //console.log(`   * node '${node.type}'`)
      if((node.name != 'Panzoom')&&(node.name != 'Gallery')){
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
  remarkRelDir
}
