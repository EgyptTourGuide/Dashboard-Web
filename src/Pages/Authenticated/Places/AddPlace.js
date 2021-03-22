import React, { useEffect, useState } from 'react'
import Layout from '../../../layout/Layout'
import Field from '../../../components/Field/Field'
const tags = [{label: 'Diving', value: 'usd'}, 
{label: 'Natural', value: 'egp'}, 
{label: 'Air', value: 'air'},
{label: 'Ballon', value: 'balon'}, 
{label: 'boll', value: 'boll'},
{label: 'lol', value: 'lol'},
{label: 'car', value: 'car'}]

const currency = [{label: 'USD', value: 'usd'}, {label: 'EGP', value: 'egp'}]


const AddPlace = (props)=>{
    

    const [ city, setCity ] = useState(null)
    const [ files, setFiles ] = useState([])
    const [ cities, setCities ] = useState([{label: 'Cairo', value: '0'}, {label: 'Alex', value: '1'}])

    const getIndex = ()=>{
        let index
        if(props.location.state){
            let S = props.location.state.city
            if(S !== null)
            index = cities.findIndex(obj=>obj.label === S.name)
        }
        else 
            index = undefined
        return index
    }

    useEffect(()=>{

        if(props.location.state){
           setCity(props.location.state.city)
        }

    },[])



    return(
        <Layout head={`${city ? `${city.name} / Places & Activity / Add` : '' }`}>
            <div style={styles.container}>
            <div style={styles.form}>
            <Field
             label='City:'
             selectPlaceholder='City'
             type="select"
             selectOptions={cities}
             onSelect={(obj)=> setCity({name: obj.label, id: obj.value})}
             selected={getIndex()}
            />
            <Field
             label='Name:'
             placeholder='Title'

            />
            <Field 
             label="Description"
             placeholder="About this place.."
             text
             width={300}
             height={100}
            />
            <Field
             label='Ticket:'
             placeholder='Egyptian'
             selectPlaceholder='Currency'
             selectOptions={currency}
             selectWidth={110}
             width={80}
            />
            <Field
             placeholder='Foreign'
             selectPlaceholder='Currency'
             selectOptions={currency}
             selectWidth={110}
             width={80}

            />
            <Field
             label='Tags'
             type='select'
             placeholder='Foreign'
             icon='IoLogoUsd'
             selectPlaceholder='Tags'
             selectOptions={tags}
             selectMulti
             selectWidth={300}
            />
            <Field
             label='Opens At:'
             placeholder='Foreign'
             type='time'
             width={100}
             secondInput
             secType={'time'}
             secWidth={100}
             onChange={(event)=>console.log(event.target.value)}
            />
            <Field
             label='State:'
             type='select'
             selectPlaceholder='State'
             selectOptions={[{label: 'Available', value: true},{label: 'Not Available', value: false}]} 
            />
            <Field 
             label='Location:' 
             placeholder='Long' 
             width={80}  
             secondInput={true}
             secPlaceholder='Lat'
             secWidth={80}
             secStyle={{marginLeft: 5}}
            
            />
            <Field 
             label='Media:' 
             placeholder='Choose Media' 
             onChange={(event)=>setFiles(event.target.files)} 
             files={files}
             loading={null}
             percent={null}
             type='file'
             multiple
                />
            </div>
            </div>
        </Layout>
    )
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
        width: '100%'
     }
}

export default AddPlace