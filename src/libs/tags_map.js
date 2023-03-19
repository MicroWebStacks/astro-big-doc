import tags_map from '../../data/blog/tags_map.json'


function get_map(url){
    if(url in tags_map){
        return JSON.stringify(tags_map[url])
    }else{
        return ""
    }
}

export{
    get_map
}
