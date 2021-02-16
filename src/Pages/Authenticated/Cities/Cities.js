import React from 'react'
import { NavLink } from 'react-router-dom'
import Layout from '../../../layout/Layout'
import classes from './Cities.module.css'
import Button from '../../../components/Button/Button'
import Card from '../../../components/Card/Card'


const Cities = (props)=>{

    return(
      <Layout>
        <div className={classes.container}>
            <NavLink 
                to='/cities/addcity' 
                style={styles.nav} 
            >
                <Button>Add City</Button>
            </NavLink>
            <div style={styles.citiesContainer}>
                <Card title='Cairo'/>
            </div>
        </div>
      </Layout>
    )
  }




  const styles = {
      citiesContainer: {
        display: 'flex', 
        flex: 1, 
        justifyContent: 'center', 
        flexDirection: 'row', 
        flexFlow:'wrap', 
        margin: 0, 
        width: '100%'
      },
      nav:{
        margin: 30, 
        outline: 'none', 
        textDecoration: 'none'
      }
  }

export default Cities