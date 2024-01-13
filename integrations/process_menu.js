import {dirname} from 'path'

function get_parent_path(entry){
    if(entry.url_type == "dir"){
        return dirname(dirname(entry.path))
    }else{
        return dirname(entry.path)
    }
}

function get_parent(entry,entries){
    const parent_url = get_parent_path(entry)
    return entries.find(parent=>parent.url === parent_url)
}

async function get_new_parents(entries){
    function url_to_name(url){
        let parts = url.split('/')
        return parts[parts.length-1]
    }
    let new_parents = []

    entries.forEach((entry)=>{
        if(entry.level > 2){
            const parent_url = get_parent_path(entry)
            //console.log(`path:${entry.path}/${entry.url_type} => parent_url:${parent_url}`)
            if( !entries.some(parent=>parent.url === parent_url) &&
                !new_parents.some(parent=>parent.url === parent_url)){
                    //console.log(`parent_url:${parent_url} not found, creating new parent`)
                    new_parents.push({
                        label:url_to_name(parent_url),
                        path:parent_url,
                        url:parent_url,
                        url_type:"dir",
                        format:"folder",
                        level: entry.level - 1
                    })
            }
        }
    })
    return new_parents
}

async function pages_list_to_tree(entries){
    let might_need_new_parents = true
    while(might_need_new_parents){
        const new_parents = await get_new_parents(entries)
        if(new_parents.length > 0){
            might_need_new_parents = true
            entries = entries.concat(new_parents)
        }else{
            might_need_new_parents = false
        }
    }

    for(let element of entries){
        element.items=[]
        element.parent=true
        element.expanded=true
    }

    let tree = []

    //assign to parents or place in root
    entries.forEach(entry=>{
        if(entry.level > 2){
                //console.log(`- assigning ${entry.path} to parent`)
                get_parent(entry,entries).items.push(entry)
            }else{
                //console.log(`- pushing ${entry.path} to root`)
                tree.push(entry)
            }
        })
    
    //adjust parents fields
    for(let element of entries){
        if (element.items.length == 0){
            element.parent = false
            delete element.items
            delete element.expanded
        }
    }
    //sort with element.order
    for(let element of entries){
        if (element.parent){
            element.items.sort((a,b)=> a.order-b.order)
        }
    }
    tree.sort((a,b)=> a.order-b.order)
    return tree

}

export{
    pages_list_to_tree
}
