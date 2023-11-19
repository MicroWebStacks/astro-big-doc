
function find_parent(index,headings){
    const element_depth = headings[index].depth
    if(index == 0){
        return null
    }else{
        for(let rev_i = index-1;rev_i>=0;rev_i--){
            if(headings[rev_i].depth<element_depth){
                return headings[rev_i]
            }
        }
    }
}

/* not recursive o(n²)
*/
function heading_list_to_tree(headings){
    for(let element of headings){
        element.items=[]
        element.parent=true
        element.expanded=true
        element.href = `#${element.slug}`
    }

    let tree = []

    for(let index=0; index<headings.length;index++){
        let element = headings[index]
        let parent = find_parent(index,headings)
        if(parent){
            parent.items.push(element)
        }else{
            tree.push(element)
        }
    }

    for(let element of headings){
        if (element.items.length == 0){
            element.parent = false
            delete element.items
            delete element.expanded
        }
    }
    return tree
}

/** headings start at Sidemenu
 * 
 */
function process_toc_list(headings){
    if(typeof headings == 'undefined' || headings.length == 0){
        return {items:[],visible:false}
    }

    let side_menu = {items:[],visible:false}
    side_menu.items = heading_list_to_tree(headings)//also .slug=>.href
    side_menu.visible = true
    return side_menu
}

function process_pages_list(documents,section){
    return [
        {
            text : "Test entry",
            href : "/blog/double3",
            level : 2,
            readme : true
        }
    ]
}

export{
    process_toc_list,
    process_pages_list
}
