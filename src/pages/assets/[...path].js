import { createReadStream } from 'fs'
import {resolve,join} from 'path'
import { config } from '@/config'
import {load_json_abs} from '@/libs/utils.js'
import {file_mime} from '@/libs/assets.js'
import {remove_base} from '@/libs/assets.js'

export async function GET({params,props}){
    if(config.copy_assets){
        return new Response('Not supported and not needed with copy_assets = true', { status: 404 });
    }
    console.log(`\nassets> props.asset.path '${props.asset.path}'`)
    let imagePath = resolve(join(config.content_path,params.path));
    imagePath = remove_base(imagePath)
    if(props.asset.path.startsWith("/")){
        const asset = props.asset
        if(asset.exists){
            imagePath = asset.abs_path
        }
    }
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
    const assets = asset_list.filter((asset)=>(
        ((asset.type != "link") && (Object.hasOwn(asset,"path"))) ||
        ((asset.type == "link") && (!asset.external) && asset.filter_ext))
    ).map((entry)=>(entry))
    console.log(`serving API endpoit ${assets.length} assets`)
    return assets.map((asset)=>({
        params:{path:asset.path},
        props:{asset}
    }))
}
