import api from '../api';

api.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem('crcl-web-token')}`;

export async function getAll() {  
  try {
    const url = "/condominio/all"
    const response = await api.get(url)
    if (response && response.data) {
      return response.data.data
    } else {
      return []
    }
  }
  catch (e) {
    return []
  }
}

export async function getByID(id) {  
  try {
    const url = "/condominio/" + id
    const response = await api.get(url)
    if (response && response.data) {
      return response.data.data
    } else {
      return []
    }
  }
  catch (e) {
    return []
  }
}

export async function create(data) {  
  try {
    const url = "/condominio/create"
    const response = await api.post(url, data)
    if (response.data.status === 'ERROR'){
      return false
    }
  } catch (e) {    
    return false
  }

  return true
}

export async function update(data) {  
  try {
    const url = "/condominio/update"
    const response = await api.post(url, data)
  } catch (e) {
    return false
  }

  return true
}

export async function remove(id) {  
  try {
    const url = "/condominio/" + id
    const response = await api.delete(url)
  } catch (e) {
    return false
  }

  return true
}