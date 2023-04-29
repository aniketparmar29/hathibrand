import React ,{useEffect}from 'react'
import "../Style/nav.css"
import { Link } from 'react-router-dom';
import {FaWhatsapp,FaFacebook,FaInstagram} from "react-icons/fa";
import{CgMail,}from "react-icons/cg"
import logo from '../assets/logo.png'
import Aos from "aos"
 import "aos/dist/aos.css"
function Footer() {
    useEffect(() => {
        Aos.init({ duration: 1000});
      }, []);
   
  return (
    
<footer className="bg-white text-red-700 pb-20 lg:pb-0 md-pb-0 text-center relative ">
    <div className="mx-auto w-full container p-4 sm:p-6">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0 mr-5 flex justify-center" data-aos="fade-up">
              <a href="https://flowbite.com/" className="flex items-center">
                  <img src={logo} className="h-8 mr-3" alt="FlowBite Logo" />
                  <span className="self-center text-2xl font-semibold whitespace-nowrap ">Hathibrand</span>
              </a>
          </div>
          <div className="grid grid-cols-3 gap-8 sm:gap-6 sm:grid-cols-3" data-aos="fade-up">
              <div>
                  <Link to="/about" className="mb-6 text-sm font-semibold  uppercase ">About</Link>
                  
              </div>
              <div>
                  <Link to="/contact" className="mb-6 text-sm font-semibold  uppercase ">Contact</Link>
                  
              </div>
              <div>
                  <a href='https://aniketparmar29.github.io/' target='_blank' rel='noreferrer' className="mb-6 text-sm font-semibold  uppercase ">More</a>
                  
              </div>
          </div>
      </div>
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <div className="sm:flex sm:items-center sm:justify-between" >
          <span  className="text-sm  sm:text-center ">© 2023 <a href="https://hathibrand.in/"  className="hover:underline">Hathibrand</a>. All Rights Reserved.
          </span>
          <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0 justify-center" >
              <a href="https://www.facebook.com/hathibrandagarbatti" className=" " target="_blank"
            rel="noreferrer">
                    <FaFacebook className="w-5 h-5"/>
                  <span className="sr-only">Facebook page</span>
              </a>
              <a href="https://www.instagram.com/hathibrandagarbatti/" className="" target="_blank"
            rel="noreferrer">
                  <FaInstagram className="w-5 h-5"/>
                  <span className="sr-only">Instagram page</span>
              </a>
              <a href="https://wa.me/+919638857089" className="hover:text-Black-900 " target="_blank"
            rel="noreferrer">
                  <FaWhatsapp className="w-5 h-5"/>
                  <span className="sr-only">Whatsapp</span>
              </a>
              <a href="https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcSKjRMwtVxgDTJbPNTJVFMdSnTxkxfwSHDLZbhmtgGsNMHnxZHjpQsDnqVjTGnlhTgPDKmpg" className="" target="_blank"
            rel="noreferrer">
                  <CgMail className="w-5 h-5"/>
                  <span className="sr-only">Email</span>
              </a>
          </div>
      </div>
    </div>
</footer>

  )
}

export default Footer
