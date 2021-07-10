import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { URL } from '../../../api/api'
import Button from '../../../components/Button/Button'
import Layout from '../../../layout/Layout'
import Loading from '../../../components/Loading'
import Card from '../../../components/Card/Card'


const Plans = (props)=>{

    const [city, setCity] = useState(null)
    const [plans, setPlans] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const getInfo = async()=>{

            try{
            let result = await axios.get(`${URL}/cities/${props.match.params.id}`)
            let res = await axios.get(`${URL}/plans?city=${props.match.params.id}`)
            setCity({name: result.data.city.name, id: result.data.city.id})
            setPlans(res.data.plans)
            setLoading(false)
            }catch(e){
                console.log(e)
                setLoading(false)
            }
        }

        getInfo()
    }, [])


    if(loading) return (<Layout><Loading /></Layout>)

    return(
    <Layout to={`/cities/${props.match.params.id}`} head={`${city.name} / Plans`}>
        <div style={{
            display: 'flex', 
            justifyContent: 'space-around', 
            alignItems: 'center', 
            flexDirection: 'column'
        }}>
        <Button style={{
                 margin: 15, 
                 outline: 'none', 
                 textDecoration: 'none'
            }} to={`plans/add/`}>Add Plan</Button>
           <div style={{
                display: 'flex', 
                flex: 1, 
                flexDirection: 'row', 
                flexFlow:'wrap', 
                margin: 0, 
                width: '100%',
                justifyContent: 'center', 
           }}>
            {plans.map(plan=><Card 
            title={plan.title} 
            to={`/plans/${plan.id}`} 
            stars={plan.rate === 0 ? -1 : plan.rate} 
            image={plan.media.length > 0 && plan.media[0]} 
            />)}
         
           </div>
        </div>
    </Layout>
    )
}


export default Plans