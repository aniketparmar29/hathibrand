import React from 'react'
import { Box ,Text} from '@chakra-ui/react'
import "../Style/nav.css"
import {  FaFacebook,FaInstagram,FaWhatsapp
} from "react-icons/fa";
import{CgMail,}from "react-icons/cg"
function Footer() {
  return (
    <div>
    <Box className='big_boxx6 gap-3  lg:pr-96 md:pr-52 sm:pr-40 pr-40'fontSize='4xl' display={"flex"} flexDirection="column" justifyContent={"center"} alignItems="center"  >
    <Box>
    <Text color={"#DFB4A2"} border={"0px solid red"}fontSize={["lg,2xl,3xl"]}>Hathibrand Agarbatti</Text></Box>
    <Box display={"flex"} >
      <Box border={"0px solid red"}  gap={"3"}display={"flex"} >
      <a href=' https://www.facebook.com/hathibrandagarbatti' target={"_blank"} rel="noreferrer"><FaFacebook color='#DFB4A2' /></a>
      <a href='https://www.instagram.com/hathibrandagarbatti/' target={"_blank"} rel="noreferrer"><FaInstagram color='#DFB4A2'/></a>
      <a href='https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcSKjRMwtVxgDTJbPNTJVFMdSnTxkxfwSHDLZbhmtgGsNMHnxZHjpQsDnqVjTGnlhTgPDKmpg' target={"_blank"} rel="noreferrer"><CgMail color='#DFB4A2'/></a>
      <a href='https://wa.me/+919638857089' target={"_blank"} rel="noreferrer"><FaWhatsapp color='#DFB4A2'/></a>
      
      
      </Box>
        
    </Box>
  </Box></div>
  )
}

export default Footer