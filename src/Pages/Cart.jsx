import axios from 'axios'
import React, { useEffect } from 'react'

const Cart = () => {

    useEffect(()=>{
        axios.get(`https://hathibrand.onrender.com/cart`).then((res)=>console.log(res.data)).catch((err)=>console.log(err))
     },[])
  return (
    <div>
      
    </div>
  )
}

export default Cart
