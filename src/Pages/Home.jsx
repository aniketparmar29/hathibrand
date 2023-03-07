import {Box, Text} from 'react'
import Navbar from '../Components/Navbar'
import {useSelector,useDispatch} from "react-redux"
import {getProducts } from "../Redux/ProductReducer/action"
import { useEffect } from 'react'
import {useNavigate} from "react-router-dom"
import axios from 'axios'
function Home() {
  const dispatch=useDispatch();
  const product= useSelector((state)=>state.ProductReducer.product)
  const isLoding= useSelector((state)=>state.ProductReducer.isLoding)
  const navigate = useNavigate()
  const doIt = (id) => {
    console.log(id)
    axios.post(`https://hathibrand.onrender.com/cart/${id}`).then((res)=>navigate("/cart")).catch((err)=>console.log(err))
  }
  const redir = (id) => {
    navigate(`singlepage/${id}`)
  }


  useEffect(()=>{
     dispatch(getProducts())
  },[dispatch])
  console.log(product)
  return (
    < >
        <Navbar />
        <p className='text-4xl'>hathibrand</p>
        {product && product.map((el,i)=>(
          <div style={{width:"300px",margin:"auto",marginTop:"50px",border:"1px solid red"}} key={i}>
            <div onClick={()=>redir(el.id)} >
            <p>{el.name} </p>
            <p>{el.description} </p> 
            </div>
            <button onClick={()=>doIt(el.id)} >Add</button>
          </div>
        ))}
        {isLoding && <div></div>}
    </>
  )
}

export default Home