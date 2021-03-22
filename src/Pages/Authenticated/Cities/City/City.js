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

   if(!loading)
   return(
        <Layout head={city && city.generalId.name}>
            { city && <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap'}}>
            <Card title='About' to={{pathname: `/cities/${city._id}/about`, state: {about: city.generalId}}} />
            <Card title='Media' to={{pathname: `/cities/${city._id}/media`, state: {data: {media: city.generalId.media, name: city.generalId.name}}}} />
            <Card title='Places / Activity' to={{pathname: `/places`, search: `?city=${city._id}`, state: {city: {_id: city._id, name: city.generalId.name}}}}/>
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