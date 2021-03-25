import React, { useEffect, useState } from 'react'
import Layout from '../../../../layout/Layout'
import axios from 'axios'
import { URL } from '../../../../api/api'
import Input from '../../../../components/Input/Input'
import Button from '../../../../components/Button/Button'
import { ListWithDelete } from '../../../../components/List/List'

const PlaceSettings = (props)=>{
    
    const [ tags, setTags ] = useState([])
    const [ tag, setTag ] = useState('')

    const getTags = async()=>{
     try{
     let res = await axios.get(`${URL}/settings/places/tags`)
     setTags(res.data.tags)
     }catch(e){
         console.log(e)
     }
    }
   
    const addTag = async()=>{
      try{
      if(tag && tag.trim() !== ''){
          if(!tags.includes(tag)){
            let newTags = [...tags, tag]
            let res = await axios.post(`${URL}/settings/places/tags`, {tags: newTags})
            if(res.status === 201)
                setTags(newTags)
          }
      }
      }catch(e){
          console.log(e)
      }
    }


    const deleteTag = async(tag)=>{
        try{
        let temp = tags.filter(t=>t !== tag)
        let res = await axios.post(`${URL}/settings/places/tags`, {tags: temp})
        if(res.status === 201)
            setTags(temp)

        }catch(e){
            console.log(e)
        }
    }

    useEffect(()=>{
      getTags()
      console.log(tags)


    },[])


    return (
    <Layout>
      <div style={styles.container}>
          <h2 style={{alignSelf: 'flex-start', marginLeft: 120}}>Tags:</h2>
          <div style={styles.tags}>
              <div style={styles.displayTags}>
                   {tags.map(tag=><ListWithDelete value={tag} key={tag} onDelete={deleteTag}/>)}
              </div>
              <div style={styles.inp}>
              <Input style={{width: 200}} value={tag} onChange={({target})=>setTag(target.value)}/>
              <Button style={styles.btn} onClick={addTag}>Add</Button>
              </div>
          </div>
      </div>
    </Layout>
)}


const styles = {
    
    container: {
        display: 'flex', 
        justifyContent: 'space-around', 
        alignItems: 'center', 
        marginTop: 60,
        flexDirection: 'column'
    },
    tags: {
        width: 340, 
        height: 190, 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center'
    },
    displayTags: {
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
        border: 0
    }

}

export default PlaceSettings