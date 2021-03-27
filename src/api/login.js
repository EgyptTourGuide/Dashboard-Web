import { URL } from './api'



export const login = async ({username, password})=>{
    try{  
        const response = await fetch(`${URL}/login/admin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        })
        let resJson = await response.json()
        if(response.status !== 200){
            return {
                error: true,
                errors: resJson.errors
            }  
        }
        else{
            return {
                error: false,
                user: resJson
            }
        }
    }catch(e){
        console.log(e)
    }
}