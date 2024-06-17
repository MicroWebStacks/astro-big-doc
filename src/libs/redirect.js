import {config} from '@/client_config.js'

export async function redirectToFullUrl() {
    if(document.title == "not found"){
        return
    }
    const message_el = document.getElementById("message_404")
    message_el.innerText = "Redirecting"

    const response = await fetch(`${config.base}/api/redirect`)
    const redirects = await response.json()
    let pathname = window.location.pathname.substring(1)
    if (pathname in redirects) {
        const new_url = redirects[pathname]
        if(new_url){
            console.log(`${pathname} => "${new_url}"`)
            window.location.href = new_url;
        }else
        {
            window.location.href = "/";
        }
    }else{
        console.log(`${pathname} => not found`)
        document.title = "not found"
        message_el.innerText = "Page not found"
    }
}

document.addEventListener('DOMContentLoaded', redirectToFullUrl);
