import React, { useEffect,useRef,useState} from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import { Link } from "react-router-dom";
import Chart from "chart.js/auto";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../Redux/AdminReducer/actions";
// import { getAllOrders } from "../Redux/AdminReducer/actions";
import { getAllUsers } from "../Redux/AdminReducer/actions";
import MetaData from "./MetaData";

const Dashboard = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.AdminReducer.products);
  const users = useSelector((state) => state.AdminReducer.users);
  const isAuth = useSelector((state) => state.userAuth.isAuth);
  let totalAmount=0;
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
    dispatch(getAllUsers());
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
              text: "Doughnut Chart",
            },
          },
        },
      });

      setChartInstance(newChartInstance);
    }
  }, [chartRef, outOfStock, products]);

  return (
    <>
      {isAuth && user.role === "admin" && (
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
          <canvas ref={chartRef} className="w-[50%]" />
          </div>
        </div>
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
