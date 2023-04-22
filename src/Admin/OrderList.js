import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getAllOrders } from "../Redux/AdminReducer/actions";
import jsPDF from 'jspdf';
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

  const downloadInvoice = (order) => {
    // Create a new jsPDF instance
    const doc = new jsPDF();
  
    // Set font styles
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
  
    // Add title
    doc.text('INVOICE', 105, 25, { align: 'center' });
  
    // Set font styles
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
  
    // Add order ID and date
    doc.text(`Order ID: ${order.order_id}`, 10, 40);
    doc.text(`Date: ${order.trx_date}`, 10, 50);
  
    // Add billing address
    doc.text('BILL TO', 10, 70);
    doc.text(order.billing_address.name, 10, 80);
    doc.text(order.billing_address.street, 10, 90);
    doc.text(`${order.billing_address.city}, ${order.billing_address.state}, ${order.billing_address.zip}`, 10, 100);
    doc.text(order.billing_address.country, 10, 110);
  
    // Add shipping address
    doc.text('SHIP TO', 150, 70);
    doc.text(order.shipping_address.name, 150, 80);
    doc.text(order.shipping_address.street, 150, 90);
    doc.text(`${order.shipping_address.city}, ${order.shipping_address.state}, ${order.shipping_address.zip}`, 150, 100);
    doc.text(order.shipping_address.country, 150, 110);
  
    // Add table headers
    doc.text('Product Name', 10, 140);
    doc.text('Price', 100, 140);
    doc.text('Quantity', 130, 140);
    doc.text('Total', 170, 140);
  
    // Add table rows
    let yPos = 150;
    let subtotal = 0;
    order.products.forEach((product) => {
      doc.text(product.name, 10, yPos);
      doc.text(`$${product.price}`, 100, yPos);
      doc.text(product.quantity, 130, yPos);
      const total = product.price * product.quantity;
      doc.text(`$${total}`, 170, yPos);
      yPos += 10;
      subtotal += total;
    });
  
    // Add subtotal, tax and total
    const tax = subtotal * 0.1;
    const total = subtotal + tax;
    doc.text(`Subtotal: $${subtotal.toFixed(2)}`, 100, yPos + 20);
    doc.text(`Tax (10%): $${tax.toFixed(2)}`, 100, yPos + 30);
    doc.text(`Total: $${total.toFixed(2)}`, 100, yPos + 40);
  
    // Save the PDF
    doc.save(`invoice_${order.order_id}.pdf`);
  }

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
