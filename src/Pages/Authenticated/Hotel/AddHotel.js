import React from 'react'
import Field from '../../../components/Field/Field'
import Layout from '../../../layout/Layout'
import { URL, authAxios } from '../../../api/api'
import axios from 'axios'
import Button from '../../../components/Button/Button'

export default class AddHotel extends React.Component{
   
    constructor(props){
        super(props)
        this.roomRef = React.createRef()
    }

    state = {
        name: '',
        long: '',
        lat: '',
        description: '',
        stars: '',
        files: '',
        cities: [],
        citiesLoading: true,
        errors: [],
        city: null,
        features: [],
        featuresLoading: true,
        hotelFeatures: [],
        roomLength: 0,
        currentRoom: -1,
        rooms: [],
        roomBed: '',
        roomPrice: '',
        roomFood: '',
        roomFeatures: [],
        isAvailable: null,
        loading: false,
        percent: 0

    }
    getCitiesAndFeatures = async()=>{
        try{
        let citiesRes = await axios.get(`${URL}/cities`)
        if(citiesRes.data.cities){
           const cities = citiesRes.data.cities.map((city)=>({value: city.id, label: city.name}))
           this.setState({cities, citiesLoading: false})
        } 
        let feaRes = await axios.get(`${URL}/settings/hotels/feature`)
        if(feaRes.data.features){
            console.log(feaRes.data.features)
           const features = feaRes.data.features.map((f)=>({value: f, label: f}))
           console.log(features)
           this.setState({features, featuresLoading: false})
        } 
        }catch(e){
            console.log(e)
            this.setState({cities: [], citiesLoading: false, featuresLoading: false, features: []})
            return
        }
    }

    options = {
        onUploadProgress: (event)=>{
            const { loaded, total } = event
            let percent = Math.round( (loaded * 100) / total )
            this.setState({percent})
        }
    }

    componentDidMount(){
        this.getCitiesAndFeatures()
    }

    validate = async()=>{
        if(this.state.errors.length === 0){
            let { name, description, long, lat, rooms, city, isAvailable, stars} = this.state
            if(name.trim() === '') this.setState(prevState=>({errors: [...prevState.errors, 'Hotel Name is Required']}))
            if(stars.trim() === '') this.setState(prevState=>({errors: [...prevState.errors, 'Hotel Stars is Required']}))
            if(description.trim() === '') this.setState(prevState=>({errors: [...prevState.errors, 'Hotel description is Required']}))
            if(long.trim() === '') this.setState(prevState=>({errors: [...prevState.errors, 'Hotel long is Required']}))
            if(lat.trim() === '') this.setState(prevState=>({errors: [...prevState.errors, 'Hotel lat is Required']}))
            if(!rooms.length > 0) this.setState(prevState=>({errors: [...prevState.errors, 'Hotel Rooms is Required']}))
            if(isAvailable === null) this.setState(prevState=>({errors: [...prevState.errors, 'Hotel Status is Required']}))
            if(city === null) this.setState(prevState=>({errors: [...prevState.errors, 'City is Required']}))    
        }

        return
    } 


    save = async()=>{
        await this.validate()
        if(this.state.errors.length > 0){
            this.setState({loading: false})
            return
        } 
        else{
            let { name, description, long, lat, rooms, city, isAvailable, hotelFeatures, files, stars } = this.state
            const fd = new FormData()
            console.log(JSON.stringify(rooms))
            fd.append('name', name)
            fd.append('description', description)
            fd.append('features', hotelFeatures)
            fd.append('stars', stars)
            fd.append('long', long)
            fd.append('lat', lat)
            fd.append('rooms', JSON.stringify(rooms))
            fd.append('isAvailable', isAvailable)
            fd.append('cityId', city.id)
            for(let i = 0; i < files.length; i++){
                fd.append(`media`, this.state.files[i])
            }
            try{
                this.setState({loading: true, currentRoom: -1})
                let res = await authAxios.post(`${URL}/hotels/`, fd ,this.options)
                if(res.status === 201) this.setState({success: 'Hotel Created!'})
                this.setState(prevState=>({loading: false, name: '', long: '', lat: '', description: '', isAvailable: null, 
                    files: [], rooms: []}))
            }catch(e){
                console.log(e)
                this.setState({loading: false, errors: ['Error!']})
            }

        }

    }

    next = ()=>{
        let { currentRoom, roomLength } = this.state
        if(!isNaN(roomLength) && roomLength > 0 && roomLength < 40 ){
            if(currentRoom < roomLength){
                if(currentRoom >= 0){
                    let { rooms, roomFeatures, roomPrice, roomBed, roomFood } = this.state
                    if(roomBed !== '' && roomPrice !== '' && roomFood){
                    let newRoom = {
                        bed: rooms[currentRoom] && rooms[currentRoom].bed ? rooms[currentRoom].bed : roomBed,
                        price: rooms[currentRoom] && rooms[currentRoom].price ? rooms[currentRoom].price : roomPrice,
                        food: rooms[currentRoom] && rooms[currentRoom].food ? rooms[currentRoom].food : roomFood,
                        number: currentRoom + 1
                    }
                    rooms[currentRoom] = newRoom
                    this.setState({rooms})
                 }else return
                }
                if(currentRoom === -1) this.roomRef.current.scrollIntoView()
                this.setState(prevState=>({currentRoom: prevState.currentRoom + 1}))
            }else{
                this.save()
                console.log('Done!')
                this.setState({currentRoom: -1, loading: true})
            }
        }else{
            this.setState({errors: ['How many rooms do you want to add?']})
            console.log('invalid room length')
        }
    }

    prev = ()=>this.setState(prevState=>({currentRoom: prevState.currentRoom - 1}))
    

    render(){

        let { cities, city, citiesLoading, features, featuresLoading, files, currentRoom, rooms, roomLength } = this.state
        return(
            <Layout head='Hotels / Add'>
            <div style={styles.container} ref={this.roomRef}>
                <div style={styles.form}>
                {currentRoom >= 0 ? <> { currentRoom < roomLength ? <div>
                    <h1 style={{textAlign: 'center'}}>Room {currentRoom + 1}</h1>
                        <Field 
                        label="Bed"
                        placeholder='0'
                        value={rooms[currentRoom] && rooms[currentRoom].bed ? rooms[currentRoom].bed : this.state.roomBed}
                        onChange={({target})=>{
                            if(rooms[currentRoom] && rooms[currentRoom].bed !== undefined){
                                let newRooms = rooms
                                newRooms[currentRoom].bed = target.value
                                this.setState({rooms: newRooms})
                            }else{
                                this.setState({roomBed: target.value})
                            }
                        }}
                        width={40}
                        />
                        <Field 
                        label="Food"
                        placeholder='0'
                        value={rooms[currentRoom] && rooms[currentRoom].food ? rooms[currentRoom].food : this.state.roomFood}
                        onChange={({target})=>{
                            if(rooms[currentRoom] && rooms[currentRoom].food !== undefined){
                                let newRooms = rooms
                                newRooms[currentRoom].food = target.value
                                this.setState({rooms: newRooms})
                            }else{
                                this.setState({roomFood: target.value})
                            }
                        }}
                        width={40}
                        />
                        <Field 
                         label='Price'
                         placeholder='Price'
                         width={90}
                         value={rooms[currentRoom] && rooms[currentRoom].price ? rooms[currentRoom].price : this.state.roomPrice}
                         onChange={({target})=>{
                             if(rooms[currentRoom] && rooms[currentRoom].price){
                                 let newRooms = rooms
                                 newRooms[currentRoom].price = target.value
                                 this.setState({rooms: newRooms})
                             }else{
                                 this.setState({roomPrice: target.value})
                             }
                         }}
                         />
                    </div> : <div style={{height: 242.867}}><h1>Want to save this Hotel?</h1></div>}</> : <>
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
                label="Name:"
                placeholder='Hotel Name'
                onChange={({target})=>this.setState({errors: [], name: target.value})}
                />
                <Field   
                label="Description:"
                placeholder='Description ....'
                text
                width={300}
                height={100}
                onChange={({target})=>this.setState({errors: [], description: target.value})}
                />
                <Field   
                label="Stars:"
                placeholder='Hotel Stars'
                placeholder='0'
                width={40}
                onChange={({target})=>this.setState({errors: [], stars: target.value})}
                />
                <Field   
                label="Features:"
                type='select'
                selectPlaceholder='Features'
                selectOptions={features}
                selectLoading={featuresLoading}
                selectMulti
                onSelect={(obj)=> this.setState({errors: [], hotelFeatures: obj.map(i=>i.value)})}
                selectWidth={300}
                />
                <Field
                label='Status:'
                type='select'
                selectPlaceholder='Status'
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
                label='Rooms:'
                placeholder='0'
                value={this.state.roomLength}
                width={40}
                onChange={({target})=>this.setState({errors: [], roomLength: target.value})}
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
                </>}
            </div>
            <div style={{display: 'flex', justifyContent: 'space-around', width: 400, marginTop: 30}}>
             {this.state.currentRoom >= 0 && <Button onClick={this.prev}>Prev</Button>}
              <Button onClick={this.next} disabled={this.state.loading} >{ currentRoom < roomLength || currentRoom === -1 ? this.state.loading ? 'Saving' : 'Next' : 'Save'}</Button>
            </div>
            {this.state.errors.length > 0 && <p style={{fontSize: 12.5, color: 'darkred'}}>{this.state.errors[0]}</p>}
            {this.state.success && <p style={{fontSize: 12.5, color: 'darkgreen'}}>{this.state.success}</p>}
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
}