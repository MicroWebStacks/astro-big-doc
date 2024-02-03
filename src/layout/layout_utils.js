import { load_json } from '@/libs/utils.js'
import { section_from_pathname } from '@/libs/assets.js'
import { config } from '@/config.js'
import {join} from 'path'

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
            element.link = `#${element.slug}`
        }else{
            element.link = element.link
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
    side_menu.items = headings_list_to_tree(headings,true)//also .slug=>.link
    side_menu.visible = true
    return side_menu
}

function get_active_submenu(raw_menu,section,pathname){
    return raw_menu.map((entry)=>{
        //console.log(`/${section}/${entry.url} == '${pathname}'`)
        entry.active = (`/${section}/${entry.url}` == pathname)
        if(Object.hasOwn(entry,"items")){
            entry.items = get_active_submenu(entry.items,section,pathname)
        }
        return entry
    })
}

const generated_menu = await load_json(config.collect_content.out_menu)

async function get_generated_section_menu(pathname){
    const section = section_from_pathname(pathname);
    let section_menu = generated_menu.sections[section]
    if(!Object.hasOwn(generated_menu.sections,section)){
        section_menu = []
    }
    return get_active_submenu(section_menu,section,pathname)
}

function get_active_appbar_menu(raw_menu,pathname){
    const current_section = section_from_pathname(pathname)
    console.log(`current_section = '${current_section}'`)
    return raw_menu.map((item)=>{
        item.active_class = (section_from_pathname(item.link) == current_section)?"active":""
        return item
    })
}

function get_menu_hash(){
    return generated_menu.hash
}

export{
    process_toc_list,
    get_generated_section_menu,
    get_menu_hash,
    get_active_appbar_menu
}
