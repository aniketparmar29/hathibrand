import { Box, Button, Image,Text } from '@chakra-ui/react'

import React, { useEffect, useState } from 'react'
import { useDispatch ,useSelector} from 'react-redux'
import {useParams} from "react-router-dom"
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import { getsingle } from '../Redux/ProductReducer/action'
import "../Style/nav.css"

const Signle = () => {
    const {id} = useParams()
    
    const dispatch=useDispatch();

    const single= useSelector((state)=>state.ProductReducer.single)
  

    useEffect(()=>{
      dispatch(getsingle(id))
     },[dispatch])
     console.log(single)
  return (
    <>
    <Navbar />

{single && (
  <Box
    display={["block", "block", "flex"]}
    mx={["20px", "40px", "100px"]}
    my="5%"
    pt={["130px"]}
    
  >
    <Box
      width={["100%", "50%", "60%"]}
      border="1px solid gray"
      mr={["0", "0", "50px"]}
      mb={["20px", "20px", "0"]}
    >
      <Image width={"100%"} src={single.image} />
    </Box>

    <Box
      border="1px solid gray"
      p={["4", "6"]}
      h={["auto", "auto", "400px"]}
      w={["100%", "50%", "40%"]}
      maxW={["100%", "50%", "400px"]}
      justifyContent="center"
      alignItems="center"
    >
     

      <Box
        mt="1"
        fontWeight="bold"
        as="h4"
        lineHeight="tight"
        isTruncated
        className='text-2xl'
      >
        {single.name}
      </Box>

      <Box mt={"5"}>
        <Box as="span" color="gray.600" fontSize="lg">
          MRP:
        </Box>
        <Box
          as="span"
          color="gray.700"
          fontSize="lg"
          className="line-through ml-2 text-xl"
        >
          {single.price + 100}₹
        </Box>
        <Box
          as="span"
          color="gray.700"
          fontSize="lg"
          fontWeight="bold"
          ml="2"
        >
          {single.price}₹
        </Box>
      </Box>

      <Box d="flex" mt="5" alignItems="baseline">
        <Text
          color="green"
          fontWeight="semibold"
          letterSpacing="wide"
          fontSize="lg"
          textTransform="uppercase"
          
        >
          Weight:-
          {single.weight >= 1000
            ? single.weight / 1000
            : single.weight}
          {single.weight === 1000 ? "kg" : "gm"}
        </Text>
      </Box>

      <Box d="flex" mt="5" alignItems="center">
        <Box as="span"  color="gray.600" fontSize="xl">
          In stock
        </Box>
      </Box>

      <Box d="flex" mt="5" alignItems="center">
        <Button
          borderRadius={0}
          width={"100%"}
          bgColor="#5E0E42"
          colorScheme="#440430"
          color={"white"}
        >
          Add to cart
        </Button>
      </Box>
    </Box>
  </Box>
)}

<Footer />
    </>
  )
}

export default Signle
