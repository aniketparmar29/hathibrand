import { Box, Button, Image,Text } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {useParams} from "react-router-dom"
import { getProducts } from '../Redux/ProductReducer/action'
import "../Style/nav.css"

const Signle = () => {
    const {id} = useParams()
    const [sData,setSdata] = useState({})
    const dispatch=useDispatch();

    console.log(id)

    useEffect(()=>{
        axios.get(`https://hathibrand.onrender.com/products/${id}`).then((res)=>setSdata(res.data)).catch((err)=>console.log(err))
     },[])

  return (
    <>
    <Box className='big_boxxp'>
    <Box>
    {sData && <Box display={["0","0","flex"]} ml={["60px","100px"]} mt={"5%"} pt={["130px"]}>
       <Box width={["95%","50%","40%"]} border="1px solid gray" ><Image width={"100%"}  src={sData.image} /></Box>
       <Box border="1px solid gray" mr={["20px","20px","100px"]} pl={[0,0,0,"30px"]} pt={["10%"]} h={["322px","300px","400px"]}>
       <Text color={"white"}  fontSize="3xl">{sData.name} </Text>
        <Text color={"white"}>{sData.description} </Text>
        <Text color={"white"} fontSize="2xl">{sData.price}₹ </Text>
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
