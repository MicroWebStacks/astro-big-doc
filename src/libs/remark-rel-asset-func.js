import {visit} from "unist-util-visit";
import {dirname} from 'path'
import {relAssetToUrl} from './utils'

function remarkRelAsset() {
  return function transformer(syntaxTree,file) {
    console.log(` 'remarkRelAsset' * in file '${file.history}'`)
    visit(syntaxTree,  node => {
      if(!['image'].includes(node.type)){
        return
      }
      node.url = relAssetToUrl(node.url,dirname(file.history[0]))
    });
    return syntaxTree;
  };
}

export{
  remarkRelAsset
}
