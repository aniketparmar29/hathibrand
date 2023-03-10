
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import SwiperCore,{Autoplay} from "swiper"
import "../Style/styles.css";

// import required modules
import { Pagination } from "swiper";
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
          delay: 2000,
          disableOnInteraction: false
        }}
        
        
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
    </>
  );
}
