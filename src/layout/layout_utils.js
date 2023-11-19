
function section_from_pathname(pathname){
    if(pathname.startsWith('http')){
        return 'external'
    }
    const sections = pathname.split('/')
    if(sections.length < 2){
        return "home"
    }else if(sections[1] == ""){
        return "home"
    }else{
        return sections[1]
    }
}

function section_from_url(url){
    section_from_pathname(new URL(url).pathname)
}

function get_active_menu(raw_menu,pathname){
    const current_section = section_from_pathname(pathname)
    console.log(`current_section = '${current_section}'`)
    return raw_menu.map((item)=>{
        item.active_class = (section_from_pathname(item.href) == current_section)?"active":""
        return item
    })
}

export{
    get_active_menu,
    section_from_pathname
}
