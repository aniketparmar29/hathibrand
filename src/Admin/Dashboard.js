import React, { useEffect,useRef,useState} from "react";
import Sidebar from "./components/Sidebar";
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
        <div className="dashboard">
          <Sidebar title="Dashboard"/>
          <MetaData title="Dashboard - Admin Panel" />
          <div className="dashboardContainer">
            <div className="dashboardSummary">
              <div>
                <span>
                  Total Amount <br /> ₹{totalAmount}
                </span>
              </div>
              <div className="dashboardSummaryBox2">
                <Link to="/admin/products">
                  <span>Product</span>
                  <span>{products && products.length}</span>
                </Link>
                <Link to="/admin/orders">
                  <span>Orders</span>
                  {/* <p>{orders && orders.length}</p> */}
                </Link>
                <Link to="/admin/users">
                  <span>Users</span>
                  <span>{users && users.length}</span>
                </Link>
              </div>
            </div>
          <div>
        <div>
          <h1 className="text-3xl text-center font-bold">Charts</h1>
          <div className="lg:flex md:flex  justify-center items-center w-[100%] m-auto">
            <div className="lg:w-[40%] w-[70%] m-auto">
              <canvas ref={chartRef} />
            </div>
            <div className="lg:w-[40%] w-[70%] m-auto">
              <canvas ref={chartRef2} />
            </div>
          </div>
            </div>
            </div>
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
