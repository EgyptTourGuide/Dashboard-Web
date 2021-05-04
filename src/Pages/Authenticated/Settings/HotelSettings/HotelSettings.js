import React, { useEffect, useState } from 'react'
import Layout from '../../../../layout/Layout'
import { ListWithDelete } from '../../../../components/List/List'
import axios from 'axios'
import { authAxios, URL } from '../../../../api/api'
import Input from '../../../../components/Input/Input'
import Button from '../../../../components/Button/Button'


const HotelSettings = (props)=>{
    const [features, setFeatures] = useState([])
    const [feature, setFeature] = useState('')


    useEffect(()=>{
        const getFeatures = async()=>{
            try{
            let res = await axios.get(`${URL}/settings/hotels/feature`)
            setFeatures(res.data.features)
            }catch(e){
                console.log(e)
            }
           }
        
        getFeatures()

    }, [])


    const addFeature = async()=>{
        try{
        if(feature && feature.trim() !== ''){
            if(!features.includes(feature)){
              let newFeatures = [...features, feature]
              let res = await authAxios.post(`${URL}/settings/hotels/feature`, {features: newFeatures})
              if(res.status === 201)
                  setFeatures(newFeatures)
            }
        }
        }catch(e){
            console.log(e)
        }
      }

    const deleteFeature = async(f)=>{
        try{
        let temp = features.filter(t=>t !== f)
        let res = await authAxios.post(`${URL}/settings/hotels/feature`, {features: temp})
        if(res.status === 201)
            setFeatures(temp)

        }catch(e){
            console.log(e)
        }
    }


    return (
        <Layout>
            <div style={styles.container}>
          <h2 style={{alignSelf: 'flex-start', marginLeft: 120, borderBottom: '2px solid black'}}>Features:</h2>
          <div style={styles.features}>
              <div style={styles.displayfeatures}>
                   {features.length > 0 && features.map(f=><ListWithDelete value={f} key={f} onDelete={deleteFeature}/>)}
              </div>
              <div style={styles.inp}>
              <Input style={{width: 200, borderRadius: 0, borderTop: 0, borderLeft: 0, borderRight: 0}} value={feature} onChange={({target})=>setFeature(target.value)}/>
              <Button style={styles.btn} onClick={addFeature}>Add</Button>
              </div>
          </div>
          </div>
        </Layout>
    )
}

const styles = {
    
    container: {
        display: 'flex', 
        justifyContent: 'space-around', 
        alignItems: 'center', 
        marginTop: 60,
        flexDirection: 'column'
    },
    features: {
        width: 340, 
        height: 190, 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center'
    },
    displayfeatures: {
        height: 150, 
        width: 310, 
        backgroundColor: 'wheat', 
        padding: 15, 
        overflow: 'auto', 
        borderRadius: 4
    },
    inp: {
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    btn: {
        margin: 0, 
        border: 0,
        borderRadius: 1
    }

}

export default HotelSettings