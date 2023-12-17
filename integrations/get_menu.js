import {join} from 'path'
import {config} from '../config.js'
import {load_json} from '../src/libs/utils.js'

function collectUniqueUrls(items) {
    const uniqueUrls = new Set();
    function traverse(items) {
            items.forEach(item => {
            if(item.url) {
                uniqueUrls.add(item.url);
            }
            if (item.items) {
                traverse(item.items);
            }
        });
    }
    traverse(items);
    return Array.from(uniqueUrls);
}

async function get_section_pages(section){
    const new_menu_path = join(config.collect_content.rel_outdir,"menu.json")
    const menu = await load_json(new_menu_path)
    return collectUniqueUrls(menu.sections[section])
}

export {
    get_section_pages
}
