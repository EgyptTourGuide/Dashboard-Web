import React from 'react'
import classes from './AddCity.module.css'
import Layout from '../../../../layout/Layout'
import Button from '../../../../components/Button/Button'
import axios from 'axios'
import { URL, authAxios } from '../../../../api/api'
import Field from '../../../../components/Field/Field'


export default class AddCity extends React.Component{
    state = {
        loading: false,
        name: '',
        long: '',
        lat: '',
        description: '',
        files: [],
        error: '',
        percent: null,
        success: false
    }

    options = {
        onUploadProgress: (event)=>{
            const { loaded, total } = event
            let percent = Math.round( (loaded * 100) / total )
            this.setState({percent})
        }
    }

    submit= async()=>{

        if(this.state.name && this.state.description && this.state.long && this.state.lat){
            const fd = new FormData()
            fd.append('name', this.state.name)
            fd.append('description', this.state.description)
            fd.append('long', this.state.long)
            fd.append('lat', this.state.lat)
            for(let i = 0; i < this.state.files.length; i++){
                console.log(this.state.files[i])
                fd.append(`media`, this.state.files[i])
            }

            try{
            
                this.setState({loading: true})
                let res = await authAxios.post(`${URL}/cities/`, fd ,this.options)
                console.log(res)
                this.setState({loading: false, success: true})

            }catch(e){

                if(e.response.data.errors){
                    this.setState({error: e.response.data.errors[0], loading: false})
                }else
                this.setState({error: 'Some Error here!', loading: false})
            }
        }
    }

    render(){
        return(
        
        <Layout head='Adding City' >
            <div className={classes.container}>
                <div className={classes.form}>
                <Field 
                    label='Name:' 
                    placeholder='City Name' 
                    onChange={(event)=>this.setState({name: event.target.value})} 
                    icon={'IoDocumentTextOutline'} 
                />
                <Field 
                    label='Description:' 
                    placeholder='About city...' 
                    onChange={(event)=>this.setState({description: event.target.value})} 
                    text 
                    width={380} 
                    height={130} 
                />
                <Field 
                    label='Location:' 
                    placeholder='Long' 
                    onChange={(event)=>this.setState({long: event.target.value})} 
                    width={80}  
                    secondInput={true}
                    secPlaceholder='Lat'
                    secOnChange={(event)=>this.setState({lat: event.target.value})}
                    secWidth={80}
                    secStyle={{marginLeft: 5}}
                />
                <Field 
                    label='Media:' 
                    placeholder='Choose Media' 
                    onChange={(event)=>this.setState({files: event.target.files})} 
                    files={this.state.files}
                    loading={this.state.loading}
                    percent={this.state.percent}
                    type='file'
                    multiple
                />
                <div style={styles.btnDiv}>
                   <Button 
                        onClick={this.submit} 
                        disabled={this.state.loading}
                    > Submit </Button>
                   {this.state.error && <p style={styles.err}>{this.state.error}</p>}
                   {this.state.success && <p style={styles.done}>City Created</p>}
                </div>
                </div>
            </div>
        </Layout>
        )
    }
}

const styles = {
    btnDiv:{
        alignSelf: 'center', 
        marginTop: 25, 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    err:{
        color: 'darkred', 
        fontSize: 12
    },
    done: {
        color: 'darkgreen', 
        fontSize: 12
    }
}