import {visit} from 'unist-util-visit'

/** @type {import('unified').Plugin<[], import('hast').Root>} */
function rehypeCheck() {
  return (tree,file) => {
    console.log(`starting ---------------- ${file.history[0]}`)
    visit(tree, 'element', (node) => {
        //console.log(node.tagName)
        if(node.tagName == "code"){
          console.log(node)
        }
    })
    console.log(`finish ----------------`)
  }
}

export{
  rehypeCheck
}
