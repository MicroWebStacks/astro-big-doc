import {visit} from "unist-util-visit";
import {dirname} from 'path'

function remarkGallery() {
  return function transformer(syntaxTree,file) {
    //console.log(` 'remarkRelDir' * in file '${file.history}'`)
    visit(syntaxTree,  node => {
      //console.log(`   * node '${node.type}'`)
      if(node.name != 'Gallery'){
        return
      }
      if(node.type == "mdxJsxFlowElement"){
        const filedir = dirname(file.history[0])
        node.attributes.push({type:'mdxJsxAttribute',name:'data-filedir',value:filedir})
      }      
    });
    return syntaxTree;
  };
}

export{
  remarkGallery
}
