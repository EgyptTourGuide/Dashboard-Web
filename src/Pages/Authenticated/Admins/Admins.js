import React, { useState, useEffect, useContext } from 'react'
import Layout from '../../../layout/Layout'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { URL, authAxios } from '../../../api/api'
import { AuthContext } from '../../../AuthProvider'
import Button from '../../../components/Button/Button'

const Admins = (props)=>{

    const [ admins, setAdmins ] = useState([])

    useEffect(()=>{
       async function getAdmins(){
           try{
           const res = await authAxios(`${URL}/admin`)
           console.log(res.data)
           setAdmins(res.data.admins)
           }catch(e){
               console.log(e)
           }
       }

       getAdmins()


    }, [])


    return(
        <Layout head='Settings / Admins'>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: 30}}>
                <Button>Add Admin</Button>
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: 15}}>
                { admins.length > 0 && admins.map(admin=><Admin 
                id={admin.id} 
                key={admin.id}
                image={admin.picture} 
                name={admin.fullname} 
                stars={admin.rate} 
                />) }
            </div>
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





const Admin = (props)=>{
   
    const data = useContext(AuthContext)

    return (
        <Container to={props.id === data.user.id ? '/profile' : `/admin/${props.id}`}>
            <ProfileImage image={props.image} />
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                <p style={{margin: 0, padding: 0, color: 'black'}}>{props.name}</p>
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



export default Admins