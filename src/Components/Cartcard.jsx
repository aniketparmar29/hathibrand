import React,{useState,useEffect} from 'react'
import { FaPlus,FaMinus } from 'react-icons/fa'
import { TiDelete} from 'react-icons/ti'
import { Box ,Image,Button, Flex} from '@chakra-ui/react';
import { removecart,editcart } from '../Redux/CartReducer/action';


export const Cartcard = ( {el,userid,dispatch,key}) => {
    
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
  return (
    <>

<Box key={el.id} border={"0px solid gray"} py="1%" px="3%" mt={"3%"}>
        <Box border={"1px solid gray"} >
        <Flex gap={"5%"} >
        <Image w={"15%"} src={el.pr_img}/>
        <Box mt={"3%"}>{el.pr_name}</Box>
        
        
         <div className="flex items-center justify-center space-x-4">
      <button
        type="button"
        onClick={handleDecrease}
        className="bg-gray-100 text-gray-500 rounded-md p-2 hover:bg-gray-200 focus:outline-none"
      >
        <FaMinus/>
      </button>
      <span className="font-medium">{quantity}</span>
      <button
        type="button"
        onClick={handleIncrease}
        className="bg-gray-100 text-gray-500 rounded-md p-2 hover:bg-gray-200 focus:outline-none"
      >
       <FaPlus/>
      </button>
    </div>
        <Box mt={"3%"}>{el.pr_price*quantity}</Box>
        <Box mt={"3%"}>
        {weight >= 1000
            ? weight / 1000
            : weight}
          {weight >= 1000 ? "kg" : "gm"}
        </Box>
       <Box  onClick={del} mt={"3%"}><TiDelete className='text-2xl' /></Box> 

        </Flex>
        </Box>
        </Box>
    
    </>
  )
}
