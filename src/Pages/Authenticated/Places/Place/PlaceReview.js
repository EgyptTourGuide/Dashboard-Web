import React, { useState, useEffect } from 'react'
import Layout from "../../../../layout/Layout"
import { authAxios, URL } from '../../../../api/api'
import Loading from '../../../../components/Loading'
import ReactStars from 'react-stars'
import Button from '../../../../components/Button/Button'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
const PlaceReview = (props)=>{
    const [ loading, setLoading ] = useState(true)
    const [ placeForm, setPlaceForm ] = useState(null)
    const [ comments, setComments ] = useState([])
    const [ data, setData ] = useState('requests')
    const [ reviews, setReviews ] = useState([])

    useEffect(()=>{
        async function getInfo(){
            try{
                let Q_res = await authAxios.get(`${URL}/places/${props.match.params.id}/form`)
                let C_res = await authAxios.get(`${URL}/places/${props.match.params.id}`)
                let R_res = await authAxios.get(`${URL}/places/${props.match.params.id}/review/requests`)
                setPlaceForm(Q_res.data.placeForm)
                setComments(C_res.data.place.reviews)
                setReviews(R_res.data.reviews)
            }catch(e){
                console.log(e)
            }
            setLoading(false)
            return
        }
        getInfo()
    },[props.match.params.id, data])

    const accept = async(id)=>{
        const body = {
            id,
            isApproved: true
        }

        const res = await authAxios.post(`${URL}/places/${placeForm.id}/review/requests`, body)
        if(res.status === 200){
            let newReviews = reviews.filter(review=>review.id !== id)
            setReviews(newReviews)
        }
    }
    const decline = async(id)=>{
        const body = {
            id,
            isApproved: false
        }

        const res = await authAxios.post(`${URL}/places/${placeForm.id}/review/requests`, body)
        if(res.status === 200){
            let newReviews = reviews.filter(review=>review.id !== id)
            setReviews(newReviews)
        }
    }

    if(loading) return <Layout><Loading /></Layout>
    else
    return(
        <Layout to={`/places/${placeForm.id}`} head={placeForm !== null && `Places / ${placeForm.name} / Reviews`}>
             <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: 15}}>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <div style={{width: 120, display: 'flex', justifyContent: 'space-between'}}>
                            <label style={{width: 120, fontWeight: data === 'comments' ? 'bold' : 'normal'}}>{'Comments'}</label>
                            <input type='radio' name='comments' value='comments' checked={data === 'comments'} onChange={({target})=>setData(target.value)} />
                        </div>
                        <div style={{width: 120, display: 'flex', justifyContent: 'space-between'}}>
                            <label style={{width: 120, fontWeight: data === 'requests' ? 'bold' : 'normal'}}>{'Requests'}</label>
                            <input type='radio' name='requests' value='requests' checked={data === 'requests'} onChange={({target})=>setData(target.value)} /> 
                        </div>
                    </div>      
                    <div style={{width:'100%', borderBottom: '1px dotted black', marginTop: 15, marginBottom: 30}}/>            
                    { data === 'comments' ? comments.length > 0 && comments.map(review=><ReviewCard comment key={review.id} review={review}/>) : (
                        reviews.length > 0 && reviews.map(review=><ReviewCard accept={accept} decline={decline} conditions={placeForm.conditions} key={review.id} review={review}/>))
                    }
             </div>
        </Layout>
    )
}


const UserDiv = styled(Link)`
    display: flex;
    flex-direction: row; 
    justify-content: center; 
    align-items: center; 
    text-decoration: none;
    color: black;
    padding: 10px;
    border-radius: 5px;
    transition: background-color 0.18s;
    &:hover {
        background-color: rgba(0,0,0,0.2);
    }
`


const ReviewCard = (props)=>{

    const [ isValid, setIsValid ] = useState(null)
    const [ date, setDate ] = useState(null)

    useEffect(()=>{
        if(!props.comment){
        const firstIndex = props.conditions[0].first - 1
        const secondIndex = props.conditions[0].second - 1
        const thirdIndex = props.conditions[1].first - 1
        const lastIndex = props.conditions[1].second - 1
        const { review } = props
        if(review.answers[firstIndex] === review.answers[secondIndex] && review.answers[thirdIndex] !== review.answers[lastIndex]){
            setIsValid(true)
        }else{
            setIsValid(false)
        }
        }else{
            let d = new Date(props.review.createdAt)
            let time = d.toLocaleTimeString().split(':')[0] + ':' +d.toLocaleTimeString().split(':')[1].substring(0, 2) +' '+d.toLocaleTimeString().split(' ')[1]
            let cDate = d.toDateString()
            setDate({time, cDate})            
        }
    },[props])

    const accept = ()=>{
        if(!props.comment){
            props.accept(props.review.id)
        }else return
    }
    const decline = ()=>{
        if(!props.comment){
            props.decline(props.review.id)
        }else return
    }

    
    return(
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: 5}}>
        <div style={{display: 'flex', width: 750, border: '1px solid gray', margin: 5, padding: 7, flexDirection: 'column', borderRadius: 10}}>
           <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 5, paddingLeft: 15, paddingRight: 15}}>
               <UserDiv to={`/touirsts/${props.review.user.id}`}>
                <div style={{height: 50, width: 50, borderRadius: 50/2, backgroundImage: `url(${props.review.user.picture})`, backgroundSize: 'cover', backgroundPosition: 'center'}} />
                <p style={{padding: 0, margin: 0, marginLeft: 15,}}>{props.review.user.name}</p>
               </UserDiv>
               <div style={{justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
                <ReactStars
                    count={5}
                    edit={false}
                    value={props.review.rate}
                    size={24}
                    color2={'#ffd700'} 
                    onChange={(e)=>console.log(e)}
                />
                 { props.comment && <> 
                 <p style={{padding: 0, margin: 0, fontSize: 12, color: 'rgba(0,0,0,0.85)'}}>{date !== null && date.time} </p> 
                 <p style={{padding: 0, margin: 0, fontSize: 12, color: 'rgba(0,0,0,0.85)'}}>{date !== null && date.cDate}</p></> }
                 { !props.comment &&
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 100}}> 
                <p style={{padding: 0, margin: 0, fontSize: 13}}>State: </p>
                <p style={{padding: 0, margin: 0, fontSize: 13, color: isValid === null  ? 'gray' : isValid ? 'darkgreen' : 'darkred'}}>{isValid === null ? 'Loading..' : isValid ? 'Accepted' : 'Spam'}</p>
                </div>
                }
                </div>
           </div>
           <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
               <p style={{margin: 5, padding: 4, backgroundColor: 'rgba(0,0,0,0.2)', width: 500, textAlign: 'center', fontSize: 14, borderRadius: 4}}>"{props.review.comment}"</p>
           </div>
        </div>
          <div>
            { !props.comment && <Button onClick={accept}>Accept</Button>}
            <Button onClick={decline}>{ props.comment ? 'Delete' : 'Decline'}</Button>
          </div>
        </div>
    )
}


export default PlaceReview