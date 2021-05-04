import React from 'react'
import classes from './Layout.module.css'
import Header from '../components/Header/Header'
import styled from 'styled-components'
import { NavLink, Link } from 'react-router-dom'
import { IoArrowBackCircleOutline ,IoBan } from 'react-icons/io5'


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



const Layout = (props)=>{

    return(
        <>
        <Header />
        <div className={classes.container}>
        <div className={classes.navContainer}>
            <div className={classes.navUser}>
            </div>
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
              <Nav activeStyle={{backgroundColor: 'rgba(0,0,0,0.2)'}} exact to=''>
                 <p className={classes.btnText}> Reports </p>
              </Nav>
              <Nav activeStyle={{backgroundColor: 'rgba(0,0,0,0.2)'}} exact to=''>
                 <p className={classes.btnText}> Messages </p>
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