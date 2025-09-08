import { Line, Bar } from "react-chartjs-2";
import { motion } from "framer-motion";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const baseGridColor = "rgba(0,0,0,0.06)";
const primary = getComputedStyle(document.documentElement).getPropertyValue('--primary-color') || '#6e8efb';
const secondary = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color') || '#a777e3';
const textDark = getComputedStyle(document.documentElement).getPropertyValue('--text-dark') || '#333';
const textLight = getComputedStyle(document.documentElement).getPropertyValue('--text-light') || '#666';

export const LineChart = ({ labels = [], series = [], title = "" }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: { display: true, labels: { color: textDark.trim() } },
      title: { display: !!title, text: title, color: textDark.trim(), font: { weight: 600 } },
      tooltip: { enabled: true },
    },
    scales: {
      x: { grid: { color: baseGridColor }, ticks: { color: textLight.trim() } },
      y: { grid: { color: baseGridColor }, ticks: { color: textLight.trim() } },
    },
  };

  const data = {
    labels,
    datasets: series.map((s, idx) => ({
      label: s.label,
      data: s.data,
      borderColor: idx % 2 === 0 ? primary.trim() : secondary.trim(),
      backgroundColor: idx % 2 === 0 ? primary.trim() + '33' : secondary.trim() + '33',
      tension: 0.35,
      fill: true,
    })),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -4 }}
    >
      <Line options={options} data={data} />
    </motion.div>
  );
};

export const BarChart = ({ labels = [], series = [], title = "" }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: { display: true, labels: { color: textDark.trim() } },
      title: { display: !!title, text: title, color: textDark.trim(), font: { weight: 600 } },
      tooltip: { enabled: true },
    },
    scales: {
      x: { grid: { color: baseGridColor }, ticks: { color: textLight.trim() } },
      y: { grid: { color: baseGridColor }, ticks: { color: textLight.trim() } },
    },
  };

  const data = {
    labels,
    datasets: series.map((s, idx) => ({
      label: s.label,
      data: s.data,
      backgroundColor: idx % 2 === 0 ? primary.trim() + '88' : secondary.trim() + '88',
      borderRadius: 6,
    })),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -4 }}
    >
      <Bar options={options} data={data} />
    </motion.div>
  );
};
