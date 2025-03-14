import React from 'react'
import phonebookService from '../services/phonebook'

const PersonList = ({ persons, busqueda, setPersons, setNotificacion }) => {

  const handleDelete = (persona) => {
    console.log('Se presiono el boton para borrar a: ', persona.name)
    if (confirm(`Delete ${persona.name}?`)){
      phonebookService
      .remove(persona)
      .then(data => {
        console.log('Se borro persona: ', data)
        setPersons(persons.filter(p => p.id !== persona.id))
        setNotificacion({ message: 'Borrado exitoso', type: 'success' })
        setTimeout(() => {
          setNotificacion({ message: null, type: '' })
        }, 5000)
      })
      .catch(error => {
        console.log(error.response.data.error)
        setNotificacion({message: `No se pudo realizar el borrado, motivo: ${error.response.data.error}`, tipo: 'error'})
      })
    }else{
      console.log(`No se borro a ${persona.name}`)
    }
  }

  const personasMapeadas = persons
    .filter(p => p.name.toLowerCase().includes(busqueda.toLowerCase()))
    .map(p => {
    return (
      <li key={p.name}>
        {p.name} {p.number}
        <button onClick={() => handleDelete(p)}>Delete entry</button>
      </li>
    )})

  return (
    <ul>
      {personasMapeadas}
    </ul>
  )
}

export default PersonList