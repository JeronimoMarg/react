import axios from 'axios'
const baseUrl = '/api/notes'

//NOTA: el metodo .then sobre una promise tambien devuelve una promise.

const getAll = () => {
  const promise = axios.get(baseUrl)
  return promise.then(response => response.data)
}

const create = newObject => {
  const promise = axios.post(baseUrl, newObject)
  return promise.then(response => response.data)
}

const update = (id, newObject) => {
  const promise = axios.put(`${baseUrl}/${id}`, newObject)
  return promise.then(response => response.data)
}

/*
export default { 
  getAll: getAll, 
  create: create, 
  update: update 
}
  */

//ES6 shorthand property names
export default { getAll, create, update }