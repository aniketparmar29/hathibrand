import React,{useEffect, useState} from 'react';
import {Box,Text,Input,Image, useMediaQuery, InputGroup,InputRightElement} from "@chakra-ui/react"
import logo from '../assets/logo.png';
import "../Style/nav.css"
import { useDispatch,useSelector } from "react-redux";
import { logoutUser } from "../Redux/AuthReducer/user.actions";
import {GrUserAdmin} from "react-icons/gr"
import {SearchIcon} from "@chakra-ui/icons"
import { FaHome, FaShoppingCart, FaUser } from 'react-icons/fa'
import { RiMenu3Fill } from 'react-icons/ri';
import { getProducts } from '../Redux/ProductReducer/action';
import { Link } from 'react-router-dom';
import {useNavigate} from "react-router-dom"
import { ChevronDownIcon } from '@chakra-ui/icons'
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
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
  const rmv= useSelector((state)=>state.cartReducer.rmv)
  const add= useSelector((state)=>state.cartReducer.add)


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
 },[dispatch,user.id,rmv,add])
  return (
    <>
    { navMid &&
    <Box zIndex={"100"} justifyContent={"space-between"} width="100%" className={color?"header header-bg backdrop-blur-lg ":"header backdrop-blur-lg "} display={"flex"}  gap="10%" position={"sticky"} top={"0"} >
      
    <Box width={"20%"}> <Link to={"/"}><Image className='lg:w-[40%] md:w-[150%]' src={logo}/></Link></Box>
    
      <InputGroup width={"20%"}   mt={"20px"}>
    <InputRightElement
      pointerEvents='none'
      children={<SearchIcon color='gray.300' />}
    />
    <Input onChange={sugg} width="100%" value={query} placeholder='Search...'  borderRadius={"20"}  className={`${color}?"text-white":"text-red" border-2 border-amber-700 active:border-amber-700 focus:border-amber-700` }/>

  </InputGroup>
  

    <Box   width={"60%"} pt={"25px"} display={"flex"} gap={["3","5"]} >
    <Text fontSize='xl' ><Link to="/">Home</Link></Text>
      <Text fontSize='xl' ><Link to="/products">All  Products</Link></Text>
      <Text display={"flex"} fontSize='xl' >
  <Link to="/cart">Cart
  <li className="font-sans block  lg:inline-block align-middle  hover:text-gray-700">
  <span className="relative flex">
    <FaShoppingCart  className='flex-1 w-7 h-7 fill-current'/>
      <span className="absolute right-0 top-0 rounded-full bg-black w-4 h-4 top right p-0 m-0 text-white font-mono text-sm  leading-tight text-center">{cart.length || 0}</span>
  </span>
</li>
</Link>
</Text>
{user.role==="admin" && isAuth===true && <Text fontSize='xl' ><Link to="/admin">Admin</Link></Text> }
      {isAuth? <div className="relative inline-block text-left">
      <div>
        <button
          className={` inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-transparent text-sm font-medium   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500`}
          id="options-menu"
          onClick={toggleDropdown}
        >
          <span>{user.name}</span>
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
          className="origin-top-right absolute right-0 bg-white mt-2 w-56 rounded-md shadow-lg  ring-1 ring-black ring-opacity-5"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1" role="none">
            <button
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
              role="menuitem"
            >
            <Link to="/myorder"> My Orders</Link>
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
      
    </Box>
    
     
    </Box>
}

{serch&&
  <Box  className='shadow-lg shadow-slate-600' bgColor={"white"} width={["180px","400px"]} position={"fixed"} zIndex={"10"} left={["215","160"]} top={["110px","100px"]}>
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
            <Box zIndex={"100"} pb={"2"}  display={"flex"}  gap="10px" className={color?"header header-bg":"header" }  position={"sticky"} top={"0"} >
             <Box width={"40%"}><Link to="/"><Image width={"100px"} src={logo}/></Link></Box>
             <InputGroup mt={"30px"}  width="60%" mr="2%">
    <InputRightElement
      pointerEvents='none'
      children={<SearchIcon color='gray.300' />}
    />
    <Input onChange={sugg} value={query} placeholder='Search...'  borderRadius={"20"} className={color?"text-white":"text-black"}  />
  </InputGroup>
             
          
  <section className="fixed bottom-0 inset-x-0 z-50 shadow-lg bg-gray-700 dark:bg-dark backdrop-blur-lg bg-opacity-30 dark:bg-opacity-30  border-t-2 border-royal/20">
  <div id="tabs" className="flex justify-between">
    <Link to="/" className="w-full focus:text-royal hover:text-royal justify-center inline-block text-center pt-2 pb-1 ">
      <FaHome className="h-6 w-6 inline-block mb-1" />
      <span className="tab block text-xs font-extrabold">Home</span>
    </Link>
    <Link to="/products" className="w-full focus:text-royal hover:text-royal justify-center inline-block text-center pt-2 pb-1 ">
      <RiMenu3Fill className="h-6 w-6 inline-block mb-1" />
      <span className="tab block text-xs font-extrabold">All  Products</span>
    </Link>
    <Link to="/cart" className="w-full focus:text-royal hover:text-royal justify-center inline-block text-center pt-2 pb-1 ">
      <FaShoppingCart className="h-6 w-6 inline-block mb-1" />
      <span className="tab block text-xs font-extrabold">Cart <span>{cart.length}</span></span>
    </Link>
    {isAuth ? (
      <Menu>
        <MenuButton onClick={toggleDropdown} className="w-full focus:text-royal hover:text-royal justify-center inline-block text-center pt-2 pb-1 ">
          <FaUser className="h-6 w-6 inline-block mb-1" />
          <span className="tab block text-xs font-extrabold">{user.name}</span>
        </MenuButton>
        <MenuList >
          <MenuItem>
            <Link className='text-black' to="/myorder"> My Orders</Link>
          </MenuItem>
          <MenuItem  onClick={() => { dispatch(logoutUser()) }}>
          <p className='text-black'>Logout</p>
          </MenuItem>
          {user.role === "admin" && isAuth === true && (
            <MenuItem>
              <Link className='text-black' to="/admin">admin</Link>
            </MenuItem>
          )}
        </MenuList>
      </Menu>
    ) : (
      <Link to="/login" className="w-full focus:text-royal hover:text-royal justify-center inline-block text-center pt-2 pb-1 hover:bg-white">
        <FaUser className="h-6 w-6 inline-block mb-1" />
        <span className="tab block text-xs font-extrabold">Login</span>
      </Link>
    )}
  </div>
</section>

          </Box>

            }   
    </>
  );
}

export default Navbar;