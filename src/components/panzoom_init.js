import { SVG as SVGjs } from '@svgdotjs/svg.js'

const json_data = {
  "Michael" : "https://github.com/MicroWebStacks"
}

function event(element,event_name,data=null){
	var event = new CustomEvent(event_name, {detail:data});
	element.dispatchEvent(event);
}

function add_link(container){
  const obj = container.querySelector("object")
  if(obj){
    const svg = obj.contentDocument.querySelector("svg")

    let draw = SVGjs(svg)
    let text_nodes = draw.find('text')
    let text_array = [ ...text_nodes ];
    text_array.forEach((text)=>{
      const key = text.node.innerHTML
      if(key in json_data){
        //text.linkTo(json_data[key])//link in same page
        text.linkTo((link)=>{link.to(json_data[key]).target('_blank')})//link in new page
        text.css({'text-decoration': 'underline'})  
        //text.fill('#f06')
      }
    })

  }
}

function init(){
  const containers_els = document.querySelectorAll(".container")
  const containers = [...containers_els]
  for(let el in containers){
    const container = containers[el]
    add_link(container)
    const open = container.querySelector(".open")
    open.onclick = ()=>{
      const modal = container.querySelector(".modal-background")
      event(modal,"init")
    }
  }
}

init()
