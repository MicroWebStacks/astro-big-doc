import { createReadStream } from 'fs'
import {resolve,join} from 'path'
import { config } from '@/config'
import {file_mime,remove_base}from '@/libs/assets.js'
import {getFileAssets} from '@/libs/structure-db.js'

export async function GET({params}){
    if(config.copy_assets){
        return new Response('Not supported and not needed with copy_assets = true', { status: 404 });
    }
    let imagePath = resolve(join(config.content_path,params.path));
    imagePath = remove_base(imagePath)
    console.log(`assets> serving '${imagePath}'`)
    try {
        const stream = createReadStream(imagePath);
        const contentType = file_mime(imagePath)
        return new Response(stream, {
            status: 200,
            headers: {'Content-Type': contentType}
        });
    } catch (error) {
        return new Response('File not found', { status: 404 });
    }
}

export async function getStaticPaths(){
    if(config.copy_assets){
        return []
    }
    const paths = getFileAssets().map((asset)=>asset.path).filter(Boolean)
    console.log(`serving API endpoit ${paths.length} assets`)
    return paths.map((path)=>({
        params:{path}
    }))
}
