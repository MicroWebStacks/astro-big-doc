import { createReadStream } from 'fs';
import {resolve,join} from 'path'
import { config } from "@/config";
import {load_json_abs} from '@/libs/utils.js'
import {file_mime} from '@/libs/assets.js'
import {remove_base} from '@/libs/assets.js'

export async function GET({params}){
    if(config.copy_assets){
        return new Response('Not supported and not needed with copy_assets = true', { status: 404 });
    }
    let imagePath = resolve(join(config.content_path,params.path));
    if(params.path.startsWith("/")){
        imagePath = resolve(join(config.rootdir,"public",params.path));
    }
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

    const asset_list = await load_json_abs(join(config.collect_content.outdir,'asset_list.json'))
    const paths = asset_list.filter((asset)=>(
        ((asset.type != "link") && (Object.hasOwn(asset,"path"))) ||
        ((asset.type == "link") && (!asset.external) && asset.filter_ext))
    ).map((entry)=>(entry.path))
    console.log(`serving API endpoit ${paths.length} assets`)
    return paths.map((path)=>({params:{path:path}}))
}
