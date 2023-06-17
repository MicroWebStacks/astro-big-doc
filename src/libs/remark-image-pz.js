import {visit} from "unist-util-visit";
import {dirname} from 'path'
import {relAssetToUrl} from './utils.js'
import {config} from '../../config.js'

function remarkImage() {
  return function transformer(syntaxTree,file) {
    visit(syntaxTree,  node => {
      if(!['image'].includes(node.type)){
        return
      }
      console.log(` 'image' * in file '${file.history}'`)
      const addUrl = config.base?config.base+'/':''
      node.url = relAssetToUrl(node.url,dirname(file.history[0]),"/"+addUrl)
      node.value = `<data data-url="${node.url}" }"> </data>`
      node.type = 'html'
    });
    return syntaxTree;
  };
}

export{
  remarkImage
}
