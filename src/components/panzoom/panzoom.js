import {event} from './client_utils.js'

function fixSvgSize(svg){
  if (svg) {
    // Check if 'width' and 'height' attributes are missing
    if (!svg.hasAttribute('width') || !svg.hasAttribute('height')) {
      const viewBox = svg.getAttribute('viewBox');
      if (viewBox) {
        const sizes = viewBox.split(' ');
        // Typically, the viewBox is "minX minY width height"
        const width = sizes[2];
        const height = sizes[3];

        svg.setAttribute('width', width);
        svg.setAttribute('height', height);
        console.log("fixed SVG width and heigh")
      }else{
        console.log("no viewBox")
      }
    }
  }else{
    console.log("failed to fix svg size as svg is invalid")
  }
}

async function add_links(svg,url_map){
  const SVGjsModule = await import('@svgdotjs/svg.js');
  const SVGjs = SVGjsModule.SVG;

  let draw = SVGjs(svg)
  let text_nodes = draw.find('text')
  let text_array = [ ...text_nodes ];
  text_array.forEach((text)=>{
    const key = text.node.innerHTML
    if(key in url_map){
      var isAbs = new RegExp('^(?:[a-z+]+:)?//', 'i');//isAbsolute https://stackoverflow.com/questions/10687099/how-to-test-if-a-url-string-is-absolute-or-relative
      if(isAbs.test(url_map[key])){
        text.linkTo((link)=>{link.to(url_map[key]).target('_blank')})//link in new page
      }else{
        text.linkTo((link)=>{link.to(url_map[key]).target('_top')})//link outside the shadow DOM
      }
      text.css({'text-decoration': 'underline'})  
      //text.fill('#f06')
    }
  })
}

function checkModal(){
  //check if any modal needs to be opened
  const params = new URL(location.href).searchParams;
  const modal_name = params.get('modal');
  if(modal_name){
    console.log(`opening modal for ${modal_name}`)
    const container = document.querySelector(`.container.panzoom[data-name="${modal_name}"]`)
    const modal = container.querySelector(".modal-background")
    event(modal,"init")
  }
}

function processSVG(svg,container){
  fixSvgSize(svg);
  const url_map_string = container.getAttribute("data-url-map");
  if(url_map_string){
    const url_map = JSON.parse(url_map_string);
    add_links(svg, url_map);
  }
}

function init(){
  const containers_els = document.querySelectorAll(".container.panzoom")
  if(containers_els.length == 0){//prevent irrelvant page execution
    return
  }
  const containers = [...containers_els]
  for(let el in containers){
    const container = containers[el]
    const eltype = container.getAttribute("data-type")
    if(eltype == "svg"){
      const obj = container.querySelector("object")
      const svg = obj.contentDocument.querySelector("svg");
      if(svg){
        processSVG(svg,container)
      }else{
        obj.addEventListener("load", () => {
          const svg = obj.contentDocument.querySelector("svg");
          processSVG(svg,container)
        });
      }
    }
    const open = container.querySelector(".open")
    open.onclick = ()=>{
      const modal = container.querySelector(".modal-background")
      event(modal,"init")
    }
  }
  //allow the modal to init and register its listener before throwing the open event
  setTimeout(checkModal,10)
}

document.addEventListener('DOMContentLoaded', init, false);
