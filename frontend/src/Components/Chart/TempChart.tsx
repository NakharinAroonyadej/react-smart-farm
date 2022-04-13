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
import { useRecoilValue } from "recoil"
import {
  darkThemeSecondaryState,
  lightThemeSecondaryState,
  themeState,
} from "../States/Colors"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const labels = [
  "ม.ก.",
  "ก.พ.",
  "มี.ค.",
  "เม.ษ.",
  "พ.ค.",
  "มิ.ย.",
  "ก.ค.",
  "ส.ค.",
  "ต.ค.",
  "ก.ย.",
  "พ.ย.",
  "ธ.ค.",
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
  ],
}

function TempChart() {
  const theme = useRecoilValue(themeState)
  const darkSecondary = useRecoilValue(darkThemeSecondaryState)
  const lightSecondary = useRecoilValue(lightThemeSecondaryState)

  const options = {
    responsive: true,
    // bezierCurve: true,
    layout: {
      padding: 24,
    },
    scales: {
      y: {
        ticks: {
          color: theme === "dark" ? "white" : "black",
          font: {
            size: 16,
            family: "Lato",
          },
        },
      },
      x: {
        ticks: {
          color: theme === "dark" ? "white" : "black",
          font: {
            size: 16,
            family: "Kanit",
          },
        },
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          font: {
            size: 16,
            family: "Kanit",
          },
          padding: 10,
          color: theme === "dark" ? "white" : "black",
        },
        margin: 8,
      },
      title: {
        display: true,
        text: "กราฟอุณหภูมิ",
        font: {
          size: 24,
          family: "Kanit",
        },
        color: theme === "dark" ? "white" : "black",
      },
    },
  }

  return (
    <div
      style={{
        marginBottom: ".75rem",
        boxShadow:
          theme === "dark" ? "" : "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        backgroundColor: theme === "dark" ? darkSecondary : lightSecondary,
      }}
    >
      <Line options={options} data={data} />
    </div>
  )
}

export default TempChart
