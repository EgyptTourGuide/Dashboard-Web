import React from 'react'
import styled from 'styled-components'
import ReactPlayer from 'react-player'
import { IoCloseCircleOutline } from "react-icons/io5";

const Container = styled.div`
display: flex;
flex-direction: row;
margin: 5px;
align-items: center;
justify-content: center;
background-color: white;
border-radius: 5px;
`

const IconContainer = styled.div`
display: flex;
width: 40px;
height: 200px;
justify-content: center;
align-items: center;
background-color: rgba(0,0,0,0.2);
border-bottom-right-radius: 5px;
border-top-right-radius:5px;
`

const DeleteIcon = styled(IoCloseCircleOutline)`
font-size: 30px;
color: black;
transition: color, transform 0.25s;
&:hover{
    color: darkred;
    transform: scale(1.2);
}
`
const Image = styled.div`
  background: ${props=> `url(${props.image})`}; 
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  box-shadow: 0 7px 6px -6px black;
  width: 350px;
  height: 200px;
  border-radius: 5px;
  border-bottom-right-radius: 0;
  border-top-right-radius:0;
`

const MediaCard = (props)=>{

  const onDelete = ()=>{
      props.onDelete(props.index)
  }
  if(props.video){
      return (
          <Container>
              <ReactPlayer width={350} controls height={200} url={props.video}/>
              <IconContainer>
                  <DeleteIcon onClick={onDelete}/>
              </IconContainer>
          </Container>
      )}
  else
  return(
      <Container>
          <Image image={props.image}/>
          <IconContainer>
              <DeleteIcon onClick={onDelete} />
          </IconContainer>
      </Container>

  )
}
export default MediaCard