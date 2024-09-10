import { Line } from "react-chartjs-2";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const LineChart = () => {
  const options = {};
  const LineChartData = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        label: "steps",
        data: [3000, 3500, 5000, 4000, 3500, 4500, 5000],
        borderColor: "#22668866",
      },
    ],
  };

  return (
    <>
      <Line options={options} data={LineChartData} />
    </>
  );
};

export const BarChart = () => {
  return <></>;
};
