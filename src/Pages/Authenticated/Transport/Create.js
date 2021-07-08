import React, {useState, useEffect} from 'react'
import Layout from '../../../layout/Layout'
import Field from '../../../components/Field/Field'
import Button from '../../../components/Button/Button'
import axios from 'axios'
import { authAxios, URL } from '../../../api/api'
import Loading from '../../../components/Loading'
const AddTransport = (props)=>{
    const [type, setType] = useState('')
    const [city, setCity] = useState(null)
    const [driverName, setDriverName] = useState('')
    const [seats, setSeats] = useState('')
    const [phone, setPhone] = useState('')
    const [files, setFiles] = useState([])
    const [loading, setLoading] = useState(false)
    const [PageLoading, setLoadingPage] = useState(true)
    const [percent, setPercent] = useState(0)
    const [msg, setMsg] = useState('')

    const options = {
      onUploadProgress: (event)=>{
          const { loaded, total } = event
          let percent = Math.round( (loaded * 100) / total )
          setPercent(percent)
      }
     }

    useEffect(()=>{
      let getInfo = async()=>{
        let result = await axios.get(`${URL}/cities/${props.match.params.id}`)
        if(result.status === 200){
            setCity({name: result.data.city.name, id: result.data.city.id})
        }
        setLoadingPage(false)
     }

     getInfo()

    },[])

    const onSubmit = async()=>{
         setLoading(true)
        //Validating info
        if(seats.trim() === '' || phone.trim() === '' || driverName.trim() === '' || type.trim() === ''){
          setLoading(false)
          return
        }
      const fd = new FormData()
      fd.append('driverName', driverName)
      fd.append('seats', seats)
      fd.append('type', type)
      fd.append('cityId', city)
      fd.append('phone', phone)
      for(let i = 0; i < files.length; i++){
        fd.append('media', files[i])
      }
      try{
      let res = await authAxios.post(`${URL}/transport`, fd, options)
      if(res.status === 201){
        setMsg("Created!")
        setLoading(false)
        setDriverName('')
        setPhone('')
        setType('')
        setSeats('')
      }
      }catch(e){
        console.log(e)
        setLoading(false)
      }
    }
    if(PageLoading)return <Layout><Loading /></Layout> 

    return(
        <Layout to={`/cities/${props.match.params.id}/transports`} head={`${city.name} / Transports / Create`}>
            <div style={styles.container}>
            <div style={styles.form}>
                <Field 
                  label='Driver Name:'
                  placeholder='Name'
                  onChange={({target})=>setDriverName(target.value)}
                  value={driverName}
                />
                <Field 
                  label='Driver Phone:'
                  placeholder='Phone'
                  width={100}
                  onChange={({target})=>setPhone(target.value)}
                  value={phone}
                />
                <Field 
                  label='Type:'
                  placeholder='Type'
                  width={100}
                  onChange={({target})=>setType(target.value)}
                  value={type}
                />
                <Field 
                  label='Seats:'
                  placeholder='Seats'
                  width={50}
                  value={seats}
                  onChange={({target})=>setSeats(target.value)}
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
                <Button style={{alignSelf: 'center', marginTop: 50}}  disabled={loading} onClick={onSubmit}>Submit</Button>
                {msg && <p style={{fontSize: 13,alignSelf: 'center'}}>{msg}</p>}
            </div>
            </div>
        </Layout>
    )
}


const styles = {
    form: {
        marginTop: 60,
        display: 'flex',
        flexDirection: 'column',
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        flexDirection: 'column'
     },
}

export default AddTransport