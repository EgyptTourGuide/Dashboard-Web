import React from 'react'
import Button from '../../../components/Button/Button'
import Layout from '../../../layout/Layout'


const Plans = (props)=>{

    return(
    <Layout to={`/cities/${props.match.params.id}`} head='Plans'>
        <div style={{
            display: 'flex', 
            flex: 1, 
            justifyContent: 'center', 
            flexDirection: 'row', 
            flexFlow:'wrap', 
            margin: 0, 
            width: '100%'
        }}>
        <Button style={{
                 margin: 15, 
                 outline: 'none', 
                 textDecoration: 'none'
            }} to={`plans/add/`}>Add Plan</Button>
           <div>

         
           </div>
        </div>
    </Layout>
    )
}


export default Plans