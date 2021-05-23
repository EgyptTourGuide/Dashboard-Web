import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../../../../components/Loading'
import Layout from "../../../../layout/Layout"
import { URL } from '../../../../api/api'
import Card from '../../../../components/Card/Card'

const HotelRooms = (props)=>{

    const [rooms, setRooms] = useState([])
    const [hotelName, setName] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(()=>{

        async function getRooms(){
            try{

            const response = await axios.get(`${URL}/hotels/${props.match.params.id}`)
            setName(response.data.name)
            setRooms(response.data.rooms)

            }catch(e){
                console.log(e)
                setLoading(false)
            }
            setLoading(false)
        }

        getRooms()


    },[])


    if(loading) 
    return <Layout><Loading /></Layout>
    else
    return(
        <Layout to={`/hotels/${props.match.params.id}`} head={`${hotelName} / Rooms`}>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap'}}>
             {rooms.length > 0 && rooms.map(room=><Card title={`Room Number: ${room.number}`} to={`/hotels/${props.match.params.id}/rooms/${room.id}`} />)}
            </div>
        </Layout>
    )
}

export default HotelRooms