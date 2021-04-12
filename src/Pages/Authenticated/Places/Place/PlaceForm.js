import React, { useEffect, useState } from 'react'
import Layout from '../../../../layout/Layout'
import { authAxios, URL } from '../../../../api/api'
import Input from '../../../../components/Input/Input'
import Button from '../../../../components/Button/Button'
import { ListWithDelete } from '../../../../components/List/List'
import Loading from '../../../../components/Loading'

const PlaceForm = (props)=>{

    const [ placeForm, setForm ] = useState(null) 
    const [ loading, setLoading ] = useState(true)
    const [ text, setText ] = useState('')
    const [first, setFirst] = useState({})
    const [second, setSecond] = useState({})
    const [ msg, setMsg ] = useState('')

    useEffect(()=>{
            async function getInfo(){
                try{
                    let res = await authAxios.get(`${URL}/places/${props.match.params.id}/form`)
                    const { questions, conditions, name, id } = res.data.placeForm
                    setForm({name, questions, conditions, id})
                    if(conditions.length > 0){
                        setFirst(conditions[0])
                        setSecond(conditions[1])
                    }else{
                        setFirst({first: '', second: '', isEqual: true})
                        setSecond({first: '', second: '', isEqual: false})
                    }
                }catch(e){
                    console.log(e)
                }
                setLoading(false)
                return
            }
    
            getInfo()
    },[props.match.params.id])


    const onAdd = ()=>{
        const q = placeForm.questions
        if(q.length < 4 && text){
            setForm({...placeForm, questions: [...q, text]})
            setText('')
        }
    }

    const onDelete = (value)=>{
        const q = placeForm.questions
        let temp = q.filter(question=>question !== value)
        setForm({...placeForm, questions: temp})
    }
   

    const onSave = async()=>{
           
           try{
           console.log(first)
           console.log(second)
           console.log(placeForm.questions)

           if(first && second && placeForm.questions.length === 4){

                const newForm = {
                    questions: placeForm.questions,
                    conditions: JSON.stringify([first, second])
                }

               const req = await authAxios.post(`${URL}/places/${placeForm.id}/form`, {placeForm: {...newForm}})
               if(req.status === 200){
                setMsg('Saved')
               }
           }else{
               setMsg('Required 4 Questions and conditions')
           }
        }catch(e){
            setMsg(e)
        }
    }
     
    if(loading){
        return <Loading />
    }else
    return(
        <Layout to={{pathname: `/places/${props.match.params.id}`}} head={`${placeForm !== null && `Places / ${placeForm.name} / Form`}`}>
            <div style={styles.formCon}>
            <div style={styles.q}>
            <div style={styles.qCon}>
                <h1>Questions: </h1>
                <div style={{overflow: 'auto'}}>
                {placeForm && <ol>
                     {placeForm.questions.map(q=><li key={q}><div style={{width: 100}}><ListWithDelete value={q} key={q} onDelete={onDelete} /></div></li>)}
                 </ol>}
                 </div>
                 <div style={{display: 'flex', flexDirection: 'row'}}>
                 <Input style={styles.addInp} value={text} onChange={({target})=>setText(target.value)} />
                 <Button style={styles.addBtn} onClick={onAdd}>Add</Button>
                 </div>

            </div>
            <div style={styles.c}>
            <h1>Conditions: </h1>
            <div style={{marginLeft: 50}}>
                 <ol>
                     <li><div style={styles.liView}>Question number <Input 
                     value={first.first}
                     maxLength="1" 
                     style={styles.inp} 
                     width={40} 
                     onChange={({target})=>setFirst({...first, isEqual: true, first: target.value})}
                     /> == number  <Input 
                        value={first.second}
                        maxLength="1" 
                        style={styles.inp} 
                        width={40} 
                        onChange={({target})=>setFirst({...first, isEqual: true, second: target.value})}

                        /></div></li>
                     <li><div style={styles.liView}>Question number <Input 
                    value={second.first}
                     maxLength="1" 
                     style={styles.inp} 
                     width={40} 
                     onChange={({target})=>setSecond({...second, isEqual: false, first: target.value})}

                     /> != number  <Input 
                        value={second.second}
                        maxLength="1" 
                        style={styles.inp} 
                        width={40} 
                        onChange={({target})=>setSecond({...second, isEqual: false, second: target.value})}

                     /></div></li>
                 </ol>
            </div>
            </div>
            </div>
            <Button style={{margin: 15, marginRight: 90}} onClick={onSave}>Save</Button>
            {msg && <p style={{marginRight: 70, fontSize: 13}}>{msg}!</p>}
            </div>

        </Layout>
    )
}


const styles = {
    formCon: {
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    q:{
        display: 'flex', 
        alignItems: 'center', 
        height: 360
    },
    qCon:{
        height: 250, 
        display: 'flex', 
        justifyContent: 'space-between', 
        flexDirection: 'column'
    },
    c:{
        height: 250, 
        borderLeft: '1px dotted black', 
        paddingLeft: 50
    },
    inp: {
        margin: 5, 
        textAlign: 'center'
    },
    liView: {
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    addInp:{
        width: 200, 
        borderRadius: 0, 
        borderTop: 0, 
        borderLeft: 0, 
        borderRight: 0
    },
    addBtn:{
        margin: 0, 
        marginRight: 10, 
        border: 0, 
        borderRadius: 1
    }
}

export default PlaceForm