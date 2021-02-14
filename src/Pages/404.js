import React from 'react'

const Notfound = (props)=>(
    <div style={{display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
       <h2>Page not found!</h2>
       <a href='/'>Goback</a>
    </div>
)

export default Notfound