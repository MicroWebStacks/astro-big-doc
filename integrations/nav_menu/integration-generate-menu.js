import {green_log} from '../../src/libs/utils'
import { generate_nav_menu } from './menu_nav';


async function config_setup({ updateConfig, config, addPageExtension, command }) {
	green_log(`astro:config:setup> running (${command})`)
	await generate_nav_menu()
}

function generate_menu(options){
	return {
		name: 'generate_menu',
		hooks: {
			'astro:config:setup': config_setup
		},
	};
}

export{
	generate_menu
}
