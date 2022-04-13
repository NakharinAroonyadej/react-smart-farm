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
      label: "ความชื้นอากาศ (%)",
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

function HumidChart() {
  const theme = useRecoilValue(themeState)
  const darkSecondary = useRecoilValue(darkThemeSecondaryState)
  const lightSecondary = useRecoilValue(lightThemeSecondaryState)

  const options = {
    responsive: true,
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
            family: "Lato",
          },
          color: theme === "dark" ? "white" : "black",
        },
      },
      title: {
        display: true,
        text: "กราฟความชื้น",
        font: {
          size: 24,
          family: "Kanit",
        },
        color: theme === "dark" ? "white" : "black",
      },
      tooltip: {
        callbacks: {
          label: (item: any) => {
            return `${item.raw} °C`
          },
        },
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

export default HumidChart
