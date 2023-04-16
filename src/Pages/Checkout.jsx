import React, { useState,useEffect  } from 'react';
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { useSelector } from 'react-redux';
import { Flex,Box } from '@chakra-ui/react';
function Checkout() {
  const cart= useSelector((state)=>state.cartReducer.cart)
  const isAuth= useSelector((state)=>state.userAuth.isAuth)

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [village, setVillage] = useState('');
  const [Address, setAddress] = useState('');
  const [taluka, setTaluka] = useState('');
  const [district, setDistrict] = useState('');
  const [pincode, setPincode] = useState('');
  const [state, setState] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD');

  function handleSubmit(event) {
    event.preventDefault();
    // Create an order object using the user's information and payment details
    const order = {
      name,
      phone,
      village,
      Address,
      taluka,
      district,
      pincode,
      state,
      paymentMethod,
    };
    // If the user selected online payment, redirect to the payment page
    if (paymentMethod === 'Online Payment') {
      window.location.href = 'https://example.com/payment';
    } else {
      // Send the order to the server for processing
      console.log('Order submitted:', order);
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
    <Flex justifyContent={"space-around"} direction={["column","column","row"]}>

    <form className="p-3 " onSubmit={handleSubmit}>
  <div>
    <label className="text-gray-700 text-md font-bold mb-2 block" htmlFor="name">Name:</label>
    <input className="mt-1 block w-full rounded-md p-2 shadow-lg  focus:border-indigo-500 focus:ring-indigo-500" type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" required />
  </div>
  <div>
    <label className="text-gray-700 text-md font-bold mb-2 block" htmlFor="phone">Phone:</label>
    <input className="mt-1 block w-full rounded-md p-2 shadow-lg  focus:border-indigo-500 focus:ring-indigo-500" type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter your phone number" pattern="[0-9]{10}" required />
  </div>
  <div>
    <label className="text-gray-700 text-md font-bold mb-2 block" htmlFor="village">Village:</label>
    <input className="mt-1 block w-full rounded-md p-2 shadow-lg  focus:border-indigo-500 focus:ring-indigo-500" type="text" id="village" value={village} onChange={(e) => setVillage(e.target.value)} placeholder="Enter your village" required />
  </div>
  <div>
    <label className="text-gray-700 text-md font-bold mb-2 block" htmlFor="address">Address:</label>
    <input className="mt-1 block w-full rounded-md p-2 shadow-lg  focus:border-indigo-500 focus:ring-indigo-500" type="text" id="address" value={Address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter your address" required />
  </div>
  <div>
    <label className="text-gray-700 text-md font-bold mb-2 block" htmlFor="taluka">Taluka:</label>
    <input className="mt-1 block w-full rounded-md p-2 shadow-lg  focus:border-indigo-500 focus:ring-indigo-500" type="text" id="taluka" value={taluka} onChange={(e) => setTaluka(e.target.value)} placeholder="Enter your taluka" required />
  </div>
  <div>
    <label className="text-gray-700 text-md font-bold mb-2 block" htmlFor="district">District:</label>
    <input className="mt-1 block w-full rounded-md p-2 shadow-lg  focus:border-indigo-500 focus:ring-indigo-500" type="text" id="district" value={district} onChange={(e) => setDistrict(e.target.value)} placeholder="Enter your district" required />
  </div>
  <div>
    <label className="text-gray-700 text-md font-bold mb-2 block" htmlFor="pincode">Pincode:</label>
    <input className="mt-1 block w-full rounded-md p-2 shadow-lg  focus:border-indigo-500 focus:ring-indigo-500" type="text" id="pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} placeholder="Enter your pincode" required/>
</div>
<div>

      <label className="block text-gray-700 text-md font-bold mb-2">
        State:
      </label>
        <input className="mt-1 block w-full rounded-md p-2 shadow-lg  focus:border-indigo-500 focus:ring-indigo-500" type="text" value={state} onChange={(e) => setState(e.target.value)} placeholder="Enter your state" required />
</div>
      <label className="block text-gray-700 text-md font-bold mb-2 p-3 shadow-lg mt-5">
        Payment Method:
        <select className='shadow-lg bg-black text-white rounded-lg ml-2 p-1' value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <option value="Online Payment">Online Payment</option>
          <option value="COD">Cash on Delivery</option>
        </select>
      </label>
      {paymentMethod === 'Online Payment' && (
        <p>You will be redirected to the payment page after submitting the order.</p>
      )}
      <button className="bg-[#440430] p-2 mt-5 text-white rounded-lg" type="submit">Submit Order</button>
    </form>
    
    {!isAuth && <div className="flex justify-center items-center text-3xl w-[100%] m-auto text-center font-extrabold my-28">LOGIN THEN YOU CAN ACCESS YOUR CART</div>}
    {isAuth && 
   
   <Flex justifyContent={"space-around"} direction={["column","column","row"]}>
      <p>Total: <span>{Total}</span></p>
    <Box border={"0px solid gray"} w={["100%", "90%","80%"]}>
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


          </Box>
    </Flex>
}
    </Flex>

    <Footer/>
    </>
  );
}
export default Checkout;