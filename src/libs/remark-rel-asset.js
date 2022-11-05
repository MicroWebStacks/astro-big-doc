import {visit} from "unist-util-visit";
import {existsSync,copyFileSync,mkdirSync} from 'fs'
import {resolve,normalize,dirname,join,relative} from 'path'
import config from '../../astro.config.mjs'

function remarkRelAsset() {
  return function transformer(syntaxTree,file) {
    console.log(` 'remarkRelAsset' * in file '${file.history}'`)
    const filename = String(file.history)
    visit(syntaxTree,  node => {
      //if(filename.endsWith('image.mdx')){        console.log(node)      }
      if(!['image'].includes(node.type)){
        return
      }
      const filedir = dirname(file.history[0])
      const filepath = join(filedir,node.url)
      if(existsSync(filepath)){
        const rootdir = join(dirname(normalize(import.meta.url)),"../..").replace("file:\\","")
        const targetroot = join(rootdir,"public/raw")
        const filerootrel = relative(rootdir,filedir)
        const targetpath = resolve(targetroot,filerootrel)
        const targetfile = join(targetpath,node.url)
        const targetdir = dirname(targetfile)
        //console.log(`copy from '${filepath}' to '${targetfile}'`)
        const newpath = join("raw/",filerootrel,node.url)
        const newurl = "/"+config.base +"/"+ newpath.replaceAll('\\','/')
        console.log(`  * new asset url = '${newurl}'`)
        if(!existsSync(targetdir)){
          mkdirSync(targetdir,{ recursive: true })
        }
        copyFileSync(filepath,targetfile)
        node.url = newurl
      }
    });
    return syntaxTree;
  };
}

export{
  remarkRelAsset
}
