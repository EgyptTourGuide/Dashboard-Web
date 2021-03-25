import React, { useState } from 'react'
import Layout from '../../../../layout/Layout'
import Field from '../../../../components/Field/Field'
import axios from 'axios'
import { URL } from '../../../../api/api'
import Loading from '../../../../components/Loading'
import Button from '../../../../components/Button/Button'



const About = (props)=>{
     
    const [ info, setInfo ] = useState(null)
    const [ loading, setLoading ] = useState(true)
    const [ saving, setSaving ] = useState(false)
    const [ Msg, setMsg ] = useState('')
    
    React.useEffect(()=>{
        if(props.location.state){
            const { name, description, location } = props.location.state.city
            setInfo({name, description, long: location.coordinates[0], lat: location.coordinates[1]})
            setLoading(false)
        }else{
            async function getInfo(){
                try{
                    let res = await axios.get(`${URL}/cities/${props.match.params.id}`)
                    const { name, description, location } = res.data.city.generalId
                    setInfo({name, description, long: location.coordinates[0], lat: location.coordinates[1]})
                }catch(e){
                    console.log(e)
                }
                setLoading(false)
                return
            }
            getInfo()
        }
    }, [props])
    

    const deleteCity= async()=>{
       try{
            let res = await axios.delete(`${URL}/cities/${props.match.params.id}`)
            if(res.status === 200)
                props.history.replace('/cities')
       }catch(e){
           console.log(e)
       }
    }

    const save = async()=>{
        setSaving(true)
        try{
        let res = await axios.put(`${URL}/cities/${props.match.params.id}/about`, info)
        console.log(res)
        if(res.status === 200){
            setSaving(false)
            setMsg('Saved!')
        }else{
            setMsg(res.data.errors[0])
            setSaving(false)
        }
        }catch(err){
            console.log(err.response.data.errors)
            setMsg(err.response.data.errors[0])
            setSaving(false)
        }
        
    }
    
    if(loading) return <Loading />
    else   
    return(
        <Layout to={{pathname: `/cities/${props.match.params.id}`}} head={`${info.name} / about`} del={deleteCity}>
        <div style={styles.container}>
        <div style={{
                marginTop: 60,
                display: 'flex',
                flexDirection: 'column',
        }}>
         <Field 
            label='Name:' 
            placeholder='City Name' 
            value={info.name}
            icon={'IoDocumentTextOutline'} 
            onChange={({target})=>setInfo(prevState=>({...prevState, name: target.value}))}
        />
        <Field 
            label='Description:' 
            placeholder='About city...' 
            value={info.description}
            text 
            width={380} 
            height={130} 
            onChange={({target})=>setInfo(prevState=>({...prevState, description: target.value}))}

        />
        <Field 
            label='Location:' 
            placeholder='Long' 
            value={info.long}
            onChange={({target})=>setInfo(prevState=>({...prevState, long: target.value}))}
            secOnChange={({target})=>setInfo(prevState=>({...prevState, lat: target.value}))}
            width={80}  
            secondInput={true}
            secPlaceholder='Lat'
            secWidth={80}
            secStyle={{marginLeft: 5}}
            secValue={info.lat}
        />
        <Button style={{alignSelf: 'center', margin: 20}} disabled={saving} onClick={save}>{saving ? 'Saveing' : 'Save'}</Button>
         {Msg && <p style={{alignSelf: 'center'}}>{Msg}</p>}
        </div>
        </div>
        </Layout>
    )
}




const styles = {
     container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
     }
 }


 export default About