function escape_href(href){
    //the # bothers CSS.escape in case of id starting with a number
    return `#${CSS.escape(href.replace('#',''))}`
}

function toc_menu_activation(){
    const toc_menu = document.getElementsByClassName("toc_menu")[0]
    //---------------   Click Expand   ---------------
    let toggler = document.getElementsByClassName("expand");
    for (let i = 0; i < toggler.length; i++) {
        toggler[i].addEventListener("click", function(e) {
        this.parentElement.parentElement.querySelector("ul")?.classList.toggle("hidden");
        this.parentElement.classList.toggle("expanded");
        e.preventDefault()
        });
    }
    //---------------   Scroll Spy   ---------------
    const article = document.querySelector( 'article.content' )
    const hrefs = document.getElementsByClassName("toc_href");
    const targets = [...hrefs].map(el => article.querySelector(escape_href(el.getAttribute('href'))))
    
    article.addEventListener("scroll", (event) => {
        let spy = null//if no element on screen, keep last match and do nothing
        for ( let t in targets ){//find first within visible scroll
            if(targets[ t ].offsetTop > article.scrollTop){
                spy = targets[ t ]
                break
            }
        }
        if(spy){
            document.querySelector(".toc_href.active")?.classList.remove("active");
            document.querySelector(".heading.active")?.classList.remove("active");
            const id = spy.id
            //console.log(id)
            document.querySelector(`a[href="#${id}"].toc_href`)?.classList.add("active")
            document.getElementById(id)?.classList.add("active")
        }
    })
    
    const href_els = document.querySelectorAll(".toc_href");
    href_els.forEach(element => {
        element.addEventListener('mouseenter',()=>{
            const href = element.getAttribute('href')
            const id = href.slice(1,href.length)
            document.getElementById(id)?.classList.add("hover")
        })        
        element.addEventListener('mouseout',()=>{
            const href = element.getAttribute('href')
            const id = href.slice(1,href.length)
            document.getElementById(id)?.classList.remove("hover")
        })        
    });

}

document.addEventListener('DOMContentLoaded', toc_menu_activation, false);
