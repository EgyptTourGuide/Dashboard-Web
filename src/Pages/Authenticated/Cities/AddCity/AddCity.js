import React from 'react'
import classes from './AddCity.module.css'
import Layout from '../../../../layout/Layout'
import Input from './../../../../components/Input/Input'
import { Progress } from 'rsuite';
import Button from '../../../../components/Button/Button'

let error = ''
let success = ''

const { Circle } = Progress

export default class AddCity extends React.Component{
    state = {
        loading: false
    }

    render(){
        return(
        
        <Layout head='Adding City' >
            <div className={classes.container}>
                <div className={classes.form}>
                <div className={classes.field}>
                <p>Name:</p> 
                <div className={classes.space}/>

                <Input placeholder='City Name' icon='IoDocumentTextOutline'/>
                </div>
                <div className={classes.field}>
                <p>Description:</p> 
                <div className={classes.space}/>
                <Input placeholder='About city...' text width={380} height={130}/>
                </div>
                <div className={classes.field}>
                <p>Location:</p> 
                <div className={classes.space}/>
                <Input placeholder='Long' width={80} />
                <Input placeholder='Lat'  width={80} style={{marginLeft: 5}} />
                </div>
                <div className={classes.field}>
                <p>Media:</p> 
                <div className={classes.space}/>
                <Input placeholder='Choose Media' type='file' multiple />
                 {this.state.loading && 
                    <div style={styles.percentDIV}>
                    <p style={styles.percent}>70</p>
                    <Circle 
                        percent={70} 
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
                </div>
                <div style={styles.btnDiv}>
                   <Button>Submit</Button>
                   {error && <p style={styles.err}>{error}</p>}
                   {success && <p style={styles.done}>{success}</p>}
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