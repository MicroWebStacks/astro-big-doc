import {getDocuments} from 'content-structure'
import { load_yaml, save_json } from '@/libs/utils';
import {section_from_pathname} from '@/layout/layout_utils.js'
import {dirname} from 'path'

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
function headings_list_to_tree(headings,is_toc){
    for(let element of headings){
        element.items=[]
        element.parent=true
        element.expanded=true
        if(is_toc){
            element.href = `#${element.slug}`
        }else{
            element.href = element.href
        }
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
    side_menu.items = headings_list_to_tree(headings,true)//also .slug=>.href
    side_menu.visible = true
    return side_menu
}

function add_folder_parent(entry){
    const folderParents = {};

    for (let entry of entries) {
        let paths = entry.href.split('/').slice(0, -1); // Remove the file part, leave the folder path
        let path = '';

        for (let segment of paths) {
            if (segment) {
                path += '/' + segment;
                if (!folderParents[path]) {
                    folderParents[path] = {
                        text: segment,
                        href: path,
                        items: [],
                        parent: true,
                        expanded: true
                    };
                }
            }
        }
    }

    return Object.values(folderParents);
}

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
    let new_parents = []

    entries.forEach((entry)=>{
        if(entry.level > 2){
            const parent_url = get_parent_path(entry)
            console.log(`path:${entry.path}/${entry.url_type} => parent_url:${parent_url}`)
            if( !entries.some(parent=>parent.url === parent_url) &&
                !new_parents.some(parent=>parent.url === parent_url)){
                    //console.log(`parent_url:${parent_url} not found, creating new parent`)
                    new_parents.push({
                        url:parent_url,
                        format:"folder"
                    })
            }
        }
    })
    //await save_json(new_parents,"new_parents.json")
    return new_parents
}

async function pages_list_to_tree(entries){
    for(let element of entries){
        element.items=[]
        element.parent=true
        element.expanded=true
    }
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
    let tree = []

    //assign to parents or place in root
    entries.forEach(entry=>{
        if(entry.level > 2){
                get_parent(entry,entries).items.push(entry)
            }else{
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
    return tree

}

async function get_section_menu(section){
    function content_entry_to_level(entry){
        const base_level = 1
        let level = 0
        const directory = dirname(entry.path)
        if(directory != ""){
            //console.log(directory.split('/'))
            const path_level = directory.split('/').length
            if(entry.url_type == "file"){
                level = base_level + path_level + 1
            }else{
                level = base_level + path_level
            }
        }
        //console.log(`level:(${level}) path:${entry.path}`)
        return level
    }

    const raw_menu = await load_yaml("menu.yaml")
    const section_menu = raw_menu.find((item)=>(section_from_pathname(item.href) == section))
    if(Object.hasOwn(section_menu,"content") && (section_menu.content == true)){
        const documents = await getDocuments({format:"markdown"})
        const items = documents.map((entry)=>(
            {
                text:       entry.title,
                path:       entry.path,
                url:        entry.url,
                url_type:   entry.url_type,
                href:`/${section}/${entry.url}`,
                level:content_entry_to_level(entry),
                format: entry.format,
                weight: Object.hasOwn(entry,"weight")?entry.weight:1
            }
        ))
        //await save_json(items,"menu_items_list.json")
        const menu_tree = await pages_list_to_tree(items)
        //await save_json(menu_tree,"menu_tree.json")
        return menu_tree
    }else if(Object.hasOwn(section_menu,"items")){
        return section_menu.items
    }else{
        return []
    }
}

export{
    process_toc_list,
    get_section_menu
}
