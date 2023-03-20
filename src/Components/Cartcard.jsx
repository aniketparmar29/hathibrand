import React,{useState,useEffect} from 'react'
import { FaPlus,FaMinus } from 'react-icons/fa'
import { TiDelete} from 'react-icons/ti'
import { Box ,Image,Button, Flex} from '@chakra-ui/react';
import { removecart,editcart } from '../Redux/CartReducer/action';
import Aos from "aos"
 import "aos/dist/aos.css"

export const Cartcard = ( {el,userid,dispatch,Total}) => {
    
    const [quantity, setQuantity] = useState(el.pr_que);

    const handleIncrease = () => {
        setQuantity(quantity + 1);
        edit()
      };

      const del = ()=>{

        dispatch(removecart(userid,el.pr_id))
      }

      const quntitybody={
        pr_que:quantity,
      }
     
      const edit = ()=>{

        dispatch(editcart(userid,el.pr_id,quntitybody))
      }
      

 
      const handleDecrease = () => {
        if (quantity > 1) {
          setQuantity(quantity - 1);
          edit()
        }
      }
      let weight=el.pr_weight*quantity

      
        useEffect(() => {
          Aos.init({ duration: 1000});
        }, [Total]);
     
  return (
    <>
  

<Box data-aos="fade-up" fontWeight={"bold"}   key={el.id} border={"0px solid gray"} py="2%" px="3%"  pl={"2"} >
        <Box border={"0px solid red"} borderBottom="1px" >
        <Flex gap={["2%","5%"]} >
        <Image w={["24%"]} src={el.pr_img}/>
        <Box mt={"6%"} fontSize={["sm","xl"]} fontFamily={"revert-layer"}>{el.pr_name}</Box>
        
        
         <div className="flex items-center justify-center space-x-4">
      <Button 
      colorScheme="#440430"
   
         bgColor={"#440430"}
         color="white"
        type="button"
        onClick={handleDecrease}
        size={'xs'}
        className="bg-gray-100 text-gray-500 rounded-md p-2 hover:bg-gray-200 focus:outline-none"
      >
        <FaMinus/>
      </Button>
      <span className="font-medium">{quantity}</span>
      <Button
      colorScheme="#440430"
      bgColor={"#440430"}
      color="white"
        type="button"
        size={"xs"}
        onClick={handleIncrease}
        className="bg-gray-100 text-gray-500 rounded-md p-2 hover:bg-gray-200 focus:outline-none"
      >
       <FaPlus/>
      </Button>
    </div>
        <Box mt={"6%"} color="green">₹{el.pr_price*quantity} </Box>
        <Box mt={"6%"}>
        {weight >= 1000
            ? weight / 1000
            : weight}
          {weight >= 1000 ? "kg" : "gm"}

        </Box>
       
       <Box borderRadius={"50%"} height={['6']}  onClick={del} mt={"6%"} bgColor="#440430" color={"white"}><TiDelete className='text-2xl' /></Box> 

        </Flex>
        </Box>


        
        </Box>
    
    </>
  )
}
