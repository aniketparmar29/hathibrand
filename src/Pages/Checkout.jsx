import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
// import { updateCheckoutDetails, updatePaymentOption } from './actions/checkoutActions';

const Checkout = () => {
  const dispatch = useDispatch();
//   const { checkoutDetails, paymentOption } = useSelector((state) => state.checkout);
  const [showCODDetails, setShowCODDetails] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    // dispatch(updateCheckoutDetails(name, value));
  };

  const handlePaymentOptionChange = (event) => {
    const value = event.target.value;
    // dispatch(updatePaymentOption(value));
    setShowCODDetails(value === 'cod');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with checkoutDetails and paymentOption
  };

  return (
    <>
    <Navbar/>
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap mb-4">
          <div className="w-full md:w-1/2 md:pr-4">
            <label htmlFor="firstName" className="block text-gray-700 font-bold mb-2">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
            //   value={checkoutDetails.firstName}
              onChange={handleChange}
              className="w-full bg-gray-100 text-gray-800 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
          <div className="w-full md:w-1/2 md:pl-4">
            <label htmlFor="lastName" className="block text-gray-700 font-bold mb-2">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
            //   value={checkoutDetails.lastName}
              onChange={handleChange}
              className="w-full bg-gray-100 text-gray-800 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
        </div>
        {/* More form fields */}
        <div className="flex items-center mb-4">
          <input
            type="radio"
            id="online"
            name="paymentOption"
            value="online"
            // checked={paymentOption === 'online'}
            onChange={handlePaymentOptionChange}
            className="mr-2"
          />
          <label htmlFor="online" className="font-bold">
            Pay Online
          </label>
        </div>
        <div className="flex items-center mb-4">
          <input
            type="radio"
            id="cod"
            name="paymentOption"
            value="cod"
            // checked={paymentOption === 'cod'}
            onChange={handlePaymentOptionChange}
            className="mr-2"
          />
          <label htmlFor="cod" className="font-bold">
            Cash on Delivery
          </label>
        </div>
        {showCODDetails && (
          <div className="flex flex-wrap mb-4">
            <div className="w-full md:w-1/2 md:pr-4">
              <label htmlFor="codFirstName" className="block text-gray-700 font-bold mb-2">
First Name
</label>
<input
             type="text"
             id="codFirstName"
             name="codFirstName"
            //  value={checkoutDetails.codFirstName}
             onChange={handleChange}
             className="w-full bg-gray-100 text-gray-800 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
           />
</div>
<div className="w-full md:w-1/2 md:pl-4">
<label htmlFor="codLastName" className="block text-gray-700 font-bold mb-2">
Last Name
</label>
<input
             type="text"
             id="codLastName"
             name="codLastName"
            //  value={checkoutDetails.codLastName}
             onChange={handleChange}
             className="w-full bg-gray-100 text-gray-800 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
           />
</div>
</div>
)}
<div className="flex items-center justify-between mt-8">
<Link to="/cart" className="text-blue-500 hover:text-blue-800 font-bold">
Back to Cart
</Link>
<button
         type="submit"
         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
       >
Place Order
</button>
</div>
</form>
</div>
<Footer/>
</>
);
};

export default Checkout;
