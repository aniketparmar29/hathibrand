import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getAllOrders } from "../Redux/AdminReducer/actions";

const OrderList = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.AdminReducer.orders);
  const [filterBy, setFilterBy] = useState("");

  useEffect(() => {  
    dispatch(getAllOrders());
  }, [dispatch])

  const filteredOrders = orders.filter(order => order.trx_date.includes(filterBy));
  console.log(filteredOrders,filterBy)

  // Function to format date in dd-mm-yyyy format
  

  return (
    <div>
      <input
        type="date"
        id="filterByDate"
        value={filterBy}
        onChange={(e) => {
          const [year, month, day] = e.target.value.split("-");
          const formattedDate = `${day}/${month}/${year}`;
          setFilterBy(formattedDate);
        }}
      />

      {filteredOrders && filteredOrders.map((order) => (
        <div key={order.order_id}>
          <p>Order ID: {order.order_id}</p>
          <p>Transaction ID: {order.trx_id}</p>
          <p>Amount: {order.amount}</p>
          <p>Status: {order.status}</p>
          <p>Transaction Date: {order.trx_date}</p>
        </div>
      ))}
    </div>
  );
}

export default OrderList;
