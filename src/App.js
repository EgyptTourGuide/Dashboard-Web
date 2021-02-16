import React, { useState } from 'react'
import { UnAuthenticated, Authenticated } from './Router'

function App() {
  const [ user, setUser ] = useState({})

  return (user === null ? <UnAuthenticated /> : <Authenticated />)
  
}

export default App;
