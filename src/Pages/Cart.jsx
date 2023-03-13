import { Box } from '@chakra-ui/react';
import axios from 'axios'
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';



const Cart = () => {
  const user= useSelector((state)=>state.userAuth.user)
  console.log(user)
    
  return (
    <>
    {
      user.cart==null?<Box>Cart is empty</Box>:
      user.cart.map((el)=>{
        <Box>{el.name}</Box>
      })
    }

      
    </>
  )
}

export default Cart
