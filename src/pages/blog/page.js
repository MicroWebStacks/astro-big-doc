

const posts = import.meta.glob('../../../data/blog/**/*.{md,mdx}', { eager: true })

function get_posts(){
    return posts
}

export{
    get_posts
}
