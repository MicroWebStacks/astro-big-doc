import {dirname,basename} from 'path'
import {url_path, remove_base} from './menu_utils'
import { blue_log,yellow_log } from '../libs/utils'

function set_classes_recursive(url,items){
    let active_descendant = false
    items.forEach((item)=>{
        item.active = (url_path(url) == item.href)
        active_descendant ||= item.active
        if("items" in item){
            item.parent = true
            item.active_descendant = set_classes_recursive(url,item.items)
            item.expanded = item.active_descendant
            active_descendant ||= item.active_descendant
        }
    })
    return active_descendant
}

function path_depth(path){
    return path.split('/').length - 2 // '/blog' is root => 0
}

function create_parent(entry){
    const path = dirname(entry.path)
    return {
        items:[
        ],
        parent:true,
        expanded:true,
        text:path,
        path: path,
        depth: path_depth(path)
    }
}

function needs_parent(entry){
    if(entry.depth == 1){                 //already on root
        return false
    }
    console.log(`menu_nav> needs_parent(${entry.text}) depth=${entry.depth} path='${entry.path}' needs parent`)
    return true
}

function get_parent(parents,entry){
    const parent_path = dirname(entry.path)
    console.log(`menu_nav> get_parent() searching for '${parent_path}' in ${parents.length} parents`)
    const parent = parents.find((parent)=>(parent.path == parent_path))
    if(parent != undefined){
        console.log(`menu_nav> get_parent() found parent '${parent.path}'`)
        return parent
    }else{
        console.log(`menu_nav> get_parent() not found => cerate`)
        const new_parent = create_parent(entry)
        parents.push(new_parent)
        return new_parent
    }
}

function push_files(files_map){
    let entries = []
    for (const [path, data] of Object.entries(files_map)) {
        let element = {
            parent:false,
            text: data.frontmatter.title?data.frontmatter.title:basename(path),
            weight: data.frontmatter.weight?data.frontmatter.weight:1,
            path: path,
            parent_path: dirname(path),
            depth: path_depth(path),
            href : data.url
        }
        entries.push(element)
    }
    return entries
}

function create_parents(entries){
    let parents = []
    console.log(`menu_utils> entries.length = ${entries.length}`)
    entries.forEach((entry)=>{
        if(needs_parent(entry)){
            const parent = get_parent(parents,entry)//create if not existing
            parent.items.push(entry)
            entry.on_root = false
        }else{
            entry.on_root = true
        }
    })
    entries = entries.filter((entry)=>(entry.on_root))
    //console.log(`parents.length = ${parents.length}`)
    entries = entries.concat(parents)
    entries.sort((a, b) => a.parent - b.parent);
    entries.sort((a, b) => a.depth - b.depth);
    entries.sort((a, b) => a.weight - b.weight);
    //console.log(entries)
    return entries
}

function create_parent_dir(directories,href_base,path){
    const menu_path = remove_base(href_base,path)
    const dir_menu_path = dirname(menu_path)
    const dir_path = dirname(path)
    const dir_exist = directories.find((parent)=>(parent.path == dir_path))
    if(dir_exist == undefined){
        let element = {
            items:[],
            parent:true,
            expanded:true,
            text: dir_menu_path,
            path: dir_path,
            parent_path: dirname(dir_path),
            weight: 1,
            depth: path_depth(dir_path),
            href : dir_path
        }
        directories.push(element)
    }
}

function link_or_set_as_ancestor(directories,href_base,path){
    yellow_log(`link_or_set_as_ancestor_dir() for "${path}"`)
    //start unrolling path and check at which step a parent can be found, adjust new depth to parent depth + 1
    //until depth == 1, then just set as root and new depth = 1, would not need a parent then
}

function push_directories({files_map,href_base}){
    const directories = []

    for (const [path, data] of Object.entries(files_map)) {
        if(path_depth(path) > 1){
            blue_log(`${data.url} needs parent depth = ${path_depth(path)}`)
            create_parent_dir(directories,href_base,path)
        }
    }

    return directories
}

function find_parent(menu_list,parent_path){
    //TODO if parent not found, try to find an ancestor to connect to before fallback on root
    return menu_list.find((sub_entry)=>(sub_entry.path == parent_path))
}

function menu_list_to_tree(menu_list,href_base){
    const menu_tree = []
    menu_list.forEach((entry)=>{
        if(needs_parent(entry)){
            const entry_parent = find_parent(menu_list,entry.parent_path)
            if(entry_parent != undefined){
                entry_parent.items.push(entry)
            }else{
                menu_tree.push(entry)
            }
        }else{
            menu_tree.push(entry)
        }
    })
    return menu_tree
}

function files_map_to_menu_tree(files_map,href_base){
    const menu_context = {files_map,href_base}
    blue_log(`files_map_to_menu_tree() href_base = ${href_base}`)
    
    let menu_list = push_files(files_map) //[{parent, text, weight, path,depth, href}]
    menu_list.sort((a, b) => a.depth - b.depth);
    const directories_list = push_directories(menu_context)
    menu_list = menu_list.concat(directories_list)

    const menu_tree = menu_list_to_tree(menu_list,href_base)

    return {items:menu_tree,visible:true,list:menu_list}
}

function set_active_expanded(url, menu){
    if('items' in menu){
        set_classes_recursive(url, menu.items)
    }
}

export{
    files_map_to_menu_tree,
    set_active_expanded
}
