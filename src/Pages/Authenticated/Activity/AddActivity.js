import React, { useEffect, useState } from 'react'
import Field from '../../../components/Field/Field'
import Layout from '../../../layout/Layout'
import { URL, authAxios } from '../../../api/api'
import axios from 'axios'
import Button from '../../../components/Button/Button'


const AddActivity = (props)=>{
    
    const [description, setDescription] = useState('')
    const [tags, setTags] = useState([])
    const [tagsLoading, setTagsLoading] = useState(true)
    const [name, setName] = useState('')
    const [files, setFiles] = useState([])
    const [loading, setLoading] = useState(false)
    const [percent, setPercent] = useState(0)
    const [done, setDone] = useState(false)

    const options = {
        onUploadProgress: (event)=>{
            const { loaded, total } = event
            let percent = Math.round( (loaded * 100) / total )
            setPercent(percent)
        }
    }

    useEffect(()=>{
       async function getTags(){
           let result = await axios.get(`${URL}/settings/places/tags`)
           if(result.data.tags){
            const tags = result.data.tags.map(tag=>({value: tag, label: tag}))
            setTags(tags)
            setTagsLoading(false)
         } 
       }
       getTags()
    },[])

    const onSubmit = async()=>{
        setLoading(true)
        if(name.trim() !== '' && description.trim() !== '' && files.length > 0){
            let fd = new FormData()
            fd.append('name', name)
            fd.append('description', description)
            for(let i = 0; i < files.length; i++){
                fd.append(`media`, files[i])
            }
            try{
            let result = await authAxios.post(`${URL}/activity`, fd, options)
            if(result.status === 201){
               setName('')
               setDescription('')
               setFiles([])
               setLoading(false)
               setDone(true)
            }
            }catch(e){
                console.log(e)
                setLoading(false)
                return
            }
        }
         

    }

    return(
        <Layout head='Activities / Add'>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 60, flexDirection: 'column'}}>
            <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                <Field
                label='Name'
                type='select'
                selectPlaceholder='Name'
                selectOptions={tags}
                selectLoading={tagsLoading}
                onSelect={(obj)=> setName(obj.value)}
                selectWidth={300}
                />
            <Field   
                label="Description:"
                placeholder='Description ....'
                text
                width={300}
                height={100}
                onChange={({target})=>setDescription(target.value)}
                />
            <Field 
             label='Media:' 
             placeholder='Choose Media' 
             onChange={({target})=>setFiles(target.files)} 
             files={files}
             loading={loading}
             percent={percent}
             type='file'
             multiple
            />
            </div>
            <Button style={{marginTop: 15}} disabled={loading} onClick={onSubmit} >Submit</Button>
            {done && <p style={{color: 'darkgreen', fontSize: 12.5}}>Created!</p>}
            </div>
        </Layout>
    )
}


export default AddActivity