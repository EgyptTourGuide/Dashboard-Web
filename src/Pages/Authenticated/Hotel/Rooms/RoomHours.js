import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { URL, authAxios } from '../../../../api/api'
import Loading from '../../../../components/Loading'
import MediaCard from '../../../../components/MediaCard/MediaCard'
import Layout from '../../../../layout/Layout'
import axios from 'axios'
import Field from '../../../../components/Field/Field'
import Button from '../../../../components/Button/Button'
import { UserDiv } from '../Hotel/HotelRequests'


const RoomHours = (props)=>{

    const [room, setRoom] = useState(null)
    const [ hours, setHours ] = useState([])
    const [ data, setData ] = useState(null)
    const [ loadingPage, setLoadingPage] = useState(true)
    const [ loading, setLoading ] = useState(false)
    const [ percent, setPrecent ] = useState(0)
    const [ message, setMessage ] = useState('')
    const [ files, setFiles ] = useState([])
     
    // Get Data from api


    useEffect(()=>{
        const getInfo = async()=>{
            try{
                let res = await axios.get(`${URL}/hotels/${props.match.params.id}`)
                let hRes = await axios.get(`${URL}/rooms/${props.match.params.roomId}/hours`)
                let room = res.data.rooms.find(e=>e.id === props.match.params.roomId)
                setRoom(room)
                setHours(hRes.data.result)
                setData({name: res.data.name, media: room.media})
                setLoadingPage(false)
            }catch(e){
                setLoadingPage(false)
                console.log(e)
            }
            return
        }
        getInfo()
    }, [props])

    
    if(loadingPage) return <Layout><Loading /></Layout>
    else
    return(
        <Layout head={{pathname: `/hotels/${props.match.params.id}/rooms/${props.match.params.roomId}`}} head={`${data.name} / Rooms / ${room.number} / Hours`}>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap'}}>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
              {hours.map(h=><HoursCard key={h.id} tourist={h.user} from={h.from} to={h.to}/>)}
            </div>
        </div>
      </Layout>
    )
}



const HoursCard = (props)=>{
  
    return(
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', margin: 8}}>
        <div style={{display: 'flex', flexDirection: 'column', width: 450, padding: 15, border: '1px solid black', borderRadius: 10}}>
            <div style={{width: 200}}>
            <UserDiv to={`/tourists/${props.tourist.id}`}>
                <div style={{height: 50, width: 50, borderRadius: 50/2, backgroundImage: `url(${props.tourist.picture})`, backgroundSize: 'cover', backgroundPosition: 'center'}} />
                <p style={{padding: 0, margin: 0, marginLeft: 15,}}>{props.tourist.name}</p>
            </UserDiv>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center'}}>
              <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'row'}}>
                  <p>From: </p>
                  <p style={{padding: 4, backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: 5}}>{props.from.split('T')[0]}</p>
              </div>
              <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'row'}}>
                  <p>To: </p>
                  <p style={{padding: 4, backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: 5}}>{props.to.split('T')[0]}</p>
              </div>
            </div>
        </div>
       </div>
    )

}



export default RoomHours