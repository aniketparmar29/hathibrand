import { Box, Button, Image,Text } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch ,useSelector} from 'react-redux'
import {useParams} from "react-router-dom"
import Navbar from '../Components/Navbar'
import { getsingle } from '../Redux/ProductReducer/action'
import "../Style/nav.css"

const Signle = () => {
    const {id} = useParams()
    
    const dispatch=useDispatch();

    const single= useSelector((state)=>state.ProductReducer.single)
  

    useEffect(()=>{
      dispatch(getsingle(id))
     },[])
     console.log(single)
  return (
    <>
    <Navbar/>
    <Box >
    <Box>
    {single && <Box display={["0","0","flex"]} ml={["60px","100px"]} mt={"5%"} pt={["130px"]}>
       <Box width={["95%","50%","60%"]} border="0px solid gray" ><Image width={"100%"}  src={single.image} /></Box>
       <Box border="0px solid gray" mr={["20px","20px","100px"]} pl={[0,0,0,"30px"]} pt={["10%"]} h={["322px","300px","400px"]}>
       <Text color={"black"}  fontSize="3xl">{single.name} </Text>
        <Text color={"black"}>{single.description} </Text>
        <Text color={"black"} fontSize="2xl">₹ {single.price}</Text>
        <Text>{single.weight>=1000?single.weight/1000:single.weight}{single.weight==1000?"kg":"gm"}</Text>

        <Button>Add to cart</Button>
       </Box>
    
        </Box>
    }
    </Box>
    </Box>      
    </>
  )
}

export default Signle
