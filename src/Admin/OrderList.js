import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getAllOrders } from "../Redux/AdminReducer/actions";

const OrderList = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.AdminReducer.orders);
  const [filterBy, setFilterBy] = useState("");

  const handleGetAllOrders = () => {
    dispatch(getAllOrders());
  };


  return (
    <div>
      <button onClick={handleGetAllOrders}>Get All Orders</button>
      
      <input
       type="date"
       id="filterByDate"
       value={filterBy}
       onChange={(e) => setFilterBy(e.target.value)}
      />
      {orders && orders.filter((order) => order.trx_date.includes(filterBy)).map((order) => (
        <div key={order.order_id}>
          <p>Order ID: {order.order_id}</p>
          <p>Transaction ID: {order.trx_id}</p>
          <p>Amount: {order.amount}</p>
          <p>Status: {order.status}</p>
          <p>Transaction Date: {order.trx_date}</p>
        </div>
      ))}
    </div>
  )
}

export default OrderList;
