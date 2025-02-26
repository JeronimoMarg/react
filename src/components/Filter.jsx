import React from 'react'

const Filter = ({ busqueda, setBusqueda }) => {
  const handleSearch = (event) => {
    console.log('Busqueda cambiada a: ', event.target.value)
    setBusqueda(event.target.value)
  }

  return (
    <div>
      filter: <input value={busqueda} onChange={handleSearch} />
    </div>
  )
}

export default Filter