import {event} from './client_utils.js'
import {initModalEvents} from './lib_panzoommodal.js'
import { svg_fix_size, svg_add_links, svg_highlight } from './lib_svg_utils.js';

function checkURLModal(){
  //check if any modal needs to be opened
  const params = new URL(location.href).searchParams;
  const modal = params.get('modal');
  if(modal){
    console.log(`opening modal ${modal}`)
    const container = document.querySelector(`.container.panzoom[data-name="${modal}"]`)
    if(container){
      const modal = container.querySelector(".modal-background")
      event(modal,"open")
    }
  }
}

async function processSVG(svg,container){
  svg_fix_size(svg);
  const meta_string = container.getAttribute("data-meta");
  if(meta_string){
    const meta = JSON.parse(meta_string);
    if(Object.hasOwn(meta,"links")){
      await svg_add_links(svg, meta.links);
    }
    if(Object.hasOwn(meta,"highlights")){
      await svg_highlight(svg, meta.highlights);
    }
  }
}

async function init_svgs() {
  const containers = document.querySelectorAll(".container.panzoom");
  await Promise.all(Array.from(containers).map(container => {
    return new Promise(async (resolve) => {  // Using async here
      const eltype = container.getAttribute("data-type");
      if (eltype === "svg") {
        const obj = container.querySelector("object");
        const svg = obj.contentDocument?.querySelector("svg");
        if (svg) {
          await processSVG(svg, container);  // Await the processing of the SVG
          resolve();
        } else {
          obj.addEventListener("load", async () => {  // Async event handler
            const svg = obj.contentDocument.querySelector("svg");
            if (svg) {
              await processSVG(svg, container);  // Await the processing of the SVG
            }
            resolve();
          });
        }
      } else {
        resolve();
      }
    });
  }));
}

async function init(){
  console.log("panzoom_common> init()")
  initModalEvents() //needed to be before handling url to open
  await init_svgs() //needed before cloning the svg in modal
  checkURLModal()   //only first match will open, starting with SIDs
}

if(document.readyState == "loading"){
  document.addEventListener('DOMContentLoaded', init, false);
}else{
  init()
}
