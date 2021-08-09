import * as SecureLS from 'secure-ls';

var ls = new SecureLS({})

export function secureSetItem(key, data){
  ls.set(key, data)
}

export function secureGetItem(key){
  return ls.get(key)
}
