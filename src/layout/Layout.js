import React from 'react'
import classes from './Layout.module.css'
import Header from '../components/Header/Header'

const Layout = (props)=>{

    return(
        <>
        <Header />
        <div className={classes.container}>
        <div className={classes.navContainer}>
            <div className={classes.navUser}>
            </div>
          <div>
              <a className={classes.navBtn} href={'/cities'}>
                 <p className={classes.btnText}> Cities </p>
              </a>
              <a className={classes.navBtn} href={null}>
                 <p className={classes.btnText}> Hotels </p>
              </a>
              <a className={classes.navBtn} href={null}>
                 <p className={classes.btnText}> Places </p>
              </a>
              <a className={classes.navBtn} href={null}>
                 <p className={classes.btnText}> Tourists </p>
              </a>
              <a className={classes.navBtn} href={null}>
                 <p className={classes.btnText}> Reports </p>
              </a>
              <a className={classes.navBtn} href={null}>
                 <p className={classes.btnText}> Messages </p>
              </a>
              <a className={classes.navBtn} href={null}>
                 <p className={classes.btnText}> Settings </p>
              </a>
          </div>
  
        </div>
        <div className={classes.pageContainer}>
          {props.head && <div className={classes.addCityHead}>
                  <p>{props.head}</p>
            </div>
           }
          {props.children}
        </div>
        </div>
        </>
    )
}

export default Layout