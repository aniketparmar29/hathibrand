import { Box, Button, Input } from '@chakra-ui/react';
import React from 'react'
import { useState } from "react";
import StarRating from "./StarRating";

export default function Starform({single,user}) {
    const [rating, setRating] = useState(0);
    const [review, setreview] = useState("");
    const [post,setpost]=useState([])
  const handleRatingChange = (value) => {
    setRating(value);
  };

const reviewchange=(value)=>{
  setreview(value)


}
// const {"single_id": id, "pr_name":name} = single_id
const {user_id,user_name} = user;

 const postfunction=()=>{

   


 }
console.log(review)
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
