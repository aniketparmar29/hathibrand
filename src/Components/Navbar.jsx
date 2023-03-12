import React,{useState} from 'react';
import {Box,Text,Image, useMediaQuery,InputRightElement,IconButton, Input,InputGroup} from "@chakra-ui/react"
import logo from '../assets/logo.png';
import "../Style/nav.css"
import {SearchIcon} from "@chakra-ui/icons"
import {FaShoppingCart,FaUserPlus } from 'react-icons/fa'
import {BiSearchAlt } from 'react-icons/bi'

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem
 
} from '@chakra-ui/react'

function Navbar() {
  const [color,setColor]=useState(false);

  const changeColor=()=>{
    console.log(window.scroll)
    if(window.scrollY>=1){

      setColor(true)

    }else{
      setColor(false)
    }

  }
  console.log(color)
  window.addEventListener("scroll",changeColor)
  
  const [navMid] = useMediaQuery('(min-width: 800px)')
  return (
    <>
    { navMid &&
    <Box  justifyContent={"space-between"} className={color?"header header-bg backdrop-blur-lg":"header backdrop-blur-lg"} display={"flex"}  gap="70px" position={"sticky"} top={"0"}>
      
    <Box><Image width={"340px"} src={logo}/></Box>
    
     <InputGroup mt={5}>
    <InputRightElement
      pointerEvents='none'
      children={<SearchIcon color='gray.300' />}
    />
    <Input placeholder='Search...' borderRadius={"20"}  textColor="white"/>
  </InputGroup>
    
    
    <Box mr={"10"} pt={"25px"} display={"flex"} gap="35" ml={"70"}>
    <Text fontSize='2xl' color={"white"}>Home</Text>
      <Text fontSize='2xl' color={"white"}>Product</Text>
      <Text display={"flex"} fontSize='2xl' color={"white"}>Cart <Box pt={"10px"}><FaShoppingCart/></Box> </Text>
      <Text display={"flex"} fontSize='2xl' color={"white"}>Login <Box pt={"10px"}><FaUserPlus/></Box></Text>
    </Box>
    
     
    </Box>
}
{ 
            !navMid && 
            <Box  display={"flex"}   className={color?"header header-bg":"header" }  position={"sticky"} top={"0"} >
             <Box mr={"40"}><Image width={"400px"} src={logo}/></Box>
             <InputGroup mt={5} mr="30" width={"80"}>
    <InputRightElement
      pointerEvents='none'
      children={<SearchIcon color='gray.300' />}
    />
    <Input placeholder='Search...'  borderRadius={"20"} textColor="white"/>
  </InputGroup>
          
<section
  className="block fixed bottom-0 inset-x-0 z-50 shadow-lg text-[#DFB4A2] bg-gray-700 dark:bg-dark backdrop-blur-lg bg-opacity-30 dark:bg-opacity-30 dark:text-gray-400 border-t-2 border-royal/20">
  <div id="tabs" className="flex justify-between">
    <a href="#"
      className="w-full focus:text-royal hover:text-royal justify-center inline-block text-center pt-2 pb-1 hover:bg-white"
      activeclassName="dark:text-gray-100 text-black">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
      <span className="tab block text-xs">Home</span>
    </a>
    <a href="#"
      className="w-full focus:text-royal hover:text-royal justify-center inline-block text-center pt-2 pb-1 hover:bg-white"
      activeclassName="dark:text-gray-100 text-black">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mb-1" fill="none" viewBox="0 0 24 24"
        stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
      <span className="tab block text-xs">Categories</span>
    </a>
    <a href="#"
      className="w-full focus:text-royal hover:text-royal justify-center inline-block text-center pt-2 pb-1 hover:bg-white"
      activeclassName="dark:text-gray-100 text-black">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mb-1" fill="none" viewBox="0 0 24 24"
        stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <span className="tab block text-xs">Gallery</span>
    </a>
    <a href="#"
      className="w-full focus:text-royal hover:text-royal justify-center inline-block text-center pt-2 pb-1 hover:bg-white"
      activeclassName="dark:text-gray-100 text-black">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
      <span className="tab block text-xs">About</span>
    </a>
  </div>
</section>
          </Box>
            }   
          


    </>
  );
}

export default Navbar;
