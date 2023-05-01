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
      
        <Box>
        <SimpleGrid columns={[2,2,4]}  data-aos="fade-up">
        {product && 
         product.map((el)=>(
          <ProductCard el={el} key={el.id} setshowalert={setshowalert} redir={redir} doIt={doIt}/>
        ))}
        
        </SimpleGrid>
        </Box>
       
       

      
      
  
        <Box width={"80%"} height={["200px","500px"]} margin="auto" padding={["2","10"]} data-aos="fade-right">
        <iframe width={"100%"} height={"100%"} src="https://www.youtube.com/embed/IUcoX-9BL3U" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </Box>
       
       
        
        <Footer/>
    </>
  )
}

export default Home