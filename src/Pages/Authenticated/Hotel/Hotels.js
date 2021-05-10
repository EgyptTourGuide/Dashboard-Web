import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { URL } from '../../../api/api'
import Button from '../../../components/Button/Button'
import Card from '../../../components/Card/Card'
import Loading from '../../../components/Loading'
import Layout from '../../../layout/Layout'
import qs from 'qs'
import { getCity } from '../../../api/City'

const Hotels = (props)=>{
   const [city, setCity] = useState(null)
   const [hotels, setHotels] = useState([])
   const [loading, setLoading] = useState(true)

   useEffect(()=>{
    const cityId = qs.parse(props.location.search,{ ignoreQueryPrefix: true }).city

    setLoading(true)
    //Function to request city
    async function reqCity(id){
        try{
       let city = await getCity(id)
       setCity({id: city.id, name: city.name})
        }catch(e){
            console.log(e)
            window.location.href = "/places"
        }
    }
    //Function to request places with id or without id
    async function getHotels(id){
        try{
        let res = id ? await axios.get(`${URL}/hotels?city=${id}`) : await axios.get(`${URL}/hotels`) 
        if(res.status === 200) setHotels(res.data)
        setLoading(false)
        }catch(e){
            console.log(e)
        }
    }
    if(props.location.state){
        setCity(props.location.state.city)
        getHotels(props.location.state.city && props.location.state.city.id)
    }
    //Check if city id in query not null
    else if(cityId !== undefined){
        reqCity(cityId)
        getHotels(cityId)

    }
    //If we reqeust places without city id
    else{
        setCity(null)
        getHotels()
    }

   },[props])
    if(loading) return <Layout><Loading /></Layout>
    else
    return (
        <Layout to={city ? `cities/${city.id}` : ''}  head={`${ city ? `${city.name} / Hotels`: 'Hotels'}`}>
        <div style={{display: 'flex', margin: 15, justifyContent: 'center', alignItems: 'center'}}>
          <Button to='/hotels/add'>Add Hotel</Button>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap'}}>
            {hotels.length > 0 && hotels.map(hotel=><Card to={`/hotels/${hotel.id}`} stars={hotel.rate === 0 ? -1 : hotel.rate} title={hotel.name} key={hotel.id} image={hotel.media.length > 0 && hotel.media[0]} />)}
        </div>
        </Layout>
    )
}

export default Hotels