import { useState } from 'react'
import './App.css'
import CoinTable from './Pages/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CoinTable />
    </>
  )
}

export default App
