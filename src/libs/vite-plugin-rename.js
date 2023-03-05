import { blue_log } from "./utils"

function transform(src, id) {
    if(id.endsWith('.md')){
        const newName = id.slice(0,-3) + '.mdx'
        blue_log(`vite>renaming (${id}) to (${newName})`)
        return{
            src,
            id:newName,
            map:null
        }
    }
}

export default function md_to_mdx() {
  return {
    name: 'rename-md-files',
    enforce: 'pre',
    transform:transform
  }
}

export{
    md_to_mdx
}
