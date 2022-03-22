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
          color: "white",
        },
      },
    },
    title: {
      display: true,
      text: "กราฟอุณหภูมิ",
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
