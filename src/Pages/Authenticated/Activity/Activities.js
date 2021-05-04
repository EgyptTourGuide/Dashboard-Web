import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { URL } from '../../../api/api'
import Card from '../../../components/Card/Card'
import Loading from '../../../components/Loading'
import Layout from '../../../layout/Layout'
import Button from '../../../components/Button/Button'


const Activities = (props)=>{
    
    const [activities, setActivities] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
         
        async function getActivities(){
           try{
           const result = await axios.get(`${URL}/activity`)
           setActivities(result.data)
           }catch(e){
               console.log(e)
               setLoading(false)
           }
           setLoading(false)
        }

       getActivities()
    }, [])
    if(loading) return <Layout><Loading /></Layout>
    else
    return(
        <Layout head='Activities'>
         <div style={{display: 'flex', margin: 15, justifyContent: 'center', alignItems: 'center'}}>
             <Button to='/activities/add'>Add Activity</Button>
             </div>
             <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap'}}>
             {activities.length > 0 && activities.map(activity=><Card to={`/activities/${activity.id}`} title={activity.name} key={activity.id} image={activity.media[0]} />)}
         </div>
        </Layout>
    )
}

export default Activities
