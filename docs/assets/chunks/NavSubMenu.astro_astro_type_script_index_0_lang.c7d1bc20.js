const y=document.querySelector(":root"),r=getComputedStyle(y).getPropertyValue("--header-bg-color"),m=getComputedStyle(y).getPropertyValue("--content-bg-color");function L(s,t,e,E){s.addEventListener("click",o=>{const n=e.classList.contains("open")?"open":"closed";console.log(n),n=="open"?(e.classList.remove("open"),e.classList.add("closed"),e.style.width="0vw"):n=="closed"&&(e.classList.add("open"),e.classList.remove("closed"),e.style.width=e.getAttribute("data-width")),o.preventDefault()});var c=!1,i,d;function u(){c=!1,e.style.transition="width 0.5s",e.clientWidth<20?(e.classList.add("closed"),e.classList.remove("open"),e.setAttribute("data-width","20vw")):(e.classList.add("open"),e.classList.remove("closed")),t.style.backgroundColor=m}t.addEventListener("mouseenter",o=>{t.style.backgroundColor=r}),t.addEventListener("mouseleave",o=>{t.style.backgroundColor=m}),t.addEventListener("mousedown",o=>{c=!0,i=o.x,d=e.clientWidth,e.style.transition="none"}),t.addEventListener("mouseup",o=>{u()}),document.addEventListener("mouseup",o=>{c==!0&&u()}),document.addEventListener("mousemove",o=>{if(c==!0){const n=E?d+o.x-i:d-o.x+i;n<=60?(e.style.width="0px",e.setAttribute("data-width","0px"),t.style.backgroundColor=r):n<160||(n<document.documentElement.clientWidth*.4?(e.style.width=n+"px",e.setAttribute("data-width",n+"px"),t.style.backgroundColor=r):t.style.backgroundColor="red"),o.preventDefault()}})}const f=document.getElementById("fixed-left");if(f.classList.contains("active")){const s=document.getElementById("resize-left"),t=s.previousElementSibling.firstElementChild;L(f,s,t,!0)}const g=document.getElementById("fixed-right");if(g.classList.contains("active")){const s=document.getElementById("resize-right"),t=s.nextElementSibling.firstElementChild;L(g,s,t,!1)}let h=document.getElementsByClassName("toc_expand");for(let s=0;s<h.length;s++)h[s].addEventListener("click",function(t){this.parentElement.parentElement.querySelector("ul")?.classList.toggle("hidden"),this.parentElement.classList.toggle("expanded"),t.preventDefault()});function v(s){return`#${CSS.escape(s.replace("#",""))}`}const a=document.querySelector("article.content"),b=document.getElementsByClassName("toc_href"),l=[...b].map(s=>a.querySelector(v(s.getAttribute("href"))));a.addEventListener("scroll",s=>{let t=null;for(let e in l)if(l[e].offsetTop>a.scrollTop){t=l[e];break}if(t){document.querySelector(".toc_href.active")?.classList.remove("active"),document.querySelector(".heading.active")?.classList.remove("active");const e=t.id;document.querySelector(`a[href="#${e}"].toc_href`)?.classList.add("active"),document.getElementById(e)?.classList.add("active")}});const x=document.querySelectorAll(".toc_href");x.forEach(s=>{s.addEventListener("mouseenter",()=>{const t=s.getAttribute("href"),e=t.slice(1,t.length);document.getElementById(e)?.classList.add("hover")}),s.addEventListener("mouseout",()=>{const t=s.getAttribute("href"),e=t.slice(1,t.length);document.getElementById(e)?.classList.remove("hover")})});let p=document.getElementsByClassName("nav_expand");for(let s=0;s<p.length;s++)p[s].addEventListener("click",function(t){const e=this.parentElement.querySelector("ul");e.classList.toggle("hidden"),e.classList.contains("hidden")?this.classList.remove("expanded"):this.classList.add("expanded"),t.preventDefault()});