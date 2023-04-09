import { Box, Button, Input } from '@chakra-ui/react';
import React from 'react'
import { useState } from "react";
import StarRating from "./StarRating";
import {createreviw} from '../Redux/ProductReducer/action';
import {useDispatch} from 'react-redux';
import { useAlert } from "react-alert";

export default function Starform({single,user}) {
  const alert = useAlert();
    const dispatch = useDispatch();
    const [rating, setRating] = useState(0);
    const [review, setreview] = useState("");
    const [post,setpost]=useState([])
  const handleRatingChange = (value) => {
    setRating(value);
  };

const reviewchange=(value)=>{
  setreview(value)
}
const postfunction=()=>{
   const finalreview={
     review,
     rating,
     user_name:user.name,
     pr_id:single.id,
     pr_name:single.name,
     user_id:user.id
   } 
  dispatch(createreviw(finalreview));
  alert.success("Review Post Successfuly")
 }
  return (
    <>
     <Box m={["3"]} display={"flex"} flexDirection={"column"} padding={"10"} justifyContent={"center"} alignItems={"center"} borderRadius={"20"} border={"1px solid gray"} bgColor="#440430" >
      <Box  fontSize={"3xl"} color="white">Rate this product:</Box>
      <StarRating  rating={rating} ml="2%" onRatingChange={handleRatingChange} />
      <Input value={review}  bgColor={"#581845"} height={"100px"} w={["80%","90%"]}  mt="2%" color="white" onChange={(e)=>reviewchange(e.target.value)} placeholder='Describe your experience...'/>
      <Button mt={"2%"} size={"lg"} colorScheme={"#440430"}w={["80%","90%"]} border={"1px solid gray"} bgColor={"#581845"} onClick={postfunction} color="whiteAlpha.700">Post</Button>
    </Box>

    </>
  )
}
