import { useState } from 'react'
import React from "react";   
import CreativePortfolio from './CreativePortfolio'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CreativePortfolio />
    </>
  )
}

export default App
