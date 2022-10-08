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
    return `/${str}`
}

function active_page(url, raw_menu){
    const page = root_page(url)
    let active_page_index = raw_menu.map(item=>item.href).indexOf(page)
    //assumption is that the first page (index 0) is always the Home root '/'
    if(active_page_index == -1){
        active_page_index = 0
    }
    return active_page_index
}

function active_subpage(url,submenu){
    const path = url_path(url)
    let res_index = -1
    submenu.forEach((element,index) => {
        //console.log(`path(${path}) == href(${element.href})`)
        if(path.startsWith(element.href)){
            res_index = index
        }
    });
    return res_index
}

function process_menu_list(url,raw_menu){
    let side_menu = {items:[],visible:false}

    const active_section_index = active_page(url,raw_menu)
    side_menu.visible = ("items" in raw_menu[active_section_index])
    if(side_menu.visible == false)    {
        return side_menu
    }
    side_menu.items = raw_menu[active_section_index].items

    const active_subpage_index = active_subpage(url,side_menu.items)
    side_menu.items.forEach((item,index)=>{
        item.classes = (index == active_subpage_index)?"active":""
        item.paddingLeft = item.level?item.level*10+10:10
    })
    

    return side_menu
}

function set_classes(url,items){
    items.forEach((item)=>{
        item.active = (url_path(url) == item.href)
        if("items" in item){
            item.parent = true
            item.expanded = true
            set_classes(url,item.items)
        }
    })
}

function process_menu_tree(url,raw_menu){
    let side_menu = {items:[],visible:false}

    const active_section_index = active_page(url,raw_menu)
    side_menu.visible = ("items" in raw_menu[active_section_index])
    if(side_menu.visible == false)    {
        return side_menu
    }
    side_menu.items = raw_menu[active_section_index].items

    set_classes(url,side_menu.items)

    return side_menu
}

export{
    process_menu_list,
    process_menu_tree
}
