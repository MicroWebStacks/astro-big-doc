
function showKeys(info,obj){
    console.log(info)
    let list_keys = Object.keys(obj)
    list_keys = list_keys.filter((item)=>(!item.startsWith('_')))
    console.log(list_keys)
}

function verifyUser(accessToken, refreshToken, profile, cb){
    const user = profile
    console.log(` * verifyUser(id:${user.id})`)
    console.log("   checking user id, this is a demo, all users accepted ")
    //in case of real verification, check user in DB, otherwise return non null err
    cb(null,user)
}
  
export {
    showKeys,
    verifyUser
}
