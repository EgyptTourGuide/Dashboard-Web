import React from 'react'
import Login from './Pages/Unauthenticated/Login'
import Notfound from './Pages/404'
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
  

export const UnAuthenticated = (props)=>{


    return(
      <>
        <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route path='/404' exact component={Notfound} />
          <Redirect from='*' to='/404' />
        </Switch>
        </BrowserRouter>
        </>
    )
} 


