import { useState, useEffect} from 'react'
import Note from './components/Note'
import noteService from './services/notes'
import Notification from './components/Notification'
import './index.css'
import Footer from './components/Footer'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [notification, setNotification] = useState({ message: null, type: '' })

  const hook = () => {
    //buscar todas las notas con un GET mediante service
    noteService
      .getAll()
      .then(data => {
        console.log('promise fulfilled de traer todas las notas')
        setNotes(data)
      })
  }

  //By default, effects run after every completed render, but you can choose to fire it only when certain values have changed.
  //The second parameter of useEffect is used to specify how often the effect is run. If the second parameter is an empty array [], then the effect is only run along with the first render of the component.
  //The principle is that the effect is always executed after the first render of the component and when the value of the second parameter changes.
  useEffect(hook, [])
  console.log('render', notes.length, 'notes')

  const addNote = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      //id: String(notes.length + 1)  //el server organiza los id's automaticamente
    }
    //hacer el post mediante el uso del service
    noteService
      .create(noteObject)
      .then(data => {
        console.log('post realizado: ', data)
        setNotes(notes.concat(data))
        setNewNote('')
        //Notificar que se creo la nota exitosamente.
        setNotification({message: `Note '${noteObject.content}' was added`, type: 'success'})
        setTimeout(() => {
          setNotification({ message: null, type: '' })
        }, 5000)
      })
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const handleToggleImportance = (note) => {
    console.log('importance of note', note.id, 'needs to be toggled')
    const url = `http://localhost:3001/notes/${note.id}`
    //Se crea una copia del note porque no queremos modificar el objeto de forma directa. (NEVER MUTATE STATE DIRECTLY)
    const changedNote = {...note, important: !note.important}
    //usamos el servicio de notes para hacer el PUT
    noteService
      .update(note.id, changedNote)
      .then(data => {
        //Setear el array de notas con la nota modificada.
        setNotes(notes.map(n => n.id === note.id ? data : n))
        //notificar que se modifico la nota exitosamente.
        setNotification({message: `Note '${note.content}' updated`, type: 'success'})
        setTimeout(() => {
          setNotification({ message: null, type: '' })
        }, 5000)
      })
      .catch(error => {
        //Notificar si hubo algun error al modificar la nota.
        setNotification({message: `Note '${note.content}' was already removed from server`, type: 'error'})
        setTimeout(() => {
          setNotification({ message: null, type: '' })
        }, 5000)
        setNotes(notes.filter(n => n.id !== note.id)) 
      })
  }

  const notesToShow = showAll ? notes : notes.filter (note => note.important === true)
  const notesM = notesToShow.map(note => <Note key={note.id} note={note} toggleImportance={() => handleToggleImportance(note)}></Note>)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={notification.message} type={notification.type}/>
      <div>
        <button onClick={() => setShowAll(!showAll)}>show {showAll ? 'important' : 'all'}</button>
      </div>
      <ul>
        {notesM}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type="submit">save</button>
      </form>
      <Footer/>
    </div>
  )
}

export default App 