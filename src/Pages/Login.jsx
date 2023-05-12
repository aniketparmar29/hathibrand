import React, { useEffect } from 'react'
import img from '../assets/singup.jpg'
import Navbar from '../Components/Navbar'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from '../Redux/AuthReducer/user.actions'
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import Spinner from '../Components/Spinner';
import { useAlert } from "react-alert";
import Footer from '../Components/Footer'
function Login() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.userAuth.isAuth)
  const login_laoding = useSelector((state) => state.userAuth.login_laoding)
  const login_error = useSelector((state) => state.userAuth.login_error)

  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const handleOnchange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value })
  }
  window.document.title="Login-Hathibrand"
  if (isAuth === true) {
    setTimeout(() => {
      navigate("/");
    }, 1);
  }
useEffect(() => {
  if(isAuth){
    alert.success("Login Succefully")
  }
  if(login_error){
    alert.error("Somthing went wrong")
  }
}, [alert,isAuth,login_error])

  const handleSubmit = async (event) => {
    event.preventDefault()
    let user = { ...loginData }
    dispatch(userLogin(user))
    setLoginData({ name: "", email: "", password: "" })
  };
  return (
    <>
    <Navbar/>
    <div
      className="h-screen w-full bg-cover bg-no-repeat bg-center pt-32 -mt-32"
      style={{ backgroundImage: `url(${img})` }}
      >
        {login_laoding&& (
        <div className="fixed z-50 inset-0 bg-gray-500 opacity-75 flex items-center justify-center">
          <Spinner />
        </div>
      )}
        
      <form onSubmit={handleSubmit} className="w-[70%] m-auto " >
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
          className="bg-blue-500 hover:bg-blue-700 mb-10 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          >
          Login
        </button>
      </div>
      <Link to="/singup" className='text-white text-2xl underline pt-10 z-20'>Create Account?</Link>
    </form>
    </div>
    <Footer/>
      </>
  )
}

export default Login
