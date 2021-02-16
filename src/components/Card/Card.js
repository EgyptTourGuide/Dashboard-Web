import styled from 'styled-components'

const Container = styled.div`
    background: ${props=>props.image ? `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.9)), url(/${props.image})` : 'rgba(0,0,0,0.4)'}; 
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
        opacity: 1;
        transform: scale(1.03);
    }
`
const Card = (props)=>{

return(
      <Container {...props}>
       <p style={{color: 'white', fontSize: 20, margin: 0, padding: 0}}>{props.title}</p>
      </Container>
)
}

export default Card