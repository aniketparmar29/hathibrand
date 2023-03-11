
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import SwiperCore,{Autoplay} from "swiper"
import "../Style/styles.css";
import slider1 from "../Enhance/slider/slider1.jpg"
import slider2 from "../Enhance/slider/slider2.jpg"
import slider3 from "../Enhance/slider/slider3.jpg"
import slider4 from "../Enhance/slider/slider4.jpg"
import slider5 from "../Enhance/slider/slider5.jpeg"
import slider6 from "../Enhance/slider/slider6.jpeg"
import slider7 from "../Enhance/slider/slider7.jpeg"
// import required modules

import{useMediaQuery} from "@chakra-ui/react"
SwiperCore.use([Autoplay]);
export default function Offer() {
  const [screenmid] = useMediaQuery('(min-width: 800px)')
 
  return (
      
    <>
    
      <Swiper
            

        slidesPerView={screenmid?3:1}
        spaceBetween={30}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false
        }}
        
      >
        <SwiperSlide><img src={slider1}/></SwiperSlide>
        <SwiperSlide><img src={slider2}/></SwiperSlide>
        <SwiperSlide><img src={slider3}/></SwiperSlide>
        <SwiperSlide><img src={slider4}/></SwiperSlide>
        <SwiperSlide><img src={slider5}/></SwiperSlide>
        <SwiperSlide><img src={slider6}/></SwiperSlide>
        <SwiperSlide><img src={slider7}/></SwiperSlide>
        
       
      </Swiper>
    </>
  );
}
