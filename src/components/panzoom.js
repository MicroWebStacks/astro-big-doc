import { SVG as SVGjs } from '@svgdotjs/svg.js'
import {event} from '../libs/client_utils'

const json_data = {
  "Michael" : "https://github.com/MicroWebStacks",
  "Maria":"/astro-big-doc/blog/plantuml#large-sequence"
}

function add_links(container){
  const obj = container.querySelector("object")
  const svg = obj.contentDocument.querySelector("svg")

  let draw = SVGjs(svg)
  let text_nodes = draw.find('text')
  let text_array = [ ...text_nodes ];
  text_array.forEach((text)=>{
    const key = text.node.innerHTML
    if(key in json_data){
      var isAbs = new RegExp('^(?:[a-z+]+:)?//', 'i');//isAbsolute https://stackoverflow.com/questions/10687099/how-to-test-if-a-url-string-is-absolute-or-relative
      if(isAbs.test(json_data[key])){
        text.linkTo((link)=>{link.to(json_data[key]).target('_blank')})//link in new page
      }else{
        text.linkTo((link)=>{link.to(json_data[key]).target('_top')})//link outside the shadow DOM
      }
      text.css({'text-decoration': 'underline'})  
      //text.fill('#f06')
    }
  })
}

function init(){
  const containers_els = document.querySelectorAll(".container.panzoom")
  if(containers_els.length == 0){//prevent irrelvant paeg execution
    return
  }
  const containers = [...containers_els]
  for(let el in containers){
    const container = containers[el]
    const eltype = container.getAttribute("data-type")
    if(eltype == "svg"){
      add_links(container)
    }

    const open = container.querySelector(".open")
    if(open){
      open.onclick = ()=>{
        const modal = container.querySelector(".modal-background")
        event(modal,"init")
      }
    }
  }
}

init()
