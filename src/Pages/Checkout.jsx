import React, { useState,useEffect  } from 'react';
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { useSelector,useDispatch } from 'react-redux';
import { Flex,Box } from '@chakra-ui/react';
import Address from '../Components/Address';
import { useAlert } from "react-alert";
import Spinner from '../Components/Spinner';
import axios from 'axios';
function Checkout() {
  const alert = useAlert();
  const cart= useSelector((state)=>state.cartReducer.cart);
  const [dlcharge, setdlcharge] = useState(0)
  const [loading, setloading] = useState(false)
  const isAuth= useSelector((state)=>state.userAuth.isAuth);
  window.document.title="Checkout-Hathibrand";
  const [paymentMethod, setPaymentMethod] = useState('COD');
  let addressop = window.localStorage.getItem("addressop");
  addressop = addressop ? JSON.parse(addressop) : {};


  let user = window.localStorage.getItem("user");
  if (user) {
    try {
      user = JSON.parse(user);
    } catch (error) {
      console.error("Error parsing user from local storage", error);
      user = { role: "hello" };
    }
  } else {
    user = { role: "hello" };
  }
  const[Total,setTotal]= useState(0)
  const[Totalweight,setTotalweight]= useState(0)
  function getRandomNumber(digit) {
    return Math.random().toFixed(digit).split('.')[1];
  }
  const order_body = {
    method:paymentMethod,
    client_txn_id: getRandomNumber(12),
    amount: paymentMethod==="cod"?(Total+dlcharge).toString():{Total}.toString(),
    products: JSON.stringify(cart),
    customer_name: user.name,
    customer_email: user.email, 
    customer_mobile: addressop.phone,
    user_id:user.id,
    addressop:JSON.stringify(addressop),
  }

  function handleSubmit() {
    if(addressop==={}){
      alert.error("please Enter Your Address")
      return;
    }
   
    setloading(true)
    axios
      .post(`https://real-cyan-swallow-boot.cyclic.app/create_order`,order_body)
      .then((response) => {
        if (response.data.data.payment_url) {
        setloading(false)
          window.location.href = response.data.data.payment_url;
        }
      })
      .catch((err) => console.log(err.message));
  }
  const calculateTotal = () => {
    let sum = cart.reduce(
      (acc, item) => acc + item.pr_que * item.pr_price,
      0
    )
    
    setTotal(sum);
  };
  const calculatewaieghtTotal = () => {
    let sum = cart.reduce(
      (acc, item) => acc + item.pr_weight * item.pr_que,
      0
    )
    
    setTotalweight(sum+150);
    
  };
  useEffect(() => {
    calculateTotal();
    calculatewaieghtTotal();
    if(Totalweight<=500){
      setdlcharge(60);
    }else if(Totalweight<=1000){
      setdlcharge(95)
    }else{
      let opji=Math.ceil(Totalweight/1000)-1;
      setdlcharge(95+(opji*36))
    }
    if(paymentMethod==="cod"){
      alert.info("COD में आपको डेल्वेरी चार्ज पे करना होगा")
    }
  }, [cart,addressop]);

  return (
    <>
    <Navbar/>
    <Flex padding={"10"} justifyContent={"space-around"} direction={["column-reverse","column","row"]}>

    <div className='flex-col justify-center items-center'>
      <Address/>
      <label className="block text-gray-700 text-md font-bold mb-2 p-3 shadow-lg mt-5">
        Payment Method:
        <select className='shadow-lg bg-black text-white rounded-lg ml-2 p-1' value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <option defaultChecked value="Online">Online Payment</option>
          <option defaultChecked value="cod">Cash on Delivery</option>
        </select>
      </label>
    <div className='flex justify-center items-center'>
      <button onClick={()=>cart.length>0?handleSubmit():alert.error("Add items in Cart")} className="bg-red-700 p-2 mt-5 text-white rounded-lg w-40  text-center" type="submit">Submit Order</button>
    </div>
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
      {paymentMethod==="cod" && <p className='flex justify-between text-lg'><span>Delivery Charge:</span> <span>{dlcharge}</span> </p>}
      <p className='flex justify-between font-bold border-t-2 border-black text-lg' key={"1"}>Total: <span>{paymentMethod==="cod"?(Total+dlcharge):(Total)}</span></p>
          </Box>
    </Flex>
}
    </Flex>
    {loading===true &&  <div className="fixed z-50 inset-0 bg-gray-500 opacity-75 flex items-center justify-center">
          <Spinner />
        </div>}
    <Footer/>
    </>
  );
}
export default Checkout;