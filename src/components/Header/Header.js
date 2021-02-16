import React from 'react'
import styles from './Header.module.css'
import Input from '../Input/Input'
import Button from '../Button/Button'
import logo from '../../assets/logo2.png'
import { Link } from 'react-router-dom'

const Header = (props)=>{
    return(
        <div className={styles.header}>
            <Link to='/cities' className={styles.logo}>
                <img src={logo} alt="Logo" className={styles.img}/>
            </Link>
            <Input placeholder='Search' width={340} icon={'IoSearchOutline'}/>
            <Button width={50} fontSize={12} style={{marginRight: 15}}>
                Logout
            </Button>
        </div>
    )
}

export default Header