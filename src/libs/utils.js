import {existsSync,copyFileSync,mkdirSync} from 'fs'
import {resolve,normalize,dirname,join,relative} from 'path'
//import config from '../../astro.config.mjs'

//Note 'imp*ort.me*ta.en*v.BA*SE_URL' only works from Astro component not from remark-rel-asset plugin
function relAssetToUrl(relativepath,refdir,baseUrl){
    let newurl = relativepath
    const filepath = join(refdir,relativepath)
    if(existsSync(filepath)){
      console.log(`   * impo*rt.me*ta.ur*l = ${import.meta.url}`)

      let rootdir = join(dirname(normalize(import.meta.url)),"../..").replace("file:\\","")
      if(import.meta.env.PROD){
        rootdir = join(dirname(normalize(import.meta.url)),"..").replace("file:\\","")
      }
      console.log(`   * rootdir = '${rootdir}'`)
      const targetroot = join(rootdir,"public/raw")
      const filerootrel = relative(rootdir,refdir)
      const targetpath = resolve(targetroot,filerootrel)
      const targetfile = join(targetpath,relativepath)
      const targetdir = dirname(targetfile)
      //console.log(`copy from '${filepath}' to '${targetfile}'`)
      const newpath = join("raw/",filerootrel,relativepath)
      newurl = baseUrl+ newpath.replaceAll('\\','/')
      console.log(`  * new asset url = '${newurl}'`)
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

