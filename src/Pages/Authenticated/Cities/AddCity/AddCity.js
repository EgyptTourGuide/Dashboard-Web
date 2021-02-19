import React from 'react'
import classes from './AddCity.module.css'
import Layout from '../../../../layout/Layout'
import Input from './../../../../components/Input/Input'
import { Progress } from 'rsuite';
import Button from '../../../../components/Button/Button'
import axios from 'axios'
import { URL } from '../../../../api/api'

let success = ''

const { Circle } = Progress

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
            console.log(this.state)
            let res = await axios.post(`${URL}/city/`, fd ,this.options)
            console.log(res)
            this.setState({loading: false})

        }catch(e){
            if(e.response.data){
                this.setState({error: e.response.data.errors[0], loading: false})
            }else
            this.setState({error: 'Some Error here!', loading: false})
        }
    }

    render(){
        return(
        
        <Layout head='Adding City' >
            <div className={classes.container}>
                <div className={classes.form}>
                <div className={classes.field}>
                <p>Name:</p> 
                <div className={classes.space}/>

                <Input placeholder='City Name' onChange={(event)=>this.setState({name: event.target.value})}  icon='IoDocumentTextOutline'/>
                </div>
                <div className={classes.field}>
                <p>Description:</p> 
                <div className={classes.space}/>
                <Input placeholder='About city...' onChange={(event)=>this.setState({description: event.target.value})} text width={380} height={130}/>
                </div>
                <div className={classes.field}>
                <p>Location:</p> 
                <div className={classes.space}/>
                <Input placeholder='Long' onChange={(event)=>this.setState({long: event.target.value})} width={80} />
                <Input placeholder='Lat' onChange={(event)=>this.setState({lat: event.target.value})}  width={80} style={{marginLeft: 5}} />
                </div>
                <div className={classes.field}>
                <p>Media:</p> 
                <div className={classes.space}/>
                <Input placeholder='Choose Media' onChange={(event)=>this.setState({files: event.target.files})} type='file' multiple />
                 {this.state.loading && 
                    <div style={styles.percentDIV}>
                    <p style={styles.percent}>{this.state.percent}</p>
                    <Circle 
                        percent={this.state.percent} 
                        strokeColor={'black'} 
                        strokeWidth={12} 
                        trailWidth={12} 
                        showInfo={false} 
                        gapPosition='top' 
                        trailColor={'gray'} 
                        status={null} 
                    />
                    </div>
                 }
                 <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 60}}>
                 {this.state.files.length > 0 && <p style={{margin: 0, marginLeft: 5, padding: 0}}>{this.state.files.length} file selected</p>}
                 </div>
                </div>
                <div style={styles.btnDiv}>
                   <Button onClick={this.submit} disabled={this.state.loading}> Submit </Button>
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
    },
    percent:{
        position: 'absolute', 
        fontSize: 10, 
        textAlign: 'center' , 
        alignSelf:'center', 
        width: 25, 
        marginTop: 6
    },
    percentDIV:{ 
        width: 30, 
        marginLeft: 10, 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center' 
    }

}