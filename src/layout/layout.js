const root = document.querySelector(':root');
const header_bg_color = getComputedStyle(root).getPropertyValue('--header-bg-color');
const content_bg_color = getComputedStyle(root).getPropertyValue('--content-bg-color');

function configure_nav(fixed_el,resize_el,nav_el,left_to_right){
    fixed_el.addEventListener("click",(e)=>{
        const current_state = nav_el.classList.contains("open")?"open":"closed"
        //console.log(current_state)
        if(current_state == "open"){
            nav_el.classList.remove("open")
            nav_el.classList.add("closed")
            nav_el.style.width = "0vw"
            localStorage.setItem("left_open","false")
        }else if(current_state == "closed"){
            nav_el.classList.add("open")
            nav_el.classList.remove("closed")
            nav_el.style.width = nav_el.getAttribute("data-width")
            localStorage.setItem("left_open","true")
        }
        e.preventDefault()
    })

    var global_resize_state = false
    var x_down
    var start_width
    
    function finish_mouse(){
        global_resize_state = false
        nav_el.style.transition = "width 0.5s"
    if(nav_el.clientWidth < 20){
        nav_el.classList.add("closed")
        nav_el.classList.remove("open")
        nav_el.setAttribute("data-width","20vw")
    }else{
        nav_el.classList.add("open")
        nav_el.classList.remove("closed")
    }
    resize_el.style.backgroundColor = content_bg_color
    }
    
    resize_el.addEventListener("mouseenter",(e)=>{
        resize_el.style.backgroundColor = header_bg_color
    })
    resize_el.addEventListener("mouseleave",(e)=>{
        resize_el.style.backgroundColor = content_bg_color
    })
    resize_el.addEventListener("mousedown",(e)=>{
        global_resize_state = true
        x_down = e.x
        start_width = nav_el.clientWidth
        nav_el.style.transition = "none"
    })
    resize_el.addEventListener("mouseup",(e)=>{
        finish_mouse()
    })
    document.addEventListener("mouseup",(e)=>{
        if(global_resize_state == true){
            finish_mouse()
        }
    })
    document.addEventListener("mousemove",(e)=>{
        if(global_resize_state == true){
            const new_width = left_to_right?(start_width + e.x - x_down):(start_width - e.x + x_down)
            if(new_width <= 60){//snap effect
                nav_el.style.width = "0px"
                nav_el.setAttribute("data-width","0px")
                resize_el.style.backgroundColor = header_bg_color
            }else if(new_width < 160){
                //do nothing here
            }else if(new_width < (document.documentElement.clientWidth)*0.4){
                nav_el.style.width = new_width+"px"
                nav_el.setAttribute("data-width",new_width+"px")
                resize_el.style.backgroundColor = header_bg_color
            }else{
                resize_el.style.backgroundColor = "red"
            }
            e.preventDefault()
        }
    })
}

function menu_interactions_activation(){
	console.log("Layout script")
	//root.style.setProperty('--header-bg-color', 'blue');

	
	const fixed_left = document.getElementById("fixed-left")
	if(fixed_left.classList.contains("active")){
		const resize_left = document.getElementById("resize-left")
		const nav = resize_left.previousElementSibling.firstElementChild
		configure_nav(fixed_left,resize_left,nav,true)
	}
	const fixed_right = document.getElementById("fixed-right")
	if(fixed_right.classList.contains("active")){
		const resize_right = document.getElementById("resize-right")
		const nav = resize_right.nextElementSibling.firstElementChild
		configure_nav(fixed_right,resize_right,nav,false)
	}
}

document.addEventListener('DOMContentLoaded', menu_interactions_activation, false);

