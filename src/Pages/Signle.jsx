import { Box, Button, Image,Text } from '@chakra-ui/react'
import { FaPlus,FaMinus } from 'react-icons/fa'
import React, { useEffect, useState } from 'react'
import { useDispatch ,useSelector} from 'react-redux'
import {Link, useParams} from "react-router-dom"
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import { getsingle } from '../Redux/ProductReducer/action'
import {postcart} from "../Redux/CartReducer/action"
import "../Style/nav.css"
import RatingBar from "../Admin/RatingBar"
import { useAlert } from "react-alert";
import Starform from '../Components/Starform'
const Signle = () => {
  const alert = useAlert();
  const isAuth= useSelector((state)=>state.userAuth.isAuth)
    const {id} = useParams()
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

    const dispatch=useDispatch();

    const single= useSelector((state)=>state.ProductReducer.single)

    const [quantity, setQuantity] = useState(1);
      const [showalert,setshowalert]=useState(false)

  const handleIncrease = () => {
    setQuantity(quantity + 1);
   
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }
  let mrp=single.price+100;
  window.document.title=single.name
  const discount=Math.floor(((mrp-single.price)/mrp)*100);
    useEffect(()=>{
      dispatch(getsingle(id))
      if(showalert===true){
        alert.success("Product Added To Cart")
        setshowalert(!showalert)
      }
     },[dispatch,alert,showalert])
     const cartp={
      pr_name:single.name, 
      pr_price:single.price,
       pr_que:quantity,
        pr_id:single.id, 
        pr_img:single.image,
    pr_category:single.Category,
        pr_weight:single.weight,
         user_id:user.id
     }

  const addcart=()=>{
    if(isAuth===false){
      alert.error("Please Login To Add Product")
      return;
    }
     dispatch(postcart(cartp))
     setshowalert(true)
  }

  return (
    <>
    <Navbar />
{single && (
  <Box
    display={"flex"}
    flexDirection={["column","column","row"]}
    mx={["0","0","10%"]}
    my="5%"
    
    justifyContent="center"
    alignItems="center"
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
      <Box mt={"4"} display={"flex"} gap="2"><span>Rating:</span><RatingBar rating={5}/></Box>

      <Box mt={"4"}>
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
      
      <Box mt={"4"}>
        <Box as="span" color="red.500" fontSize="lg">
          Discount:
        </Box>
        <Box
          as="span"
          color="red.500"
          fontSize="lg"
          className=" ml-2 text-xl"
        >
          {discount}%
        </Box>
      </Box>

      <Box d="flex" mt="5" alignItems="baseline">
        <Text
          color="yellow.800"
          fontWeight="semibold"
          letterSpacing="wide"
          fontSize="lg"
        >
          Weight:
          {single.weight >= 1000
            ? single.weight / 1000
            : single.weight}
          {single.weight >= 1000 ? "kg" : "gm"}
        </Text>
      </Box>
      <Box mt={"4"} className="flex  space-x-4">
      <Button
        size={'xs'}
        bgColor="#440430"
        type="button"
        color='white'
        onClick={handleDecrease}
        className="bg-gray-100 text-gray-500 rounded-md p-2 hover:bg-gray-200 focus:outline-none"
      >
        <FaMinus/>
      </Button>
      <span className="font-medium">{quantity}</span>
      <Button
       size={'xs'}
        bgColor="#440430"
        color='white'
        type="button"
        onClick={handleIncrease}
        className="bg-gray-100 text-gray-500 rounded-md p-2 hover:bg-gray-200 focus:outline-none"
      >
       <FaPlus/>
      </Button>
    </Box>

      <Box d="flex" mt="5" alignItems="center" >
        <Box as="span"  color="green" fontSize="xl">
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
          onClick={addcart}
        >
          Add to cart
        </Button>
      </Box>

     
    </Box>
  </Box>
)}
<Starform  single={single} user={user} />
<Footer />
    </>
  )
}

export default Signle
