import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { URL } from '../../../api/api'
import Button from '../../../components/Button/Button'
import Card from '../../../components/Card/Card'
import Loading from '../../../components/Loading'
import Layout from '../../../layout/Layout'

const Transports = (props)=>{

    const [city, setCity] = useState(null)
    const [loading, setLoading] = useState(true)
    const [transports, setTransports] = useState([])

    useEffect(()=>{
        let getInfo = async()=>{
           let result = await axios.get(`${URL}/cities/${props.match.params.id}`)
           let res = await axios.get(`${URL}/transport?city=${props.match.params.id}`)
           if(result.status === 200){
               setCity({name: result.data.city.name, id: result.data.city.id})
           }
           if(res.status === 200)
             setTransports(res.data.transports)
           setLoading(false)
        }

        getInfo()
    },[])
 

    if(loading)return <Layout><Loading /></Layout> 

    return(
        <Layout to={`/cities/${props.match.params.id}`} head={city !== null && `${city.name} / Transports`}>
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-around', 
                alignItems: 'center', 
                flexDirection: 'column'}}
            >
            <Button to={`transports/add/`} style={{
                margin: 15, 
                outline: 'none', 
                textDecoration: 'none'
            }}>Add</Button>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap'}}>
                {transports.length > 0 && transports.map(transport=><Card to={`/transports/${transport.id}`}  title={transport.driver} key={transport.id} image={transport.media.length > 0 && transport.media[0]} />)}
            </div>
        </Layout>
    )
}

export default Transports