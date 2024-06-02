import { svg_text_focus,svg_check } from './lib_svg_utils';

let pzref = null
const zoomOptions = {
  minZoom: 0.1,
  maxZoom:4,
  //autocenter:true
}

async function appendShadowSVG(center,svg){
  //cannot detatch a shadow root, so check existing before creation
  let shadowRoot = center.shadowRoot
  if(!shadowRoot){
    shadowRoot = center.attachShadow({mode: 'open'});
  }
  const div = document.createElement("div")//needed for the panzoom as it takes the parent
  shadowRoot.appendChild(div)
  let new_svg
  const clone_fails_with_SVGjs = true
  if(clone_fails_with_SVGjs){
    new_svg = serializeAndDeserializeSVG(svg);
  }else{
    new_svg = svg.cloneNode(true)
  }
  div.appendChild(new_svg)
  const oldstyle = new_svg.getAttribute("style")
  new_svg.setAttribute("style",`${oldstyle};user-select: none; cursor:grab;`)
  //new_svg.querySelectorAll('tspan,text').forEach((el)=>{
  //    el.style.cursor = "pointer";
  //});
  return new_svg
}

function serializeAndDeserializeSVG(svg) {
  const serializer = new XMLSerializer();
  const svgStr = serializer.serializeToString(svg);
  const parser = new DOMParser();
  const new_svg = parser.parseFromString(svgStr, "image/svg+xml").documentElement;
  return new_svg;
}

async function cloneAsset(center){
    const container = center.parentElement.parentElement.parentElement.parentElement
    const obj = container.querySelector("object")
    let is_svg = false
    let svg
    let svg_img
    if(obj){
      is_svg = true
      svg = obj.contentDocument.querySelector("svg")
      svg_img = await appendShadowSVG(center,svg)
    }else{
      const img = container.querySelector("img")
      svg_img = img.cloneNode(true)
      center.appendChild(svg_img)
    }
    return {is_svg,svg_img}
}

function window_url_add_modal(center){
    const container = center.parentElement.parentElement.parentElement.parentElement
    const pz_name = container.getAttribute("data-name")
    const new_href = window.location.origin+window.location.pathname+`?modal=${pz_name}`
    window.history.pushState({},"",new_href)
}
function window_url_remove_modal(){
    const new_href = window.location.origin+window.location.pathname
    window.history.pushState({},"",new_href)
}
function is_url_modal(center){
  const params = new URL(location.href).searchParams;
  const modal_name = params.get('modal');
  if(modal_name){
    const container = center.parentElement.parentElement.parentElement.parentElement
    const pz_name = container.getAttribute("data-name")
    return (modal_name == pz_name)
  }
  return false
}

async function handle_url_modal(is_svg,svg,pzref){
  const params = new URL(location.href).searchParams;
  const text = params.get('text')
  if(text){
    if(is_svg){
      await svg_text_focus(svg,text,pzref)
    }
  }
}

async function openModal(event){

  const modal = event.target
  const close = modal.querySelector(".close")
  const center = modal.querySelector(".modal-center")

  const {is_svg,svg_img} = await cloneAsset(center)
  if(pzref){
    pzref.dispose()
  }
  const { default: panzoom } = await import('panzoom');
  pzref = panzoom(svg_img,zoomOptions)

  close.onclick = ()=>{
    //console.log("closed click")
    modal.classList.remove("visible")
    pzref.dispose()
    const img = center.querySelector("img")
    if(img){
      img.remove()
    }else{// SVG - remove the parent div and leave the shadowRoot for reuse
      const shadowRoot = center.shadowRoot
      const svg = shadowRoot.querySelector("svg")
      svg.parentElement.remove()
    }
    window_url_remove_modal()
  }
  modal.classList.add("visible")
  if(is_url_modal(center)){
    handle_url_modal(is_svg,svg_img,pzref)
  }else{
    window_url_add_modal(center)
  }
}

function initModalEvents(){
    const modalsbkgs = document.querySelectorAll(`.modal-background`)
    modalsbkgs.forEach(modal=>{
      if(modal.getAttribute("data-state") == "init"){
        modal.addEventListener("open",openModal  ,false)
        modal.setAttribute("data-state","run")
      }
    })
}

export{
  initModalEvents
}
