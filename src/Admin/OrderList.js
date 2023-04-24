import { Document, Page, Text,pdf} from '@react-pdf/renderer';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getAllOrders } from "../Redux/AdminReducer/actions";
const OrderList = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.AdminReducer.orders);
  const [filterBy, setFilterBy] = useState("");
  const [uniqueDates, setUniqueDates] = useState([]);

  useEffect(() => {  
    dispatch(getAllOrders());
  }, [dispatch]);

  useEffect(() => {
    // Get unique transaction dates from orders
    const dates = new Set(orders.map(order => order.trx_date));
    setUniqueDates([...dates]);
  }, [orders]);

  const filteredOrders = orders.filter(order => order.trx_date.includes(filterBy));


  const downloadInvoice = async (order) => {
    console.log(order);
  
    // Parse the JSON strings into objects
    const billingAddress = JSON.parse(order.addressop);
    const products = JSON.parse(order.product);
  
    // Create a new PDF document
    const pdfDoc = (
      <Document>
        <Page>
          <Text>INVOICE</Text>
          <Text>Order ID: {order.order_id}</Text>
          <Text>Date: {order.trx_date}</Text>
          <Text>SHIP TO</Text>
          <Text>{billingAddress.name}</Text>
          <Text>{billingAddress.Address}</Text>
          <Text>{billingAddress.village}, {billingAddress.taluka}, {billingAddress.pincode}</Text>
          <Text>{billingAddress.state}</Text>
          <Text>Product Name Price Quantity Total</Text>
          {products.map((product) => (
            <Text key={product.pr_id}>
              {product.pr_name} ${product.pr_price} {product.pr_que.toString()} ${product.pr_price * product.pr_que}
            </Text>
          ))}
          {/* <Text>Subtotal: ${subtotal.toFixed(2)}</Text> */}
          {/* <Text>Total: ${total.toFixed(2)}</Text> */}
        </Page>
      </Document>
    );
  
    // Generate a blob from the PDF document
    const blob = await pdf(pdfDoc).toBlob();
  
    // Create a URL from the blob
    const url = URL.createObjectURL(blob);
  
    // Create a link and click it to trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.download = `invoice_${order.order_id}.pdf`;
    link.click();
  
    // Clean up the URL and link
    URL.revokeObjectURL(url);
    link.remove();
  };
  


  return (
    <div className=" lg:flex-row items-center lg:justify-between">
      <div className="mb-4 lg:mb-0">
        <select
          id="filterByDate"
          value={filterBy}
          onChange={(e) => {
            setFilterBy(e.target.value);
          }}
          className="py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select a date</option>
          {uniqueDates.map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mt-4">
        {filteredOrders && filteredOrders.map((order) => (
          <div key={order.order_id} className="border border-gray-300 rounded-lg p-4">
            <p className="text-lg font-medium mb-2">Order ID: {order.order_id}</p>
            <p className="text-gray-600 mb-2">Transaction ID: {order.trx_id}</p>
            <p className="text-gray-600 mb-2">Amount: {order.amount}</p>
            <p className="text-gray-600 mb-2">Status: {order.status}</p>
            <p className="text-gray-600 mb-2">Transaction Date: {order.trx_date}</p>
            <p >Payment: {order.payment === '1' ? <span className='text-green-500'>success</span> : <span className='text-red-500'>failed</span>}</p>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-blue-600"
              onClick={() => downloadInvoice(order)}
            >
              Download Invoice
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderList;
