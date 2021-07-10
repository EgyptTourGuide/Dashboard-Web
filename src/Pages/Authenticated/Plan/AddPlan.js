import axios from 'axios'
import { parse, set } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { authAxios, URL } from '../../../api/api'
import Button from '../../../components/Button/Button'
import Field from '../../../components/Field/Field'
import { ListWithDelete } from '../../../components/List/List'
import Loading from '../../../components/Loading'
import Layout from '../../../layout/Layout'


const AddPlan = (props)=>{

    const [title, setTitle] = useState('')
    const [files, setFiles] = useState([])
    const [totalTickets, setTotal] = useState({egyptian: 0, foreign: 0})
    const [description, setDescription] = useState('')
    const [duration, setDuration] = useState(null)
    const [price, setPrice] = useState('')
    const [features, setFeatures] = useState([])
    const [tour, setTour] = useState([])
    const [city, setCity] = useState(null)
    const [day, setDay] = useState(0)
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [allPlaces, setAllPlaces] = useState([])
    const [place, setPlace] = useState(null)
    const [places, setPlaces] = useState([])
    const [placesLoading, setPlacesLoading] = useState(true)
    const [loading, setLoading] = useState(false)
    const [percent, setPercent] = useState(0)
    const [msg, setMsg] = useState('')
    const [pageLoading, setPageLoading] = useState(true)

    useEffect(()=>{
        const getInfo = async()=>{
            try{
            let res = await axios.get(`${URL}/cities/${props.match.params.id}`)
            let result = await axios.get(`${URL}/places?city=${props.match.params.id}`)
            setAllPlaces(result.data.places)
            setPlaces(result.data.places.map(place=>({value: place, label: place.name})))
            setCity({name: res.data.city.name, id: res.data.city.id})
            setPlacesLoading(false)
            setPageLoading(false)
            }catch(e){
                console.log(e)
                setPageLoading(false)
            }
        }

        getInfo()
    },[])

    const getValidPlaces = (from, to)=>{
        const validHours = allPlaces.map(place=>({...place, hours: place.hours.filter(h=>(h.from <= from && h.to >= to))}))
        const validPlaces = validHours.filter(p=>(p && p.hours.length > 0))
        setPlaces(validPlaces.map(place=>({value: place, label: place.name})))
    } 

    const changeFrom = ({target})=>{
        setFrom(target.value)
        if(to.trim() !== ''){
            getValidPlaces(target.value, to)
        }
    }
    const changeTo = ({target})=>{
          setTo(target.value)
          if(from.trim() !== ''){
              getValidPlaces(from, target.value)
          }
    }

    const addTour = ()=>{
        if(duration === null) return
        if(day > duration.days) return
        if(from && to && place){
            if(!(tour.find(obj=>obj.place.id === place.value.id))){
                let egyptian = totalTickets.egyptian
                let foreign = totalTickets.foreign
                console.log(place)
                egyptian += parseInt(place.value.ticket.egyptian.price); 
                foreign += parseInt(place.value.ticket.foreign.price);
                    
            let temp = [...tour, {day, from, to, place: place.value}]
            setTotal({egyptian, foreign})
            setTour(temp)
            }else{
                console.log('same Place')
            }
        }
    }
    const deleteTour = (value)=>{
        let egyptian = totalTickets.egyptian
        let foreign = totalTickets.foreign
        console.log(value.slice(6, value.length - 20))
        let placeName = value.slice(6, value.length - 20)
        let temp = tour.filter(obj=>{
            if(obj.place.name === placeName){
                egyptian -= parseInt(obj.place.ticket.egyptian.price); 
                foreign -= parseInt(obj.place.ticket.foreign.price);
                setTotal({egyptian, foreign})
            }
            return (obj.place.name !== placeName)
        })
        setTour(temp) 
    }

    const options = {
        onUploadProgress: (event)=>{
            const { loaded, total } = event
            let percent = Math.round( (loaded * 100) / total )
            setPercent(percent)
        }
    }
    const onSubmit = async()=>{

        setLoading(true)
        let f = features.map(f=>f.value)
        let t = tour.map(a=>({from: a.from, to: a.to, day: a.day, placeId: a.place.id}))
       
        if(title.trim() === '' || description.trim() === '' || t.length === 0 || duration === null){
            setLoading(false)
            setMsg('Please Fill the empty fields')
            return
        }
       console.log(duration)

        const fd = new FormData()
            
            fd.append('title', title)
            fd.append('description', description)
            fd.append('tour', JSON.stringify(t))
            fd.append('ticket', JSON.stringify(price))
            fd.append('duration', JSON.stringify(duration))
            fd.append('cityId', props.match.params.id)
            fd.append('features', JSON.stringify(f))
            for(let i = 0; i < files.length; i++){
                fd.append(`media`, files[i])
            }
            try{
                let res = await authAxios.post(`${URL}/plans`, fd, options)
                console.log(res.status)
                setLoading(false)
                setMsg('Created')
            }catch(e){
                console.log(e)
                setLoading(false)
                setMsg('Faild')
            }
    }

    if(pageLoading) return(<Layout><Loading /></Layout>)

    return(
        <Layout head={`${city !== null ? `${city.name} / Plans / Add` : 'Plans / Add'}`} to={`/cities/${props.match.params.id}/plans`}>
            <div style={styles.container}>
            <div style={styles.form}>
                <Field 
                  label="Title"
                  placeholder="Title"
                  value={title}
                  onChange={({target})=>setTitle(target.value)}
                />
                <Field 
                  label="Description"
                  placeholder="Description"
                  width={300}
                  height={120}
                  value={description}
                  onChange={({target})=>setDescription(target.value)}
                  text
                />
                <Field 
                  label="Duration"
                  placeholder="Days"
                  secPlaceholder="Hours"
                  onChange={({target})=>setDuration({...duration, days: target.value})}
                  secOnChange={({target})=>setDuration({...duration, hours: target.value})}
                  secondInput
                  width={50}
                  secWidth={50}
                  secStyle={{marginLeft: 5}}
                />
                  {tour.length > 0 && tour.map((h)=>(
                <ListWithDelete
                    value={`Day ${h.day} ${h.place.name} from ${h.from} to ${h.to}`} 
                    key={h.place.id} 
                    onDelete={deleteTour}
                />))}
                <Field
                    label='TimeTable:'
                    dayPlaceholder='Day'      
                    selectOptions={places}
                    selectLoading={placesLoading}     
                    selected={place}  
                    onSelect={(value)=>setPlace(value)}   
                    dayOnChange={({target})=>setDay(target.value)}
                    onChange={changeFrom}
                    secOnChange={changeTo}
                    places
                    secStyle={{marginRight: 5}}
                    type='time'
                    width={100}
                    secondInput
                    secType={'time'}
                    dayWidth={50}
                    secWidth={100}
                    onAdd={addTour}
                />
                <Field disabled value={`Foregin Tickets: ${totalTickets.foreign}`}/>
                <Field disabled value={`egyptian Tickets: ${totalTickets.egyptian}`}/>
                <Field
                    label='Ticket:'
                    placeholder='Egyptian'
                    onChange={({target})=>setPrice({...price, egyptian: target.value})}
                    width={80}
                />
                <Field
                    placeholder='Foreign'
                    onChange={({target})=>setPrice({...price, foreign: target.value})}
                    width={80}
                />
                <Field 
                 label='Features'
                 selectOptions={features}
                 onSelect={(value)=>setFeatures(value)}
                 create
                 type='select'
                 selectPlaceholder={'Features'}
                 selectWidth={300}
                 selectMulti
                />
                <Field 
                    label='Media:' 
                    placeholder='Choose Media' 
                    type='file'
                    multiple
                    onChange={({target})=>setFiles(target.files)} 
                    files={files}
                    loading={loading}
                    percent={percent}
                />
                    
            </div>
            <Button onClick={onSubmit} disabled={loading}>Submit</Button>
            <p>{msg}</p>
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

export default AddPlan