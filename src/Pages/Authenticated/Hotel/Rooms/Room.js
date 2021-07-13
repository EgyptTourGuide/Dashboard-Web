import React, { useState, useEffect } from 'react'
import { URL } from '../../../../api/api'
import Card from '../../../../components/Card/Card'
import Loading from '../../../../components/Loading'
import Layout from '../../../../layout/Layout'
import axios from 'axios'

const Room = (props)=>{

    const [loading, setLoading] = useState(true)
    const [hotelName, setName] = useState('')
    const [room, setRoom] = useState(null)


    useEffect(()=>{

        async function getRoom(){
            try{

            const response = await axios.get(`${URL}/hotels/${props.match.params.id}`)
            setName(response.data.name)
            let room = response.data.rooms.find(e=>e.id === props.match.params.roomId)
            if(room)
              setRoom(room)

            }catch(e){
                console.log(e)
                setLoading(false)
            }
            setLoading(false)
        }

        getRoom()


    },[])



    if(loading)
        return <Layout><Loading /></Layout>
    else
        return(
            <Layout to={`/hotels/${props.match.params.id}/rooms`} head={ room && `${hotelName} / Rooms / ${room.number}`}>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap'}}>
                <Card title='Hours' to={`${props.match.params.roomId}/hours/`}/>
                <Card title='Media' to={`${props.match.params.roomId}/media/`} />
                </div>
            </Layout>
        )
}

export default Room