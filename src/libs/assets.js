import {copyFileSync} from 'fs'
import {constants, access, stat, mkdir} from 'fs/promises'
import {dirname,join, basename, extname} from 'path'
import {config} from '../../config.js'
import {createHash} from 'crypto';

async function exists(filePath) {
    try {
      await access(filePath, constants.F_OK);
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
        return relAssetToUrlCopy(relativepath,dirpath)
    }
    if(relativepath.startsWith("/")){
        return relativepath
    }
    //handled by /assets/[...path].js to config.rootdir / config.content_path
    const newurl = join("assets",dirpath,relativepath)
    return "/"+newurl.replaceAll('\\','/')
}

async function assetToUrl(path,dirpath){
    let src = path
    const external = path.startsWith('http')
    if(!external){
    if(!path.startsWith("/")){
        src = await relAssetToUrl(path,dirpath)
    }
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

export{
  assetToUrl,
  relAssetToUrl,
  relAssetToPath,
  shortMD5,
  exists,
  contentPathToStaticPath,
  section_from_pathname,
  file_mime
}
