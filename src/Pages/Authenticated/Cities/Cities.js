import React, {useEffect, useState} from 'react'
import Layout from '../../../layout/Layout'
import classes from './Cities.module.css'
import Button from '../../../components/Button/Button'
import Card from '../../../components/Card/Card'
import { URL } from '../../../api/api'
import Loading from '../../../components/Loading'


const Cities = (props)=>{
     const [cities, setCities] = useState([])
     const [ loading, setLoading ] = useState(true)

     useEffect(()=>{

      async function fetchData(){
        try{
          let res = await fetch(`${URL}/cities`)
          let data = await res.json()
          setCities(data.cities)
          setLoading(false)
          }catch(e){
            console.log(e)
            setLoading(false)
          }
      }
      fetchData()

     }, [])

    if(!loading)
    return(
      <Layout>
        <div className={classes.container}>         
                <Button to='cities/addcity' style={styles.nav}>Add City</Button>
            <div style={styles.citiesContainer}>
                { cities.map((city)=><Card to={`cities/${city.id}`} title={city.name} key={city.id} image={city.media.length > 0 ? city.media[0] : ''}/>)  }
            </div>
        </div>
      </Layout>
    )
    else
     return <Loading />
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