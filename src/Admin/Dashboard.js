import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import { Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Doughnut, Line,Chart  } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../Redux/AdminReducer/actions";
// import { getAllOrders } from "../Redux/AdminReducer/actions";
import { getAllUsers } from "../Redux/AdminReducer/actions";
import MetaData from "./MetaData";

const Dashboard = () => {
  const dispatch = useDispatch();

  const products= useSelector((state)=>state.AdminReducer.products)
  const users= useSelector((state)=>state.AdminReducer.users)
  // const orders= useSelector((state)=>state.AdminReducer.orders)
  const isAuth= useSelector((state)=>state.userAuth.isAuth)
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
  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getProducts());
    // dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  // orders &&
  //   orders.forEach((item) => {
  //     totalAmount += item.totalPrice;
  //   });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  return (
    <>
    {isAuth && user.role==="admin" && 
    <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="dashboardContainer">
        <h1 className="text-xl text-center">Dashboard</h1>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ₹{totalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              {/* <p>{orders && orders.length}</p> */}
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>

        {/* <div className="lineChart">
          <Line data={lineState} />
        </div> */}

        {/* <div className="doughnutChart">
  <Doughnut
    data={doughnutState}
    options={{ maintainAspectRatio: false }}
    chart={Chart}
  />
</div> */}
      </div>
    </div>
}
{
  isAuth && user.role==="user" && 
  <h1 className="text-center text-2xl font-bold ">Login With Admin Account </h1>
}
{  !isAuth && 
  <h1 className="text-center text-2xl font-bold ">Login With Admin Account </h1>
}
</>
  );
};

export default Dashboard;
