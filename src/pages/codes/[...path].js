import { createReadStream } from 'fs';
import {resolve,join} from 'path'
import { config } from "@/config";
import {load_json} from '@/libs/utils.js'
import {file_mime} from '@/libs/assets.js'

export async function GET({params}){
    const imagePath = resolve(join(config.rootdir,config.content_out,"codes",params.path));
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
    const asset_list = await load_json('public/asset_list.json')

    const diagrams = asset_list.filter((asset)=>
            ((asset.type == "code") && (asset.language == "plantuml"))
        ).map((entry)=>(`${entry.hash}/diagram.svg`))
    console.log(`serving API endpoit ${diagrams.length} svg code diagrams`)

    const codes = asset_list.filter((asset)=>
            ((asset.type == "code"))
        ).map((entry)=>(`${entry.hash}/code.txt`))
    console.log(`serving API endpoit ${codes.length} text code blocks`)
    const paths = [...diagrams, ...codes]
    return paths.map((path)=>({params:{path:path}}))
}
