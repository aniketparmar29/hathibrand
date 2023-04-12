import React from 'react'
import axios from 'axios';

function PayButton({cartItems,user}) {

    const handlecheckout = () =>{
        axios.post(`https://real-cyan-swallow-boot.cyclic.app/create-checkout-session`,{cartItems, userId:user.id}).then((res)=>{
            if(res.data.url){
                window.location.href = res.data.url
            }
        }).catch((err)=> console.log(err.message))
    }
  return (
    <>
    <button className='bg-[#440430] p-2 rounded-lg text-white ' onClick={()=>handlecheckout()}>Checkout</button>
    </>
  )
}

export default PayButton