import {load_json_abs} from '@/libs/utils.js'
import { config } from '@/config'
import {join} from 'path'

export async function GET(){
    const documents = await load_json_abs(join(config.collect_content.outdir,'document_list.json'))
    const redirects = documents.reduce((acc, doc) => {
        acc[doc.sid] = doc.url;
        return acc;
    }, {});
        return new Response(
            JSON.stringify(redirects), {
            status: 200,
            headers: {'Content-Type': 'json'}
        });
}
