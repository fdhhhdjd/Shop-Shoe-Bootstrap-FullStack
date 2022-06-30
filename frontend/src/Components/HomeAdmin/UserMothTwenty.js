import { Chart, registerables } from "chart.js";
import { Line } from "react-chartjs-2";

import { useSelector } from "react-redux";
Chart.register(...registerables);

const UserMothTwenty = () => {
  const { userMoth } = useSelector((state) => ({ ...state.admin }));
  const data = {
    labels: userMoth?.data && userMoth?.data.map((x) => x._id),
    datasets: [
      {
        label: `${userMoth?.data && userMoth?.data.length} User moth`,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        data: userMoth?.data && userMoth?.data.map((x) => x.count),
      },
    ],
  };

  return (
    <div className="col-xl-6 col-lg-12">
      <div className="card mb-4 shadow-sm">
        <article className="card-body">
          <h5 className="card-title">User Register 12 Moth</h5>
          <Line data={data} />
        </article>
      </div>
    </div>
  );
};

export default UserMothTwenty;
