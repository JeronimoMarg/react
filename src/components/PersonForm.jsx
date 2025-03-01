import React, { useState } from 'react'
import phonebookService from '../services/phonebook'

const PersonForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const cumple = (nombre, numero) => {
    if (nombre === '' || numero === '') {
      alert("Completar ambos campos antes de agregar")
      return false
    } else {
      return true
    }
  }

  const encontrarPersona = (nombre) => {
    const persona = persons.filter(p => p.name === nombre)
    return persona
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log("Boton agregar presionado", event.target)
    if(cumple(newName, newNumber)){
      const personaEncontrada = encontrarPersona(newName)
      //Si no existe el usuario con el nombre entonces se crea uno nuevo, haciendo un POST
      if(personaEncontrada.length === 0){
        console.log('No se encontro persona con nombre: ', newName, '. Se creara una nueva')
        const nuevo = {
          name: newName,
          number: newNumber
        }
        phonebookService
          .create(nuevo)
          .then(data => {
            console.log('Se creo persona: ', data)
            setPersons(persons.concat(data))
            setNewName('')
            setNewNumber('')
          })
      }
      //Si ya existe el usuario entonces se modifica el numero, haciendo un PUT
      else if (personaEncontrada.length === 1){
        console.log('Se encontro persona con nombre: ', newName, '. Se modificara su numero')
        const modificado = {
          name: personaEncontrada[0].name,
          number: newNumber
        }
        phonebookService
          .update(personaEncontrada[0].id, modificado)
          .then(data => {
            console.log('Se modifico el numero de: ', data.name, ' a: ', data.number)
            setPersons(persons.map(p => p.id === data.id ? data : p))
            setNewName('')
            setNewNumber('')
          })
      }
    }
  }

  const handleNuevoNombre = (event) => {
    console.log('Nuevo nombre cambiado a: ', event.target.value)
    setNewName(event.target.value)
  }

  const handleNuevoNumbero = (event) => {
    console.log('Nuevo numero cambiado a: ', event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={handleNuevoNombre} />
        number: <input value={newNumber} onChange={handleNuevoNumbero} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm