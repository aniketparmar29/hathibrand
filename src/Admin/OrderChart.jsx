import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const OrdersChart = ({ orders }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current && orders) {
      const filteredOrders = orders.filter((order) => order.payment === "1");
      const groupedOrders = filteredOrders.reduce((acc, curr) => {
        const date = curr.trx_date;
        const amount = parseInt(curr.amount);
        if (acc[date]) {
          acc[date] += amount;
        } else {
          acc[date] = amount;
        }
        return acc;
      }, {});
      const labels = Object.keys(groupedOrders);
      const amounts = Object.values(groupedOrders);
  
      const data = {
        labels: labels,
        datasets: [
          {
            label: "Orders Amount",
            data: amounts,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      };
      const options = {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };
      const myChart = new Chart(chartRef.current, {
        type: "bar",
        data: data,
        options: options,
      });
      return () => myChart.destroy();
    }
  }, [chartRef, orders]);

  return <canvas ref={chartRef} />;
};

export default OrdersChart;
