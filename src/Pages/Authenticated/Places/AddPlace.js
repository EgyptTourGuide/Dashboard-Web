import React from 'react'
import Layout from '../../../layout/Layout'
import Field from '../../../components/Field/Field'
import { ListWithDelete } from '../../../components/List/List'
import { authAxios, URL } from '../../../api/api'
import axios from 'axios'
import Button from '../../../components/Button/Button'

const currency = [{label: 'USD', value: 'usd'}, {label: 'EGP', value: 'egp'}]



export default class AddPlace extends React.Component{
    
     state = {
        name: '',
        description: '',
        long: '',
        lat: '',
        cities: [],
        city: null,
        files: [],
        citiesLoading: true,
        tagsLoading: true,
        hours: [],
        day: '',
        from: '',
        to: '',
        tags: [],
        errors: [],
        ticket: {
            egyptian: {
                price: '',
                currency: ''
            },
            foreign: {
                price: '',
                currency: ''
            },
        },
        success: '',
        placeTags: [],
        submitDisable: false,
        isAvailable: null,
        percent: null,
        loading: false,
        requirements: [],
        placeRequirements: [],
        requirementsLoading: true,

     }

     getCitiesAndTags = async()=>{
         try{
         let citiesRes = await axios.get(`${URL}/cities`)
         let tagsRes = await axios.get(`${URL}/settings/places/tags`)
         let requirementsRes = await axios.get(`${URL}/settings/places/requirements`)
         const cities = citiesRes.data.cities.map((city)=>({value: city.id, label: city.name}))
         const tags = tagsRes.data.tags.map(tag=>({value: tag, label: tag}))
         const requirements = requirementsRes.data.requirements.map(tag=>({value: tag, label: tag}))
         this.setState({cities, citiesLoading: false, tags, tagsLoading: false, requirements, requirementsLoading: false})
         }catch(e){
             console.log(e)
             return []
         }
     }

     componentDidMount(){
        if(this.props.location.state)
            this.setState({city: this.props.location.state.city})
         
        this.getCitiesAndTags()
     }

     options = {
        onUploadProgress: (event)=>{
            const { loaded, total } = event
            let percent = Math.round( (loaded * 100) / total )
            this.setState({percent})
        }
    }

     validate = ()=>{
        const { city, name, description, ticket, hours, isAvailable, long, lat, files } = this.state
        if(this.state.errors.length === 0){
            if(city === null) this.setState(prevState=> ({errors: [...prevState.errors, "City is Required"]}))
            if(!(name && name.trim() !== '')) this.setState(prevState=>({errors: [...prevState.errors, "Place name is Required"]}))
            if(!(description && description.trim() !== '')) this.setState(prevState=>({errors: [...prevState.errors, "Description is Required"]}))
            if(ticket.egyptian.currency === '' || ticket.egyptian.price === '' || 
            ticket.foreign.price === '' || ticket.foreign.currency === '') this.setState(prevState=>({errors: [...prevState.errors, "Ticket is Required"]}))
            if(!(hours.length > 0)) this.setState(prevState=>({errors: [...prevState.errors, "Select at least one opening Hours"]}))
            if(isAvailable === null) this.setState(prevState=>({errors: [...prevState.errors, "Select Availability state"]}))
            if(!((long && long.trim() !== '') && (lat && lat.trim() !== ''))) this.setState(prevState=>({errors: [...prevState.errors, "Location is Required"]}))
            if(!(files.length > 0)) this.setState(prevState=>({errors: [...prevState.errors, "Select at least one media file"]}))
        }
        return
     }

    addHours = ()=>{
        const { from, to, day, hours } = this.state
        if(from && to && day){
            if(!(hours.find(obj=>obj.day === day))){
            let temp = [...hours, {day, from, to}]
            this.setState({hours: temp})
            }else{
                console.log('same Day')
            }
        }
    }
    deleteHours = (value)=>{
        const { hours } = this.state
        let day = value.split(' ')[0]
        let temp = hours.filter(obj=>obj.day !== day)
        this.setState({hours: temp})
    }
    
    onSubmit = async()=>{
        
        this.setState(prevState=> ({submitDisable: !prevState.submitDisable}))
        await this.validate()
     
        if(this.state.errors.length > 0){
            this.setState(prevState=> ({submitDisable: !prevState.submitDisable}))
        }else{
            const { name, description, hours, long, lat, files, ticket, isAvailable, city, placeTags } = this.state
            //Do your request here
            const fd = new FormData()
            
            fd.append('name', name)
            fd.append('description', description)
            fd.append('hours', JSON.stringify(hours))
            fd.append('long', long)
            fd.append('lat', lat)
            fd.append('ticket', JSON.stringify(ticket))
            fd.append('isAvailable', isAvailable)
            fd.append('cityId', city.id)
            fd.append('requirements', JSON.stringify(this.state.placeRequirements))
            fd.append('tags', JSON.stringify(placeTags))
            for(let i = 0; i < files.length; i++){
                fd.append(`media`, this.state.files[i])
            }

            try{
                this.setState({loading: true})
                let res = await authAxios.post(`${URL}/places/`, fd ,this.options)
                if(res.status === 201) this.setState({success: 'Place Created!'})
                this.setState(prevState=>({loading: false, submitDisable: false, 
                    name: '', long: '', lat: '', description: '', 
                    hours: [], ticket: { egyptian: { price: '', currency: '' }, foreign: {price: '', currency: ''} }, isAvailable: null, 
                    files: [], day: '', from: '', to: '', placeTags: []}))
            }catch(e){
                this.setState({loading: false, submitDisable: false})
            }
        }

    }

    render(){

        const { city, cities, name, description, 
                citiesLoading, tags, tagsLoading, files, ticket, hours,
                errors, success, submitDisable
                } = this.state

    return(
        <Layout head={`${city ? `${city.name} / Places & Activity / Add` : '' }`}>
            <div style={styles.container}>
            <div style={styles.form}>
            <Field
             label='City:'
             selectPlaceholder='City'
             type="select"
             selectOptions={cities}
             selectLoading={citiesLoading}
             onSelect={(obj)=>this.setState({errors: [], city: { name: obj.label, id: obj.value }})}
             selected={city && {label: city.name, value: city.id}}
            />
            <Field
             label='Name:'
             placeholder='Title'
             value={name}
             onChange={({target})=>this.setState({errors: [], name: target.value})}
            />
            <Field 
             label="Description"
             placeholder="About this place.."
             text
             width={300}
             height={100}
             value={description}
             onChange={({target})=>this.setState({errors: [], description: target.value})}
            />
            <Field
             label='Ticket:'
             placeholder='Egyptian'
             selectPlaceholder='Currency'
             selectOptions={currency}
             onChange={({target})=>this.setState({errors: [], ticket: {...ticket, egyptian: {...ticket.egyptian, price: target.value}}})}
             onSelect={(obj)=>this.setState({errors: [], ticket: {...ticket, egyptian: {...ticket.egyptian, currency: obj.value}}})}
             selectWidth={110}
             width={80}
            />
            <Field
             placeholder='Foreign'
             selectPlaceholder='Currency'
             selectOptions={currency}
             onChange={({target})=>this.setState({errors: [], ticket: {...ticket, foreign: { ...ticket.foreign, price: target.value}}})}
             selectWidth={110}
             onSelect={(obj)=>this.setState({errors: [], ticket: {...ticket, foreign: {...ticket.foreign, currency: obj.value}}})}
             width={80}

            />
            <Field
             label='Tags'
             type='select'
             selectPlaceholder='Tags'
             selectOptions={tags}
             selectLoading={tagsLoading}
             onSelect={(obj)=> this.setState({errors: [], placeTags: obj.map(i=>i.value)})}
             selectMulti
             selectWidth={300}
            />
            <Field
             label='Requirements'
             type='select'
             selectPlaceholder='Requirements'
             selectOptions={this.state.requirements}
             selectLoading={this.state.requirementsLoading}
             onSelect={(obj)=> this.setState({errors: [], placeRequirements: obj.map(i=>i.value)})}
             selectMulti
             selectWidth={300}
            />
             {hours.length > 0 && hours.map((h)=>(
             <ListWithDelete 
                value={`${h.day} from ${h.from} to ${h.to}`} 
                key={h.day} 
                onDelete={this.deleteHours}
            />))}
            <Field
             label='Opens At:'
             placeholder='Foreign'
             type='time'
             value={this.state.from}
             onChange={({target})=>this.setState({errors: [], from: target.value})}
             secOnChange={({target})=>this.setState({errors: [], to: target.value})}
             secValue={this.state.to}
             width={100}
             secondInput
             onSelect={(obj)=>this.setState({errors: [], day: obj.value})}
             onAdd={this.addHours}
             secType={'time'}
             secWidth={100}
            />
            <Field
             label='State:'
             type='select'
             selectPlaceholder='State'
             onSelect={(obj)=>this.setState({errors: [], isAvailable: obj.value})}
             selectOptions={[{label: 'Available', value: true},{label: 'Not Available', value: false}]} 
            />
            <Field 
             label='Location:' 
             placeholder='Long' 
             width={80}  
             onChange={({target})=>this.setState({errors: [], long: target.value})}
             secondInput={true}
             secPlaceholder='Lat'
             secOnChange={({target})=>this.setState({errors: [], lat: target.value})}
             secWidth={80}
             secStyle={{marginLeft: 5}}
            
            />
            <Field 
             label='Media:' 
             placeholder='Choose Media' 
             onChange={({target})=>this.setState({errors: [], files: target.files})} 
             files={files}
             loading={this.state.loading}
             percent={this.state.percent}
             type='file'
             multiple
            />
            </div>
            {errors.length > 0 && errors.map(e=><p key={e} style={styles.errors}>*{e}</p>)}
            {success && <p style={styles.success}>{success}</p>}
            <Button style={styles.btn} disabled={submitDisable} onClick={this.onSubmit}>Submit</Button>
            </div>
        </Layout>
    )
    }
}


const styles = {
    form: {
        marginTop: 60,
        display: 'flex',
        flexDirection: 'column'
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        flexDirection: 'column'
     },
    btn: {
        marginTop: 15, 
        marginBottom: 70
    },
    success: {
        fontSize: 13, 
        color: 'darkgreen', 
        margin: 0
    },
    errors: {
        fontSize: 13, 
        color: 'darkred', 
        margin: 0
    }
}