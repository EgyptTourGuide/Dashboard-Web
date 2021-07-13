import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { URL } from '../../../api/api'
import Card from '../../../components/Card/Card'
import Loading from '../../../components/Loading'
import Layout from "../../../layout/Layout"
import { UserDiv } from '../Hotel/Hotel/HotelRequests'

const TransportHours = (props)=>{
     
    let [hours, setHours] = useState(null)
    let [name, setName] = useState(null)
    let [loading, setLoading] = useState(true)

    useEffect(()=>{
        const getT = async()=>{
          let res = await axios.get(`${URL}/transport/${props.match.params.id}/hours`)
          let resT = await axios.get(`${URL}/transport/${props.match.params.id}`)
          setHours(res.data.history)
          setName(resT.data.transport.driverName)
          setLoading(false)
        }
        getT()
    }, [])

    if(loading) return <Layout><Loading /></Layout>
    return (
    <Layout head={`Transport / ${name} / About`} to={`/transports/${props.match.params.id}`}>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap'}}>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            {hours.map(h=><HoursCard key={h.id} tourist={h.user} plan={h.plan} from={h.from} to={h.to}/>)}
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
            <div style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
               <UserDiv to={`/plans/${props.plan.id}`}>
               <p>{props.plan.title}</p>
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


export default TransportHours