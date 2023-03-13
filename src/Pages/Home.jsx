import {Box, Text ,SimpleGrid} from '@chakra-ui/react'
import {useSelector,useDispatch} from "react-redux"
import {getProducts } from "../Redux/ProductReducer/action"
import { useEffect } from 'react'
import {useNavigate} from "react-router-dom"
import axios from 'axios'
import ProductCard from '../Components/ProductCard'
import "../Style/nav.css"
import Offer from '../Components/Offer'
import Footer from '../Components/Footer'
import ProductCardSkeleton from '../Components/ProductCardSkeleton'
import Navbar from '../Components/Navbar'
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
     <Navbar/>
        <Box className='big_boxx3' mt={"-20"} mb="40px">
          <Box  pl={7}  pt={"350"} w={"57%"}><Text color={"white"} fontSize='3xl'> કરો તમારા દિવસની શરૂઆત એક મીઠી મહેકથી...</Text></Box>
         
        </Box>
        <Box>
        <Box><Offer/></Box>
        </Box>
        <Box className='big_boxx4' mt="40px">
        <Box  pl={7}  pt={"250"} w={"59%"}><Text color={"white"} fontSize='3xl'>  મહેક જે ઘરને રાખે પવિત્ર અને વાતાવરણને બનાવે શુદ્ધ...</Text></Box>
        </Box>

        <SimpleGrid columns={[1,1,4]}>
        {product && 
         product.slice(0,4).map((el)=>(
          <ProductCard el={el} redir={redir} doIt={doIt}/>
        ))}
        {isLoding &&  <Box display="flex" flexWrap="wrap">
        {[...Array(4)].map((_, index) => (
          <Box key={index} p="2">
            <ProductCardSkeleton />
          </Box>
        ))}
      </Box>}
        </SimpleGrid>

      
      <Box className='big_boxx5'>
      <Box  mt={"50px"}  ml={"40%"} pt={"150"} w={"50%"}><Text color={"white"} fontSize='3xl'>હાથી બ્રાન્ડ અગરબત્તી -પવિત્રતાની મહેક તો આજે જ ઓર્ડર કરો-Free shipping All Over India.</Text></Box>
      </Box>
       
      <SimpleGrid columns={[1,1,4]}>
        {product && 
         product.slice(5,9).map((el)=>(

          <ProductCard el={el} redir={redir} doIt={doIt}/>
        ))}
        {isLoding &&  <Box display="flex" flexWrap="wrap">
        {[...Array(4)].map((_, index) => (
          <Box key={index} p="2">
            <ProductCardSkeleton />
          </Box>
        ))}
      </Box>}
        </SimpleGrid>
        
        <Footer/>
    </>
  )
}

export default Home