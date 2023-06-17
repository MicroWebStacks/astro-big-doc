

const posts = import.meta.glob('../../../data/blog/**/*.{md,mdx}')

function get_posts(){
    return posts
}

export{
    get_posts
}
