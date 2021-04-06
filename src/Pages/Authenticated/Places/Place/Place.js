import React, { useEffect, useState } from 'react'
import Layout from '../../../../layout/Layout'
import axios from 'axios'
import { URL } from '../../../../api/api'

const Place = (props)=>{

    const [ place, setPlace ] = useState(null)
    const [ loading, setLoading ] = useState(true)


    useEffect(()=>{
        async function getPlace(){
            
        }
    },[])


    return(
        <Layout>
            <div>
            </div>
        </Layout>
    )
}

export default Place