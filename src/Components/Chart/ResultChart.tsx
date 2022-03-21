import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Line } from "react-chartjs-2"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "กราฟอุณหภูมิ ความชื้น และความชื้นดิน",
    },
    tooltip: {
      callbacks: {
        label: (item: any) => {
          if (item.dataset.label === "อุณหภูมิ") return `${item.raw} °C`
          else return `${item.raw} %`
        },
      },
    },
  },
}

const labels = [
  "มกราคม",
  "กุมภาพันธ์",
  "มีนาคม",
  "เมษายน",
  "พฤษภาคม",
  "มิถุนายน",
  "กรกฎาคม",
  "สิงหาคม",
  "ตุลาคม",
  "กันยายน",
  "พฤศจิกายน",
  "ธันวาคม",
]

export const data = {
  labels,
  datasets: [
    {
      label: "อุณหภูมิ (°C)",
      data: labels.map(() => Math.floor(Math.random() * 15) + 20),
      borderColor: "#7c3aed",
      backgroundColor: "rgba(124, 58, 237, 0.5)",
    },
    {
      label: "ความชื้น (%)",
      data: labels.map(() => Math.floor(Math.random() * 20) + 70),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
    {
      label: "ความชื้นดิน (%)",
      data: labels.map(() => Math.floor(Math.random() * 20) + 70),
      borderColor: "#16a34a",
      backgroundColor: "rgba(22, 163, 74, 0.5)",
    },
  ],
}

function ResultChart() {
  return (
    <div
      style={{
        marginTop: "1.5rem",
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      }}
    >
      <Line options={options} data={data} />
    </div>
  )
}

export default ResultChart
