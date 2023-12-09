import {config} from '@/config.js'
import {exists, shortMD5, save_file} from '@/libs/utils'
import {join} from 'path'

async function diagram_cache(code,generator){
    const hash = shortMD5(code)
    const file_path = join(config.rootdir,config.content_out,"codes",hash,"diagram.svg")
    const file_exists = await exists(file_path)
    if(file_exists){
        console.log(`* returning diagram from cache '${file_path}'`)
        return hash
    }else{
        console.log(`* generating diagram as not in cache`)
        const svg_text = await generator(code)
        await save_file(file_path,svg_text)
        const code_path = join(config.rootdir,config.content_out,"codes",hash,"code.txt")
        await save_file(code_path,code)
        return hash
    }
}

export{
    diagram_cache
}
