import {constants, access, mkdir, readFile, writeFile} from 'fs/promises'
import {dirname,join} from 'path'
import {config} from '../../config.js'
import {createHash} from 'crypto';
import yaml from 'js-yaml';

async function load_json(rel_path){
  const path = join(config.rootdir,rel_path)
  const text = await readFile(path,'utf-8')
  return JSON.parse(text)
}

async function load_json_abs(abs_path){
  const text = await readFile(abs_path,'utf-8')
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


export{
  shortMD5,
  exists,
  load_json,
  load_json_abs,
  load_yaml,
  save_json,
  save_file
}
