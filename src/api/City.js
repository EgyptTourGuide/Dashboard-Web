import axios from 'axios'
import { URL } from './api'

export const getCity = async(id)=>{
    let city
    try{
        let res = await axios.get(`${URL}/cities/${id}`)
        city = res.data.city
    }catch(e){
        console.log(e)
        return 
    }
    return city
}