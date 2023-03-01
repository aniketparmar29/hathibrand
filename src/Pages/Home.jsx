import React from 'react'
import Navbar from '../Components/Navbar'
import {useSelector,useDispatch} from "react-redux"
import {getProducts } from "../Redux/ProductReducer/action"
import { useEffect } from 'react'
function Home() {
  const dispatch=useDispatch();
  const product= useSelector((state)=>state.ProductReducer.product)
  const isLoding= useSelector((state)=>state.ProductReducer.isLoding)
  useEffect(()=>{
     dispatch(getProducts())
  },[dispatch])
  console.log(product)
  return (
    <div >
        <Navbar />
        <h1 className='text-4xl'>hathibrand</h1>

        {isLoding && <div></div>}
    </div>
  )
}

export default Home