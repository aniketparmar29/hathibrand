import React,{useEffect, useState} from 'react';
import {Box,Text,Input,Image, useMediaQuery, InputGroup,InputRightElement} from "@chakra-ui/react"
import logo from '../assets/logo.png';
import "../Style/nav.css"
import { useDispatch,useSelector } from "react-redux";
import { logoutUser } from "../Redux/AuthReducer/user.actions";

import {GrUserAdmin} from "react-icons/gr"
import {SearchIcon} from "@chakra-ui/icons"
import {FaShoppingCart } from 'react-icons/fa'
import { getProducts } from '../Redux/ProductReducer/action';
import { Link } from 'react-router-dom';
import {useNavigate} from "react-router-dom"
import {getcart} from "../Redux/CartReducer/action"
function Navbar() {
  
  const [isOpen, setIsOpen] = useState(false);
  const cart= useSelector((state)=>state.cartReducer.cart)
  const toggleDropdown = () => setIsOpen(!isOpen);
  const [color,setColor]=useState(false);
  const dispatch = useDispatch();
  const isAuth= useSelector((state)=>state.userAuth.isAuth)
  let user = window.localStorage.getItem("user");
if (user) {
  try {
    user = JSON.parse(user);
  } catch (error) {
    console.error("Error parsing user from local storage", error);
    user = { role: "hello" };
  }
} else {
  user = { role: "hello" };
}

  const product= useSelector((state)=>state.ProductReducer.product)


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
  
  const [serch,setserch]=useState(false)

  function sugg(e){
    setserch(!serch)
    setquery( e.target.value )
   
  }
  useEffect(()=>{
     dispatch(getProducts())

},[dispatch])
const navigate = useNavigate()
const  redir = (id) => {
  navigate(`singlepage/${id}`)
}
useEffect(()=>{
  dispatch(getcart(user.id))
 },[dispatch,user.id])
  return (
    <>
    { navMid &&
    <Box zIndex={"100"} justifyContent={"space-between"} width="100%" className={color?"header header-bg backdrop-blur-lg ":"header backdrop-blur-lg "} display={"flex"}  gap="10%" position={"sticky"} top={"0"} pb="2">
      
    <Box width={"20%"}> <Link to={"/"}><Image className='lg:w-[60%] md:w-[150%]' src={logo}/></Link></Box>
    
      <InputGroup width={"30%"}   mt={"20px"}>
    <InputRightElement
      pointerEvents='none'
      children={<SearchIcon color='gray.300' />}
    />
    <Input onChange={sugg} value={query} placeholder='Search...'  borderRadius={"20"}  className={`${color}?"text-white":"text-red"`}/>

  </InputGroup>
  

    <Box mx="5"  width={"50%"} pt={"25px"} display={"flex"} gap={["5","10"]} >
    <Text fontSize='xl' ><Link to="/">Home</Link></Text>
      <Text fontSize='xl' ><Link to="/products">Categories</Link></Text>
      <Text display={"flex"} fontSize='xl' >
  <Link to="/cart">Cart</Link>
  <Box pt={"10px"} className="flex">
    <sup style={{marginLeft: '5px'}}>
      {cart.length || 0}
    </sup>
  </Box>
</Text>

      {isAuth? <div className="relative inline-block text-left">
      <div>
        <button
          className={`text-gray-700 inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium  hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500`}
          id="options-menu"
          onClick={toggleDropdown}
        >
          {user.name}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1" role="none">
            <button
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
              role="menuitem"
            >
              My Orders
            </button>
            <button
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
              role="menuitem"
              onClick={()=>{dispatch(logoutUser())}}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>:<Text display={"flex"} fontSize='xl' ><Link to="/login">Login</Link> <Box pt={"10px"}></Box></Text>}
      {user.role==="admin" && isAuth===true && <Text fontSize='xl' ><Link to="/admin">Admin</Link></Text> }
    </Box>
    
     
    </Box>
}

{serch&&
  <Box  className='shadow-lg shadow-slate-600' bgColor={"white"} width={["180px","400px"]} position={"fixed"} zIndex={"10"} left={["215","160"]} top={["80px","70px"]}>
  {
    product.filter(product => product.name.toLowerCase().includes(query.toLowerCase())
    ).map((product)=>(
      <Box key={product.id} onClick={()=>redir(product.id)} width={"90%"} display={"flex"} margin="auto"  gap="3" p={"5"} borderBottom={"1px solid gray"}>  
        <Image src={product.image} width="33%"/>
        <Box>{product.name}</Box>
      </Box>
    ))
  }
</Box>

}
{ 
            !navMid && 
            <Box zIndex={"100"} pb={"5"}  display={"flex"}  gap="70px" className={color?"header header-bg":"header" }  position={"sticky"} top={"0"} >
             <Box width={"40%"}><Link to="/"><Image width={"100px"} src={logo}/></Link></Box>
             <InputGroup mt={"20px"}  width="60%" mr="2%">
    <InputRightElement
      pointerEvents='none'
      children={<SearchIcon color='gray.300' />}
    />
    <Input onChange={sugg} value={query} placeholder='Search...'  borderRadius={"20"} className={color?"text-white":"text-black"}  />
  </InputGroup>
             
          
<section
  className="block fixed bottom-0 inset-x-0 z-50  shadow-lg text-[#DFB4A2] bg-gray-700 dark:bg-dark backdrop-blur-lg bg-opacity-30 dark:bg-opacity-30 dark:text-gray-400 border-t-2 border-royal/20">
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