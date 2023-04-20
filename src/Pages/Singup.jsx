import React,{useEffect} from 'react'
import img from '../assets/singup.jpg'
import Navbar from '../Components/Navbar'
import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import {usersignup} from  '../Redux/AuthReducer/user.actions'
import { useNavigate } from "react-router-dom";
import Spinner from '../Components/Spinner'
import { useAlert } from "react-alert";

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
      className="h-screen w-full bg-cover bg-no-repeat bg-center pt-32 -mt-20"
      style={{ backgroundImage: `url(${img})` }}
      >
        {register_laoding && (
        <div className="fixed z-50 inset-0 bg-gray-500 opacity-75 flex items-center justify-center">
          <Spinner />
        </div>
      )}
      <form onSubmit={handleSubmit} className="w-[70%] lg:w-[30%] md:w-[40%] sm:w-[50%] m-auto">
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
          Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          name='name'
          placeholder="Name"
          value={loginData.name}
          onChange={handleOnchange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          name='email'
          placeholder="Email"
          value={loginData.email}
          onChange={handleOnchange}
          />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          name='password'
          placeholder="Password"
          value={loginData.password}
          onChange={handleOnchange}
        />
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
      </>
  )
}

export default Signup
