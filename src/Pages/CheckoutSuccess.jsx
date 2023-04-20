import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CheckoutSuccess = () => {
  const { txn_id } = useParams();
  const [paymentStatus, setPaymentStatus] = useState(null);
  const today = new Date();
      const day = String(today.getDate()).padStart(2, '0');
      const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
      const year = today.getFullYear();
      const formattedDate = `${day}/${month}/${year}`;
  const bodyop=
  {
      "key": "eec16523-acc0-45f8-9b07-f2ac9b34fbd1",
      "client_txn_id": txn_id,
      "txn_date": formattedDate
  }
  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        const response = await axios.post(
          `https://merchant.upigateway.com/api/check_order_status`,
          bodyop
        );        
        const { status } = response.data.data;
        setPaymentStatus(status);
      } catch (error) {
        console.log(error);
        setPaymentStatus('fail');
      }
    };
    checkPaymentStatus();
  }, [txn_id]);

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
      <Footer />
    </>
  );
};

export default CheckoutSuccess;
