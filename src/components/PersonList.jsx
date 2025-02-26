import React from 'react'

const PersonList = ({ persons, busqueda }) => {
  const personasMapeadas = persons
    .filter(p => p.name.toLowerCase().includes(busqueda.toLowerCase()))
    .map(p => <li key={p.name}>{p.name} {p.number}</li>)

  return (
    <ul>
      {personasMapeadas}
    </ul>
  )
}

export default PersonList