import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
const CheckoutSuccess = () => {
  const param = useParams();
  console.log(param)
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="lg:text-6xl md:text-6xl text-2xl  font-bold mb-8">Order Successful</h1>
        <Link
          to="/myorder"
          className="py-2 px-4 bg-indigo-500 text-white rounded-full hover:bg-indigo-600"
        >
          Check  Orders
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutSuccess;
