import {Box, Text ,Image, Button,Grid as Gg, GridItem, SimpleGrid} from '@chakra-ui/react'

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
         product.slice(0,4).map((el,i)=>(

          <Box style={{width:"300px",margin:"auto",marginTop:"50px",border:"3px solid #5E0E42" ,textAlign:"center"}} pt="5"  key={i}>
            <Text onClick={()=>redir(el.id)} >
            <Image ml={"6"} src={el.image} />
            <Text>{el.name} </Text>
            <p>{el.description} </p> 
            </Text>
            <Button borderRadius={0} width={"100%"} bgColor="#5E0E42 "colorScheme='#440430' color={"white"} onClick={()=>doIt(el.id)} >Add To Cart</Button>
          </Box>
        ))}
        {isLoding && <div></div>}
        </SimpleGrid>

      
      <Box className='big_boxx5'>
      <Box  mt={"50px"}  ml={"40%"} pt={"150"} w={"50%"}><Text color={"white"} fontSize='3xl'>હાથી બ્રાન્ડ અગરબત્તી -પવિત્રતાની મહેક તો આજે જ ઓર્ડર કરો-Free shipping All Over India.</Text></Box>
      </Box>
       
      <SimpleGrid columns={[1,1,4]}>
        {product && 
         product.slice(5,9).map((el,i)=>(

          <Box style={{width:"300px",margin:"auto",marginTop:"50px",border:"3px solid #5E0E42",textAlign:"center"}} pt="5"  key={i}>
            <Text onClick={()=>redir(el.id)} >
            <Image ml={"6"} src={el.image} />
            <Text>{el.name} </Text>
            <p>{el.description} </p>
            </Text>
            <Box  w="100%" h={"40px"}><Button borderRadius={0}  width={"100%"} colorScheme='#440430' color={"white"}  bgColor={"#5E0E42"} onClick={()=>doIt(el.id)} >Add To Cart</Button></Box>
            
          </Box>
        ))}
        {isLoding && <div></div>}
        </SimpleGrid>
<<<<<<< HEAD
        <Box className='big_boxx6'fontSize='4xl'  >
          <Box><Text color={"#DFB4A2"} border={"0px solid red"} w={["50%","30%","40%"]}  ml={["10","40","180"]} pt={["0","0","10"]} fontSize={"lg"}>Near the old bus stand. Next to New Nilkanth Soping Village.Lathidad Taluka-District.Botad Pin Code-364710, Botad, India, Gujarat</Text></Box>
          <Box display={"flex"} mt="3%" >
            <Box ml={"20%"} border={"0px solid red"}  gap={"3"}display={"flex"} width={"50%"} mt={"-1"}>
            <a href=' https://www.facebook.com/hathibrandagarbatti'><FaFacebook color='#DFB4A2' /></a>
            <a href='https://www.instagram.com/afzal_makwana/'><FaInstagram color='#DFB4A2'/></a>
            <a href='hathibrand001@gmail.com'><CgMail color='#DFB4A2'/></a>
            <a href='https://wa.me/+919638857089'><FaWhatsapp color='#DFB4A2'/></a>
            
            
            </Box>
              
          </Box>
        </Box>
=======
        <Footer/>
>>>>>>> 3c00e72634a9a049d481b2d745101725de62cd33
        
    </>
  )
}

export default Home