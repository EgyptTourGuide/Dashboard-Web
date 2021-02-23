import React, { useEffect, useState } from 'react'
import Layout from '../../../../layout/Layout'
import axios from 'axios'
import { URL } from '../../../../api/api'
import Card from '../../../../components/Card/Card'
import Loading from '../../../../components/Loading'

const City = (props)=>{

    const [ city, setCity ] = useState(null)
    const [ loading, setLoading ] = useState(true)

    useEffect(()=>{
        async function getCity(){
            try{
                let res = await axios.get(`${URL}/cities/${props.match.params.id}`)
                setCity(res.data.city)
                setLoading(false)
                }catch(e){
                  console.log(e)
                  setLoading(false)
                }
                return
            }
            getCity()
        },[props.match.params.id])

   if(!loading)
   return(
        <Layout head={city && city.generalId.name}>
            { city && <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap'}}>
            <Card title='About' to={{pathname: `/cities/${city._id}/about`, state: {aboutCity: city.generalId}}} />
            <Card title='Media' to={{pathname: `/cities/${city._id}/media`, state: {aboutCity: city.generalId}}} />
            <Card title='Places / Activity' to={{pathname: `/cities/${city._id}/places`, state: {aboutCity: city.generalId}}}/>
            <Card title='Hotels' to={{pathname: `/cities/${city._id}/hotels`, state: {aboutCity: city.generalId}}}/>
            <Card title='Tours'to={{pathname: `/cities/${city._id}/tours`, state: {aboutCity: city.generalId}}} />
            <Card title='Transport'to={{pathname: `/cities/${city._id}/transport`, state: {aboutCity: city.generalId}}} />
            </div> }
        </Layout>
   )
   else 
     return <Loading />
}

export default City