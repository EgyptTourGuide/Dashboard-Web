import React from 'react'
import Select from 'react-select'

/* 

   selectLoading: bool
   selected: index
   onSelect: func
   selectOptions: Array
   selectWidth: number
   selectPlaceholder: str
   selectMulti

*/


const Picker = (props)=>{

    const { selectLoading, selectOptions, selectPlaceholder, onSelect, selectWidth, selected, selectMulti  } = props
    return(
        <Select 
        isLoading={selectLoading}
        isSearchable
        placeholder={selectPlaceholder}
        value={selected}
        onChange={onSelect} 
        options={selectOptions} 
        isMulti={selectMulti}
        styles={{
            control: styles => ({ ...styles, width: selectWidth ? selectWidth : 204, borderRadius: 5, fontSize: 13, marginTop: 5, marginBottom: 5}),
            input: styles => ({...styles, fontSize: 13}),
            option: styles => ({...styles, fontSize: 13}),
            menu: styles => ({...styles, overflow: 'auto', margin: 0, padding: 0})
            }}
            theme={theme => ({
                ...theme,
                borderRadius: 0,
                colors: {
                ...theme.colors,
                primary25: 'rgba(0,0,0,0.1)',
                primary: 'black',
                },
            })}
            >
        </Select>
    )
}

export default Picker