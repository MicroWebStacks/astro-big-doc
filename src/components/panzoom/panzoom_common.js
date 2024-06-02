import {event} from './client_utils.js'
import {initModalEvents} from './lib_panzoommodal.js'


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

async function add_links(svg,link_list){
  const SVGjsModule = await import('@svgdotjs/svg.js');
  const SVGjs = SVGjsModule.SVG;

  let draw = SVGjs(svg)
  let text_nodes = draw.find('text')
  let text_array = [ ...text_nodes ];
  text_array.forEach((text)=>{
    const html_text = text.node.innerHTML
    link_list.forEach((entry)=>{
      if(html_text == entry.label){
        var isAbs = new RegExp('^(?:[a-z+]+:)?//', 'i');//isAbsolute https://stackoverflow.com/questions/10687099/how-to-test-if-a-url-string-is-absolute-or-relative
        if(isAbs.test(entry.link)){
          text.linkTo((link)=>{link.to(entry.link).target('_blank')})//link in new page
        }else{
          text.linkTo((link)=>{link.to(entry.link).target('_top')})//link outside the shadow DOM
        }
        text.css({'text-decoration': 'underline'})  
        //text.fill('#f06')
      }
    })
  })
}

function checkURLModal(){
  //check if any modal needs to be opened
  const params = new URL(location.href).searchParams;
  const modal = params.get('modal');
  if(modal){
    console.log(`opening modal ${modal}`)
    const sid = document.querySelector(`.container.panzoom[data-sid="${modal}"]`)
    if(sid){
      const modal = sid.querySelector(".modal-background")
      event(modal,"open")
    }else{
      const name = document.querySelector(`.container.panzoom[data-name="${modal}"]`)
      if(name){
        const modal = name.querySelector(".modal-background")
        event(modal,"open")
      }
    }
  }
}

function processSVG(svg,container){
  fixSvgSize(svg);
  const meta_string = container.getAttribute("data-meta");
  if(meta_string){
    const meta = JSON.parse(meta_string);
    if(Object.hasOwn(meta,"links")){
      add_links(svg, meta.links);
    }
  }
}

function init_svgs(){
  const containers = document.querySelectorAll(".container.panzoom")
  containers.forEach(container => {
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
  })
}

function init(){
  initModalEvents() //needed to be before handling url to open
  init_svgs()       //needed before cloning the svg in modal
  checkURLModal()   //only first match will open, starting with SIDs
}

document.addEventListener('DOMContentLoaded', init, false);
