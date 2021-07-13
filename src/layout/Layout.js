import React from 'react'
import classes from './Layout.module.css'
import Header from '../components/Header/Header'
import styled from 'styled-components'
import { NavLink, Link } from 'react-router-dom'
import { IoArrowBackCircleOutline ,IoBan } from 'react-icons/io5'
import { useContext } from 'react'
import { AuthContext } from '../AuthProvider'


let Nav = styled(NavLink)`
display: flex;
justify-content: center;
align-items: center;
text-decoration: none;
width: 130px;
height: 40px;
border: 0;
background-color: white;
border: 1px solid black;
transition: background-color 0.30s;
margin-bottom: 15px;
outline: none;
p{
   color: black;
   text-align: center;
   padding: 0;
   margin: 0;
}
&:hover{
   background-color: rgba(0,0,0,0.1);
}
`

const User = styled(Link)`
 
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  flex-direction: column;
  background-color: white;
  transition: background-color 0.30s;
  padding: 12px;
  p {
   color: black;
   text-align: center;
   padding: 0;
   margin: 0;
   font-size: 14px;
  }
  &:hover{
     background-color: rgba(0,0,0,0.1);
  }
`

const UserImage = styled.div`
   background: ${props=>props.picture ? `url(${props.picture})` : 'rgba(0,0,0,0.4)'};    
   width: 70px;
   height: 70px;
   border-radius: 35px;
   background-size: cover;
   background-position: center;
   background-repeat: no-repeat;
   box-shadow: 0 4px 6px -6px black;
`



const Layout = (props)=>{
    
    const context = useContext(AuthContext)
    return(
        <>
        <Header />
        <div className={classes.container}>
        <div className={classes.navContainer}>
            <User to={`/profile`}>
               <UserImage picture={context.user.picture} />
               <p>{context.user.fullname}</p>
            </User>
          <div>
              <Nav activeStyle={{backgroundColor: 'rgba(0,0,0,0.2)'}} to='/cities'>
                 <p className={classes.btnText}> Cities </p>
              </Nav>
              <Nav activeStyle={{backgroundColor: 'rgba(0,0,0,0.2)'}} to='/hotels'>
                 <p className={classes.btnText}> Hotels </p>
              </Nav>
              <Nav activeStyle={{backgroundColor: 'rgba(0,0,0,0.2)'}} to="/places" query={{ the: 'query' }}>
                 <p className={classes.btnText}> Places </p>
              </Nav>
              <Nav activeStyle={{backgroundColor: 'rgba(0,0,0,0.2)'}} to="/activities" query={{ the: 'query' }}>
                 <p className={classes.btnText}> Activities </p>
              </Nav>
              <Nav activeStyle={{backgroundColor: 'rgba(0,0,0,0.2)'}} to='/tourists'>
                 <p className={classes.btnText}> Tourists </p>
              </Nav>
              <Nav activeStyle={{backgroundColor: 'rgba(0,0,0,0.2)'}} to='/settings'>
                 <p className={classes.btnText}> Settings </p>
              </Nav>
          </div>
  
        </div>
        <div className={classes.pageContainer}>
          {props.head && <div className={classes.addCityHead}>
                 {props.to && <div style={{display: 'flex', marginLeft: 15, height: '100%', alignItems: 'center', justifyContent: 'center'}}>
                    <Link to={props.to}>
                       <IoArrowBackCircleOutline
                           style={{
                              fontSize: 34,
                              alignSelf: 'flex-end',
                              color: 'black'
                           }} 
                        />
                     </Link>
                    </div>}
                  <p style={{textAlign: 'center', flex: 1}}>{props.head}</p>
                  {props.del && <div style={{display: 'flex', marginRight: 15, height: '100%', alignItems: 'center', justifyContent: 'center'}}>
                       <IoBan
                           onClick={props.del}
                           style={{
                              fontSize: 30,
                              alignSelf: 'center',
                              color: 'black'
                           }} 
                        />
                    </div>}
            </div>
           }
          {props.children}
        </div>
        </div>
        </>
    )
}

export default Layout