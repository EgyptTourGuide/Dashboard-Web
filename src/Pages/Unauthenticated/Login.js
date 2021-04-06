import React, { useState, useContext } from 'react'
import styles from './Login.module.css'
import { login } from '../../api/login'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import logo from '../../assets/logo2.png'
import { AuthContext } from '../../AuthProvider'



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

    const data = useContext(AuthContext)
    
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState('')
    

    const _onChangeUsername = (event)=>{
        setUsername(event.target.value)
        if(error !== '') setError('')
    }
    const _onChangePassword = (event)=>{
        setPassword(event.target.value)
        if(error !== '') setError('')

    }


    const _onClick = async()=>{
        
        try{
        if(error !== '') return
        if(validateUsername(username) || validatePassword(password)){
            setError('Missing username or password!')
            return
        }
        setLoading(true)
        let res = await login({username, password})
        if(res.error){
            setError(res.errors[0])
            setLoading(false)
        }else{
            setLoading(false)
            data.login(res.user)
        }
        }catch(e){
            console.log(e)
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
             <Button disabled={loading} style={{marginTop: 20, width: 100, height: 35}} onClick={_onClick}>{loading ? 'loading..' : 'Login'}</Button>
              {error && <p style={{color: 'darkred', fontSize: 12, margin: 0, padding: 0}}>{error}</p>}
           </div>
        </div>
    )
}

export default Login