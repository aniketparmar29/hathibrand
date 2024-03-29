import React,{useEffect,useState} from 'react'
import { useDispatch,useSelector } from "react-redux";
import {getSliders,deleteslider} from '../Redux/AdminReducer/actions'
import CreateSliders from './CreateSliders';
import Aos from "aos"
import "aos/dist/aos.css"
import SideBar from './components/Sidebar' 
import { useAlert } from "react-alert";

 function Sliders() {
    const dispatch = useDispatch();
    const alert = useAlert();
    const [rerenderop, setrerenderop] = useState(false)
    const [showCreateProductModal, setShowCreateProductModal] = useState(false);
    const sliders = useSelector((state) => state.AdminReducer.sliders);
    window.document.title="Sliders-Admin"
    const remove = async (id)=>{
        dispatch(deleteslider(id));
        dispatch(getSliders());
        alert.success("Slider Deleted");
    }

    useEffect(() => {
        dispatch(getSliders());
    }, [dispatch,rerenderop]);

    useEffect(() => {
        Aos.init({ duration: 1000});
    }, []);


    const toggleCreateProductModal = () => {
      setShowCreateProductModal(!showCreateProductModal);
    };
    return (
        <div> 
            <div className='sticky top-0 z-50'>
                <SideBar title="Sliders" />
            </div>
            <div className="slider-container"> 
                <div className='flex-col justify-center items-center'>
                <button className='w-[200px] p-3 border-2 border-black my-5' onClick={toggleCreateProductModal}>Add Slider</button>
                {showCreateProductModal && (
                  <CreateSliders rerenderop={rerenderop} setrerenderop={setrerenderop}/>
                 )}
                </div>
                <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5 z-0 p-5" data-aos="fade-up"> 
                    {sliders && sliders.map((item,index)=>(
                        <div key={index} className="shadow-md shadow-blue-900 p-3">
                            <img src={item.url}  alt="incent-sticks"/> 
                            <button onClick={()=>remove(item.id)} className="w-[100%] border-2 mt-5 py-5 rounded-lg bg-blue-600 text-white text-lg hover:bg-blue-800 duration-300">Delete</button> 
                        </div>
                    ))} 
                </div> 
            </div>  
        </div>  
    )  
}  

export default Sliders
