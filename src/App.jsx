import { useState } from 'react'

const Display = ({ counter }) => <div>{counter}</div>

const Button = ({ onClick, texto }) => {
  return (
    <button onClick={onClick}>{texto}</button>
  )
}

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)

  const handleLeftClick = () => (setLeft(left + 1), setAll(allClicks.concat('L')), setTotal(total + 1))

  const handleRightClick = () => (setRight(right + 1), setAll(allClicks.concat('R')), setTotal(total + 1))

  return (
    <div>
      {left}
      <Button onClick={handleLeftClick} texto='left' /> 
      <Button onClick={handleRightClick} texto='right' /> 
      {right}
      <History allClicks={allClicks}/>
      <p>Total: {total}</p>
    </div>
  )
}

export default App