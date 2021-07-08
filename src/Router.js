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
import Hotel from './Pages/Authenticated/Hotel/Hotel/Hotel'
import AddHotel from './Pages/Authenticated/Hotel/AddHotel'
import Activities from './Pages/Authenticated/Activity/Activities'
import AddActivity from './Pages/Authenticated/Activity/AddActivity'
import Activity from './Pages/Authenticated/Activity/Activity'
import HotelSettings from './Pages/Authenticated/Settings/HotelSettings/HotelSettings'
import HotelForm from './Pages/Authenticated/Hotel/Hotel/HotelForm'
import { authAxios, getToken, URL } from './api/api'
import HotelReview from './Pages/Authenticated/Hotel/Hotel/HotelReviews'
import styled from 'styled-components'
import Field from './components/Field/Field'
import Button from './components/Button/Button'
import HotelRooms from './Pages/Authenticated/Hotel/Hotel/HotelRooms'
import Room from './Pages/Authenticated/Hotel/Rooms/Room'
import RoomMedia from './Pages/Authenticated/Hotel/Rooms/RoomMedia'
import HotelMedia from './Pages/Authenticated/Hotel/Hotel/HotelMedia'
import PlaceMedia from './Pages/Authenticated/Places/Place/PlaceMedia'
import HotelRequest from './Pages/Authenticated/Hotel/Hotel/HotelRequests'
import Plans from './Pages/Authenticated/Plan/Plans'
import AddPlan from './Pages/Authenticated/Plan/AddPlan'
import Transports from './Pages/Authenticated/Transport/Transports'
import AddTransport from './Pages/Authenticated/Transport/Create'

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
         <Route exact path='/cities/:id/transports' component={Transports} />
         <Route exact path='/cities/:id/transports/add' component={AddTransport} />
         <Route exact path='/cities/:id/plans' component={Plans} />
         <Route exact path='/cities/:id/plans/add' component={AddPlan} />
         <Route exact path='/places' component={Places} />
         <Route exact path='/places/add' component={AddPlace} />
         <Route exact path='/places/:id' component={Place} />
         <Route exact path='/places/:id/about' component={AboutPlace} />
         <Route exact path='/places/:id/media' component={PlaceMedia} />
         <Route exact path='/places/:id/form' component={PlaceForm} />
         <Route exact path='/places/:id/reviews' component={PlaceReview} /> 
         <Route exact path='/hotels' component={Hotels} />
         <Route exact path='/hotels/add' component={AddHotel} />
         <Route exact path='/hotels/:id' component={Hotel} />
         <Route exact path='/hotels/:id/form' component={HotelForm} />
         <Route exact path='/hotels/:id/requests' component={HotelRequest} />
         <Route exact path='/hotels/:id/reviews' component={HotelReview} />
         <Route exact path='/hotels/:id/media' component={HotelMedia} />
         <Route exact path='/hotels/:id/rooms' component={HotelRooms} />
         <Route exact path='/hotels/:id/rooms/:roomId' component={Room} />
         <Route exact path='/hotels/:id/rooms/:roomId/media' component={RoomMedia} />
         <Route exact path='/activities' component={Activities} />
         <Route exact path='/activities/add' component={AddActivity} />
         <Route exact path='/activities/:id' component={Activity} />
         <Route exact path='/tourists' component={Tourists} />
         <Route exact path='/settings' component={Settings} />
         <Route exact path='/settings/admin' component={Admins} />
         <Route exact path='/settings/place' component={PlaceSettings} />
         <Route exact path='/settings/hotel' component={HotelSettings} />
         <Route exact path='/profile' component={MyAccount} />
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
              let token = await getToken()
              if(token) data.login(storedUser)
          }
        }
      }catch(e){
        localStorage.clear()
        window.location.href = "/login"
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



const Picture = styled.div`
  
   width: 250px;
   height: 250px;
   border-radius: 120px;
   background: ${props=>props.picture ? `url(${props.picture})` : 'rgba(0,0,0,0.4)'};
   background-size: cover;
   background-position: center;
   background-repeat: no-repeat;
   box-shadow: 0 7px 6px -6px black;
   justify-content: center;
   align-items: center;
   cursor: pointer;
   margin: 8px;
`

const MyAccount = (props)=>{
 
  const [loading, setLoading] = useState(true)
  const [fullname, setFullname] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [picture, setPicture] = useState(null)
  const [password, setPassword] = useState('')
  const [secPassword, setSecPassword] = useState('')
  const [files, setFiles] = useState([])
  const [loadingFile, setLoadingFile] = useState(false)
  const [lastLogin, setLastlogin] = useState(null)
  const [percent, setPercent] = useState(0)
  const [msg, setMsg] = useState('')
  const data = useContext(AuthContext)

  useEffect(()=>{

    async function getProfile(){
      try{
      const result = await authAxios.get(`${URL}/admin/profile`)
      setUsername(result.data.info.username)
      setEmail(result.data.info.email)
      setFullname(result.data.info.fullname)
      setPicture(result.data.info.picture)
      let d = new Date(result.data.info.lastLogin)
      let time = d.toLocaleTimeString().split(':')[0] + ':' +d.toLocaleTimeString().split(':')[1].substring(0, 2) +' '+d.toLocaleTimeString().split(' ')[1]
      let cDate = d.toDateString()
      setLastlogin({time, date: cDate})
      setLoading(false)
      }catch(e){
        setLoading(false)
        console.log(e)
        return
      }
    }
    getProfile()


  },[])

  const options = {
    onUploadProgress: (event)=>{
        const { loaded, total } = event
        let p = Math.round( (loaded * 100) / total )
        setPercent(p)
    }
  }

  const onSave = async()=>{

    try{
     
    setLoadingFile(true)
    if(!(fullname && fullname.trim() !== '')){
      setLoadingFile(false)
      setMsg('Please Check your name!')
      return
    }
    if(password && !(password === secPassword)) {
      setMsg('Check Your Password!');
      setLoadingFile(false)
      return
    }
    const fd = new FormData()
    fd.append('fullname', fullname)
    if(password) fd.append('password', password)
    if(files.length > 0) fd.append('avatar', files[0])

    let response = await authAxios.put(`${URL}/admin/profile`, fd, options)
    if(response.status === 200){
      setMsg('Saved!')
      let user = JSON.parse(localStorage.getItem('user'))
      let newUser = {...user, ...response.data.info}
      data.login(newUser)
    }
  }catch(e){
      console.log(e)
      setLoadingFile(false)
      setMsg('Error')
      return
    }
    setLoadingFile(false)
    
  }
  
  if(loading) return <Layout><Loading /></Layout>
  else
  return(
    <Layout>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 60, flexDirection: 'column'}}>
        <Picture picture={picture}/>
        <div style={{padding: 5, marginTop: 20, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start'}}> 
        <Field 
         label='Picture:' 
         placeholder='Choose Picture' 
         onChange={(event)=>{setFiles(event.target.files); setPicture(window.URL.createObjectURL(event.target.files[0]))}} 
         files={files}
         loading={loadingFile}
         percent={percent}
         type='file'
         />
        <Field 
          label='Full Name:'
          value={fullname}
          onChange={({target})=>{setFullname(target.value); setMsg('')}}
        />
          <Field 
            label='Username:'
            value={username}
            disabled
          />
        <Field 
          label='Email:'
          value={email}
          disabled
        />
        <Field 
          label='Password:'
          value={password}
          onChange={({target})=>{setPassword(target.value); setMsg('');}}
          type='password'
          placeholder='passowrd'
        />
        <Field 
          label='Confirm Password:'
          value={secPassword}
          type='password'
          placeholder='confirm password'
          onChange={({target})=>setSecPassword(target.value)}
        />
          {lastLogin && <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: 420, justifyContent: 'space-between'}}><p style={{fontWeight: 'bold',}}>Last Login:</p>{lastLogin.date} at {lastLogin.time} </div>}
          <Button style={{alignSelf: 'center', margin: 15}} onClick={onSave} disabled={loadingFile}>Save</Button>
          {msg && <p style={{fontSize: 13, alignSelf: 'center'}}>{msg}</p>}
          </div>
      </div>
    </Layout>
  )
}