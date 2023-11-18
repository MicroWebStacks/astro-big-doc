import {collect} from 'content-structure'

let collect_config = {}

async function config_setup({ updateConfig, config, addPageExtension, command }) {
	console.log(`astro:config:setup> running (${command})`)
	await collect(collect_config)
}

function collect_content(options){
	collect_config = options
	return {
		name: 'generate_menu',
		hooks: {
			'astro:config:setup': config_setup
		},
	};
}

export{
	collect_content
}
