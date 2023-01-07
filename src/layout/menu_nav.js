import {dirname,basename} from 'path'
import {active_page, url_path} from './menu_utils'

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

/**  Topmenu  : depth 0
 *  Sidemenu : depths 1,2,...
 *  Sidemenu items : parent,(children)expanded
 */
function process_menu_tree(url,raw_menu){
    let side_menu = {items:[],visible:false}

    const active_section_index = active_page(url,raw_menu)
    side_menu.visible = ("items" in raw_menu[active_section_index])
    if(side_menu.visible == false)    {
        return side_menu
    }
    side_menu.items = raw_menu[active_section_index].items

    set_classes_recursive(url,side_menu.items)
    return side_menu
}

function create_parent(entry){
    const path = dirname(entry.path)
    console.log(`menu_nav> create_parent() path = '${path}'`)
    return {
        items:[
        ],
        parent:true,
        expanded:true,
        text:path,
        path: path,
        depth: path.split('/').length
    }
}

function needs_parent(entry){
    if(entry.depth == 1){                 //already on root
        return false
    }
    return true
}

function get_parent(parents,entry){
    const parent_path = dirname(entry.path)
    console.log(`menu_nav> get_parent() searching for '${parent_path}'`)
    const parent = parents.find((parent)=>(parent.path == parent_path))
    if(parent != undefined){
        return parent
    }else{
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
            depth: path.split('/').length,
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
        const parent = get_parent(parents,entry)//create if not existing
        parent.items.push(entry)
    })
    //console.log(`parents.length = ${parents.length}`)
    entries = entries.concat(parents)
    entries.sort((a, b) => a.parent - b.parent);
    entries.sort((a, b) => a.depth - b.depth);
    entries.sort((a, b) => a.weight - b.weight);
    //console.log(entries)
    return entries
}

function files_map_to_menu_tree(files_map){
    //console.log(`href_base = ${href_base}`)
    
    let entries = push_files(files_map) //[{parent, text, weight, path,depth, href}]
    entries.sort((a, b) => a.depth - b.depth);
    entries = create_parents(entries)

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
