import React, { useEffect, useState } from 'react'
import Layout from '../../../../layout/Layout'
import axios from 'axios'
import { URL } from '../../../../api/api'
import Card from '../../../../components/Card/Card'
import Loading from '../../../../components/Loading'

const Place = (props)=>{

    const [ place, setPlace ] = useState(null)
    const [ loading, setLoading ] = useState(true)


    useEffect(()=>{
        async function getPlace(){
            try{
            const response = await axios.get(`${URL}/places/${props.match.params.id}`)
            setPlace(response.data.place)
            }catch(e){
                console.log(e)
            }
            setLoading(false)
        }

        getPlace()
    },[props])

    if(loading){
        return(
            <Loading />
        )
    }else{
        const state = {
            id: place.id, 
            name: place.name
        }
    return(
        <Layout head={`Places / ${place !== null && `${place.name}`}`}>
            <div style={styles.cardContainer}>
                <Card to={{pathname: `/places/${place.id}/about`, state}} title='About' />
                <Card to={`${props.match.params.id}/media`} title='Media' />
                <Card to={`${place && place.id}/reviews`} title='Reviews' />
                <Card to={{pathname: `${place && place.id}/form`, state}} title='Form' />
            </div>
        </Layout>
    )
    }
}


const styles = {
    cardContainer: {
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        flexWrap: 'wrap'
   }
}


export default Place