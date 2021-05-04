import React, { useState, useEffect } from 'react'
import Layout from '../../../layout/Layout'
import axios from 'axios'
import Button from '../../../components/Button/Button'
import Card from '../../../components/Card/Card'
import { URL } from '../../../api/api'
import Loading from '../../../components/Loading'
import { getCity } from '../../../api/City'
import qs from 'qs'



const Places = (props)=>{

    const [ city, setCity ] = useState(null)
    const [ places, setPlaces ] = useState([])
    const [loading , setLoading ] = useState(true)

    useEffect(()=>{
        //If we have city id in query param
        const cityId = qs.parse(props.location.search,{ ignoreQueryPrefix: true }).city

        setLoading(true)
        //Function to request city
        async function reqCity(id){
            try{
           let city = await getCity(id)
           setCity({id: city.id, name: city.name})
            }catch(e){
                console.log(e)
                window.location.href = "/places"
            }
        }
        //Function to request places with id or without id
        async function getPlaces(id){
            try{
            let res = id ? await axios.get(`${URL}/places?city=${id}`) : await axios.get(`${URL}/places`) 
            if(res.status === 200) setPlaces(res.data.places)
            setLoading(false)
            }catch(e){
                console.log(e)
            }
        }
        //Check if we have city in location state
        if(props.location.state){
            setCity(props.location.state.city)
            getPlaces(props.location.state.city && props.location.state.city.id)
        }
        //Check if city id in query not null
        else if(cityId !== undefined){
            reqCity(cityId)
            getPlaces(cityId)

        }
        //If we reqeust places without city id
        else{
            setCity(null)
            getPlaces()
        }
    },[props])
    if(loading){
        return (<Loading />)
    }else{
        return(
            <Layout to={city ? `cities/${city.id}` : ''}  head={`${ city ? `${city.name} / Places & Activity`: 'Places'}`}>
            <div style={styles.container}>
                <Button to={{pathname: `/places/add`, state: { city }}} style={styles.btn}>Add Place</Button>
                <div style={styles.placesContainer}>
                    {places && places.map(place=><Card to={`places/${place.id}`} stars={place.rate === 0 ? -1 : place.rate} title={place.name} key={place.id} image={place.media.length > 0 ? place.media[0] : ''} />)}
                </div>
            </div>
            </Layout>
        )
    }
}


const styles = {
    btn:{
        margin: 15, 
        outline: 'none', 
        textDecoration: 'none'
    },
    container: {
        display: 'flex', 
        justifyContent: 'space-around', 
        alignItems: 'center', 
        flexDirection: 'column'
    },
    placesContainer: {
        display: 'flex', 
        flex: 1, 
        flexDirection: 'row', 
        flexFlow:'wrap', 
        margin: 0, 
        width: '100%',
        justifyContent: 'center', 
    },
}


export default Places