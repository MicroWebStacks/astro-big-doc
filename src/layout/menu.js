import raw_menu from './menu.json'
import {first_level_ignore_base} from '@/components/menu_utils'
import {promises as fs} from 'fs';
import {resolve,join,relative} from 'path'
import { file_list_to_menu_tree } from '../components/menu_utils';

const menu_map = {}

//https://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search
async function getFiles(dir) {
    const subdirs = await fs.readdir(dir);
    const files = await Promise.all(subdirs.map(async (subdir) => {
      const res = resolve(dir, subdir);
      return (await fs.stat(res)).isDirectory() ? getFiles(res) : res;
    }));
    return files.reduce((a, f) => a.concat(f), []);
  }

async function get_nav_menu(pageUrl){
  const section = first_level_ignore_base(pageUrl)
  //console.log(`section = ${section}`)
  const section_entry = raw_menu.find((entry)=>(entry.href.split('/')[1] == section))
  const section_root = section_entry.path
  if(section_root in menu_map){
      return menu_map[section_root]
  }
  
  const rootdir = process.cwd()
  const search_base = join(rootdir,section_root)
  console.log(`section_root = ${section_root} ; search_base = ${search_base}`)
  const files = await getFiles(search_base)
  //console.log(files)
  const mdx_files_abs = files.filter((file)=>(file.endsWith('.mdx')))
  const mdx_files = mdx_files_abs.map((file)=>(relative(search_base,file).replaceAll('\\','/')))
  //mdx_files.forEach(file => {console.log(file)     });
  //turn path results in a hierarchal menu (from list, level to Tree)
  const section_menu = file_list_to_menu_tree(mdx_files,section_entry.href_base)
  menu_map[section_root] = section_menu

  return menu_map[section_root]
}

export{
    get_nav_menu
}
