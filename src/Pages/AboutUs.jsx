import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { motion } from 'framer-motion';
import bgImage from '../Enhance/fristimg.jpeg';

function AboutUs() {
  return (
    <>
      <Navbar />
      <div className="bg-center bg-cover pt-32 -mt-20 pb-20" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl text-center  text-white font-bold mb-8"
          >
            About Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl md:text-3xl text-white text-start mx-2 mb-8"
          >
            At Hathibrand, we believe that high-quality incense sticks should be accessible to everyone. That's why we're committed to providing premium incense sticks and cosmetics at affordable prices.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl md:text-3xl text-white text-start mx-2 mb-8"
          >
            Our incense sticks are handcrafted using traditional methods and are made with natural ingredients to ensure a clean burn and long-lasting fragrance. Our manufacturing facility is located in the foothills of the Himalayas, where the fresh mountain air and pristine environment enhance the quality of our products.
          </motion.p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AboutUs;
