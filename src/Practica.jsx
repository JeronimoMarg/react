import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'
import phonebookService from './services/phonebook'
import Notification from './components/Notification'

const Practica = () => {
  const [persons, setPersons] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [notificacion, setNotificacion] = useState({message: null, tipo: ''})

  const hook = () => {
    console.log('Effect')
    phonebookService
      .getAll()
      .then(data => {
        console.log('Promise fulfilled')
        setPersons(data)
      })
  }
  useEffect(hook, [])
  console.log('Cantidad de personas cargadas: ', persons.length)

  return (
    <div>
      <Notification message={notificacion.message} type={notificacion.tipo} />
      <h2>Phonebook</h2>
      <Filter busqueda={busqueda} setBusqueda={setBusqueda} />
      <h2>Add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons} setNotificacion={setNotificacion} />
      <h2>Numbers</h2>
      <PersonList persons={persons} busqueda={busqueda} setPersons={setPersons} setNotificacion={setNotificacion}/>
    </div>
  )
}

export default Practica