import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { URL } from '../../../api/api'
import Card from '../../../components/Card/Card'
import Loading from '../../../components/Loading'
import Layout from "../../../layout/Layout"

const Plan = (props)=>{

    const [plan, setPlan] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const getInfo = async()=>{
            let res = await axios.get(`${URL}/plans/${props.match.params.id}`)
            console.log(res.data)
            setPlan(res.data.plan)
            setLoading(false)
        }

        getInfo()
    }, [])


    if(loading) return <Layout><Loading /></Layout>
    return (
    <Layout head={`Plan / ${plan.title}`}>
      <div style={{
           display: 'flex', 
           flexDirection: 'row', 
           justifyContent: 'center', 
           alignItems: 'center', 
           flexWrap: 'wrap'
      }}>
          <Card title='About' />
          <Card title='Media' to={`/plans/${props.match.params.id}/media`}/>
          <Card title='Tourist Plans'/>
          <Card title='Form' to={`/plans/${props.match.params.id}/form`}/>
          <Card title='Reviews'/>
      </div>
    </Layout>
    
    )
}

export default Plan