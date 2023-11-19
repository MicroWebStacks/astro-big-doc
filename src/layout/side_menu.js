import {getDocuments} from 'content-structure'
import { load_yaml } from '@/libs/utils';
import {section_from_pathname} from '@/layout/layout_utils.js'
import {parse, join, dirname} from 'path'

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

function entry_to_href(entry){
    if(entry.url_type == "dir"){
        const dir = dirname(dirname(entry.path))
        return join(dir, entry.slug).replaceAll('\\','/')
    }else{
        const parsedPath = parse(entry.path)
        return join(parsedPath.dir, entry.slug).replaceAll('\\','/')
    }
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
    if(Object.hasOwn(section_menu,"content")){
        const documents = await getDocuments({format:"markdown"})
        let filtered_entries = documents
        if(!["","/"].includes(section_menu.content)){
            let path_filter = section_menu.content
            if(path_filter.startsWith("/")){
                path_filter = path_filter.substring(1)
            }
            filtered_entries = documents.map((entry)=>(entry.path.startsWith(path_filter)))
        }
        const items = filtered_entries.map((entry)=>(
            {
                text:entry.title,
                href:`/${section}/${entry_to_href(entry)}`,
                level:content_entry_to_level(entry),
                format: entry.format,
                weight: Object.hasOwn(entry,"weight")?entry.weight:1
            }
        ))
        return headings_list_to_tree(items,false)
        //return items
    }else if(Object.hasOwn(section_menu,"items")){
        return section_menu.items
    }else{
        return []
    }

    //[{
    //        text : "Test entry",
    //        href : "/blog/double3",
    //        level : 2,
    //        readme : true
    //}]
}

export{
    process_toc_list,
    get_section_menu,
    entry_to_href
}
