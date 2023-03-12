import {Box, Text ,Image, Button,Grid as Gg, GridItem, SimpleGrid} from '@chakra-ui/react'
import Navbar from '../Components/Navbar'
import {useSelector,useDispatch} from "react-redux"
import {getProducts } from "../Redux/ProductReducer/action"
import { useEffect } from 'react'
import {useNavigate} from "react-router-dom"
import axios from 'axios'
import "../Style/nav.css"
import Offer from '../Components/Offer'
import {  FaFacebook,FaInstagram,FaWhatsapp
} from "react-icons/fa";
import{CgMail,}from "react-icons/cg"
import Footer from '../Components/Footer'

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
        
        <Box className='big_boxx3' mt={"-20"} mb="40px">
          <Box  pl={7} pt={"350"} w={"46%"}><Text color={"#DFB4A2"} fontSize='3xl'> કરો તમારા દિવસની શરૂઆત એક મીઠી મહેકથી...</Text></Box>
         
        </Box>
        <Box>
        <Box><Offer/></Box>
        </Box>
        <Box className='big_boxx4' mt="40px">
        <Box  pl={7}  pt={"250"} w={"59%"}><Text color={"#DFB4A2"} fontSize='3xl'>  મહેક જે ઘરને રાખે પવિત્ર અને વાતાવરણને બનાવે શુદ્ધ...</Text></Box>
        </Box>

        <SimpleGrid columns={[1,1,4]}>
        {product && 
         product.slice(0,4).map((el,i)=>(

          <Box style={{width:"300px",margin:"auto",marginTop:"50px",border:"3px solid #5E0E42" ,textAlign:"center"}} pt="5"  key={i}>
            <Text onClick={()=>redir(el.id)} >
            <Image ml={"6"} src={el.image} />
            <Text>{el.name} </Text>
            <p>{el.description} </p> 
            </Text>
            <Button borderRadius={0} width={"100%"} bgColor="#5E0E42 " color={"#F5EE0A "} onClick={()=>doIt(el.id)} >Add To Cart</Button>
          </Box>
        ))}
        {isLoding && <div></div>}
        </SimpleGrid>

      
      <Box className='big_boxx5'>
      <Box  mt={"50px"}  ml={"40%"} pt={"150"} w={"50%"}><Text color={"#DFB4A2"} fontSize='3xl'>હાથી બ્રાન્ડ અગરબત્તી -પવિત્રતાની મહેક તો આજે જ ઓર્ડર કરો-Free shipping All Over India.</Text></Box>
      </Box>
       
      <SimpleGrid columns={[1,1,4]}>
        {product && 
         product.slice(5,9).map((el,i)=>(

          <Box style={{width:"300px",margin:"auto",marginTop:"50px",border:"3px solid #5E0E42" ,textAlign:"center"}} pt="5"  key={i}>
            <Text onClick={()=>redir(el.id)} >
            <Image ml={"6"} src={el.image} />
            <Text>{el.name} </Text>
            <p>{el.description} </p>
            </Text>
            <Button borderRadius={0} width={"100%"} bgColor="#5E0E42 " color={"#F5EE0A "} onClick={()=>doIt(el.id)} >Add To Cart</Button>
          </Box>
        ))}
        {isLoding && <div></div>}
        </SimpleGrid>
        <Footer/>
        
    </>
  )
}

export default Home