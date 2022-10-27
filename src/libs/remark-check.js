import {visit} from "unist-util-visit";

function remarkCheck() {
  return function transformer(syntaxTree,file) {
    console.log("   ---   remarkCheck   ---")
    visit(syntaxTree,  node => {
      console.log(`check : ${node.type}`)
    });
    return syntaxTree;
  };
}

export{
  remarkCheck
}
