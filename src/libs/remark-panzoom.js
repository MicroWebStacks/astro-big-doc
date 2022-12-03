import {visit} from "unist-util-visit";
import {dirname} from 'path'
import {relAssetToUrl} from './utils.js'
import {config} from '../../config.js'

function remarkPanzoom() {
  return function transformer(syntaxTree,file) {
    //console.log(` 'remarkRelDir' * in file '${file.history}'`)
    visit(syntaxTree,  node => {
      //console.log(`   * node '${node.type}'`)
      if(node.name != 'Panzoom'){
        return
      }
      if(node.type == "mdxJsxFlowElement"){
        const addUrl = config.base?config.base+'/':''
        const passed_url = node.attributes.find(entry=>(entry.name == 'src')).value
        node.url = relAssetToUrl(passed_url,dirname(file.history[0]),"/"+addUrl)
        node.attributes.push({type:'mdxJsxAttribute',name:'data-url',value:node.url})
      }
    });
    return syntaxTree;
  };
}

export{
  remarkPanzoom
}
