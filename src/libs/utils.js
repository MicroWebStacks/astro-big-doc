import {existsSync,copyFileSync,mkdirSync} from 'fs'
import {resolve,normalize,dirname,join,relative} from 'path'
import config from '../../astro.config.mjs'

function relAssetToUrl(relativepath,refdir){
    let newurl = relativepath
    const filepath = join(refdir,relativepath)
    if(existsSync(filepath)){
      const rootdir = join(dirname(normalize(import.meta.url)),"../..").replace("file:\\","")
      const targetroot = join(rootdir,"public/raw")
      const filerootrel = relative(rootdir,refdir)
      const targetpath = resolve(targetroot,filerootrel)
      const targetfile = join(targetpath,relativepath)
      const targetdir = dirname(targetfile)
      //console.log(`copy from '${filepath}' to '${targetfile}'`)
      const newpath = join("raw/",filerootrel,relativepath)
      newurl = "/"+config.base +"/"+ newpath.replaceAll('\\','/')
      //console.log(`  * new asset url = '${newurl}'`)
      if(!existsSync(targetdir)){
        mkdirSync(targetdir,{ recursive: true })
      }
      copyFileSync(filepath,targetfile)
    }

    return newurl
}

export{
    relAssetToUrl
}

