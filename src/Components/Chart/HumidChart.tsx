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

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
      labels: {
        font: {
          size: 16,
        },
      },
    },
    title: {
      display: true,
      text: "กราฟความชื้น",
      font: {
        size: 20,
      },
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
