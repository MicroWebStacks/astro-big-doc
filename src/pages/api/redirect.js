import {getDocuments} from '@/libs/structure-db.js'

export async function GET(){
    const documents = await getDocuments()
    const redirects = documents.reduce((acc, doc) => {
        acc[doc.sid] = doc.url;
        return acc;
    }, {});
    return new Response(
        JSON.stringify(redirects), {
        status: 200,
        headers: {'Content-Type': 'application/json'}
    });
}
