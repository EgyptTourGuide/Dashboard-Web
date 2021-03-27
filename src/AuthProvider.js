import React, { useState } from 'react'

export const AuthContext = React.createContext({
    user: null,
    login: ()=>{},
    logout: ()=>{}
})


export const AuthProvider = ({children})=>{
    const [ user, setUser ] = useState(null)
  
    return(
       <AuthContext.Provider 
       value={{
           user,
           login: (userdata)=>{
               
               setUser(userdata)
               localStorage.setItem('user', JSON.stringify(userdata))
           },
           logout: ()=>{
               localStorage.removeItem('user')
               setUser(null)
           }
       }}
       
       >
           {children}
       </AuthContext.Provider>)

}
