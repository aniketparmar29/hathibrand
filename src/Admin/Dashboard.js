import React, { useEffect,useRef,useState} from "react";
import Sidebar from "./components/Sidebar";
import "./dashboard.css";
import { Link } from "react-router-dom";
import {Box} from '@chakra-ui/react'
import Chart from "chart.js/auto";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../Redux/AdminReducer/actions";
import { getAllOrders } from "../Redux/AdminReducer/actions";
import { getAllUsers } from "../Redux/AdminReducer/actions";
import MetaData from "./MetaData";
import OrdersChart from "./OrderChart";
const Dashboard = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.AdminReducer.products);
  const orders = useSelector((state) => state.AdminReducer.orders);
  const users = useSelector((state) => state.AdminReducer.users);
  const isAuth = useSelector((state) => state.userAuth.isAuth);
  const totalAmount = orders
  .filter(order => order.payment === "1" || order.method==="cod")
  .reduce((acc, order) => acc + parseInt(order.amount), 0) || 0;
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
let aggarbati=0;
let cosmetic=0;

for(let i=0;i<products.length;i++){
  if(products[i].Category==="Agarbatti"){
    aggarbati++;
  }else if(products[i].Category==="Cosmetic"){
    cosmetic++;
  }
}

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getAllUsers());
    dispatch(getAllOrders());
  }, [dispatch]);
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    if (chartRef.current && products) {
      const myChartRef = chartRef.current.getContext("2d");
      let newChartInstance = null;

      if (chartInstance) {
        chartInstance.destroy();
      }

      newChartInstance = new Chart(myChartRef, {
        type: "doughnut",
        data: {
          labels: ["Out of Stock", "InStock"],
          datasets: [
            {
              label: "# of Products",
              data: [outOfStock, products.length - outOfStock],
              backgroundColor: ["red", "blue"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Product Stock Chart",
            },
          },
        },
      });

      setChartInstance(newChartInstance);
    }
  }, [chartRef, outOfStock]);

  const chartRef2 = useRef(null);
  const [chartInstance2, setChartInstance2] = useState(null);

  useEffect(() => {
    if (chartRef2.current && products) {
      const myChartRef2 = chartRef2.current.getContext("2d");
      let newChartInstance = null;

      if (chartInstance2) {
        chartInstance2.destroy();
      }

      newChartInstance = new Chart(myChartRef2, {
        type: "doughnut",
        data: {
          labels: ["Agarbatti", "cosmetics"],
          datasets: [
            {
              label: "# of Products",
              data: [aggarbati,cosmetic],
              backgroundColor: ["pink", "yellow"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Product Category Chart",
            },
          },
        },
      });

      setChartInstance2(newChartInstance);
    }
  }, [chartRef2,aggarbati,cosmetic,products]);


  return (
    <>
      {isAuth && user.role === "admin" && (
       <Box className="bg-gray-100 min-h-screen">
         <div className="bg-white border-r border-gray-200">
           <Sidebar title="Dashboard"/>
         </div>
       <div className="flex flex-col md:flex-row">
         <div className="flex flex-col flex-1">
           <div className="bg-white border-b border-gray-200">
             <MetaData title="Dashboard - Admin Panel" />
           </div>
           <div className="p-4 md:p-8 flex-1 text-center">
             <div className="flex flex-col md:flex-row justify-center">
               <div className="bg-white shadow-md p-4 md:p-8 mb-4 md:mb-0">
                 <span className="text-gray-600 font-bold text-lg mb-2">Total Amount=</span>
                 <span className="text-gray-900 font-bold text-2xl">₹{totalAmount}</span>
               </div>
               <div className="flex flex-col md:flex-row justify-center">
                 <Link to="/admin/products" className="bg-white shadow-md p-4 md:p-8 mb-4 md:mb-0 mr-4 md:mr-0">
                   <span className="text-gray-600 font-bold text-lg mb-2">Products=</span>
                   <span className="text-gray-900 font-bold text-2xl">{products && products.length}</span>
                 </Link>
                 <Link to="/admin/orders" className="bg-white shadow-md p-4 md:p-8 mb-4 md:mb-0 mr-4 md:mr-0">
                   <span className="text-gray-600 font-bold text-lg mb-2">Orders=</span>
                   <span className="text-gray-900 font-bold text-2xl">{orders && orders.length}</span>
                 </Link>
                 <Link to="/admin/users" className="bg-white shadow-md p-4 md:p-8 mb-4 md:mb-0">
                   <span className="text-gray-600 font-bold text-lg mb-2">Users=</span>
                   <span className="text-gray-900 font-bold text-2xl">{users && users.length}</span>
                 </Link>
                
               </div>
             </div>
             <div className="mt-8">
               <h1 className="text-3xl text-center font-bold mb-8">Charts</h1>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="bg-white shadow-md p-4 md:p-8">
                   <canvas ref={chartRef} />
                 </div>
                 <div className="bg-white shadow-md p-4 md:p-8">
                   <canvas ref={chartRef2} />
                 </div>
                 <div className="bg-white shadow-md p-4 md:p-8">
                   <OrdersChart orders={orders}/>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
     </Box>
      )}
      {isAuth && user.role === "user" && (
        <h1 className="text-center text-2xl font-bold ">
          Login With Admin Account{" "}
        </h1>
      )}
      {!isAuth && (
        <h1 className="text-center text-2xl font-bold ">
          Login With Admin Account{" "}
        </h1>
      )}
    </>
  );
};

export default Dashboard;
