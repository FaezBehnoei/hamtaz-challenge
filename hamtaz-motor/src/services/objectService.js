import apiClient from './apiClient.js'


export const getObjects = () => {
  return apiClient.get('/objects')
}

export const deleteObject = (id) => {
  return apiClient.delete(`/objects/${id}`)
}

export const updateObject = (id, data) => {
  const payload = { data: data }
  return apiClient.put(`/objects/${id}`, payload)
}

export const createObject = (data) => {
  const payload = {
    name: data.name,
    data: data.details
  }
  return apiClient.post('/objects', payload)
}
export const getObjectById = (id) => {
  return apiClient.get(`/objects/${id}`)
}

export const getObjectsByIds = (ids) => {
  const params = new URLSearchParams()
  ids.forEach(id => params.append('id', id))
  
  return apiClient.get('/objects', { params })
}