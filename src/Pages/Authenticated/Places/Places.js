import React, { useState, useEffect } from 'react'
import Layout from '../../../layout/Layout'
import axios from 'axios'
import Button from '../../../components/Button/Button'
import Card from '../../../components/Card/Card'
import Loading from '../../../components/Loading'
import { getCity } from '../../../api/City'
import qs from 'qs'



const Places = (props)=>{

    const [ city, setCity ] = useState(null)
    const [ places, setPlaces ] = useState([])
    const [loading , setLoading ] = useState(true)

    useEffect(()=>{

        async function reqCity(id){
           let city = await getCity(id)

           setCity({ _id: city._id, name: city.generalId.name})
           console.log(city)
           setLoading(false)
        }

        if(props.location.state){
            setCity(props.location.state.city)
            setLoading(false)
        }else{
            const cityId = qs.parse(props.location.search,{ ignoreQueryPrefix: true }).city

            if(cityId !== undefined){
                reqCity(cityId)
            }else{
                console.log("No City")
                setLoading(false)
            }
        }
    },[])
    if(loading){
        return (<Loading />)
    }else{
        return(
            <Layout to={city ? `cities/${city._id}` : ''}  head={`${ city ? `${city.name} / Places & Activity`: ""}`}>
            <div style={styles.container}>
                <Button to={{pathname: `/places/add`, state: { city }}} style={styles.btn}>Add Place</Button>
                <div>
                    
                </div>
            </div>
            </Layout>
        )
    }
}


const styles = {
    btn:{
        margin: 30, 
        outline: 'none', 
        textDecoration: 'none'
    },
    container: {
        display: 'flex', 
        justifyContent: 'space-around', 
        alignItems: 'center', 
        flexDirection: 'column'
    }
}


export default Places