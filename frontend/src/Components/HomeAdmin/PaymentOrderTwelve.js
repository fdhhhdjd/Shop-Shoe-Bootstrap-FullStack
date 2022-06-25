import React from "react";
import {
  Chart as ChartJs,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
ChartJs.register(BarElement, CategoryScale, LinearScale);
const PaymentOrderTwelve = () => {
  const { RevenueReceivedEveryMonth } = useSelector((state) => ({
    ...state.order,
  }));
  const data = {
    maintainAspectRatio: true,
    responsive: true,
    labels:
      RevenueReceivedEveryMonth.data &&
      RevenueReceivedEveryMonth.data.map((x) => x._id),

    datasets: [
      {
        label: `${
          RevenueReceivedEveryMonth.data &&
          RevenueReceivedEveryMonth.data.length
        } Moth PaymentOrder`,

        backgroundColor: "rgba(53, 162, 235, 0.5)",
        data:
          RevenueReceivedEveryMonth.data &&
          RevenueReceivedEveryMonth.data.map((x) => x.total_income),

        backgroundColor: [
          "rgb(255, 99, 132)",
          // "rgb(54, 162, 235)",
          // "#FF00FF",
          // "#FFB6C1",
        ],
        hoverOffset: 4,
      },
    ],
  };
  return (
    <div className="col-xl-6 col-lg-12">
      <div className="card mb-4 shadow-sm">
        <article className="card-body">
          <h5 className="card-title">Order Received 12 Moth </h5>
          <Bar data={data} />
        </article>
      </div>
    </div>
  );
};

export default PaymentOrderTwelve;
