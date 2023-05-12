import React,{useEffect} from 'react'
import img from '../assets/singup.jpg'
import Navbar from '../Components/Navbar'
import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import {usersignup} from  '../Redux/AuthReducer/user.actions'
import { useNavigate } from "react-router-dom";
import Spinner from '../Components/Spinner'
import { useAlert } from "react-alert";
import Footer from '../Components/Footer'

function Signup() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const register_laoding= useSelector((state)=>state.userAuth.register_laoding)
  const register_error= useSelector((state)=>state.userAuth.register_error)
  const [loginData, setLoginData] = useState({name:"",email:"",password:""})
  const [showAlert, setShowAlert] = useState(false);
  const handleOnchange = (e)=>{
    setLoginData({...loginData,[e.target.name]:e.target.value})
  }
  window.document.title="Singup-Hathibrand"
  const handleSubmit = async (event) => {
    event.preventDefault()
    if(loginData.password.length<8){
      alert.error("password length more than 8 charters")
      return;
    }
    let user = {...loginData}
    dispatch(usersignup(user))
    setLoginData({name:"",email:"",password:""})
    setShowAlert(true);
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  useEffect(() => {
   
    if(register_error){
      alert.error("Somthing went wrong")
    }
    if(showAlert){
      alert.success("Signup Successfully!");
    }
  }, [alert,register_error,showAlert])
  return (

    <>
    <Navbar/>
   
    <div
      className="h-screen w-full bg-cover bg-no-repeat bg-center pt-32 -mt-32"
      style={{ backgroundImage: `url(${img})` }}
      >
        {register_laoding && (
        <div className="fixed z-50 inset-0 bg-gray-500 opacity-75 flex items-center justify-center">
          <Spinner />
        </div>
      )}
      <form onSubmit={handleSubmit} className="w-[70%] lg:w-[30%] md:w-[40%] sm:w-[50%] m-auto">
      <div className="my-4 relative">
        <input
          className="block
          rounded-md
          px-6
          pt-6
          pb-1
          w-full
          text-md
        text-white
        bg-neutral-700
          appearance-none
          focus:outline-none
          focus:ring-0
          peer
          invalid:border-b-1"
          id="name"
          type="text"
          name='name'
          value={loginData.name}
          onChange={handleOnchange}
        />
         <label className="absolute 
        text-md
      text-zinc-200
        duration-150 
        transform 
        -translate-y-3 
        scale-75 
        top-4 
        z-10 
        origin-[0] 
        left-6
        peer-placeholder-shown:scale-100 
        peer-placeholder-shown:translate-y-0 
        peer-focus:scale-75
        peer-focus:-translate-y-3" htmlFor="name">
          Name
        </label>
      </div>
      <div className=" mb-4 relative">
        <input
          className="block
          rounded-md
          px-6
          pt-6
          pb-1
          w-full
          text-md
        text-white
        bg-neutral-700
          appearance-none
          focus:outline-none
          focus:ring-0
          peer
          invalid:border-b-1"
          id="email"
          type="email"
          name='email'
          value={loginData.email}
          onChange={handleOnchange}
          />
        <label className="absolute 
        text-md
      text-zinc-200
        duration-150 
        transform 
        -translate-y-3 
        scale-75 
        top-4 
        z-10 
        origin-[0] 
        left-6
        peer-placeholder-shown:scale-100 
        peer-placeholder-shown:translate-y-0 
        peer-focus:scale-75
        peer-focus:-translate-y-3" htmlFor="email">
          Email
        </label>
      </div>
      <div className="mb-6 relative">
        <input
          className="block
          rounded-md
          px-6
          pt-6
          pb-1
          w-full
          text-md
        text-white
        bg-neutral-700
          appearance-none
          focus:outline-none
          focus:ring-0
          peer
          invalid:border-b-1"
          id="password"
          type="password"
          name='password'
          value={loginData.password}
          onChange={handleOnchange}
        />
        <label className="absolute 
        text-md
      text-zinc-200
        duration-150 
        transform 
        -translate-y-3 
        scale-75 
        top-4 
        z-10 
        origin-[0] 
        left-6
        peer-placeholder-shown:scale-100 
        peer-placeholder-shown:translate-y-0 
        peer-focus:scale-75
        peer-focus:-translate-y-3" htmlFor="password">
          Password
        </label>
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          >
          Sign up
        </button>
      </div>
    </form>
    
    </div>
    <Footer/>
      </>
  )
}

export default Signup
