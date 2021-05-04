import React, { useEffect } from 'react'
import Card from '../../../components/Card/Card'
import Layout from '../../../layout/Layout'


const Hotel = (props)=>{

    useEffect(()=>{
        console.log(props)
    }, [])


    return(
        <Layout to='/hotels' head='Hotels / Hotel Name'>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap'}}>
               <Card title='About' />
               <Card title='Media' />
               <Card title='Requests' />
               <Card title= 'Rooms' />
               <Card title= 'Form' />
               <Card title= 'Reviews' />
            </div>
        </Layout>
    )
}

export default Hotel