import { useEffect, useState } from 'react'
import './App.css'
import ResponsiveAppBar from './Navbar'

function App() {
  const fillText = (size: number) => {
    const text = new Array(size)
    return text.fill(<p>a</p>)
  }
  
  return <div>
    {ResponsiveAppBar()}
    {fillText(100)}
  </div>

}

export default App
