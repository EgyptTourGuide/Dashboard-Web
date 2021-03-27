import React, { useContext } from 'react'
import styles from './Header.module.css'
import Input from '../Input/Input'
import Button from '../Button/Button'
import logo from '../../assets/logo2.png'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { URL } from '../../api/api'
import { AuthContext } from '../../AuthProvider'

const Header = (props)=>{

    const { user } = useContext(AuthContext)

    const _onClick = async()=>{

        try{
            let refreshToken = user.refreshToken
            if(refreshToken){
                console.log(refreshToken)
                await axios.post(`${URL}/logout`, {refreshToken})
            }
        }catch(e){
            console.log(e)
        }
        localStorage.clear()
        window.location.href = "/login"
    } 

    return(
        <div className={styles.header}>
            <Link to='/cities' className={styles.logo}>
                <img src={logo} alt="Logo" className={styles.img}/>
            </Link>
            <Input placeholder='Search' width={340} icon={'IoSearchOutline'}/>
            <Button onClick={_onClick} width={50} fontSize={12} style={{marginRight: 15}}>
                Logout
            </Button>
        </div>
    )
}

export default Header