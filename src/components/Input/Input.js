import React from 'react'
import styled from 'styled-components'
import * as IonicIcon from 'react-icons/io5'


/* 
   /* Props
   -Input defult props
   -icon
   -err
   -errorMsg
   -width, height
*/


const TextArea = styled.textarea`
    width: ${props=> props.width ? props.width : 194}px;
    height: ${props=> props.height ? props.height : 90}px;
    outline: none;
    padding: 10px;
    background-color: white;
    text-align: left;
    border: 2px solid rgba(0,0,0,0.2);
    font-size: 15px;
    resize: none;
    border-radius: 5px;
    transition: border 0.2s ease;
    &:hover{
        border-color: black;
    }
    &:focus{
        border-color: black;
    }
`

const Inp = styled.input`

  width: ${props=> props.width ? props.width : 180}px;
  height: ${props=> props.height ? props.height : 15}px;
  padding: ${props=>props.icon ? '10px 30px 10px 10px' : '10px'};
  
  background-color: white;
  border: 0;
  font-size: 13px;
  outline: none;
  text-align: ${props=> props.align ? props.align : 'left'};
  border: 2px solid ${props=>props.err ? 'red' :  'rgba(0,0,0,0.2)'};
  transition: border 0.2s ease;
  border-radius: 5px;
    &:hover{
        border-color: black;
    }
    &:focus{
    border-color: black;
    }
    &:active{
        border-color: black;
    }
` 
const FileInp = styled.input`
display: none

`

const FileLabel = styled.label`
border: 1px solid #ccc;
display: inline-block;
padding: 6px 12px;
cursor: pointer;
transition: background-color 0.2s;
border-radius: 5px;
&:hover{
    background-color: rgba(0,0,0,0.2)
}
`


const Div = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`


const Container = styled.div`
 display: flex;
 justify-content: center;
 align-items: 'center';
 flex-direction: column;
`
const ErrorText = styled.span`
 width: 100%;
 text-align: left;
 color: red;
 margin: 4px;
 font-size: 14px;
`

const Input = (props)=>{
     let IoIcon
     if(props.icon)
       IoIcon = IonicIcon[props.icon]
    return(
        <>
        {props.text ?
        <Container>
          <TextArea {...props}/>
          {props.errorMsg ? 
          <ErrorText width={props.width}>
             {props.errorMsg} 
          </ErrorText> 
          : 
          null}
        </Container>
         : 
        <Container>
          <Div>
          {props.type === 'file' ?  
            <>
            <FileInp id={'upload'} {...props} />
            <FileLabel htmlFor='upload' >{props.placeholder}</FileLabel>
            </>
          :     
            <>
            <Inp 
                {...props}
            /> 
             {props.icon && <IoIcon
              
              style={{
                position: 'absolute',
                fontSize: 20,
                alignSelf: 'flex-end',
                marginRight: 8,
              }}
             
             />}
            </>
          }

          {props.errorMsg ? 
          <ErrorText width={props.width}>
             {props.errorMsg} 
          </ErrorText> 
          : 
          null}
          </Div>
        </Container>}
        </>

    )
}



export default Input