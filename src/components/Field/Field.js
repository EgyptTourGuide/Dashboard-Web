import React from 'react'
import Input from '../Input/Input'
import classes from './Field.module.css'
import { Progress } from 'rsuite';

const { Circle } = Progress

const Field = (props)=>{


    return(
        <div className={classes.field} style={props.style}>
            <p>{props.label}</p> 
            <div className={classes.space}/>
            <Input 
                placeholder={props.placeholder} 
                width={props.width} 
                height={props.height} 
                onChange={props.onChange}  
                icon={props.icon}
                text={props.text}
                value={props.value}
                type={props.type}
                multiple={props.multiple}
                disabled={props.disabled}
            />
            { props.type==='file' && ( <>
                 {props.loading && 
                    <div style={styles.percentDIV}>
                    <p style={styles.percent}>{props.percent}</p>
                    <Circle 
                        percent={props.percent} 
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
                 {props.files.length > 0 && <p style={{margin: 0, marginLeft: 5, padding: 0}}>{props.files.length} file selected</p>}
                 </div></>)}

            {props.secondInput && (
            <Input 
                placeholder={props.secPlaceholder} 
                width={props.secWidth} 
                height={props.secHeight} 
                onChange={props.secOnChange}  
                icon={props.secIcon}
                text={props.secText}
                value={props.secValue}
                style={props.secStyle}
            />)}
        </div> 
    )
}

const styles = {
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

export default Field