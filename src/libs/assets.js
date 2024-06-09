import {copyFileSync,accessSync} from 'fs'
import {constants, access, stat, mkdir, readFile} from 'fs/promises'
import {dirname,join, basename, extname} from 'path'
import {config} from '../../config.js'
import {createHash} from 'crypto';
import {load_yaml_abs} from './utils.js'

async function exists(filePath) {
    try {
      await access(filePath, constants.F_OK);
      return true;
    } catch (error) {
      return false;
    }
}

function existsSync(filePath) {
    try {
        accessSync(filePath, constants.F_OK);
        return true;
    } catch (error) {
        return false;
    }
}
  
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
    //async here is causing a race condition, a mem cache need to take mod time in account
    copyFileSync(file_abs,targetfile)
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

async function hashed_path_content(abs_path){
    const text = await readFile(abs_path,'utf-8')
    const hash = shortMD5(text)
    return hash
}

async function relAssetToUrlCopy(relativepath,dirpath){
    const dir_abs = join(config.content_path,dirpath)
    const file_abs = join(dir_abs,relativepath)
    if(await exists(file_abs)){
    if(config.assets_hash_dir){
        const target_filename =  hashed_filename(relativepath,join(dirpath,relativepath))
        const target_file_abs = join(config.rootdir,config.outDir,config.copy_assets_dir,target_filename)
        await copy_if_newer(file_abs,target_file_abs)
        const newurl = join(config.copy_assets_dir,target_filename)
        return "/"+newurl.replaceAll('\\','/')
    }else{
        const target_file_abs = join(config.rootdir,config.outDir,config.copy_assets_dir,dirpath,relativepath)
        await copy_if_newer(file_abs,target_file_abs)
        const newurl = join(config.copy_assets_dir,dirpath,relativepath)
        return "/"+newurl.replaceAll('\\','/')
    }
    }else{
    console.warn(`relativepath does not exist ${relativepath}`)
    return relativepath
    }
}

async function relAssetToUrl(relativepath,dirpath){
    if(config.copy_assets){
        return await config.base+relAssetToUrlCopy(relativepath,dirpath)
    }
    //handled by /assets/[...path].js to config.rootdir / config.content_path
    const newurl = join("assets",dirpath,relativepath)
    return config.base+"/"+newurl.replaceAll('\\','/')
}

async function absAssetToUrl(path){
    return await relAssetToUrl(path,"")
}

async function assetToUrl(path,dirpath){
    let src = config.base+path
    if(path.startsWith('http')){
        return src
    }
    if(path.startsWith("/")){
        if(!await exists(join(config.rootdir,"public",path))){
            //managed as relatve to the content dir
            src = await absAssetToUrl(path)
        }//else unmanaged
    }else{
        src = await relAssetToUrl(path,dirpath)
    }
    return src
}

function relAssetToPath(relativepath,dirpath){
    const dir_abs = join(config.content_path,dirpath)
    return join(dir_abs,relativepath)
}
  
function contentPathToStaticPath(section,entry_path){
    const p1 = join(dirname(entry_path))
    const p2 = p1.replaceAll('\\','/')
    return p2
}

function shortMD5(text) {
    const hash = createHash('md5').update(text, 'utf8').digest('hex');
    return hash.substring(0, 8);
}

function add_base(url){
    if(!url.startsWith("http")){
        url = config.base + url
    }
    return url
}

function remove_base(pathname){
    if((config.base != "") && (pathname.startsWith(config.base))){
        pathname = pathname.substring(config.base.length)
    }
    return pathname
}
function section_from_pathname(pathname){
    pathname = remove_base(pathname)
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

function file_mime(path){
    const ext = extname(path)
    if(ext == ".svg"){
        return 'image/svg+xml'
    }
    else if(ext == ".png"){
        return 'image/png'
    }
    else if(ext == ".jpg"){
        return 'image/jpeg'
    }
    else if(ext == ".jpeg"){
        return 'image/jpeg'
    }
    else if(ext == ".webp"){
        return 'image/webp'
    }
    else if(ext == ".txt"){
        return 'text/plain'
    }
}

function file_ext(url){
    url = url.split('?')[0].split('#')[0];
    const filename = url.substring(url.lastIndexOf('/') + 1);
    const lastDotIndex = filename.lastIndexOf('.');
    return (lastDotIndex === -1) ? '' : filename.substring(lastDotIndex + 1)
}

async function getMetaData(url, dirpath){
    const dir_abs = join(config.content_path,dirpath)
    const file_abs = join(dir_abs,url)
    const lastDotIndex = file_abs.lastIndexOf('.');
    let meta_file
    if(lastDotIndex == -1){
        meta_file = file_abs+".yaml"
    }else{
        meta_file = file_abs.substring(0,lastDotIndex)+".yaml"
    }
    if(await exists(meta_file)){
        console.log(` * MarkdownImage> found meta file ${meta_file}`)
        return await load_yaml_abs(meta_file)
    }
    return {}
}

export{
  assetToUrl,
  relAssetToUrl,
  relAssetToPath,
  shortMD5,
  exists,
  existsSync,
  contentPathToStaticPath,
  section_from_pathname,
  file_mime,
  file_ext,
  add_base,
  remove_base,
  hashed_path_content,
  getMetaData
}
