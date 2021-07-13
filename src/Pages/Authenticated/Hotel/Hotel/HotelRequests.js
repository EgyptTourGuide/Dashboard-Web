import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { authAxios, URL } from '../../../../api/api'
import Loading from '../../../../components/Loading'
import Layout from '../../../../layout/Layout'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Button from '../../../../components/Button/Button'


const HotelRequest = (props)=>{

    const [hotel, setHotel] = useState(null)
    const [requests, setRequests] = useState([])
    const [loading, setLoading] = useState(true)

    const decline = async(id)=>{
        const obj = {
            status: "declined",
            requestId: id
        }

        const res = await authAxios.put(`${URL}/hotels/${hotel.id}/request`, obj)
        console.log(res)
        if(res.status === 200){
            setRequests(requests.filter(request=>request.id !== id))
        }
    }
    const accept = async(id)=>{
        const obj = {
            status: "accepted",
            requestId: id
        }

        const res = await authAxios.put(`${URL}/hotels/${hotel.id}/request`, obj)
        console.log(res)
        if(res.status === 200){
            setRequests(requests.filter(request=>request.id !== id))
        }

    }

    useEffect(()=>{
        async function getData(){
            try{
                let res = await axios.get(`${URL}/hotels/${props.match.params.id}`)
                let res2 = await authAxios.get(`${URL}/hotels/${props.match.params.id}/requests`)
                console.log(res.data.name)
                setHotel({id: res.data.id, name: res.data.name})
                setRequests(res2.data.requests)
                console.log(res2.data.requests)
                setLoading(false)
            }catch(e){
                console.log(e)
                setLoading(false)
            }
        }
        getData()

    },[props])


    if(loading) return (<Layout><Loading /></Layout>)
    else
    return (
        <Layout to={`/hotels/${props.match.params.id}`} head={`${hotel.name} / Requests`}>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: 60}}>
                {requests.length > 0 && requests.map(request=> <RequestCard 
                accept={accept}
                decline={decline}
                hotel={hotel.id} 
                key={request.id} 
                from={request.from} 
                to={request.to} 
                id={request.id} 
                tourist={request.tourist} 
                room={request.room} 
                />)}
            </div>
        </Layout>
    )
}


export const UserDiv = styled(Link)`
    display: flex;
    flex-direction: row; 
    justify-content: center; 
    align-items: center; 
    text-decoration: none;
    color: black;
    padding: 10px;
    border-radius: 5px;
    transition: background-color 0.18s;
    &:hover {
        background-color: rgba(0,0,0,0.2);
    }
`
export const RoomDiv = styled(Link)`
display: flex;
flex-direction: row; 
justify-content: center; 
align-items: center; 
text-decoration: none;
color: black;
padding: 10px;
border-radius: 5px;
transition: background-color 0.18s;
&:hover {
    background-color: rgba(0,0,0,0.2);
}

`


const RequestCard = (props)=>{
    
    const onAccept = ()=>props.accept(props.id)
    const onDecline = ()=>props.decline(props.id)


    return(
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', margin: 8}}>
        <div style={{display: 'flex', flexDirection: 'column', width: 450, padding: 15, border: '1px solid black', borderRadius: 10}}>
            <div style={{width: 200}}>
            <UserDiv to={`/tourists/${props.tourist.id}`}>
                <div style={{height: 50, width: 50, borderRadius: 50/2, backgroundImage: `url(${props.tourist.picture})`, backgroundSize: 'cover', backgroundPosition: 'center'}} />
                <p style={{padding: 0, margin: 0, marginLeft: 15,}}>{props.tourist.name}</p>
            </UserDiv>
            </div>
            <div style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
               <UserDiv to={`/hotels/${props.hotel}/rooms/${props.room.id}`}>
               <p>Room Number {props.room.number}</p>
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
        <div style={{margin: 5}}>
         <Button onClick={onAccept}>Accept</Button>
         <Button onClick={onDecline}>Decline</Button>
        </div>
        </div>
    )

}


export default HotelRequest