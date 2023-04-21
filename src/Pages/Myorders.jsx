import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { getorders } from '../Redux/CartReducer/action';
import { Flex } from '@chakra-ui/react';
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
         order.payment==="1" && (
           <Flex
             direction={["column", "column", "row"]}
             justifyContent={"space-around"}
             key={order.order_id}
             className="gap-5 p-5  my-4 mx-2 rounded-lg shadow-lg shadow-slate-500 hover:shadow-slate-700"
           >
             {/* Display order information */}
             <div className="flex-col items-center justify-center  text-left gap-y-3 ">
               <p>Status: {order.status}</p>
               <p>Transaction ID: {order.trx_id}</p>
               <p>Date: {order.trx_date}</p>
               <p>Amount: {order.amount}</p>
               {/* Display payment status */}
               <p className='text-green-500'>Payment: {order.payment === '1' ? "success" : "failed"}</p>
             </div>
             {/* Display product information */}
             <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 grid-wrap gap-3">
             {order.product && Array.isArray(JSON.parse(order.product)) && JSON.parse(order.product).map((product) => (
               <div key={product.pr_id} className="flex-col items-center justify-center p-4 border rounded-lg shadow-lg lg:w-52 md:w-44 sm:w-full">
                 <img src={product.pr_img} alt={product.pr_name} className="w-full object-contain mb-4" />
                 <h2 className="text-lg font-bold">{product.pr_name}</h2>
                 <p className="text-gray-600">Price: {product.pr_price}</p>
                 <p className="text-gray-600">Category: {product.pr_category}</p>
                 <p className="text-gray-600">Weight: {product.pr_weight}</p>
               </div>
             ))}
             </div>
           </Flex>
         )
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
