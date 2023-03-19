import {event} from "./utils.js"

function add_link(container){
  const obj = container.querySelector("object")
  if(obj){
    const svg = obj.contentDocument.querySelector("svg")
  }
}


const containers_els = document.querySelectorAll(".container")
const containers = [...containers_els]
for(let el in containers){
  const container = containers[el]
  const open = container.querySelector(".open")
  open.onclick = ()=>{
    const modal = container.querySelector(".modal-background")
    event(modal,"init")
    add_link(container)
  }
}
