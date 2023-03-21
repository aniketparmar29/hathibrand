import React,{useState,useEffect} from 'react'
import { FaPlus,FaMinus } from 'react-icons/fa'
import { TiDelete} from 'react-icons/ti'
import { Box ,Image,Button, Flex} from '@chakra-ui/react';
import { removecart,editcart } from '../Redux/CartReducer/action';
import Aos from "aos"
 import "aos/dist/aos.css"

export const Cartcard = ( {el,userid,dispatch,Total}) => {
    console.log(el)

    const handleIncrease = () => {
        dispatch(editcart(userid,el.pr_id,{pr_que:el.pr_que+1}))
        // edit()
      };

      const del = ()=>{

        dispatch(removecart(userid,el.pr_id))
      }

      

 
      const handleDecrease = () => {
        if (el.pr_que > 1) {
          dispatch(editcart(userid,el.pr_id,{pr_que:el.pr_que-1}))
        }
      }
      let weight=el.pr_weight*el.pr_que

      
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
      <span className="font-medium">{el.pr_que}</span>
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
        <Box mt={"6%"} color="green">₹{el.pr_price*el.pr_que} </Box>
        <Box mt={"6%"}>
        {el.pr_category === "Agarbatti" ? (
                <Box
                  color="gray.500"
                  fontWeight="semibold"
                  letterSpacing="wide"
                  fontSize="sm"
                  textTransform="uppercase"
                  mt="2"
                >
                  {weight >= 1000 ?weight / 1000 : weight}
                  {weight >= 1000 ? "kg" : "gm"}
                </Box>
              ) : (
                <Box
                  color="gray.500"
                  fontWeight="semibold"
                  letterSpacing="wide"
                  fontSize="sm"
                  textTransform="uppercase"
                  mt="2"
                >
                  {weight >= 1000 ? weight / 1000 : weight}
                  {weight >= 1000 ? "l" : "ml"}
                </Box>
              )}

        </Box>
       
       <Box borderRadius={"50%"} height={['6']}  onClick={del} mt={"6%"} bgColor="#440430" color={"white"}><TiDelete className='text-2xl' /></Box> 

        </Flex>
        </Box>


        
        </Box>
    
    </>
  )
}
