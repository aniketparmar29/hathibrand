import React, { useState,useEffect  } from 'react';
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { useSelector } from 'react-redux';
import { Flex,Box } from '@chakra-ui/react';
import Address from '../Components/Address';
function Checkout() {
  const cart= useSelector((state)=>state.cartReducer.cart)
  const isAuth= useSelector((state)=>state.userAuth.isAuth)
  window.document.title="Checkout-Hathibrand"
  const [paymentMethod, setPaymentMethod] = useState('COD');

  function handleSubmit(event) {
    // Create an order object using the user's information and payment details
    
    // If the user selected online payment, redirect to the payment page
    if (paymentMethod === 'Online Payment') {
      window.location.href = 'https://example.com/payment';
    } else {
      // Send the order to the server for processing
      // console.log('Order submitted:', order);
    }
  }
  const[Total,setTotal]= useState(0)

  const calculateTotal = () => {
    let sum = cart.reduce(
      (acc, item) => acc + item.pr_que * item.pr_price,
      0
    )
    
    setTotal(sum);
  };
  useEffect(() => {
    calculateTotal();
  }, [cart]);

  return (
    <>
    <Navbar/>
    <Flex padding={"10"} justifyContent={"space-around"} direction={["column","column","row"]}>

    <div className=''>
      <Address/>
      <label className="block text-gray-700 text-md font-bold mb-2 p-3 shadow-lg mt-5">
        Payment Method:
        <select className='shadow-lg bg-black text-white rounded-lg ml-2 p-1' value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <option defaultChecked value="Online Payment">Online Payment</option>
        </select>
      </label>
      {paymentMethod === 'Online Payment' && (
        <p>You will be redirected to the payment page after submitting the order.</p>
        )}
      <button className="bg-[#440430] p-2 mt-5 text-white rounded-lg " type="submit">Submit Order</button>
        </div>
    
    {!isAuth && <div className="flex justify-center items-center text-3xl w-[100%] m-auto text-center font-extrabold my-28">LOGIN THEN YOU CAN ACCESS YOUR CART</div>}
    {isAuth && 
   
   <Flex className='p-3 m-auto' justifyContent={"space-around"} direction={["column","column","row"]}>
    <Box border={"0px solid gray"} w={["80%", "90%","80%"]}>
    {cart.length !== 0 ? (
  cart.map((el) => (
    <div key={el.id} className="flex items-center gap-4 py-2">
    <img src={el.pr_img} alt="" className="w-20 h-20 object-cover rounded-lg" />
    <div className="flex flex-col">
      <p className="text-lg font-medium">{el.pr_name}</p>
      <p className="text-sm text-gray-500">{el.pr_que}*<span>{el.pr_price}</span></p>
    </div>
    <p className="text-lg font-medium">{el.pr_que * el.pr_price}</p>
    
  </div>
  
  ))
) : (
  <div className="flex justify-center items-center text-3xl w-[100%] m-auto text-center font-extrabold my-28">
    ADD ITEMS IN CART
  </div>
)}
      <p className='flex justify-between font-bold border-t-2 border-black text-lg' key={"1"}>Total: <span>{Total}</span></p>


          </Box>
    </Flex>
}
    </Flex>

    <Footer/>
    </>
  );
}
export default Checkout;