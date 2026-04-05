import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [counter, setCounter] = useState(0)

  const AddOnCounter = () => {
    setCounter(counter + 1)
    // setCounter((prevCounter) => prevCounter + 1)
    // setCounter((prevCounter) => prevCounter + 1)
    // setCounter((prevCounter) => prevCounter + 1)
    // setCounter((prevCounter) => prevCounter + 1)
    // setCounter((prevCounter) => prevCounter + 1)
  }
  const RemoveFromCounter = () => {
    setCounter( counter - 1)
  }

  return (
    <>
      <h1>Counter App {counter}</h1>
      <h2>Counter Value : {counter}</h2>
      <button onClick={AddOnCounter}>Add value</button>
      <button onClick={RemoveFromCounter}>Remove value</button>
      <p>Footer: {counter}</p>
    </>
  )
}

export default App
