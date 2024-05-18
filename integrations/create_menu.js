import {join} from 'path'
import { exists, load_json_abs, load_yaml_abs,save_json } from '../src/libs/utils.js';
import { section_from_pathname,add_base } from '../src/libs/assets.js';
import {pages_list_to_tree} from './process_menu.js'
import {getDocuments} from 'content-structure'
import {createHash} from 'crypto'
import { config } from '../config.js';
import {dirname} from 'path';

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
                level:      entry.level,
                link:(dir != ".")?`${config.base}/${entry.url}`:`${config.base}/${section}/${entry.url}`,
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

async function create_raw_menu(content_path,document_list){
    const top_items = document_list.filter((item)=> item.level === 2).sort((a,b)=> a.order-b.order)
    const sorted_items = top_items.map(entry => ({
        label: entry.title,
        link: `/${entry.url}`,
        autogenerate: {
            directory: dirname(entry.path)
        }
    }));

    const home_items = sorted_items.map(item => item.link === '/home' ? { ...item, link: '/' } : item);
    const icons_file = join(content_path,"icons.yaml")
    if(await exists(icons_file)){
        const icons_list = await load_yaml_abs(icons_file)
        home_items.push(...icons_list)
    }
    return home_items;
}

async function create_menu(collect_config){
    const menu_file = join(collect_config.contentdir,"menu.yaml")
    let raw_menu
    if(await exists(menu_file)){
        raw_menu = await load_yaml_abs(menu_file)
    }else{
        const document_list = await load_json_abs(join(collect_config.outdir,"document_list.json"))
        raw_menu = await create_raw_menu(collect_config.contentdir,document_list)
    }
    const base_menu = JSON.parse(JSON.stringify(raw_menu))
    for(let menu_entry of base_menu){
        menu_entry.link = add_base(menu_entry.link)
    }
    let menu = {
        base_menu:base_menu,
        sections:{}
    }
    for(const menu_entry of base_menu){
        const section = section_from_pathname(menu_entry.link);
        menu.sections[section] = await get_section_menu(section,base_menu)
    }
    
    const menu_text = JSON.stringify(menu)
    const hash = createHash('md5').update(menu_text).digest('hex').substring(0,8)
    
    menu = {hash:hash,...menu}
    await save_json(menu,collect_config.out_menu)
    console.log(`create_menu> content -> saved new menu in '${collect_config.out_menu}' `)
}

export{
    create_menu
}
