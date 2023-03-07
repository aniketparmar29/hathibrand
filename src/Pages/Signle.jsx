import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {useParams} from "react-router-dom"
import { getProducts } from '../Redux/ProductReducer/action'
const Signle = () => {
    const {id} = useParams()
    const [sData,setSdata] = useState({})
    const dispatch=useDispatch();

    console.log(id)

    useEffect(()=>{
        axios.get(`https://hathibrand.onrender.com/products/${id}`).then((res)=>setSdata(res.data)).catch((err)=>console.log(err))
     },[])

  return (
    <div>
      {sData && <div>
        <img src={sData.image}/>
        <p>{sData.name} </p>
        <p>{sData.description} </p>
        <p>{sData.price} </p>
        <p>{sData.category} </p>
        </div>
    }
    </div>
  )
}

export default Signle
