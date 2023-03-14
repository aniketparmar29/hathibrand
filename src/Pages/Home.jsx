import {Box, Text ,SimpleGrid} from '@chakra-ui/react'
import {useSelector,useDispatch} from "react-redux"
import {getProducts } from "../Redux/ProductReducer/action"
import { useEffect } from 'react'
import {useNavigate} from "react-router-dom"

import ProductCard from '../Components/ProductCard'
import "../Style/nav.css"
import Offer from '../Components/Offer'
import Footer from '../Components/Footer'
import ProductCardSkeleton from '../Components/ProductCardSkeleton'
import Navbar from '../Components/Navbar'
import { postcart } from '../Redux/ProductReducer/action'
function Home() {
  const dispatch=useDispatch();
  const product= useSelector((state)=>state.ProductReducer.product)
  const isLoading= useSelector((state)=>state.ProductReducer.isLoading)
  const navigate = useNavigate()
  const doIt = (el) => {
     dispatch(postcart(postcart))
   
  }
  const  redir = (id) => {
    navigate(`singlepage/${id}`)
  }


  useEffect(()=>{
     dispatch(getProducts())
  },[dispatch])
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
        {isLoading &&  <div className='grid grid-cols-4 grid-wrap gap-3'>
        {[...Array(4)].map((_, index) => (
            <div className='flex justify-center items-center p-5'>
            <ProductCardSkeleton />
            </div>
        ))}</div>}
        </SimpleGrid>

      
      <Box className='big_boxx5'>
      <Box  mt={"50px"}  ml={"40%"} pt={"150"} w={"50%"}><Text color={"white"} fontSize='3xl'>હાથી બ્રાન્ડ અગરબત્તી -પવિત્રતાની મહેક તો આજે જ ઓર્ડર કરો-Free shipping All Over India.</Text></Box>
      </Box>
       
      <SimpleGrid columns={[1,1,4]}>
        {product && 
         product.slice(5,9).map((el)=>(

          <ProductCard el={el} redir={redir} doIt={doIt}/>
        ))}
        {isLoading &&  <div className='grid grid-cols-4 grid-wrap gap-3'>
        {[...Array(4)].map((_, index) => (
            <div className='flex justify-center items-center p-5'>
            <ProductCardSkeleton />
            </div>
        ))}</div>}
        </SimpleGrid>
        <Box width={"80%"} height={["200px","500px"]} margin="auto" padding={["2","10"]}>
        <iframe width={"100%"} height={"100%"} src="https://www.youtube.com/embed/IUcoX-9BL3U" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </Box>
       
        

        
        <Footer/>
    </>
  )
}

export default Home