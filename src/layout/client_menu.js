
async function get_menu(){
    let needs_fetch = false
    let menu = {}
    let menu_text = localStorage.getItem("menu")
    if(!menu_text){
        console.log("not in storage, fetching")
        needs_fetch = true
    }else{
        console.log("in storage, checking hash")
        const left_nav = document.querySelector("nav.left-nav")
        const new_hash = left_nav.getAttribute("data-hash")
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
        const left_nav = document.querySelector("nav.left-nav")
        left_nav.style.transition = "width 0s"
        if(left_open == "true"){
            left_nav.style.width = "20vw"
            left_nav.setAttribute("data-width","20vw")
			left_nav.classList.add("open")
			left_nav.classList.remove("closed")
            console.log("open nav")
        }else{
            left_nav.style.width = "0vw"
			left_nav.classList.add("closed")
			left_nav.classList.remove("open")
            console.log("close nav")
        }
        setTimeout(()=>{
            left_nav.style.transition = "width 0.5s"
        },100)
    }else{
        if(left_nav.classList.contains("open")){
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
    const left_nav = document.querySelector("nav.left-nav")
    let ul = document.createElement('ul')
    ul.classList.add("root")
    section.items.forEach(item => {
        let li = document.createElement('li')
        let a = document.createElement('a')
        if(item.readme){
            a.href = item.href || '#';
        }
        a.textContent = item.text
        li.appendChild(a);
        ul.appendChild(li)
    });
    left_nav.appendChild(ul)
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
