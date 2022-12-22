import {existsSync,copyFileSync,mkdirSync,statSync} from 'fs'
import {basename,resolve,normalize,dirname,join,relative} from 'path'
import {config} from '../../config'

function root_abs(){
  let rootdir = rel_to_abs(import.meta.url,"../..")
  if(import.meta.env.PROD){
    rootdir = rel_to_abs(import.meta.url,"..")
  }
  return rootdir
}

//resolve(reference,relative) does not work due to 'file:\'
function rel_to_abs(reference,relative){
  return join(dirname(normalize(reference)),relative).replace("file:\\","")
}

function isNewer(filepath,targetfile){
  const t1 = statSync(filepath).mtime
  const t2 = statSync(targetfile).mtime
  return (t1>t2)
}

function cache_file_url(source_file){
  const source_dir = dirname(source_file)
  const rootdir = process.cwd()
  const targetroot = join(rootdir,"public/raw")
  const source_file_base_name = basename(source_file)
  const file_rel_to_root = relative(rootdir,source_dir)
  const targetpath = resolve(targetroot,file_rel_to_root)
  const targetfile = join(targetpath,source_file_base_name)

  const baseUrl = "/" + (config.base?(config.base+'/'):'')
  const relativepath = basename(source_file)
  const newpath = join("raw/",file_rel_to_root,relativepath)
  const url = baseUrl+ newpath.replaceAll('\\','/')
  return {targetfile,url}
}

//Note 'imp*ort.me*ta.en*v.BA*SE_URL' only works from Astro component not from remark-rel-asset plugin
function relAssetToUrl(relativepath,refdir,baseUrl){
    let newurl = relativepath
    const filepath = join(refdir,relativepath)
    if(existsSync(filepath)){
      //console.log(`   * impo*rt.me*ta.ur*l = ${import.meta.url}`)

      const rootdir = process.cwd()
      //console.log(`   * rootdir = '${rootdir}'`)
      const targetroot = join(rootdir,"public/raw")
      const filerootrel = relative(rootdir,refdir)
      const targetpath = resolve(targetroot,filerootrel)
      const targetfile = join(targetpath,relativepath)
      const targetdir = dirname(targetfile)
      //console.log(`copy from '${filepath}' to '${targetfile}'`)
      const newpath = join("raw/",filerootrel,relativepath)
      newurl = baseUrl+ newpath.replaceAll('\\','/')
      if(!existsSync(targetdir)){
        mkdirSync(targetdir,{ recursive: true })
      }
      if(!existsSync(targetfile)){
        copyFileSync(filepath,targetfile)
        console.log(`  utils.js> * new asset url = '${newurl}'`)
      }
      else if(isNewer(filepath,targetfile)){
        copyFileSync(filepath,targetfile)
        console.log(`  utils.js> * updated asset url = '${newurl}'`)
      }else{
        //console.log(`  utils.js> * existing asset url = '${newurl}'`)
      }
    }

    return newurl
}

function uid(){
  return Date.now()+"_"+Math.floor(Math.random() * 10000)
}

function suid(){
  let date = (Date.now()).toString();
  const sub = date.substring(date.length-6,date.length-1);
  return sub+"_"+Math.floor(Math.random() * 10000)
}


function event(element,event_name,data=null){
	var event = new CustomEvent(event_name, {detail:data});
	element.dispatchEvent(event);
}

function window_event(event_name,data){
	var event = new CustomEvent(event_name, {detail:data});
	window.dispatchEvent(event);
}

export{
    rel_to_abs,
    relAssetToUrl,
    uid,
    suid,
    event,
    window_event,
    root_abs,
    isNewer,
    cache_file_url
}
