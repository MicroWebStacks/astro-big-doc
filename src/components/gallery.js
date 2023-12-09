import {event} from './panzoom/client_utils'

function init_container(container){
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
            event(modal,"init")
        }
    }

}

function checkModal(){
    //check if any modal needs to be opened
    const params = new URL(location.href).searchParams;
    const modal_name = params.get('modal');
    if(modal_name){
        console.log(`opening modal for ${modal_name}`)
        const container = document.querySelector(".container.gallery")
        const item = container.querySelector(`[data-name="${modal_name}"]`)
        const modal = item.querySelector(".modal-background")
        event(modal,"init")
    }
}
  
function init(){
    const containers_els = document.querySelectorAll(".container.gallery")
    if(containers_els.length == 0){//prevent irrelvant paeg execution
        return
    }

    const containers = [...containers_els]
    for(let el in containers){
        init_container(containers[el])
    }
  //allow the modal to init and register its listener before throwing the open event
  setTimeout(checkModal,10)
}

document.addEventListener('DOMContentLoaded', init, false);

