import { SVG as SVGjs } from '@svgdotjs/svg.js'

const json_data = {
  "Michael" : "https://github.com/MicroWebStacks",
  "Maria":"/astro-big-doc/blog/plantuml#large-sequence"
}

function event(element,event_name,data=null){
	var event = new CustomEvent(event_name, {detail:data});
	element.dispatchEvent(event);
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
        text.linkTo(json_data[key])//link in same page
      }
      text.css({'text-decoration': 'underline'})  
      //text.fill('#f06')
    }
  })
}

function init(){
  const containers_els = document.querySelectorAll(".container")
  const containers = [...containers_els]
  for(let el in containers){
    const container = containers[el]
    const eltype = container.getAttribute("data-type")
    if(eltype == "svg"){
      add_links(container)
    }

    const open = container.querySelector(".open")
    open.onclick = ()=>{
      const modal = container.querySelector(".modal-background")
      event(modal,"init")
    }
  }
}

init()
