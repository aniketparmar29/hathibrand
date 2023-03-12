import React,{useEffect, useState} from 'react';
import {Box,Text,Input,Image, useMediaQuery, InputGroup,InputRightElement} from "@chakra-ui/react"
import logo from '../assets/logo.png';
import "../Style/nav.css"
import { useDispatch,useSelector } from "react-redux";
import { logoutUser } from "../Redux/AuthReducer/user.actions";
import { getsearch } from '../Redux/ProductReducer/action';
import {GrUserAdmin} from "react-icons/gr"
import {SearchIcon} from "@chakra-ui/icons"
import {FaShoppingCart } from 'react-icons/fa'

import { Link } from 'react-router-dom';

function Navbar() {
 
  const [color,setColor]=useState(false);
  const dispatch = useDispatch();
  const isAuth= useSelector((state)=>state.userAuth.isAuth)
  const user= useSelector((state)=>state.userAuth.user)
  const searchproducts= useSelector((state)=>state.ProductReducer.searchproducts)


  const changeColor=()=>{
    if(window.scrollY>=1){

      setColor(true)

    }else{
      setColor(false)
    }

  }
  window.addEventListener("scroll",changeColor)


  
  const[query ,setquery]=useState("")
  const [navMid] = useMediaQuery('(min-width: 800px)')
   
  function sugg(e){
    setquery( e.target.value )
    console.log(query)
    dispatch(getsearch(query))
  }
  useEffect(()=>{
  console.log(searchproducts)

},[searchproducts])

  return (
    <>
    { navMid &&
    <Box  justifyContent={"space-between"} className={color?"header header-bg backdrop-blur-lg":"header backdrop-blur-lg"} display={"flex"}  gap="70px" position={"sticky"} top={"0"}>
      
    <Box> <Link to={"/"}><Image width={"340px"} src={logo}/></Link></Box>
    
      <InputGroup   mt={"20px"}>
    <InputRightElement
      pointerEvents='none'
      children={<SearchIcon color='gray.300' />}
    />
    <Input onChange={sugg} value={query} placeholder='Search...'  borderRadius={"20"} textColor="white"/>
  </InputGroup>
  

    <Box mr={"10"} pt={"25px"} display={"flex"} gap="35" ml={"70"}>
    <Text fontSize='2xl' color={"white"}><Link to="/">Home</Link></Text>
      <Text fontSize='2xl' color={"white"}><Link to="/products">Categories</Link></Text>
      <Text display={"flex"} fontSize='2xl' color={"white"}><Link to="/cart">Cart</Link><Box pt={"10px"}><FaShoppingCart/></Box> </Text>
      {isAuth?<Text display={"flex"} fontSize='2xl' color={"white"} onClick={()=>{dispatch(logoutUser())}} cursor="pointer" >Logout<Box pt={"10px"}></Box></Text>:<Text display={"flex"} fontSize='2xl' color={"white"}><Link to="/login">Login</Link> <Box pt={"10px"}></Box></Text>}
      {user.role==="admin" && isAuth===true && <Text fontSize='2xl' color={"white"}><Link to="/admin">Admin</Link></Text> }
    </Box>
    
     
    </Box>
}
    {searchproducts && searchproducts.map((el)=>{
      <Box className='text-2xl text-white border-2'>{el.name}</Box>
    })}
{ 
            !navMid && 
            <Box pb={"5"}  display={"flex"}  gap="70px" className={color?"header header-bg":"header" }  position={"sticky"} top={"0"} >
             <Box mr={"40"}><Image width={"440px"} src={logo}/></Box>
             <InputGroup mt={"20px"}>
    <InputRightElement
      pointerEvents='none'
      children={<SearchIcon color='gray.300' />}
    />
    <Input placeholder='Search...'  borderRadius={"20"} textColor="white"  />
  </InputGroup>
             
          
<section
  className="block fixed bottom-0 inset-x-0 z-50 shadow-lg text-[#DFB4A2] bg-gray-700 dark:bg-dark backdrop-blur-lg bg-opacity-30 dark:bg-opacity-30 dark:text-gray-400 border-t-2 border-royal/20">
  <div id="tabs" className="flex justify-between">
    <Link to="/"
      className="w-full focus:text-royal hover:text-royal justify-center inline-block text-center pt-2 pb-1 hover:bg-white"
      activeclassname="dark:text-gray-100 text-black">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
      <span className="tab block text-xs">Home</span>
    </Link>
    <Link to="/products"
      className="w-full focus:text-royal hover:text-royal justify-center inline-block text-center pt-2 pb-1 hover:bg-white"
      activeclassname="dark:text-gray-100 text-black">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mb-1" fill="none" viewBox="0 0 24 24"
        stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
      <span className="tab block text-xs">Categories</span>
    </Link>
    <Link to="/cart"
      className="w-full focus:text-royal hover:text-royal justify-center inline-block text-center pt-2 pb-1 hover:bg-white"
      activeclassname="dark:text-gray-100 text-black">
      <FaShoppingCart className="h-6 w-6 inline-block mb-1"/>
      <span className="tab block text-xs">Cart</span>
    </Link>
    {isAuth?<Box onClick={()=>{dispatch(logoutUser())}}
      className="w-full focus:text-royal hover:text-royal justify-center inline-block text-center pt-2 pb-1 hover:bg-white"
      activeclassname="dark:text-gray-100 text-black">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
      <span className="tab block text-xs" >Logout</span>
    </Box>:<Link to="/login"
      className="w-full focus:text-royal hover:text-royal justify-center inline-block text-center pt-2 pb-1 hover:bg-white"
      activeclassname="dark:text-gray-100 text-black">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
      <span className="tab block text-xs">Login</span>
    </Link> }
    {user.role==="admin" &&  isAuth===true &&<Link to="/admin"
      className="w-full focus:text-royal hover:text-royal justify-center inline-block text-center pt-2 pb-1 hover:bg-white"
      activeclassname="dark:text-gray-100 text-black">
     <GrUserAdmin className="h-6 w-6 inline-block mb-1 text-white" />
      <span className="tab block text-xs">admin</span>
    </Link>}
    
  </div>
</section>
          </Box>

            }   

   
          


    </>
  );
}

export default Navbar;