const svg_text_icon = `<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90.48 122.88">
<path d="M35.27.78a3,3,0,0,1,2-.78,1.54,1.54,0,0,1,.47.05h46.2A6.59,6.59,0,0,1,88.56,2a6.52,6.52,0,0,1,1.92,4.64v109.7a6.57,6.57,0,0,1-6.56,6.56H6.67a6.57,6.57,0,0,1-6.56-6.56v-78A3.07,3.07,0,0,1,0,37.56a3.19,3.19,0,0,1,1-2.24L34.9,1a1.5,1.5,0,0,1,.26-.21ZM84.65,6.62a.5.5,0,0,0-.21-.47A.67.67,0,0,0,84,5.94H40.22V31.62a8.89,8.89,0,0,1-8.91,8.91H6.1v75.79a.58.58,0,0,0,.2.47.69.69,0,0,0,.47.21H84a.58.58,0,0,0,.47-.21.73.73,0,0,0,.21-.47V6.62Zm-62,94.73a2.64,2.64,0,0,1,0-5.28h28a2.64,2.64,0,0,1,0,5.28Zm0-17.75a2.64,2.64,0,0,1,0-5.28H65.46a2.64,2.64,0,0,1,0,5.28Zm0-17.76a2.64,2.64,0,0,1,0-5.28H72a2.64,2.64,0,0,1,0,5.28Zm11.7-34.22V10.11L10.11,34.64h21.2a3.16,3.16,0,0,0,2.13-.88,3.06,3.06,0,0,0,.89-2.14Z" stroke-width="5px" stroke="#d0d0d0" />
</svg>`
const svg_icon = `<svg viewBox="0 0 100 100" width="60" height="60" fill="#00000000" xmlns="http://www.w3.org/2000/svg">
<path d="M 20,10 L 70,50 L 20,90" stroke-width="20px" stroke="#a0a0a0" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>`

function get_expand(){
    let expand_map = {}
    let expand_text = localStorage.getItem("expand")
    if(expand_text != undefined){
        expand_map = JSON.parse(expand_text)
    }
    console.log(expand_map)
    return expand_map
}

function save_expand(expand_map){
    localStorage.setItem("expand",JSON.stringify(expand_map))
}

function save_menu(menu){
    localStorage.setItem("menu",JSON.stringify(menu))
}

function expand_toggle_save(path){
    if(Object.hasOwn(expand_map,path)){
        expand_map[path] = !expand_map[path]
    }else{
        expand_map[path] = false
    }
    save_expand(expand_map)
}

async function get_menu(){
    let needs_fetch = false
    let menu = {}
    let menu_text = localStorage.getItem("menu")
    if(!menu_text){
        console.log("not in storage, fetching")
        needs_fetch = true
    }else{
        console.log("in storage, checking hash")
        const menu_nav = document.querySelector("nav.menu-nav")
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
        const resp = await fetch("/menu.json")
        menu = await resp.json()
        save_menu(menu)
    }
    return menu
}

function set_menu_state(left_open){
    const menu_nav = document.querySelector("nav.menu-nav")
    menu_nav.style.transition = "width 0s"
    if(left_open == "true"){
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

function restore_menu_state(){
    let left_open = localStorage.getItem("left_open")
    const menu_nav = document.querySelector("nav.menu-nav")
    if(left_open != null){
        set_menu_state(left_open)
    }else{
        if(menu_nav.classList.contains("open")){
            localStorage.setItem("left_open","true")
        }else{
            localStorage.setItem("left_open","false")
        }
    }
}

function create_ul_from_items(items,root,expanded){
    let ul = document.createElement('ul')
    ul.classList.add("menu-nav","root")
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
        li.classList.add("menu-nav")
        let a = document.createElement('a')
        a.classList.add("menu-nav")
        if(item.readme){
            a.href = item.href;
        }
        if(item.active){
            a.classList.add("active")
        }
        if(item.items){
            a.classList.add("parent")
            if(item.expanded){
                a.classList.add("expanded")
            }
            let span_icon = document.createElement('span')
            span_icon.classList.add("menu-nav","icon","nav_expand")
            span_icon.setAttribute("data-path",item.path)
            span_icon.innerHTML = svg_icon
            a.appendChild(span_icon)
        }
        let span_text = document.createElement('span')
        span_text.classList.add("menu-nav","text")
        if(item.readme){
            span_text.classList.add("href_hover")
        }
        span_text.textContent = item.text
        if(item.readme){
            let text_icon = document.createElement('span')
            text_icon.classList.add("menu-nav","text","icon","href_hover")
            text_icon.innerHTML = svg_text_icon
            span_text.appendChild(text_icon)
        }
        a.appendChild(span_text)
        li.appendChild(a);
        recursive_update_element(li,item,item.expanded)
        ul.appendChild(li)
    });
    return ul
}

function set_active_expanded(items,pathname){
    console.log(pathname)
    for(let item of items){
        if(Object.hasOwn(expand_map,item.path)){
            item.expanded = expand_map[item.path]
        }else{
            if(!Object.hasOwn(item,"expanded")){//only added if not already set
                item.expanded = true
            }
        }
        if(item.href == pathname){
            item.active = true
        }
        if(item.items){
            set_active_expanded(item.items,pathname)
        }
    }
}

function recursive_update_element(element,menu_entry,expanded){
    if(menu_entry.items){
        const ul = create_ul_from_items(menu_entry.items,menu_entry.level == 1,expanded)
        element.appendChild(ul)
    }
}

function inject_menu_elements(menu){
    //console.log(window.location.pathname)
    const section = menu.items.find(el=>(window.location.pathname.startsWith(el.href_base)))

    //console.log(section)
    const menu_nav = document.querySelector("nav.menu-nav")

    if(!section.items){
        set_menu_state(false)
        console.log("closing")
    }else{
        console.log("not closing")
    }

    recursive_update_element(menu_nav,section,true)
}

async function inject_menu(){
    restore_menu_state()
    const menu = await get_menu()
    set_active_expanded(menu.items,window.location.pathname)
    console.log(menu.items)
    inject_menu_elements(menu)
    enable_clicks()
}

function enable_clicks(){
    //console.log("enable_clicks")
    let toggler = document.getElementsByClassName("nav_expand");
    for (let i = 0; i < toggler.length; i++) {
      toggler[i].addEventListener("click", function(e) {
        this.parentElement.parentElement.querySelector("ul")?.classList.toggle("hidden");
        this.parentElement.classList.toggle("expanded");
        expand_toggle_save(toggler[i].getAttribute("data-path"))
        e.preventDefault()
      });
    }
}

let expand_map = get_expand()

export{
    inject_menu
}
