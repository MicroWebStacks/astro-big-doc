import {constants, access, stat, copyFile, mkdir, readFile, writeFile} from 'fs/promises'
import {dirname,join, basename, extname} from 'path'
import {config} from '../../config.js'
import {createHash} from 'crypto';
import yaml from 'js-yaml';

async function isNewer(file_abs,targetfile){
  const t1 = await stat(file_abs).mtime
  const t2 = await stat(targetfile).mtime
  return (t1>t2)
}

async function copy_if_newer(file_abs,targetfile){
  const targetdir = dirname(targetfile)
  if(!await exists(targetdir)){
      await mkdir(targetdir,{ recursive: true })
  }
  if((!await exists(targetfile)) || (await isNewer(file_abs,targetfile))){
    await copyFile(file_abs,targetfile)
    console.log(`copied '${file_abs}' to '${targetfile}'`)
  }
}

function hashed_filename(filename,hash_text){
  const name = basename(filename, extname(filename))
  const hash = shortMD5(hash_text)
  const ext = extname(filename)
  const hashed_file = `${name}-${hash}${ext}`
  //console.log(`file: ${filename}`)
  //console.log(`hashedfile: ${hashed_file}`)
  return hashed_file
}

async function relAssetToUrl(relativepath,refFile){
  const dir_rel = dirname(refFile)
  const dir_abs = join(config.rootdir,config.content,dir_rel)
  const file_abs = join(dir_abs,relativepath)
  if(await exists(file_abs)){
    if(config.assets_hash_dir){
      const target_filename =  hashed_filename(relativepath,join(dir_rel,relativepath))
      const target_file_abs = join(config.rootdir,config.content_out,"raw",target_filename)
      await copy_if_newer(file_abs,target_file_abs)
      const newurl = join("raw",target_filename)
      return "/"+newurl.replaceAll('\\','/')
    }else{
      const target_file_abs = join(config.rootdir,config.content_out,"raw",dir_rel,relativepath)
      await copy_if_newer(file_abs,target_file_abs)
      const newurl = join("raw",dir_rel,relativepath)
      return "/"+newurl.replaceAll('\\','/')
    }
  }else{
    console.warn(`relativepath does not exist ${relativepath}`)
    return relativepath
  }
}

async function assetToUrl(path,refFile){
  let src = path
  const external = path.startsWith('http')
  if(!external){
    if(!path.startsWith("/")){
      src = await relAssetToUrl(path,refFile)
    }
  }
  return src
}

function contentPathToStaticPath(section,entry_path){
  const p1 = join(dirname(entry_path))
  const p2 = p1.replaceAll('\\','/')
  return p2
}

async function load_json(rel_path){
  const path = join(config.rootdir,rel_path)
  const text = await readFile(path,'utf-8')
  return JSON.parse(text)
}

function shortMD5(text) {
  const hash = createHash('md5').update(text, 'utf8').digest('hex');
  return hash.substring(0, 8);
}

async function exists(filePath) {
  try {
    await access(filePath, constants.F_OK);
    return true;
  } catch (error) {
    return false;
  }
}

async function save_file(filePath,content){
  const directory = dirname(filePath)
  if(!await exists(directory)){
    await mkdir(directory, { recursive: true });
  }
  return writeFile(filePath,content)
}

async function save_json(data,file_path){
  const file_abs = join(config.rootdir,file_path)
  await writeFile(file_abs,JSON.stringify(data,undefined, 2))
}

async function load_yaml(rel_path){
  const path = join(config.rootdir,rel_path)
  const fileContent = await readFile(path,'utf-8')
  const data = yaml.load(fileContent);
  return data;
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

function section_from_pathname(pathname){
  if(pathname.startsWith('http')){
      return 'external'
  }
  const sections = pathname.split('/')
  if(sections.length < 2){
      return "home"
  }else if(sections[1] == ""){
      return "home"
  }else{
      return sections[1]
  }
}


export{
  assetToUrl,
  relAssetToUrl,
  shortMD5,
  exists,
  load_json,
  load_yaml,
  save_json,
  save_file,
  green_log,
  blue_log,
  yellow_log,
  contentPathToStaticPath,
  section_from_pathname
}
