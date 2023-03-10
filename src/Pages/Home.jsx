import {Box, Text} from '@chakra-ui/react'
import Navbar from '../Components/Navbar'
import {useSelector,useDispatch} from "react-redux"
import {getProducts } from "../Redux/ProductReducer/action"
import { useEffect } from 'react'
import {useNavigate} from "react-router-dom"
import axios from 'axios'
import "../Style/nav.css"
import Offer from '../Components/Offer'

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
        
        <Box className='big_boxx3' mt={"-20"}>
          <Box  pl={7}  pt={"350"} w={"46%"}><Text color={"#DFB4A2"} fontSize='3xl'> કરો તમારા દિવસની શરૂઆત એક મીઠી મહેકથી...</Text></Box>
         
        </Box>
        <Box><Offer/></Box>
        {product && product.map((el,i)=>(
          <Box style={{width:"300px",margin:"auto",marginTop:"50px",border:"1px solid red"}} key={i}>
            <Text onClick={()=>redir(el.id)} >
            <Text>{el.name} </Text>
            <p>{el.description} </p> 
            </Text>
            <button onClick={()=>doIt(el.id)} >Add</button>
          </Box>
        ))}
        {isLoding && <div></div>}

        
    </>
  )
}

export default Home