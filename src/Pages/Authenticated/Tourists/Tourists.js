import React, { useState, useEffect } from 'react'
import Layout from '../../../layout/Layout'
import styled from 'styled-components'
import ReactStars from 'react-stars'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { URL, authAxios } from '../../../api/api'

const Tourists = (props)=>{

    const [ tourists, setTourists ] = useState([])

    useEffect(()=>{
       async function getTourists(){
           try{
           const res = await authAxios(`${URL}/tourists/`)
           console.log(res.data)
           setTourists(res.data.tourists)
           }catch(e){
               console.log(e)
           }
       }

       getTourists()


    }, [])


    return(
        <Layout head='Tourists'>
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: 15}}>
                { tourists.length > 0 && tourists.map(tourist=><Tourist 
                id={tourist.id} 
                key={tourist.id}
                image={tourist.picture} 
                name={tourist.fullname} 
                stars={tourist.rate} 
                />) }
            </div>
        </Layout>
    )

}


const ProfileImage = styled.div`
    background: ${props=>props.image ? `url(${props.image})` : 'rgba(0,0,0,0.4)'}; 
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    outline: none;
    cursor: pointer;
    text-decoration: none;
    width: 100px;
    height: 100px;
    border-radius: 50px;
`

const Container = styled(Link)`
    display: flex;
    box-shadow: 2px 2px 6px -6px black;
    outline: none;
    cursor: pointer;
    text-decoration: none;
    justify-content: center;
    align-items: center; 
    flex-direction: column; 
    padding: 20px;
    &:hover{
        background-color: rgba(0,0,0,0.1);
    }
    transition: background ease 0.2s;

`





const Tourist = (props)=>{


    return (
        <Container to={`/tourists/${props.id}`}>
            <ProfileImage image={props.image} />
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                <p style={{margin: 0, padding: 0, color: 'black'}}>{props.name}</p>
                <ReactStars
                    count={5}
                    onChange={(e)=>console.log(e)}
                    edit={false}
                    value={-1}
                    size={24}
                    color2={'#ffd700'} 
                />
            </div>
        </Container>
    )
}


const styles = {
      container: {
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          flexDirection: 'column', 
          margin: 20
        }
} 



export default Tourists