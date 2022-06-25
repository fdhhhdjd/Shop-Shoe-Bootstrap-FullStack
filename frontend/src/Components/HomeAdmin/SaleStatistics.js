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
const SaleStatistics = () => {
  const { RevenueReceivedMonthBefore } = useSelector((state) => ({
    ...state.order,
  }));
  const data = {
    maintainAspectRatio: false,
    responsive: false,
    labels:
      RevenueReceivedMonthBefore.data &&
      RevenueReceivedMonthBefore.data.map((x) => x._id?.month),

    datasets: [
      {
        label: `${
          RevenueReceivedMonthBefore.data &&
          RevenueReceivedMonthBefore.data.length
        } this Month `,
        data:
          RevenueReceivedMonthBefore.data &&
          RevenueReceivedMonthBefore.data.map((x) => x.total_income),

        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
      {
        label: `${
          RevenueReceivedMonthBefore.data &&
          RevenueReceivedMonthBefore.data.length
        }  Last Month`,
        backgroundColor: [
          // "rgb(255, 99, 132)",
          // "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };
  return (
    <div className="col-xl-6 col-lg-12">
      <div className="card mb-4 shadow-sm">
        <article className="card-body">
          <h5 className="card-title"> Received Before and This Month </h5>
          <Bar data={data} />
        </article>
      </div>
    </div>
  );
};

export default SaleStatistics;
