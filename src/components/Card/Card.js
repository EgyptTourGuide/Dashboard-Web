import styled from 'styled-components'
import { Link } from "react-router-dom"
import ReactStars from 'react-stars'



const Container = styled.div`
    background: ${props=>props.image ? `url(${props.image})` : 'rgba(0,0,0,0.4)'}; 
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    box-shadow: 0 7px 6px -6px black;
    width: 250px;
    height: 150px;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    margin: 8px;
    opacity: 0.97;
    transition-property: transform, opacity;
    transition-duration: 0.30s;
    &:hover{
        a{
            background-color: rgba(0,0,0,0.18)
        }
        opacity: 1;
        transform: scale(1.03);
    }
`

const Darker = styled(Link)`
    position: absolute;
    display: flex;
    flex: 1;
    justify-content: center;
    flex-direction: column;
    outline: none;
    cursor: pointer;
    text-decoration: none;
    align-items: center;
    width: 250px;
    height: 150px;
    margin: 8px;
    border-radius: 15px;
    transition-property: background-color;
    transition-duration: 0.30s;
    background-color: rgba(0,0,0,0.4);
`

const Card = (props)=>{
  

return(
      <Container {...props}>
       <Darker to={props.to}>
       <p style={{color: 'white', fontSize: 20, margin: 0, padding: 0,}}>{props.title}</p>
       {props.stars && <ReactStars
            count={5}
            edit={false}
            value={props.stars === 0 ? -1 : props.stars}
            size={24}
            color2={'#ffd700'} 
            />}
       </Darker>
      </Container>
)
}

export default Card