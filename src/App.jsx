import { useState } from 'react'

const Button = ({ onClick, texto }) => {
  return (
    <button onClick={onClick}>{texto}</button>
  )
}

const Result = ({texto, valor}) => {
  return (
    <p>{texto} {valor}</p>
  )
}

const Statistics = ({good, neutral, bad}) => {

  const calcularPromedio = (good, neutral, bad) => {
    console.log('Promedio: ', (good - bad) / (good + neutral + bad))
    return (good - bad) / (good + neutral + bad)
  }

  const calcularPorcentajePositivo = (good, neutral, bad) => {
    console.log('Porcentaje positivo: ', (good / (good + neutral + bad)) * 100)
    return (good / (good + neutral + bad)) * 100
  }

  if (good + bad + neutral === 0){
    return (
      <div>
        <p>No hay feedback, padre</p>
      </div>
    )
  }else{
    return (
      <div>
        <Result texto='Good' valor={good} />
        <Result texto='Neutral' valor={neutral} />  
        <Result texto='Bad' valor={bad} />
        <Result texto='All' valor={good + neutral + bad} />
        <Result texto='Average' valor={calcularPromedio(good, neutral, bad)} />
        <Result texto='Positive %' valor={calcularPorcentajePositivo(good, neutral, bad)}/>
      </div>
    )
  }
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    console.log('Good. Valor antes: ', good, 'Valor nuevo:' , good + 1)
    setGood(good + 1)
  }

  const handleBad = () => {
    console.log('Bad. Valor antes: ', bad, 'Valor nuevo:' , bad + 1)
    setBad(bad + 1)
  }

  const handleNeutral = () => {
    console.log('Neutral. Valor antes: ', neutral, 'Valor nuevo: ', neutral + 1)
    setNeutral(neutral + 1)
  }

  return (
    <div>
      <h1>Give feedback!</h1>
      <Button onClick={handleGood} texto='Good' />
      <Button onClick={handleNeutral} texto='Neutral' />
      <Button onClick={handleBad} texto='Bad' />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App