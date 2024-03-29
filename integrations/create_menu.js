import {dirname, join} from 'path'
import { load_yaml, save_json } from '../src/libs/utils.js';
import { section_from_pathname,add_base } from '../src/libs/assets.js';
import {pages_list_to_tree} from './process_menu.js'
import {getDocuments} from 'content-structure'
import {createHash} from 'crypto'
import { config } from '../config.js';

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
    const section_menu = raw_menu.find((item)=>(section_from_pathname(item.link) == section))

    if(Object.hasOwn(section_menu,"autogenerate")){
        const dir = section_menu.autogenerate.directory
        let documents = await getDocuments({format:"markdown"})
        if(dir != "."){
            documents = documents.filter((entry)=>(entry.path.startsWith(dir)))
        }
        const items = documents.map((entry)=>(
            {
                label:       entry.title,
                path:       entry.path,
                url:        entry.url,
                url_type:   entry.url_type,
                link:(dir != ".")?`${config.base}/${entry.url}`:`${config.base}/${section}/${entry.url}`,
                level:content_entry_to_level(entry),
                format: entry.format,
                order: Object.hasOwn(entry,"order")?entry.order:100
            }
        ))
        const menu_tree = await pages_list_to_tree(items)
        if(dir != "."){
            result_items = []
            for(const entry of menu_tree){
                if(Object.hasOwn(entry,"items")){
                    result_items.push(...entry["items"])
                }
            }
        }else{
            result_items = menu_tree
        }
    }else if(Object.hasOwn(section_menu,"items")){
        result_items = section_menu.items
    }
    return result_items
}

async function create_menu(collect_config){
    let raw_menu = await load_yaml(collect_config.raw_menu)
    for(const menu_entry of raw_menu){
        menu_entry.link = add_base(menu_entry.link)
    }
    let menu = {
        raw_menu:raw_menu,
        sections:{}
    }
    for(const menu_entry of raw_menu){
        const section = section_from_pathname(menu_entry.link);
        menu.sections[section] = await get_section_menu(section,raw_menu)
    }
    
    const menu_text = JSON.stringify(menu)
    const hash = createHash('md5').update(menu_text).digest('hex').substring(0,8)
    
    menu = {hash:hash,...menu}
    await save_json(menu,collect_config.out_menu)
    console.log(`create_menu> ${collect_config.raw_menu} -> saved new menu in '${collect_config.out_menu}' `)
}

export{
    create_menu
}
