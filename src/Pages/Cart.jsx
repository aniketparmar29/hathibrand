import {Box, Flex, Input,Stack,InputGroup,InputRightElement, Button} from "@chakra-ui/react"
import { Cartcard } from '../Components/Cartcard';
import React, { useEffect,useState } from 'react';
import { useSelector } from 'react-redux';
import {getcart} from "../Redux/CartReducer/action"
import { useDispatch } from 'react-redux'
import Navbar from "../Components/Navbar"
 
 

const Cart = () => {

  window.document.title="Cart-Hathibrand"
    const dispatch=useDispatch();
    const cart= useSelector((state)=>state.cartReducer.cart)
    const rmv= useSelector((state)=>state.cartReducer.rmv)
    
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
    <Flex direction={["column","row","row"]}>
    <Box  border={"0px solid gray"} w={["100%","80%"]}>
    {

      cart.map((el)=>(
        <>
         <Cartcard el={el} key={el.id} userid={user.id} dispatch={dispatch}  Total={Total}/>
     
        </>

      ))


    }
     
     </Box>
     <Box height={["500","500"]} width={["100%","30%"]} >

      <Box border={"1px solid gray"} m="4" borderRadius={"20"} height="30%" >
        <Box fontWeight={"bold" } fontSize="xl" py={"5"} px="8">Have Coupon?</Box>
        <Stack spacing={4}>
  <InputGroup w={"90%"} pl="10%">
    <InputRightElement
      pointerEvents='none'
      children={"Apply"}
      color="white"
      bgColor="#440430"
      width={"30%"}
    />
    <Input type='tel' placeholder='Enter Code' />
  </InputGroup>
  </Stack>
  
      </Box>
      <Box border={"1px solid gray"} m="4" height="30%" borderRadius={"20"}>
        <Box>
          <Flex display={"flex"}>
            <Box fontWeight={"bold"} fontSize="xl" ml={"20%"}  mt="5%">
              Total price : <span className="text-green-600">{Total}</span>
             <Button ml={"30px"} mt={["5px","10px"]} bgColor={"#440430"} color="white">Checkout</Button>
            </Box>
            
           
          </Flex>
        </Box>
      </Box>
     
      
       </Box>
       

    </Flex>
    
     
    

      
    </>
  )
}

export default Cart
