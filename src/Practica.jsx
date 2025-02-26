import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'

const Practica = () => {
  const [persons, setPersons] = useState([])
  const [busqueda, setBusqueda] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  useEffect(hook, [])
  console.log('cantidad de personas cargadas: ', persons.length)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter busqueda={busqueda} setBusqueda={setBusqueda} />
      <h2>Add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <PersonList persons={persons} busqueda={busqueda} />
    </div>
  )
}

export default Practica