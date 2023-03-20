import React,{useState} from 'react'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import ProductList from '../Components/ProductList'
function ProudctPage() {
  window.document.title="Products-Hathibrand"
  const [showalert,setshowalert]=useState(false)
  return (
    <>
    <Navbar/>
    <div><ProductList setshowalert={setshowalert} showalert={showalert}/></div>
    
    <Footer/>
    </>
  )
}

export default ProudctPage