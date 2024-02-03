
function text_only_children(node){
    if(!node.children || node.children.length === 0){
        return false
    }
    for(const child of node.children){
        if(!["text","link"].includes(child.type)){
            return false
        }
    }
    return true
}

function has_image(node){
    if(!node.children || node.children.length === 0){
        return false
    }
    for(const child of node.children){
        if(child.type == "image"){
            return true
        }
    }
    return false
}

export{
    text_only_children,
    has_image
}
