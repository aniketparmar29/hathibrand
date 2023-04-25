import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { motion } from 'framer-motion';
import bgImage from '../Enhance/fristimg.jpeg';

function ContactUs() {
  return (
    <>
      <Navbar />
      <div className="bg-center bg-cover -mt-20" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="flex flex-col justify-center items-center h-screen">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl text-white font-bold mb-8"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl md:text-3xl text-white text-center max-w-md mx-auto mb-8"
          >
            Hathibrand is your source for premium quality incense sticks & cosmetics. Shop our extensive selection of fragrances and enjoy.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-row space-x-8"
          >
            <a href="mailto:support@hathibrand.in" className="bg-white text-black py-2 px-4 rounded-full hover:bg-black hover:text-white transition-all duration-300">Email Us</a>
            <a href="tel:+919638857089" className="bg-white text-black py-2 px-4 rounded-full hover:bg-black hover:text-white transition-all duration-300">Call Us</a>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ContactUs;
