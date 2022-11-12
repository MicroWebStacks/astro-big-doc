
function showKeys(info,obj){
    console.log(info)
    let list_keys = Object.keys(obj)
    list_keys = list_keys.filter((item)=>(!item.startsWith('_')))
    console.log(list_keys)
}

function verifyUser(accessToken, refreshToken, profile, cb){
    console.log(" * verifyUser()")
    console.log(`   accessToken : ${accessToken}`)
    console.log(`   refreshToken : ${refreshToken}`)
    console.log(`   profile  id:${profile.id} username:${profile.username}`)
    let user = profile.id
    console.log("   checking user id, this is a demo, all users accepted ")
    cb(null,user)
}
  
 
  
export {
    showKeys,
    verifyUser
}
