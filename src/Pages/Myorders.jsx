import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { getorders } from '../Redux/CartReducer/action';
import { ChevronLeftIcon } from '@chakra-ui/icons';
const MyOrders = () => {
  // Set the document title
  useEffect(() => {
    document.title = 'Orders - Hathibrand';
  }, []);
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
  // Get the authentication state and user's orders from the Redux store
  const isAuth = useSelector((state) => state.userAuth.isAuth);
  const userorders = useSelector((state) => state.cartReducer.userorders);
  // Get the dispatch function from the Redux store
  const dispatch = useDispatch();
  // Fetch the user's orders when the component mounts
  console.log(userorders)
  useEffect(() => {
    dispatch(getorders(user.id));
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-10">
        {isAuth ? (
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
            {(
         <div className="flex flex-col gap-4">
         {/* Map through the orders and display each one */}
         {userorders.map((order) => (
           <div
           key={order.order_id}
           className="lg:flex md:flex flex-col gap-2 p-4 rounded-lg shadow-md hover:shadow-lg"
           >
             {/* Display order information */}
             <div className="grid lg:grid-rows-1 md:grid-rows-1  grid-rows-5  items-center justify-between">
               <p>Status: {order.status}</p>
               <p>Transaction ID: {order.trx_id}</p>
               <p>Date: {order.trx_date}</p>
               <p>Amount: {order.amount}</p>
               {/* Display payment status */}
               <p>Payment: {order.payment === '1' ? "success" : "failed"}</p>
             </div>
             
             

           </div>
         ))}
       </div>
       


)}
          </div>
        ) : (
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Login to See Your Orders</h1>
            {/* Render a login form here */}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default MyOrders;
