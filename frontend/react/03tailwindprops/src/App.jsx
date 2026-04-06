import { useState } from 'react'
import './App.css'
import Card from './components/card'

function App() {
  const [count, setCount] = useState(0)
  const newArr = [1, 2, 3, 4, 5];
  return (
    <>
      <h1 className="text-4x text-4xl">Hello World!</h1>
      <Card
        name="Mainuddin Akash"
        avatar="MA"
        imgUrl="https://res.cloudinary.com/dvomhgavh/image/upload/v1775014270/li6nf5wj3aduypqsdkwv.png"
        myArr={newArr}
      />
      <Card name="Alexander Wang" />
      <Card name="Lucy Guo" />
      <Card />
    </>
  )
}

export default App
