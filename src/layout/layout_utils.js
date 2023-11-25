
function section_from_pathname(pathname){
    if(pathname.startsWith('http')){
        return 'external'
    }
    const sections = pathname.split('/')
    if(sections.length < 2){
        return "home"
    }else if(sections[1] == ""){
        return "home"
    }else{
        return sections[1]
    }
}

export{
    section_from_pathname
}
