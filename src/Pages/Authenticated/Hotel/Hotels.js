import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { URL } from '../../../api/api'
import Button from '../../../components/Button/Button'
import Card from '../../../components/Card/Card'
import Loading from '../../../components/Loading'
import Layout from '../../../layout/Layout'

const Hotels = (props)=>{
   const [hotels, setHotels] = useState([])
   const [loading, setLoading] = useState(true)

   useEffect(()=>{
       async function getHotels(){
           try{
           const res = await axios.get(`${URL}/hotels`)
           console.log(res.data)
           setHotels(res.data)
           }catch(e){
               console.log(e)
               setLoading(false)
           }
           setLoading(false)
       }

       getHotels()
   },[])
    if(loading) return <Layout><Loading /></Layout>
    else
    return (
        <Layout head='Hotels'>
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