import React, {useEffect, useState} from 'react'
import { NavLink } from 'react-router-dom'
import Layout from '../../../layout/Layout'
import classes from './Cities.module.css'
import Button from '../../../components/Button/Button'
import Card from '../../../components/Card/Card'
import { URL } from '../../../api/api'


const Cities = (props)=>{
     const [cities, setCities] = useState([])



     useEffect(()=>{

      async function fetchData(){
        try{
          let res = await fetch(`${URL}/city/cities`)
          let data = await res.json()
          setCities(data.cities)
          }catch(e){
            console.log(e)
          }
      }
      fetchData()

     }, [])

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
                { cities.map((city)=><Card title={city.generalId.name} key={city._id} image={city.generalId.media[0]}/>)  }
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