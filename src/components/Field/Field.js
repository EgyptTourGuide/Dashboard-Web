import React from 'react'
import Input from '../Input/Input'
import classes from './Field.module.css'
import { Progress } from 'rsuite'
import Button from '../Button/Button'
import Picker from '../Picker/Picker'
const { Circle } = Progress

const days = [{label: 'SUN', value: 'sunday'},{ 
    label: 'MON', value: 'monday'},{
    label: 'TUE', value: 'tuesday'},{
    label: 'WED', value: 'wednesday'},{
    label: 'THU', value: 'thursday'},{
    label: 'FRI', value: 'friday'},{
    label: 'SAT', value: 'saturday'}]

const Field = (props)=>{

    if(props.type === 'select'){
        const { selectLoading, selectOptions, selectPlaceholder, onSelect, selectWidth, selected, selectMulti  } = props
        return(
            <div className={classes.field} style={props.style}>
            <p className={classes.label}>{props.label}</p> 
            <div className={classes.space}/>
             <Picker 
                selectLoading={selectLoading} 
                selectOptions={selectOptions}
                selectPlaceholder={selectPlaceholder}
                onSelect={onSelect}
                selectWidth={selectWidth}
                selected={selected}
                selectMulti={selectMulti} />
            </div>

        )
      
    }else{
    return(
        <div className={classes.field} style={props.style}>
            <p className={classes.label}>{props.label}</p> 
            <div className={classes.space}/>
            {props.type === 'time' && (
            <Picker
            selectLoading={props.selectLoading} 
            selectPlaceholder={props.selectPlaceholder ? props.selectPlaceholder : 'Day'}
            onSelect={props.onSelect}
            selectWidth={props.selectWidth ? props.selectWidth : 100}
            selected={props.selected}
              selectOptions={days}
            />) }

            {props.type === 'time' && <p style={{marginLeft: 9, marginRight: 5, width: 47}}>From: </p> }
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

            { props.selectOptions && (
                <>
                <div style={{marginLeft: 3, marginRight: 5}}></div>
                <Picker  
                selectLoading={props.selectLoading} 
                selectOptions={props.selectOptions}
                selectPlaceholder={props.selectPlaceholder}
                onSelect={props.onSelect}
                selectWidth={props.selectWidth}
                selected={props.selected}
                selectMulti={props.selectMulti}
                /></>)}

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

                 {props.type === 'time' && <p style={{marginLeft: 5, marginRight: 5, width: 30}}>To: </p> }

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
                type={props.secType}
            />)}
            {props.type === 'time' && <Button style={{marginLeft: 12, marginTop: 6, width: 50}}>Add</Button>}
        </div> 
    )}
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