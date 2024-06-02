import {event} from '../panzoom/client_utils'

function init_gallery_clicks(container){
    if(container.getAttribute("data-state") != "init"){
        return
    }
    const collapsible = container.querySelector(".collapsible")
    const content = container.querySelector(".content")
    collapsible.onclick = ()=>{
        content.classList.toggle("expanded")
        if (content.classList.contains("expanded")){
            //*2 speeds up the animation but resolves the resize problem without actively watching the resize
            content.style.maxHeight = content.scrollHeight*2 + "px";
            collapsible.textContent = "Click to close"
        } else {
            content.style.maxHeight = null;
            collapsible.textContent = "Click to expand"
        }
        console.log(content.style.maxHeight)
    }

    //item open modal
    const itemimages = container.querySelectorAll(".itemimage")
    const items = [...itemimages]
    for(let el in items){
        items[el].onclick = (e)=>{
            const modal = e.target.parentElement.querySelector(".modal-background")
            event(modal,"open")
        }
    }

}

function init(){
    const containers = document.querySelectorAll(".container.gallery")
    containers.forEach(container => {
        init_gallery_clicks(container)
    })
}

document.addEventListener('DOMContentLoaded', init, false);

