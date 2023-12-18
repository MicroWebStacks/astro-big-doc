import {config} from '../config.js'
import {load_json} from '../src/libs/utils.js'

function collectUniqueUrls(items) {
    const uniqueUrls = new Set();
    function traverse(items) {
            items.forEach(item => {
            if((item.url)&&(item.format=="markdown")) {
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
    const menu = await load_json(config.collect_content.out_menu)
    return collectUniqueUrls(menu.sections[section])
}

export {
    get_section_pages
}
