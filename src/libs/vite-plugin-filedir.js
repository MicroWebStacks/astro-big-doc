import {dirname} from 'node:path'

function transform(src, id) {
    if (id.endsWith(".astro") && src.includes("__filedir")) {
        return src.replace("__filedir",dirname(id))
    }
}

export default function replaceFiledir() {
    return {
        name: "replace-filename",
        transform:transform
    };
}

export{
    replaceFiledir
}
