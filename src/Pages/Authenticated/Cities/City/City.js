import React, { useEffect, useState } from 'react'
import Layout from '../../../../layout/Layout'
import Card from '../../../../components/Card/Card'
import Loading from '../../../../components/Loading'
import { getCity } from '../../../../api/City'

const City = (props)=>{

    const [ city, setCity ] = useState(null)
    const [ loading, setLoading ] = useState(true)

    useEffect(()=>{
           async function reqCity(){
            let city = await getCity(props.match.params.id)
            setCity(city)
            setLoading(false)
           }
           reqCity()
        },[props.match.params.id])

   if(!loading){
      const state = {city}
   return(
        <Layout head={city && city.name}>
            { city && <div style={styles.cardContainer}>
            <Card title='About' to={{pathname: `/cities/${city.id}/about`, state}} />
            <Card title='Media' to={{pathname: `/cities/${city.id}/media`, state}} />
            <Card title='Places / Activity' to={{pathname: `/places`, search: `?city=${city.id}`, state}}/>
            <Card title='Hotels' to={{pathname: `/hotels`, search: `?city=${city.id}`, state}}/>
            <Card title='Plans'to={{pathname: `/cities/${city.id}/plans`, state: {aboutCity: city}}} />
            <Card title='Transport'to={{pathname: `/cities/${city.id}/transports`, state: {aboutCity: city}}} />
            </div> }
        </Layout>
   )}
   else 
     return <Layout><Loading /></Layout>
}

const styles = {
     cardContainer: {
          display: 'flex', 
          flexDirection: 'row', 
          justifyContent: 'center', 
          alignItems: 'center', 
          flexWrap: 'wrap'
     }
}

export default City