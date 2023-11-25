import {section_from_pathname} from './layout_utils.js'

function get_active_menu(raw_menu,pathname){
    const current_section = section_from_pathname(pathname)
    console.log(`current_section = '${current_section}'`)
    return raw_menu.map((item)=>{
        item.active_class = (section_from_pathname(item.href) == current_section)?"active":""
        return item
    })
}

export{
    get_active_menu
}
