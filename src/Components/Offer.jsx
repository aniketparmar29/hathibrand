
import React, {useEffect} from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Aos from "aos"
 import "aos/dist/aos.css"

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import SwiperCore,{Autoplay} from "swiper"
import {useNavigate} from "react-router-dom"
import "../Style/styles.css";
import { useDispatch,useSelector } from "react-redux";
import {getSliders} from '../Redux/AdminReducer/actions'
import{useMediaQuery} from "@chakra-ui/react"

SwiperCore.use([Autoplay]);
export default function Offer() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const sliders = useSelector((state) => state.AdminReducer.sliders);
  const [screenmid] = useMediaQuery('(min-width: 800px)')
  const  redir = (id) => {
    navigate(`singlepage/${id}`)
  }
  useEffect(() => {
    dispatch(getSliders());
    Aos.init({ duration: 1000});
  }, [dispatch]);

  return (
      
    <>
    
      <Swiper
      data-aos="fade-up"
            

        slidesPerView={screenmid?3:1}
        spaceBetween={30}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false
        }}
        
      >
         {sliders &&
          sliders.map((el) => (
        <SwiperSlide key={el.id}><img  onClick={()=>redir(7)} src={el.url} alt="slide"/></SwiperSlide>  
          ))}
      </Swiper>
    </>
  );
}
