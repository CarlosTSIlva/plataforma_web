import api from '../api';

api.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem('crcl-web-token')}`;

const optionsTipoUnidadeHabitacional = [
  { value: '0', label: 'Administração', isDisabled: true },
  { value: '1', label: 'Casa' },
  { value: '2', label: 'Apartamento' }
];

export async function getTipoUnidadeHabitacionalForSelect() {
  return optionsTipoUnidadeHabitacional;
}

export async function getByCondominio(id_condominio) {
  try {
    const url = "/condominio/" + id_condominio + "/unidade"
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
    const url = "/unidade/" + id
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
    const url = "/unidade/create"
    const response = await api.post(url, data)
  } catch (e) {
    return false
  }

  return true
}

export async function update(data) {
  try {
    const url = "/unidade/update"
    const response = await api.post(url, data)
  } catch (e) {
    return false
  }

  return true
}

export async function remove(id) {
  try {
    const url = "/unidade/" + id
    const response = await api.delete(url)
  } catch (e) {
    return false
  }

  return true
}



