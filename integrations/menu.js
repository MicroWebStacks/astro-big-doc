import {dirname, join} from 'path'
import { load_yaml, save_json } from '../src/libs/utils.js';
import {pages_list_to_tree} from './pages_menu.js'
import {getDocuments} from 'content-structure'

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

async function get_section_menu(section,raw_menu){
    let result_items = []
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
        const menu_tree = await pages_list_to_tree(items)
        result_items = menu_tree
    }else if(Object.hasOwn(section_menu,"items")){
        result_items = section_menu.items
    }
    return result_items
}

async function create_menu(collect_config){
    let menu = {}
    console.log(`create_menu> ${collect_config.raw_menu}`)
    const raw_menu = await load_yaml(collect_config.raw_menu)
    for(const menu_entry of raw_menu){
        const section = section_from_pathname(menu_entry.href);
        menu[section] = await get_section_menu(section,raw_menu)
    }
    await save_json(menu,join(collect_config.rel_outdir,"menu.json"))
}

export{
    create_menu
}
