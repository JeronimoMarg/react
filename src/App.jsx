import { useState } from 'react'

const Display = ({ counter }) => <div>{counter}</div>

const Button = ({ onClick, texto }) => <button onClick={onClick}>{texto}</button>

const App = () => {
  const [ counter, setCounter ] = useState(0)
  console.log('Rendering App component')


  const increaseByOne = () => {
    console.log('increasing, value before', counter)
    setCounter(counter + 1)
  }

  const decreaseByOne = () => { 
    console.log('decreasing, value before', counter)
    setCounter(counter - 1)
  }

  const setToZero = () => {
    console.log('resetting to zero, value before', counter)
    setCounter(0)
  }

  return (
    <div>
      <Display counter={counter}/>
      <Button onClick={increaseByOne} texto='plus'/>
      <Button onClick={setToZero} texto='zero'/>
      <Button onClick={decreaseByOne} texto='minus'/>
    </div>
  )
}

export default App