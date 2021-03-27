import axios from 'axios'

export const URL = 'http://127.0.0.1:3001'


const getToken = async()=>{
    try{
    const user = JSON.parse(localStorage.getItem('user'))
    const refreshToken = user.refreshToken
    const token = await (await axios.post(`${URL}/token`, {refreshToken})).data.token
    console.log('New Token!')
    localStorage.setItem('user', JSON.stringify({...user, token}))
    return token
    }catch(e){
        localStorage.clear()
        window.location.href = "/login"
        console.log(e)
    }
}


export const authAxios = axios.create()

authAxios.interceptors.request.use(async config => {
     
    //TODO 
    // 1- Check for refresh token if not expired
    // 2- Check for token if not null

    config.headers.authorization = await JSON.parse(localStorage.getItem('user')).token
    return config
  },
  error => {
    Promise.reject(error)
})

authAxios.interceptors.response.use(response=>response, 
    async function(error){
          try{
          const originalRequest = error.config
          if(error.response.status === 403){
              const access_token = await getToken()
              axios.defaults.headers.common['authorization'] = access_token
              return authAxios(originalRequest)
          }
          return Promise.reject(error)
        }catch(e){
            console.log(e)
            return
        }
})

