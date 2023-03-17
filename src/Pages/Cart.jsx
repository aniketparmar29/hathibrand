import {Box} from "@chakra-ui/react"
import axios from 'axios'
import { Cartcard } from '../Components/Cartcard';
import React, { useEffect,useState } from 'react';
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
   },[dispatch,cart])


  
  
  
  return (
    <>
     <Box border={"1px solid gray"} w={["100%","70%"]}>
    {

      cart.map((el)=>(
        <>
         <Cartcard el={el} key={el.id} userid={user.id} dispatch={dispatch}/>
     
        </>

      ))


    }
     
     </Box>
       

     
    

      
    </>
  )
}

export default Cart
