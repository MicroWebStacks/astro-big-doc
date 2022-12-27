import raw_menu from './menu.json'
import {first_level_ignore_base} from '@/components/menu_utils'
import {promises as fs} from 'fs';
import {resolve,join,relative} from 'path'
import { file_list_to_menu_tree } from '../components/menu_utils';
import { create } from 'domain';

const menu_map = {}

//https://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search
async function parse_dir_recursive(dir) {
    const subdirs = await fs.readdir(dir);
    const files = await Promise.all(subdirs.map(async (subdir) => {
      const res = resolve(dir, subdir);
      return (await fs.stat(res)).isDirectory() ? parse_dir_recursive(res) : res;
    }));
    return files.reduce((a, f) => a.concat(f), []);
}

async function create_section_menu(section_path,href_base){
  const rootdir = process.cwd()
  const search_base = join(rootdir,section_path)
  console.log(`section_path = ${section_path} ; search_base = ${search_base}`)
  const files = await parse_dir_recursive(search_base)
  //console.log(files)
  const mdx_files_abs = files.filter((file)=>(file.endsWith('.mdx')))
  const mdx_files = mdx_files_abs.map((file)=>(relative(search_base,file).replaceAll('\\','/')))
  //mdx_files.forEach(file => {console.log(file)     });
  //turn path results in a hierarchal menu (from list, level to Tree)
  const section_menu = file_list_to_menu_tree(mdx_files,href_base)

  return {
    menu:section_menu,
    files:mdx_files
  }
}

async function get_nav_menu(pageUrl){
  const section = first_level_ignore_base(pageUrl)
  console.log(`section = ${section}`)
  const section_entry = raw_menu.find((entry)=>(entry.href.split('/')[1] == section))
  const section_path = section_entry.path
  if('items' in section_entry){
    const menu = {...section_entry,visible:true}
    if(menu.items.length ==1){
      menu.visible = false
    }
    return menu
  }
  if(!section_path in menu_map){
      menu_map[section_path] = await create_section_menu(section_path,section_entry.href_base)
  }
  //console.log(menu_map[section_path])
  return menu_map[section_path].menu
}

async function get_section_files(section_path,href_base){
  if(!(section_path in menu_map)){
    menu_map[section_path] = await create_section_menu(section_path,href_base)
  }
 
  return menu_map[section_path].files
}

export{
    get_nav_menu,
    get_section_files
}
