import {Box, Flex, Input,Stack,InputGroup,InputRightElement, Button} from "@chakra-ui/react"
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
    <Flex direction={["column","column","row"]}>
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
     <Box  className="shadow-lg h-28 w-36 flex-col justify-center items-center "  borderRadius={"20"} m={"2"} >
             <p>Total price : <span className="text-green-600">{Total}</span></p>
             <Link to="/checkout" className="text-white bg-[#440430] p-3 rounded-lg ">Checkout</Link>   
       </Box>
       

    </Flex>
}
     <Footer/>
    

      
    </>
  )
}

export default Cart
