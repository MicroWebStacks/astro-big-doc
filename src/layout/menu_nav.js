import {dirname,basename} from 'path'
import {url_path} from './menu_utils'

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

function files_map_to_menu_tree(files_map,href_base){
    console.log(`href_base = ${href_base}`)
    
    let entries = push_files(files_map) //[{parent, text, weight, path,depth, href}]
    entries.sort((a, b) => a.depth - b.depth);
    entries = create_parents(entries)
    entries.forEach((entry)=>{
        if(entry.text.startsWith(href_base)){
            entry.text = entry.text.replace(href_base,'')
        }
    })
    return {items:entries,visible:true}
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
