import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

import { useSelector } from "react-redux";
Chart.register(...registerables);

const ProductsStatistics = () => {
  const { RevenueNotReceivedMonthBefore } = useSelector((state) => ({
    ...state.order,
  }));
  const data = {
    labels:
      RevenueNotReceivedMonthBefore.data &&
      RevenueNotReceivedMonthBefore.data.map((x) => x._id?.month),
    datasets: [
      {
        label: `${
          RevenueNotReceivedMonthBefore.data &&
          RevenueNotReceivedMonthBefore.data.length
        } Not Received`,
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data:
          RevenueNotReceivedMonthBefore.data &&
          RevenueNotReceivedMonthBefore.data.map((x) => x.total_income),
      },
    ],
  };

  return (
    <div className="col-xl-6 col-lg-12">
      <div className="card mb-4 shadow-sm">
        <article className="card-body">
          <h5 className="card-title">Not Received Before and this Month</h5>
          <Line data={data} />
        </article>
      </div>
    </div>
  );
};

export default ProductsStatistics;
