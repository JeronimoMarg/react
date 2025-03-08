import React, { useState } from 'react'
import phonebookService from '../services/phonebook'

const PersonForm = ({ persons, setPersons, setNotificacion }) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  //Se puede delegar la validacion al backend. Aunque no seria mala idea hacerlo en el frontend
  const cumple = (nombre, numero) => {
    if (nombre === '' || numero === '') {
      setNotificacion({message: 'Campo de nombre o numero vacios. Completar', tipo: 'error'})
      setTimeout(() => {
        setNotificacion({message: null, tipo: ''})
      }, 5000)
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
    //Ambos campos (nombre y numero) deben estar completos
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
            setNotificacion({message: 'Creacion de persona exitosa', tipo: 'success'})
            setTimeout(() => {
              setNotificacion({message: null, tipo: ''})
            }, 5000)
          })
          //Si no se pudo hacer el POST correctamente, catch del error
          .catch(error => {
            console.log(error.response.data.error)
            setNotificacion({message: `No se pudo realizar la creacion, motivo: ${error.response.data.error}`, tipo: 'error'})
            setTimeout(() => {
              setNotificacion({message: null, tipo: ''})
            }, 5000)
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
            setNotificacion({message: 'Modificacion de persona exitosa', tipo: 'success'})
            setTimeout(() => {
              setNotificacion({message: null, tipo: ''})
            }, 5000)
          })
          //Si no se pudo hacer el PUT correctamente, catch del error.
          //404 Si se desea modificar algo que ha sido borrado
          .catch(error => {
            console.log(error.response.data.error)
            setNotificacion({message: `No se pudo realizar la modificacion, motivo: ${error.response.data.error}`, tipo: 'error'})
            setTimeout(() => {
              setNotificacion({message: null, tipo: ''})
            }, 5000)
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