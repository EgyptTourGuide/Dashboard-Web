import React, { useState } from 'react'
import { useEffect } from 'react'
import styles from './Login.module.css'
import { login } from '../../api/login'


const validateUsername = (username)=>{
    if(username.trim() === '')
      return true
    else 
      return false  
}
const validatePassword = (password)=>{
    if(password.trim() === '')
      return true
    else 
      return false  
}


const Login = (props)=>{

    
    
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ error, setError ] = useState('')
    
    useEffect(()=>{
        console.log(error)
    }, [error])

    const _onChangeUsername = (event)=>{
        setUsername(event.target.value)
        if(error !== '') setError('')
    }
    const _onChangePassword = (event)=>{
        setPassword(event.target.value)
        if(error !== '') setError('')

    }


    const _onClick = async()=>{
        
        if(error !== '') return
        if(validateUsername(username) || validatePassword(password)){
            setError('Missing username or password!')
            return
        }
        let res = await login({username, password})
        if(res.error){
            setError(res.errors[0])
        }else{
            console.log('success')
        }
        

    }


    return(
        <div className={styles.container} style={{height: '100vh'}}>
            <p className={styles.formHeader}>Login</p>
           <div className={styles.form}>
            <input 
                className={styles.inp} 
                placeholder={'Username'} 
                onChange={_onChangeUsername}
                value={username}
            />
            <input 
                className={styles.inp} 
                type='password' 
                placeholder={'Password'} 
                onChange={_onChangePassword}
                value={password}
            />
             <button className={styles.btn} onClick={_onClick} >Login</button>
              <p style={{color: 'darkred', fontSize: 12}}>{error}</p>
           </div>
        </div>
    )
}

export default Login