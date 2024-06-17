import {config} from '@/client_config.js'

export async function redirectToFullUrl() {
    const message_el = document.getElementById("message_404")
    message_el.innerText = "Redirecting"

    const response = await fetch(`${config.base}/api/redirect`)
    const redirects = await response.json()
    let pathname = window.location.pathname.substring(1)
    if (pathname in redirects) {
            window.location.href = redirects[pathname];
    }else{
        message_el.innerText = "Page not found"
    }
}

document.addEventListener('DOMContentLoaded', redirectToFullUrl);
