import React from 'react'
import OrderList from './OrderList'
import SideBar from "./components/Sidebar";

function Orders() {
  return (
    <div>
        <div>
         <SideBar title="orders" />
        </div>
        <OrderList/>
    </div>
  )
}

export default Orders