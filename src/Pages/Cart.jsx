import { Box } from '@chakra-ui/react';
import axios from 'axios'
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {getcart} from "../Redux/CartReducer/action"
import { useDispatch } from 'react-redux'


const Cart = () => {



    const dispatch=useDispatch();
    const cart= useSelector((state)=>state.cartReducer.cart)

  let user =window.localStorage.getItem("user")||{};
  if (user!=={}) {
    try {
      user = JSON.parse(user);
    } catch (error) {
      console.error("Error parsing user from local storage", error);
      user = {role:"hello"};
    }
  }else{
      user = {role:"hello"};
  } 
  
  useEffect(()=>{
    dispatch(getcart(user.id))
   },[dispatch])
   console.log(cart)
  
  
  return (
    <>
    {
      cart.map((el)=>(
        <Box>{el.pr_name}</Box>
        

      ))


    }
     
    
       

     
    

      
    </>
  )
}

export default Cart
