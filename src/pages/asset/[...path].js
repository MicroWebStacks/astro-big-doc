import { createReadStream } from 'fs';
import {resolve,join} from 'path'
import { config } from "@/config";

export async function GET({params}){
    const imagePath = resolve(join(config.rootdir,config.content,params.path));

    try {
        const stream = createReadStream(imagePath);

        // Identify the correct MIME type based on the file extension, or default to 'application/octet-stream'
        //const contentType = 'image/png'
        const contentType = 'image/svg+xml'

        return new Response(stream, {
            status: 200,
            headers: {
                'Content-Type': contentType,          
            }
        });
    } catch (error) {
        // Handle error, such as file not found
        return new Response('File not found', { status: 404 });
    }
}

//TODO serve all assets - to check if in dev mode only
export function getStaticPaths(){
    if(import.meta.env.DEV){
        const files = [
            "panzoom/tree.svg"
        ]
        return files.map((file)=>({params:{path:file}}))
    }else{
        return []
    }
}
