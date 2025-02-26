import { useState } from 'react'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [busqueda, setBusqueda] = useState('')

  const personasMapeadas = persons
    .filter(p => p.name.toLowerCase().includes(busqueda.toLowerCase()))
    .map(p => <li key={p.name}>{p.name} {p.number}</li>)
  
  const cumple = (nombre, numero) => {
    if(nombre === '' || numero === ''){
      alert("Completar ambos campos antes de agregar")
      return false
    }else{
      return true
    }
  }

  const yaExiste = (nombre) => {
    if(persons.filter(p => p.name === nombre).length !== 0){
      alert(`${nombre} ya esta en el fonebuk`)
      return true
    }else{
      return false
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log("Boton agregar presionado", event.target)
    if(cumple(newName, newNumber) && !yaExiste(newName)){
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

  const handleSearch = (event) => {
    console.log('Busqueda cambiada a: ', event.target.value)
    setBusqueda(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter variable={busqueda} setVariable={setBusqueda}></Filter>
      <h2>Add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNuevoNombre}/>
          number: <input value={newNumber} onChange={handleNuevoNumbero}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {personasMapeadas}
      </ul>
    </div>
  )
}

export default App