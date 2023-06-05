import { useEffect, useState } from 'react'
import './App.css'
import ResponsiveAppBar from './Navbar'
import { createTheme } from '@mui/material/styles'
import { ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#881c1c', // UMass red
    },
    secondary: {
      main: '#212721', // UMass black
    },
  },
});

function App() {
  const fillText = (size: number) => {
    const text = new Array(size)
    return text.fill(<p>a</p>)
  }
  
  return <ThemeProvider theme={theme}>
      {ResponsiveAppBar()}
  </ThemeProvider>

}

export default App
