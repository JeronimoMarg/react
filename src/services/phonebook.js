
import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const create = (persona) => {
    const promise = axios.post(baseUrl, persona)
    return promise.then(response => response.data)
}

const remove = (persona) => {
    const promise = axios.delete(`${baseUrl}/${persona.id}`)
    return promise.then(response => response.data)
}

const update = (id, newObject) => {
    const promise = axios.put(`${baseUrl}/${id}`, newObject)
    return promise.then(response => response.data)
}

const getAll = () => {
    const promise = axios.get(baseUrl)
    return promise.then(response => response.data)
}

export default { create, remove, update, getAll }