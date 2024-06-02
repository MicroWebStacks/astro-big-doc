import {event} from './client_utils.js'

function init_clicks(){
  const containers = document.querySelectorAll(".container.panzoom")
  containers.forEach(container => {
    const open = container.querySelector(".open")
    if(open){
      open.onclick = ()=>{
        const modal = container.querySelector(".modal-background")
        event(modal,"open")
      }
    }
  })
}

if(document.readyState == "loading"){
  document.addEventListener('DOMContentLoaded', init_clicks, false);
}else{
  init_clicks()
}
