import api from '../api';

export async function findregistro(token) {
  var result = []
  try {
    const url = `/visita/registro/${token}`
    const response = await api.get(url)
    result = response.data
  } catch (e) { }
  return result
}

export async function createbyregistro(data) {
  try {    
    const url = "/visita/registro/createvisita"
    await api.post(url, data)        
  }
  catch (e) {    
    return false
  }
  return true
}