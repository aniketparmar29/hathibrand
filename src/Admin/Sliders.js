
import React,{useEffect} from 'react'
import { useDispatch,useSelector } from "react-redux";
import {getSliders} from '../Redux/AdminReducer/actions'
import CreateSlider from './CreateSliders';
import Aos from "aos"
 import "aos/dist/aos.css"
 import SideBar from './components/Sidebar' 
 function Sliders() {
    const dispatch = useDispatch();
     const sliders = useSelector((state) => state.AdminReducer.sliders);
    useEffect(() => {
       dispatch(getSliders());
       Aos.init({ duration: 1000});
     }, [dispatch]);

  return (
    <div> 
    <div className='sticky top-0 z-50'>
         <SideBar title="Sliders" />
        </div>
      <div className="slider-container"> 
      <div>
        <CreateSlider/>
      </div>
      <div  className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5 z-0 p-5" data-aos="fade-up"> 
        {sliders && sliders.map((item,index)=>(
            <div key={index} className="shadow-md shadow-blue-900 p-3">
            <img src={item.url}  alt="incent-sticks"/> 
            <button className="w-[100%] border-2 mt-5 py-5 rounded-lg bg-blue-600 text-white text-lg hover:bg-blue-800 duration-300">Delete</button> 
            </div>

            
            ))} 
            </div> 

      </div>  

    </div>  
  )  
}  
export default Sliders