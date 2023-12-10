import { createReadStream } from 'fs';
import {resolve,join} from 'path'
import { config } from "@/config";
import {load_json} from '@/libs/utils.js'
import {file_mime} from '@/libs/assets.js'

export async function GET({params}){
    const imagePath = resolve(join(config.rootdir,config.content,params.path));
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
    if(import.meta.env.DEV){
        const asset_list = await load_json('public/asset_list.json')
        const paths = asset_list.filter((asset)=>(Object.hasOwn(asset,"path"))).map((entry)=>(entry.path))
        console.log(`serving API endpoit ${paths.length} assets`)
        return paths.map((path)=>({params:{path:path}}))
    }else{
        return []
    }
}
