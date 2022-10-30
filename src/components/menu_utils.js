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

export{
    process_menu_tree,
    process_toc_list,
    active_page,
    remove_base
}
