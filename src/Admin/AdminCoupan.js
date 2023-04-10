import React from 'react'
import {SimpleGrid} from '@chakra-ui/react'
import Sidebar from './components/Sidebar'
import { getCoupans } from '../Redux/AdminReducer/actions'
import {useDispatch,useSelector} from 'react-redux';
function AdminCoupan() {
    const dispatch = useDispatch();
  const coupan = useSelector((state) => state.AdminReducer.coupan);

  React.useEffect(()=>{
   dispatch(getCoupans()); 
  },[dispatch])
  return (
    <div>
        <Sidebar title={"Coupans"}/>
        <SimpleGrid data-aos="fade-up" columns={[2,4,8 ]} gap="3">
        {coupan &&
          coupan.map((el) => (
           <div className='flex-col justify-center items-center shadow-lg shadow-slate-900 p-3 ' key={el.id}>
            <h1>{el.cuponcode}</h1>
            <h1>{el.value}</h1>
            <h1>{el.price}</h1>
            <button className='bg-blue-500 text-white p-2 rounded-lg '>Delete</button>
           </div>
          ))}
      </SimpleGrid>
    </div>
  )
}

export default AdminCoupan