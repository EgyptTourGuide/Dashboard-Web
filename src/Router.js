import React from 'react'
import Login from './Pages/Unauthenticated/Login'
import Cities from './Pages/Authenticated/Cities/Cities'
import City from './Pages/Authenticated/Cities/City/City'
import AddCity from './Pages/Authenticated/Cities/AddCity/AddCity'
import About from './Pages/Authenticated/Cities/City/About'
import Notfound from './Pages/404'
import Media from './Pages/Authenticated/Cities/City/Media'
import Places from './Pages/Authenticated/Places/Places'
import AddPlace from './Pages/Authenticated/Places/AddPlace'
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect,
  } from "react-router-dom";
  

export const UnAuthenticated = (props)=>{


    return(
        <BrowserRouter>
        <Switch>
          <Redirect exact from='/' to='/login'/>
          <Route exact path='/login' component={Login} />
          <Route path='/404' exact component={Notfound} />
          <Redirect from='*' to='/404' />
        </Switch>
        </BrowserRouter>
    )
} 


export const Authenticated = (props)=>{

  return(
      <BrowserRouter>
       <Switch>
         <Redirect exact from='/' to='/cities'/>
         <Route exact path='/cities' component={Cities} />
         <Route exact path='/cities/addcity' component={AddCity} />
         <Route exact path='/cities/:id' component={City} />
         <Route exact path='/cities/:id/about' component={About} />
         <Route exact path='/cities/:id/media' component={Media} />
         <Route exact path='/places' component={Places} />
         <Route exact path='/places/add' component={AddPlace} />
         <Route path='/404' exact component={Notfound} />
          <Redirect from='*' to='/404' />
       </Switch>
      </BrowserRouter>
  )
}



