import React, { useEffect } from 'react'
import img from '../assets/singup.jpg'
import Navbar from '../Components/Navbar'
import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import {userLogin} from  '../Redux/AuthReducer/user.actions'
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import Alert from '../Components/Alert'
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth= useSelector((state)=>state.userAuth.isAuth)
  const authToken= useSelector((state)=>state.userAuth.authToken)

  const [loginData, setLoginData] = useState({email:"",password:""})
  const [showAlert, setShowAlert] = useState(false);
  const handleOnchange = (e)=>{
    setLoginData({...loginData,[e.target.name]:e.target.value})
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    let user = {...loginData}
    dispatch(userLogin(user))
    setLoginData({name:"",email:"",password:""})
    if(authToken){
        setShowAlert(true);
        setTimeout(() => {
          navigate("/");
        }, 2000);
    }
  };
  const handleCloseAlert = () => {
    if(isAuth===true){
        setShowAlert(false);
    }
  };
  return (
    <>
    <Navbar/>
    <div
      className="h-screen w-full bg-cover bg-no-repeat bg-center pt-32 -mt-20"
      style={{ backgroundImage: `url(${img})` }}
      >
        
      <form onSubmit={handleSubmit} className="w-[70%] m-auto">
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
          className="bg-blue-500 hover:bg-blue-700 mb-10 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          >
          Login
        </button>
      </div>
      <Link to="/singup" className='text-white text-2xl underline pt-10 z-20'>Create Account?</Link>
    </form>

    {showAlert && (
        <Alert
          message="Login Successfully!"
          onClose={handleCloseAlert}
        />
      )}
    </div>
      </>
  )
}

export default Login
