import { env } from 'node:process';

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
    user.role = 'admin',
    user.groups = ['Markdown','Astro','Blog','About']

    //in case of real verification, check user in DB, otherwise return non null err
    cb(null,user)
}

function get_session_id(cookie){
    const prefix = "connect.sid=s%3A"
    if(cookie.startsWith(prefix)){
      return (cookie.split(prefix)[1].split(".")[0])
    }
    return 0
}

function session_user(request){
    if(request.user){
        return request.user
    }
    else if(import.meta.env.PROD){
        const cookie = request.headers.get('cookie');
        const session_id = get_session_id(cookie)
        const user = env[session_id]              //give back the user saved by storeUser
        request.user = user
        return user
    }
    else return ""
}

export {
    showKeys,
    verifyUser,
    get_session_id,
    session_user
}
