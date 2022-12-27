import raw_menu from './menu.json'
import {first_level_ignore_base} from '@/components/menu_utils'
import {promises as fs} from 'fs';
import {resolve,join,relative} from 'path'
import { file_list_to_menu_tree,set_classes_recursive } from '../components/menu_utils';
import matter from 'gray-matter';


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

function url_to_file(section_path,page){
  const base_path = process.cwd()+section_path
  const page_path = resolve(base_path,page)
  return page_path
}

async function file_list_to_data_map(mdx_files,section_path,href_base){
  let result = {}
  for(let file of mdx_files){
    const abs_path = url_to_file(section_path,file)
    const content = await fs.readFile(abs_path, 'utf-8');
    const frontmatter = matter(content).data
    result[file] = {
      path:file,
      abs_path:abs_path,
      href: href_base + file,
      frontmatter: frontmatter
    }
  }
  console.log(result)
  return result
}

async function create_section_menu(section_path,href_base){
  const rootdir = process.cwd()
  const search_base = join(rootdir,section_path)
  console.log(`menu> section_path = ${section_path} ; search_base = ${search_base}`)
  const files = await parse_dir_recursive(search_base)
  //console.log(files)
  const mdx_files_abs = files.filter((file)=>(file.endsWith('.mdx')))
  const mdx_files = mdx_files_abs.map((file)=>(relative(search_base,file).replaceAll('\\','/')))
  //mdx_files.forEach(file => {console.log(file)     });
  //turn path results in a hierarchal menu (from list, level to Tree)
  const files_map = await file_list_to_data_map(mdx_files,section_path,href_base)
  const section_menu = file_list_to_menu_tree(files_map,href_base)

  return {
    menu:section_menu,
    files_list:mdx_files,
    files_map:files_map,
    path:section_path,
    href:href_base
  }
}

async function get_nav_menu(pageUrl){
  const section = first_level_ignore_base(pageUrl)
  console.log(`menu> get_nav_menu() section = ${section}`)
  const section_entry = raw_menu.find((entry)=>(entry.href.split('/')[1] == section))
  const section_path = section_entry.path
  if('items' in section_entry){
    section_entry.visible = true
    if(section_entry.items.length ==1){
      section_entry.visible = false
    }
    console.log(section_entry)
    set_classes_recursive(pageUrl,section_entry.items)
    return section_entry
  }
  if(!section_path in menu_map){
      menu_map[section_path] = await create_section_menu(section_path,section_entry.href_base)
  }
  //console.log(menu_map[section_path])
  if('items' in menu_map[section_path]){
    set_classes_recursive(pageUrl,menu_map[section_path].items)
  }
  return menu_map[section_path].menu
}

async function get_section_files(section_path,href_base){
  if(!(section_path in menu_map)){
    menu_map[section_path] = await create_section_menu(section_path,href_base)
  }
 
  return menu_map[section_path].files_list
}

function get_section_file_from_url(section_path,page){
  if(page in menu_map[section_path].files_map){
    return menu_map[section_path].files_map[page].abs_path
  }else{
    console.warn(`menu> ${page} not available`)
    return null
  }
}

export{
    get_nav_menu,
    get_section_files,
    get_section_file_from_url
}
