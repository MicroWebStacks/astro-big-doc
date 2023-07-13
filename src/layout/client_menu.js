
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
        localStorage.setItem("menu",JSON.stringify(menu))
    }
    return menu
}

function restore_menu_state(){
    let left_open = localStorage.getItem("left_open")
    if(left_open != null){
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
    }else{
        if(menu_nav.classList.contains("open")){
            localStorage.setItem("left_open","true")
        }else{
            localStorage.setItem("left_open","false")
        }
    }
}

function inject_menu_elements(menu){
    console.log(window.location.pathname)
    const section = menu.items.find(el=>(window.location.pathname.startsWith(el.href_base)))
    console.log(section)
    const menu_nav = document.querySelector("nav.menu-nav")
    let ul = document.createElement('ul')
    ul.classList.add("menu-nav","root")
    section.items.forEach(item => {
        let li = document.createElement('li')
        li.classList.add("menu-nav")
        let a = document.createElement('a')
        a.classList.add("menu-nav")
        if(item.readme){
            a.href = item.href || '#';
        }
        a.textContent = item.text
        li.appendChild(a);
        ul.appendChild(li)
    });
    menu_nav.appendChild(ul)
}

async function inject_menu(){
    restore_menu_state()
    const menu = await get_menu()
    console.log(menu)
    inject_menu_elements(menu)
    enable_clicks()
}

function enable_clicks(){
    console.log("enable_clicks")
    let toggler = document.getElementsByClassName("nav_expand");
    for (let i = 0; i < toggler.length; i++) {
      toggler[i].addEventListener("click", function(e) {
        const ul = this.parentElement.querySelector("ul")
        ul.classList.toggle("hidden");
        if(ul.classList.contains("hidden")){
            this.classList.remove("expanded");
        }else{
            this.classList.add("expanded");
        }
        e.preventDefault()
      });
    }
}

export{
    inject_menu
}
