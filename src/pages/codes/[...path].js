import { createReadStream } from 'fs';
import {resolve,join} from 'path'
import { config } from "@/config";
import {load_json_abs} from '@/libs/utils.js'
import {file_mime} from '@/libs/assets.js'

export async function GET({params}){
    const imagePath = resolve(join(config.code_path,params.path));
    console.log(`codes> serving '${imagePath}'`)
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
        const asset_list = await load_json_abs(join(config.collect_content.outdir,'asset_list.json'))
        const codes_diagrams = ["plantuml", "blockdiag", "mermaid"]
        const diagrams = asset_list.filter((asset)=>
                ((asset.type == "code") && (codes_diagrams.includes(asset.language)))
            ).map((entry)=>(`${entry.hash}/diagram.svg`))
        console.log(`serving API endpoit ${diagrams.length} svg code diagrams`)
    
        const codes = asset_list.filter((asset)=>((asset.type == "code"))).map((entry)=>(`${entry.hash}/code.txt`))
        console.log(`serving API endpoit ${codes.length} text code blocks`)
        const paths = [...diagrams, ...codes]
        return paths.map((path)=>({params:{path:path}}))
    }else{
        return []
    }
}
