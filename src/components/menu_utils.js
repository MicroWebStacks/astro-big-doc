import {config} from "@/config"
import {dirname,basename} from 'path'

function remove_base(base,url){
    if(url.startsWith(base)){
        url = url.slice(base.length)
    }
    return url
}

function root_page(url){
    let str = String(url)
    if(str.includes("//")){
        str = str.split("//")[1]
    }
    if(str.includes("/")){
        str = str.split("/")[1]
    }else{
        str = ""
    }
    return `/${str}`
}

function get_base(href){
    const last_slash = href.lastIndexOf('/')
    return href.substring(0,last_slash)
}

function url_path(url){
    let str = String(url)
    if(str.includes("//")){
        str = str.split("//")[1]
    }
    if(str.includes("/")){
        const start = str.indexOf("/")+1
        str = str.substring(start)
    }else{
        str = ""
    }
    if(str.endsWith('/')){//rstrip('/')
        str = str.slice(0,-1)
    }
    return `/${str}`
}

function first_level_ignore_base(pageUrl){
    let base = config.base
    if(!base.startsWith('/')){
        base = '/'+base
    }
    let page_url_no_base = remove_base(base,pageUrl)
    if(page_url_no_base.endsWith('/')){
        page_url_no_base += 'index' //to help the split dirname extraction
    }
    const parts = dirname(page_url_no_base).split('/')
    if(parts.length > 1){
        return parts[1]
    }else{
        return ''
    }
}

function active_page(url, raw_menu){
    const page = root_page(url)
    //console.log(`active_page = ${page}`)
    raw_menu.forEach((item)=>{item.base = get_base(item.href)})
    let active_page_index = raw_menu.map(item=>item.base).indexOf(page)
    //assumption is that the first page (index 0) is always the Home root '/'
    if(active_page_index == -1){
        active_page_index = 0
    }
    return active_page_index
}

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

function find_parent(index,headings){
    const element_depth = headings[index].depth
    if(index == 0){
        return null
    }else{
        for(let rev_i = index-1;rev_i>=0;rev_i--){
            if(headings[rev_i].depth<element_depth){
                return headings[rev_i]
            }
        }
    }
}

/* not recursive o(n²)
*/
function heading_list_to_tree(headings){
    for(let element of headings){
        element.items=[]
        element.parent=true
        element.expanded=true
        element.href = `#${element.slug}`
    }

    let tree = []

    for(let index=0; index<headings.length;index++){
        let element = headings[index]
        let parent = find_parent(index,headings)
        if(parent){
            parent.items.push(element)
        }else{
            tree.push(element)
        }
    }

    for(let element of headings){
        if (element.items.length == 0){
            element.parent = false
            delete element.items
            delete element.expanded
        }
    }
    return tree
}

/** headings start at Sidemenu
 * 
 */
function process_toc_list(headings){
    if(typeof headings == 'undefined' || headings.length == 0){
        return {items:[],visible:false}
    }

    let side_menu = {items:[],visible:false}
    side_menu.items = heading_list_to_tree(headings)//also .slug=>.href
    side_menu.visible = true
    return side_menu
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
        depth: path.split('/').length
    }
}

function needs_parent(entry){
    if(entry.depth == 1){                 //already on root
        return false
    }
    return true
}

function get_parent(entries,index){
    const entry = entries[index]
    const parent_path = dirname(entry.path)
    return entries.find((entry)=>(entry.path == parent_path))
}

function push_files(files_map,href_base){
    let entries = []
    for (const [path, data] of Object.entries(files_map)) {
        let element = {
            parent:false,
            text: data.frontmatter.title?data.frontmatter.title:path,
            weight: data.frontmatter.weight?data.frontmatter.weight:1,
            path: path,
            depth: path.split('/').length,
            href : href_base + path
        }
        entries.push(element)
    }
    return entries
}

function create_parents(entries){
    let parents = []
    console.log(`menu_utils> entries.length = ${entries.length}`)
    for(let index=0; index<entries.length;){
        const entry = entries[index]
        if(needs_parent(entry)){
            const parent_index = get_parent(entries,index)
            if(parent_index == undefined){
                parents.push(create_parent(entry))
                parents[parents.length-1].items.push(entry)
            }else{
                entries[parent_index].items.push(entry)
            }
            entry.text = basename(entry.text)
            entries.splice(index,1)
        }else{
            index++
        }
    }
    //console.log(`parents.length = ${parents.length}`)
    entries = entries.concat(parents)
    entries.sort((a, b) => a.parent - b.parent);
    entries.sort((a, b) => a.depth - b.depth);
    entries.sort((a, b) => a.weight - b.weight);
    console.log(entries)
    return entries
}

function file_list_to_menu_tree(files_map,href_base){
    //console.log(`href_base = ${href_base}`)
    
    let entries = push_files(files_map,href_base)
    entries.sort((a, b) => a.depth - b.depth);
    entries = create_parents(entries)

    return {items:entries,visible:true}
}

export{
    process_menu_tree,
    process_toc_list,
    active_page,
    remove_base,
    first_level_ignore_base,
    file_list_to_menu_tree,
    set_classes_recursive
}
