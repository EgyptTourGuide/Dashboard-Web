import React, { useContext, useEffect, useState } from 'react'
import Login from './Pages/Unauthenticated/Login'
import Cities from './Pages/Authenticated/Cities/Cities'
import City from './Pages/Authenticated/Cities/City/City'
import AddCity from './Pages/Authenticated/Cities/AddCity/AddCity'
import About from './Pages/Authenticated/Cities/City/About'
import Notfound from './Pages/404'
import Media from './Pages/Authenticated/Cities/City/Media'
import Places from './Pages/Authenticated/Places/Places'
import AddPlace from './Pages/Authenticated/Places/AddPlace'
import Settings from './Pages/Authenticated/Settings/Settings'
import PlaceSettings from './Pages/Authenticated/Settings/PlaceSettings/PlaceSettings'
import Tourists from './Pages/Authenticated/Tourists/Tourists'
import { AuthContext } from './AuthProvider'
import Loading from './components/Loading'
import Admins from './Pages/Authenticated/Admins/Admins'
import Place from './Pages/Authenticated/Places/Place/Place'
import jwt_decode from "jwt-decode"
import PlaceForm from './Pages/Authenticated/Places/Place/PlaceForm'
import PlaceReview from './Pages/Authenticated/Places/Place/PlaceReview'
import Hotels from './Pages/Authenticated/Hotel/Hotels'
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect,
  } from "react-router-dom";
import Layout from './layout/Layout'
import AboutPlace from './Pages/Authenticated/Places/Place/About'
import Hotel from './Pages/Authenticated/Hotel/Hotel'
import AddHotel from './Pages/Authenticated/Hotel/AddHotel'
import Activities from './Pages/Authenticated/Activity/Activities'
import AddActivity from './Pages/Authenticated/Activity/AddActivity'
import Activity from './Pages/Authenticated/Activity/Activity'
import HotelSettings from './Pages/Authenticated/Settings/HotelSettings/HotelSettings'
  

const UnAuthenticated = (props)=>{


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


const Authenticated = (props)=>{

  return(
      <BrowserRouter>
       <Switch>
         <Redirect exact from='/' to='/cities'/>
         <Redirect exact from='/login' to='/cities'/>
         <Route exact path='/cities' component={Cities} />
         <Route exact path='/cities/addcity' component={AddCity} />
         <Route exact path='/cities/:id' component={City} />
         <Route exact path='/cities/:id/about' component={About} />
         <Route exact path='/cities/:id/media' component={Media} />
         <Route exact path='/places' component={Places} />
         <Route exact path='/places/add' component={AddPlace} />
         <Route exact path='/places/:id' component={Place} />
         <Route exact path='/places/:id/about' component={AboutPlace} />
         {/* <Route exact path='/places/:id/media' component={PlaceMedia} /> */}
         <Route exact path='/places/:id/form' component={PlaceForm} />
         <Route exact path='/places/:id/reviews' component={PlaceReview} /> 
         <Route exact path='/hotels' component={Hotels} />
         <Route exact path='/hotels/add' component={AddHotel} />
         <Route exact path='/hotels/:id' component={Hotel} />
         <Route exact path='/activities' component={Activities} />
         <Route exact path='/activities/add' component={AddActivity} />
         <Route exact path='/activities/:id' component={Activity} />
         <Route exact path='/tourists' component={Tourists} />
         <Route exact path='/settings' component={Settings} />
         <Route exact path='/settings/admin' component={Admins} />
         <Route exact path='/settings/place' component={PlaceSettings} />
         <Route exact path='/settings/hotel' component={HotelSettings} />
         <Route exact path='/settings/myaccount' component={MyAccount} />
         <Route path='/404' exact component={Notfound} />
          <Redirect from='*' to='/404' />
       </Switch>
      </BrowserRouter>
  )
}

const Router = (props)=>{
  const data = useContext(AuthContext)
  const [loading, setLoading] = useState(true)




  useEffect(()=>{
    const checkUser = async()=>{
      try{
        let storedUser = JSON.parse(localStorage.getItem('user'))
        if(storedUser){
          const { token, refreshToken } = storedUser
          if(token && refreshToken){
              let Refresh = jwt_decode(refreshToken)
              if(Refresh) data.login(storedUser)
          }
        }
      }catch(e){
        console.log(e)
      }
      setLoading(false)
    }
    checkUser()
    
  }, [])
  if(loading) return <Loading />
  else
  return (data.user ? <Authenticated /> : <UnAuthenticated />)
}

export default Router



const MyAccount = (props)=>{
 
  const { user } = useContext(AuthContext)

  return(
    <Layout>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 60, flexDirection: 'column'}}>
       <p>Full Name: {user.fullname}</p>
       <p>User Type: {user.userType}</p>
       <p>Email: {user.email}</p>
      </div>
    </Layout>
  )


}