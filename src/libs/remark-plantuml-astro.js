import {visit} from "unist-util-visit";
import plantumlEncoder from "plantuml-encoder";
import {writeFileSync} from 'fs'
import {basename} from 'path'
import fetch from 'sync-fetch'
import {existsSync,copyFileSync,mkdirSync,statSync} from 'fs'
import {resolve,dirname,join,relative} from 'path'
import { config } from '../../config.js'
import { isNewer } from './utils'

const puml_server ="https://www.plantuml.com/plantuml/svg"

let counter = 0

function puml_text_to_svg_file(text,svg_file){
  const url = `${puml_server}/${plantumlEncoder.encode(text)}`;
  const svg_text = fetch(url).text()
  writeFileSync(svg_file,svg_text)
}

function relAssetToUrl(relativepath,refdir,baseUrl){
  const addUrl = config.base?config.base+'/':''
  baseUrl += addUrl

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

//todo move cache directly to 'public/raw'
function update_puml_file(file,value,meta){
  console.log("file = " + file)
  const mtime = statSync(file).mtime
  const puml_title = (meta)?meta:counter++;
  const svg_file = file + "." + puml_title + ".svg"

  let do_update = true
  if(existsSync(svg_file)){
    const pmtime = statSync(svg_file).mtime
    if(pmtime > mtime){
      do_update = false
      //console.log(`svg file exist for puml ${puml_title}`)
    }
  }
  if(do_update){
    //console.log(`creating puml+svg files : ${puml_file} + .svg`)
    puml_text_to_svg_file(value,svg_file)
  }
  console.log(`${svg_file} /// ${basename(svg_file)}`)
  const base_svg_file = basename(svg_file)
  const url = relAssetToUrl(base_svg_file,dirname(file),"/")

  return url
}


/**
 * Plugin for remark-js
 *
 * See details about plugin API:
 * https://github.com/unifiedjs/unified#plugin
 *
 * You can specify the endpoint of PlantUML with the option 'baseUrl'
 *
 * @param {Object} pluginOptions Remark plugin options.
 */
function remarkPUMLAstro(pluginOptions) {
  return function transformer(syntaxTree,file) {
    //console.log(` 'remarkPUMLAstro' * in file '${file.history}'`)
    visit(syntaxTree, "code", node => {
      if (!node.lang || !node.value || node.lang !== "plantuml") return;
      const url = update_puml_file(file.history[0],node.value,node.meta)
      node.type = "html";
      node.value = `<data data-url="${url}" > </data>`
      node.alt = node.meta;
      node.meta = undefined;
    });
    return syntaxTree;
  };
}

export{
  remarkPUMLAstro
}
