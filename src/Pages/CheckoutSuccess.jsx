import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Link, useParams } from 'react-router-dom'; // Importing useParams from react-router-dom
import Spinner from '../Components/Spinner';

const CheckoutSuccess = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
const client_txn_id = urlSearchParams.get('client_txn_id');
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
  const year = today.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;
  const bodyop = {
    "client_txn_id": client_txn_id,
    "txn_date": formattedDate
  }

  useEffect(() => {
    const checkPaymentStatus = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://real-cyan-swallow-boot.cyclic.app/check_order`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(bodyop)
        });
        const data = await response.json();
        const { status } = data.data;
        setPaymentStatus(status);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };
    checkPaymentStatus();
  }, [client_txn_id]);
  


  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="lg:text-6xl md:text-6xl text-2xl font-bold mb-8">
          {paymentStatus === 'success' ? 'Order Successful' : 'Payment Failed'}
        </h1>
        <Link
          to="/myorder"
          className="py-2 px-4 bg-indigo-500 text-white rounded-full hover:bg-indigo-600"
        >
          Check Orders
        </Link>
      </div>
      {loading && (
        <div className="fixed z-50 inset-0 bg-gray-500 opacity-75 flex items-center justify-center">
          <Spinner />
        </div>
      )}
      <Footer />
    </>
  );
};

export default CheckoutSuccess;
