import {existsSync,copyFileSync,mkdirSync,statSync} from 'fs'
import {basename,resolve,normalize,dirname,join,relative} from 'path'
import {config} from '../../config.js'

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
  const targetroot = join(config.rootdir,"public/raw")
  const source_file_base_name = basename(source_file)
  const file_rel_to_root = relative(config.rootdir,source_dir)
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

      const targetroot = join(config.rootdir,"public/raw")
      const filerootrel = relative(config.rootdir,refdir)
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


const colors = {
  Reset:"\x1b[0m",
  Bright:"\x1b[1m",
  Dim:"\x1b[2m",
  Underscore:"\x1b[4m",
  Blink:"\x1b[5m",
  Reverse:"\x1b[7m",
  Hidden:"\x1b[8m",
  FgBlack:"\x1b[30m",
  FgRed:"\x1b[31m",
  FgGreen:"\x1b[32m",
  FgYellow:"\x1b[33m",
  FgBlue:"\x1b[34m",
  FgMagenta:"\x1b[35m",
  FgCyan:"\x1b[36m",
  FgWhite:"\x1b[37m",
  FgGray:"\x1b[90m"  ,
  BgBlack:"\x1b[40m",
  BgRed:"\x1b[41m",
  BgGreen:"\x1b[42m",
  BgYellow:"\x1b[43m",
  BgBlue:"\x1b[44m",
  BgMagenta:"\x1b[45m",
  BgCyan:"\x1b[46m",
  BgWhite:"\x1b[47m",
  BgGray:"\x1b[100m" 
}

function green_log(text){
  console.log(colors.FgGreen,text,colors.Reset)
}

function blue_log(text){
  console.log(colors.FgCyan,text,colors.Reset)
}

function yellow_log(text){
  console.log(colors.FgYellow,text,colors.Reset)
}

export{
    rel_to_abs,
    relAssetToUrl,
    uid,
    suid,
    event,
    window_event,
    green_log,
    blue_log,
    yellow_log,
    cache_file_url
}
