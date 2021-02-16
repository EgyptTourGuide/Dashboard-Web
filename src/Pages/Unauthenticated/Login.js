import React, { useState } from 'react'
import { useEffect } from 'react'
import styles from './Login.module.css'
import { login } from '../../api/login'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import logo from '../../assets/logo2.png'



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
        <div className={styles.container}>
           <div className={styles.form}>
             <img src={logo} alt='LOGO' className={styles.logo} />
            <Input 
                placeholder={'Username'} 
                onChange={_onChangeUsername}
                value={username}
            />
            <Input 
                placeholder={'Password'} 
                onChange={_onChangePassword}
                value={password}
                style={{marginTop: 10}}
                type='password'
            />
             <Button style={{marginTop: 20}} onClick={_onClick} >Login</Button>
              {error && <p style={{color: 'darkred', fontSize: 12}}>{error}</p>}
           </div>
        </div>
    )
}

export default Login