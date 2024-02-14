import {config} from '@/client_config.js'

function remove_base(pathname){
  if(pathname.startsWith(config.base)){
      pathname = pathname.substring(config.base.length)
  }
  return pathname
}


export{
  remove_base
}
