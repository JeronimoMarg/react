import React, { useState } from 'react'

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

  const yaExiste = (nombre) => {
    if (persons.filter(p => p.name === nombre).length !== 0) {
      alert(`${nombre} ya esta en el fonebuk`)
      return true
    } else {
      return false
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log("Boton agregar presionado", event.target)
    if (cumple(newName, newNumber) && !yaExiste(newName)) {
      const nuevo = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(nuevo))
      setNewName('')
      setNewNumber('')
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