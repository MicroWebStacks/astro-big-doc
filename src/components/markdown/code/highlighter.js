import {config} from '@/config.js'
import {join} from 'path'
import {bundledLanguages, getHighlighter} from 'shikiji';
import { save_file, generateShortMD5 } from '@/libs/utils.js';

const highlighter = await getHighlighter({theme:'dark-plus'})
await highlighter.loadTheme('dark-plus')

async function codeToHtml(code, highlighter_config){
    const requested_language = highlighter_config.lang
    let lang = requested_language
    if(!Object.keys(bundledLanguages).includes(requested_language)){
        console.warn(` (X) ${requested_language} is not available, fall back on js`)
        lang = 'js'
    }
    if (!highlighter.getLoadedLanguages().includes(lang)) {
        await highlighter.loadLanguage(lang)
    }
    

    const html = highlighter.codeToHtml(code, { lang: lang, theme:'dark-plus' })
    const hash = generateShortMD5(code)
    const file_path = join(config.rootdir,config.content_out,"codes",hash,"code.txt")
    await save_file(file_path,code)
    return {hash,html}
}

export{
    codeToHtml
}
