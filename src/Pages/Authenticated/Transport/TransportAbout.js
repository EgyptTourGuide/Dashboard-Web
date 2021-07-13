import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { URL } from '../../../api/api'
import Card from '../../../components/Card/Card'
import Loading from '../../../components/Loading'
import Layout from "../../../layout/Layout"

const TransportAbout = (props)=>{
     
    let [transport, setTransport] = useState(null)
    let [loading, setLoading] = useState(true)

    useEffect(()=>{
        const getT = async()=>{
          let res = await axios.get(`${URL}/transport/${props.match.params.id}`)
          setTransport(res.data.transport)
          setLoading(false)
        }
        getT()
    }, [])

    if(loading) return <Layout><Loading /></Layout>
    return (
    <Layout head={`Transport / ${transport.driverName} / About`} to={`/transports/${props.match.params.id}`}>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap'}}>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
          <p>Name: {transport.driverName}</p>
          <p>Phone: {transport.phone}</p>
          <p>Seats: {transport.seats}</p>
          <p>Type: {transport.type}</p>
          </div>
      </div>
    </Layout>
    
    )
}

export default TransportAbout