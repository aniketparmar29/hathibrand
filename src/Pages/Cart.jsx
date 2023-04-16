import {Box, Flex, } from "@chakra-ui/react"
import { Cartcard } from '../Components/Cartcard';
import React, { useEffect,useState } from 'react';
import { useSelector } from 'react-redux';
import {getcart} from "../Redux/CartReducer/action"
import { useDispatch } from 'react-redux'
import Navbar from "../Components/Navbar"
import Footer from '../Components/Footer'
import { Link } from "react-router-dom";
const Cart = () => {

  window.document.title="Cart-Hathibrand"
    const dispatch=useDispatch();
    const cart= useSelector((state)=>state.cartReducer.cart)
    const rmv= useSelector((state)=>state.cartReducer.rmv)
  const isAuth= useSelector((state)=>state.userAuth.isAuth)
    
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
   },[dispatch,user.id,rmv])

   
    const[Total,setTotal]= useState(0)

    const calculateTotal = () => {
      let sum = cart.reduce(
        (acc, item) => acc + item.pr_que * item.pr_price,
        0
      )
      
      setTotal(sum);
    };
    useEffect(() => {
      calculateTotal();
    }, [cart]);
  return (
    <>
    <Navbar/>
    {!isAuth && <div className="flex justify-center items-center text-3xl w-[100%] m-auto text-center font-extrabold my-28">LOGIN THEN YOU CAN ACCESS YOUR CART</div>}
    {isAuth && 
    <Flex justifyContent={"space-around"} direction={["column","column","row"]}>
    <Box border={"0px solid gray"} w={["100%", "90%","80%"]}>
    {cart.length !== 0 ? (
  cart.map((el) => (
    <Cartcard
      key={el.id}
      el={el}
      userid={user.id}
      dispatch={dispatch}
      Total={Total}
    />
  ))
) : (
  <div className="flex justify-center items-center text-3xl w-[100%] m-auto text-center font-extrabold my-28">
    ADD ITEMS IN CART
  </div>
)}


          </Box>

           <div className="shadow-lg text-center font-bold  p-10 h-56  " style={{display:"flex",flexDirection:"column"}}>
            <p>Total: <span>{Total}</span></p>
            <Link to="/checkout" className="bg-[#440430] p-2 mt-5 text-white rounded-lg">Checkout</Link>
           </div>
    </Flex>
}
     <Footer/>
    

      
    </>
  )
}

export default Cart
