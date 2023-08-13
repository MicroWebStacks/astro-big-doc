import {config} from "../../config"
import {dirname,join} from 'node:path'
import {promises as fs} from 'fs';

async function save_json(root_path,data){
    const filepath = join(config.rootdir,root_path)
    await fs.writeFile(filepath,JSON.stringify(data,undefined, 2))
    console.log(` saved json file ${filepath}`)
}

function trim_ext(filename){
    return filename.replace(/\.[^/.]+$/, "")
}

function remove_first(base,url){
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

function remove_base(pageUrl){
    let base = config.base
    if(base){
        if(!base.startsWith('/')){
            base = '/'+base
        }
    }
    return remove_first(base,pageUrl)
}

function url_to_section(pageUrl){
    let page_url_no_base = remove_base(pageUrl)
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

//menu cookie format "4515;true;-1;true;-1"
function manage_state(cookies){
    const magic_number = 4515
    const default_menu = {
        pages:{visible:true,width:-1},
        toc:{visible:true,width:-1}
    }
    function parse_menu_state(state_text){
        const values = state_text.split(';')
        if((parseInt(values[0]) != magic_number)||(values.length != 5)){
            return default_menu
        }else{
            const result = {
                pages:{visible:(values[1] == true),width:parseInt(values[2])},
                toc:{visible:(values[3] == true),width:parseInt(values[4])}
            }
        }
    }
    function serialize_menu_state(menu){
        return `${magic_number};${menu.pages.visible};${menu.pages.width};${menu.toc.visible};${menu.toc.width}`
    }

    let menu = default_menu
    if(cookies.has("menus_state")){
        const cookie_text = cookies.get("menus_state").value
        menu = parse_menu_state(cookie_text)
        console.log(`index> menus_state (${state_text})`)
    }else{
        console.log("index> menus_state does not exist starting from default")
    }
    //enforce format in both cases
    const state_text = serialize_menu_state(menu)
    cookies.set("menus_state",state_text)
    return menu
}

export{
    trim_ext,
    active_page,
    remove_first,
    url_to_section,
    url_path,
    remove_base,
    manage_state,
    save_json
}
