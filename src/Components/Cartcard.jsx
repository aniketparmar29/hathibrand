import React,{useEffect} from 'react'
import { FaPlus,FaMinus } from 'react-icons/fa'
import { Box ,Image,Button, Flex} from '@chakra-ui/react';
import { removecart,editcart } from '../Redux/CartReducer/action';
import Aos from "aos"
 import "aos/dist/aos.css"

export const Cartcard = ( {el,userid,dispatch,Total,key}) => {
    const handleIncrease = () => {
        dispatch(editcart(userid,el.pr_id,{pr_que:el.pr_que+1}))
      };

      const del = ()=>{
        dispatch(removecart(userid,el.pr_id))
      }

      

 
      const handleDecrease = () => {
        if (el.pr_que > 1) {
          dispatch(editcart(userid,el.pr_id,{pr_que:el.pr_que-1}))
        }else{
          dispatch(removecart(userid,el.pr_id))
        }
      }
      let weight=el.pr_weight*el.pr_que

      
        useEffect(() => {
          Aos.init({ duration: 1000});
        }, [Total]);
     
  return (
    <>
  

  <Box data-aos="fade-up" fontWeight={"bold"} border={"0px solid gray"}  className="mb-5 shadow-lg shadow-gray" key={key}>
  <Box border={"0px solid green"}>
    <Box>
        <Flex  justifyContent={"space-between"} > <Box m={"auto"} pl={["20px","40px"]} border={"0px solid red"} w={["70%","35%"]}><Image p={"3%"} w={["90%","100%"]} border={"0px solid red"} src={el.pr_img}/></Box>

        <Box width={"50%"} justifyContent="center" alignItems={"center"} textAlign="center" display={["block","block","flex"]} >
       
        <Box border={"0px solid red"}  mt={"6%"} fontSize={["sm","xl"]} fontFamily={"revert-layer"}>{el.pr_name}</Box>
        
       
        <Box border={"0px solid red"} pt={["0","2%"]}  pl={["0","2%"]}  color="green">₹{el.pr_price*el.pr_que} </Box>
        <Box   p={["0","4%"]}>
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
           
         <Box mt="2%" className="flex items-center justify-center space-x-4 " >
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
      <span className="font-medium" >{el.pr_que}</span>
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
    </Box>
       <Button ml={["10%","1%"]} mr="3%"   height={['8']} textAlign="center" mb={"9px"} p="6px" width="90px" onClick={del} mt={["4%","4.4%"]} bgColor="#440430" color={"white"}>Remove</Button> 
      
      </Box></Flex>
        </Box>
        </Box>


        
        </Box>
    
    </>
  )
}
