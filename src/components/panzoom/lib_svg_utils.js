const SVGjsModule = await import('@svgdotjs/svg.js');
const SVGjs = SVGjsModule.SVG;

function svg_fix_size(svg){
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
 
async function svg_add_links(svg,link_list){
    const SVGjsModule = await import('@svgdotjs/svg.js');
    const SVGjs = SVGjsModule.SVG;
    let added_links = false
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
          added_links = true
        }
      })
    })
    if(added_links){
      console.log("added links")
    }
}

async function svg_check(svg){
  SVGjs(svg)
  let draw = SVGjs(svg)
  let text_nodes = draw.find('text');
  console.log(text_nodes[0].node.innerHTML)
}

function animateTextColor(element, color1, color2, duration) {
  // Animate to the first color
  element.animate(duration, '-', 0).attr({ fill: color1 })
    .after(function() {
      // After the first animation completes, animate back to the second color
      this.animate(duration, '-', 0).attr({ fill: color2 });
    });
}


async function svg_text_focus(svg,text,pzref){
  let draw = SVGjs(svg)
  let text_nodes = draw.find('text');
  let text_array = [ ...text_nodes ];
  let text_hits = text_array.filter(node => node.node.innerHTML == text);
  if(text_hits.length > 0){
    const targetText = text_hits[0]
    let bbox = targetText.bbox();
    let x = bbox.x + bbox.width / 2;
    let y = bbox.y + bbox.height / 2;
    console.log(`SVG> focus on '${text}' (${x.toFixed(2)},${y.toFixed(2)})`)
    const cx = svg.getAttribute("width")/2
    const cy = svg.getAttribute("height")/2
    setTimeout(()=>{pzref.smoothMoveTo(x, y)}, 400)
    setTimeout(()=>{pzref.smoothZoom(cx, cy, 1.5)}, 800)
    setTimeout(()=>{animateTextColor(targetText, '#0f0', '#000', 400);},1000)
  }
}

export{
    svg_fix_size,
    svg_add_links,
    svg_text_focus,
    svg_check
}
