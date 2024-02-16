import {config} from '@/client_config.js'
import { remove_base } from '@/libs/client_utils.js'

const svg_text_icon = `<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90.48 122.88">
<path d="M35.27.78a3,3,0,0,1,2-.78,1.54,1.54,0,0,1,.47.05h46.2A6.59,6.59,0,0,1,88.56,2a6.52,6.52,0,0,1,1.92,4.64v109.7a6.57,6.57,0,0,1-6.56,6.56H6.67a6.57,6.57,0,0,1-6.56-6.56v-78A3.07,3.07,0,0,1,0,37.56a3.19,3.19,0,0,1,1-2.24L34.9,1a1.5,1.5,0,0,1,.26-.21ZM84.65,6.62a.5.5,0,0,0-.21-.47A.67.67,0,0,0,84,5.94H40.22V31.62a8.89,8.89,0,0,1-8.91,8.91H6.1v75.79a.58.58,0,0,0,.2.47.69.69,0,0,0,.47.21H84a.58.58,0,0,0,.47-.21.73.73,0,0,0,.21-.47V6.62Zm-62,94.73a2.64,2.64,0,0,1,0-5.28h28a2.64,2.64,0,0,1,0,5.28Zm0-17.75a2.64,2.64,0,0,1,0-5.28H65.46a2.64,2.64,0,0,1,0,5.28Zm0-17.76a2.64,2.64,0,0,1,0-5.28H72a2.64,2.64,0,0,1,0,5.28Zm11.7-34.22V10.11L10.11,34.64h21.2a3.16,3.16,0,0,0,2.13-.88,3.06,3.06,0,0,0,.89-2.14Z" stroke-width="5px" stroke="#d0d0d0" />
</svg>`
const svg_icon = `<svg viewBox="0 0 100 100" width="60" height="60" fill="#00000000" xmlns="http://www.w3.org/2000/svg">
<path d="M 20,10 L 70,50 L 20,90" stroke-width="20px" stroke="#a0a0a0" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>`

function add_side_open_state(){
    menu.sections_open = {}
    menu.sections_expand = {}
    for(const section in menu.sections){
        menu.sections_open[section] = (menu.sections[section].length>0)?true:false
        menu.sections_expand[section] = {}
    }
}

async function get_menu(){
    let needs_fetch = false
    let menu_text = localStorage.getItem("menu")
    if(!menu_text){
        console.log("not in storage, fetching")
        needs_fetch = true
    }else{
        console.log("in storage, checking hash")
        const menu_nav = document.querySelector("nav.pages_menu")
        const new_hash = menu_nav.getAttribute("data-hash")
        menu = JSON.parse(menu_text)
        if(menu.hash == new_hash){
            console.log(`new html menu hash ${new_hash} matching local Storage`)
        }else{
            console.log(`new html menu hash ${new_hash} mismatch - refetching`)
            needs_fetch = true
        }
    }
    if(needs_fetch){
        const resp = await fetch(`${config.base}/menu.json`)
        menu = await resp.json()
        add_side_open_state()
        save_menu()
    }
}

function save_menu(){
    localStorage.setItem("menu",JSON.stringify(menu))
}

function expand_toggle_save(section_name,href){
    let expand_map = menu.sections_expand[section_name]
    if(Object.hasOwn(expand_map,href)){
        expand_map[href] = !expand_map[href]
    }else{
        expand_map[href] = false
    }
    menu.sections_expand[section_name] = expand_map
    save_menu()
}

function set_open_state(section_name){
    const left_open = menu.sections_open[section_name]
    console.log(`left_open = ${left_open}`)
    const menu_nav = document.querySelector("nav.pages_menu")
    menu_nav.style.transition = "width 0s"
    if(left_open){
        menu_nav.style.width = "20vw"
        menu_nav.setAttribute("data-width","20vw")
        menu_nav.classList.add("open")
        menu_nav.classList.remove("closed")
        console.log("open nav")
    }else{
        menu_nav.style.width = "0vw"
        menu_nav.classList.add("closed")
        menu_nav.classList.remove("open")
        console.log("close nav")
    }
    setTimeout(()=>{
        menu_nav.style.transition = "width 0.5s"
    },100)
}

function create_ul_from_items(items,root,expanded){
    let ul = document.createElement('ul')
    ul.classList.add("pages_menu")
    if(expanded == false){
        console.log(expanded)
        ul.classList.add("hidden")
    }
    if(root){
        ul.classList.add("root")
    }else{
        ul.classList.add("nested")
    }
    items.forEach(item => {
        let li = document.createElement('li')
        li.classList.add("pages_menu")
        let div = document.createElement('div')
        div.classList.add("pages_menu","entry_container")
        if(item.active){
            div.classList.add("active")
        }
        if(item.expanded){
            div.classList.add("expanded")
        }
        if(item.parent){
            div.classList.add("parent")
            let span_icon = document.createElement('span')
            span_icon.classList.add("pages_menu","icon","expand")
            span_icon.setAttribute("data-url",item.url)
            span_icon.innerHTML = svg_icon
            div.appendChild(span_icon)
        }
        let span_text = document.createElement('span')
        span_text.classList.add("pages_menu","text")
        span_text.textContent = item.label
        if(item.parent){
            span_text.classList.add("parent")
        }
        if(Object.hasOwn(item,"link")){
            span_text.classList.add("href_hover")
            let a = document.createElement('a')
            a.classList.add("pages_menu")
            a.setAttribute("href",item.link)
            a.appendChild(span_text)
            div.appendChild(a)
        }else{
            div.appendChild(span_text)
        }
        li.appendChild(div);
        recursive_update_element(li,item.items,(item.level==1),item.expanded)
        ul.appendChild(li)
    });
    return ul
}

function set_active_expanded(items,section_name,pathname){
    for(let item of items){
        if(Object.hasOwn(menu.sections_expand[section_name],item.url)){
            item.expanded = menu.sections_expand[section_name][item.url]
        }else{
            if(!Object.hasOwn(item,"expanded")){//only added if not already set
                item.expanded = true
            }
            menu.sections_expand[section_name][item.url] = item.expanded
        }
        if(item.link == pathname){
            item.active = true
        }else{
            item.active = false
        }
        if(item.items){
            set_active_expanded(item.items,section_name,pathname)
        }
    }
}

function recursive_update_element(element,menu_entry_items,root,expanded){
    if(menu_entry_items){
        const ul = create_ul_from_items(menu_entry_items,root,expanded)
        element.appendChild(ul)
    }
}

function section_from_pathname(pathname){
    const sections = pathname.split('/')
    if(sections.length < 2){
        return "home"
    }else if(sections[1] == ""){
        return "home"
    }else{
        return sections[1]
    }
}
  
function inject_menu_elements(section_items){
    //console.log(section)
}

function enable_clicks(){
    const pages_menu = document.getElementsByClassName("pages_menu")[0]
    let toggler = pages_menu.getElementsByClassName("expand");
    for (let i = 0; i < toggler.length; i++) {
      toggler[i].addEventListener("click", function(e) {
        this.parentElement.parentElement.querySelector("ul")?.classList.toggle("hidden");
        this.parentElement.classList.toggle("expanded");
        const section_name = section_from_pathname(window.location.pathname)
        expand_toggle_save(section_name,toggler[i].getAttribute("data-url"))
        e.preventDefault()
      });
    }
    const fixed_left = document.getElementById("fixed-left")
    fixed_left.addEventListener("click",(e)=>{
        const section_name = section_from_pathname(window.location.pathname)
        const menu_nav = document.querySelector("nav.pages_menu")
        menu.sections_open[section_name] = (menu.sections[section_name].length==0)?false:menu_nav.classList.contains("open")
        save_menu()        
    })

}

let menu = {}

async function inject_menu(){
    const pages_menu_elements = document.querySelectorAll(".pages_menu.client")
    if(pages_menu_elements.length == 0){
        return
    }
    await get_menu()
    console.log(menu)
    let pathname = window.location.pathname.endsWith('/')?window.location.pathname.slice(0,-1):window.location.pathname
    pathname = remove_base(pathname)
    const section_name = section_from_pathname(pathname)
    set_open_state(section_name)
    const menu_section_items = menu.sections[section_name]
    const menu_nav = document.querySelector("nav.pages_menu")
    set_active_expanded(menu_section_items,section_name,pathname)
    recursive_update_element(menu_nav,menu_section_items,true,true)
    enable_clicks()
}

document.addEventListener('DOMContentLoaded', inject_menu, false);
