import {config} from '@/config.js'
import {join} from 'path'
import {bundledLanguages, getHighlighter} from 'shikiji';
import { exists,save_file, shortMD5 } from '@/libs/utils.js';

const highlighter = await getHighlighter({
    themes:[config.highlighter.theme],
    langs:config.highlighter.langs,
})
await highlighter.loadTheme(config.highlighter.theme)

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
    

    const html = highlighter.codeToHtml(code, { lang: lang, theme:config.highlighter.theme })
    const hash = shortMD5(code)
    const file_path = join(config.rootdir,config.content_out,"codes",hash,"code.txt")
    //persist for highlighter copy, for code not saved by a diag gen
    if(!await exists(file_path)){
        await save_file(file_path,code)
    }
    return {hash,html}
}

export{
    codeToHtml
}
