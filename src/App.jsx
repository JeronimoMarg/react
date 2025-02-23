import { useState } from 'react'

const Button = ({ onClick, texto }) => {
  return (
    <button onClick={onClick}>{texto}</button>
  )
}

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [masVotada, setMasVotada] = useState(0)

  const handleAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const handleVote = (selected) => {
    setVotes(votes.map((vote, index) => {
      if (index === selected) {
        return vote + 1
      }else{
        return vote
      }
    }))
    if (votes[selected] + 1 > votes[masVotada]){
      setMasVotada(selected)
    }
  }

  return (
    <div>
      <h1>Anecdota del dia</h1>
      <p>{anecdotes[selected]}</p>
      <p>Tiene {votes[selected]} votos</p>
      <Button onClick={() => handleVote(selected)} texto="Votar" />
      <Button onClick={handleAnecdote} texto="Dame una anecdota" />

      <h1>Anecdota con mas votos</h1>
      <p>{anecdotes[masVotada]}</p>

    </div>
  )
}

export default App