import {Box, Text ,SimpleGrid} from '@chakra-ui/react'
import {useSelector,useDispatch} from "react-redux"
import {getProducts } from "../Redux/ProductReducer/action"
import { useEffect } from 'react'
import {useNavigate} from "react-router-dom"
import { useState } from 'react'
import ProductCard from '../Components/ProductCard'
import "../Style/nav.css"
import Offer from '../Components/Offer'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import { postcart } from '../Redux/CartReducer/action'
import Aos from "aos"
 import "aos/dist/aos.css"
 import { useAlert } from "react-alert";
function Home() {
  const alert = useAlert();
  window.document.title="Hathibrand"
  const dispatch=useDispatch();
  const isAuth= useSelector((state)=>state.userAuth.isAuth)

  const [showalert,setshowalert]=useState(false)
  const product= useSelector((state)=>state.ProductReducer.product)
  const navigate = useNavigate()
  const doIt = (el) => {
    if(isAuth===true){
      alert.error("Please Login To Add Product")
    }
     dispatch(postcart(postcart))
   
  }
  const  redir = (id) => {
    navigate(`singlepage/${id}`)
  }


  useEffect(()=>{
     dispatch(getProducts())
  },[dispatch])

  useEffect(() => {
    if(showalert===true){
      alert.success("Product Added To Cart")
      setshowalert(!showalert)
    }
    Aos.init({ duration: 1000});
  }, [alert,showalert]);

  return (
    < >
     <Navbar/>
        <Box className='big_boxx3' mt={"-20"} mb="40px">
          <Box  pl={7}  pt={"350"} w={"57%"}><Text color={"white"} fontSize='3xl' data-aos="fade-up" > કરો તમારા દિવસની શરૂઆત એક મીઠી મહેકથી...</Text></Box>
         
        </Box>
        <Box>
        <Box><Offer/></Box>
        </Box>
        <Box className='big_boxx4' mt="40px">
        <Box  pl={7}  pt={"250"} w={"59%"}><Text color={"white"} fontSize='3xl' data-aos="fade-up">  મહેક જે ઘરને રાખે પવિત્ર અને વાતાવરણને બનાવે શુદ્ધ...</Text></Box>
        </Box>

        <SimpleGrid columns={[1,2,4]}  data-aos="fade-up">
        {product && 
         product.slice(0,4).map((el)=>(
          <ProductCard el={el} key={el.id} setshowalert={setshowalert} redir={redir} doIt={doIt}/>
        ))}
        
        </SimpleGrid>

      <Box className='big_boxx5'>
      <Box  mt={"50px"}  ml={"40%"} pt={"150"} w={"50%"}><Text color={"white"} fontSize='3xl' data-aos="fade-up">હાથી બ્રાન્ડ અગરબત્તી -પવિત્રતાની મહેક તો આજે જ ઓર્ડર કરો-Free shipping All Over India.</Text></Box>
      </Box>
       
      <SimpleGrid columns={[1,2,4]} data-aos="fade-up">
        {product && 
         product.slice(5,9).map((el)=>(

          <ProductCard el={el} key={el.id} setshowalert={setshowalert} redir={redir} doIt={doIt}/>
        ))}
        </SimpleGrid>
  
        <Box width={"80%"} height={["200px","500px"]} margin="auto" padding={["2","10"]} data-aos="fade-right">
        <iframe width={"100%"} height={"100%"} src="https://www.youtube.com/embed/IUcoX-9BL3U" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </Box>
       
        

        
        <Footer/>
    </>
  )
}

export default Home