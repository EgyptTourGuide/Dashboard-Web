import React from 'react'
import { DeleteIcon } from '../Button/Button'

export const ListWithDelete = (props)=>{
    const onDelete = ()=>props.onDelete(props.value)
    return(
    <div style={styles.HoursContainer}>
        <div style={{width: 250, overflowWrap: 'break-word'}}>
        <p style={styles.HoursP}>{props.value}</p>
        </div>
        <DeleteIcon onClick={onDelete} />
    </div>
)}

const styles = {
    HoursContainer: {
        alignSelf: 'center', 
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 300
   },
   HoursP: {
       padding: 0, 
       margin: 0, 
       marginRight: 12, 
       fontWeight: 'bold'
   }
}
