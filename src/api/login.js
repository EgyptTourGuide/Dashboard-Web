import { URL } from './api'



export const login = async ({username, password})=>{
    try{  

        let data = await JSON.stringify({username, password})
        const response = await fetch(`${URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
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