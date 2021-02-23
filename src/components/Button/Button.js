import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Btn = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    width: ${props=>props.width ? props.width : 130}px;
    height: ${props=>props.height ? props.height : 35}px;;
    border: 0;
    background-color: white;
    border: 1px solid black;
    transition-property: transform, background-color;
    transition-duration: 0.20s;
    border-radius: 5px;
    margin-bottom: 8px;
    outline: none;
    cursor: pointer;
    opacity: ${props=>props.disabled ? '0.2' : '1'};
    &:hover{
        p{
          color: white;
        };
        background-color: black;
    }
    &:active{ 
        p{
            transform: ${props=> props.disabled ? '' : 'scale(0.95)'};
        };
    }
    `

    const BtnTwo = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    width: ${props=>props.width ? props.width : 130}px;
    height: ${props=>props.height ? props.height : 35}px;;
    border: 0;
    background-color: white;
    border: 1px solid black;
    transition-property: transform, background-color;
    transition-duration: 0.20s;
    border-radius: 5px;
    margin-bottom: 8px;
    outline: none;
    cursor: pointer;
    opacity: ${props=>props.disabled ? '0.2' : '1'};
    &:hover{
        p{
          color: white;
        };
        background-color: black;
    }
    &:active{ 
        p{
            transform: ${props=> props.disabled ? '' : 'scale(0.95)'};
        };
    }
    `



 const Text = styled.p`
   font-size: ${props=>props.fontSize ? props.fontSize : 14}px;
   cursor: pointer;
   transition-property: transform, color;
   transition-duration: 0.20s;
   outline: none;
   user-select: none; /* supported by Chrome and Opera */
   -webkit-user-select: none; /* Safari */
   -khtml-user-select: none; /* Konqueror HTML */
   -moz-user-select: none; /* Firefox */
   -ms-user-select: none; /* Internet Explorer/Edge */
   color: black;
   text-decoration: none;

 `   

const Button = (props)=>{
   
    const _onClick = ()=>{
        if(props.disabled)
        return
        if(props.onClick !== undefined)
         props.onClick()
    }

    if(props.to)
        return(
            <Btn {...props} onClick={_onClick}>
                <Text fontSize={props.fontSize} >{props.children}</Text>
            </Btn>
        )
    else 
      return (
        <BtnTwo {...props} onClick={_onClick}>
            <Text fontSize={props.fontSize} >{props.children}</Text>
        </BtnTwo>
      )
}

export default Button