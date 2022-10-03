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

function active_page(url, menu){
    const page = root_page(url)
    let active_page_index = menu.map(item=>item.href).indexOf(page)
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

export{
    root_page,
    active_page,
    active_subpage
}
