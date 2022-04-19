import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useRecoilValue } from "recoil";
import {
  darkThemeSecondaryState,
  lightThemeSecondaryState,
  themeState,
} from "../States/Colors";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const hoursFormat = new Array(24).fill(undefined).map((_, index) => {
  const ts = Math.round(new Date().getTime() / 1000);
  const target = ts - 1 * index * 3600;
  const hour = new Date(target * 1000).getHours();
  return hour === 0 ? "24:00" : `${String(hour).padStart(2, "0")}:00`;
});

const daysFormat = new Array(30).fill(undefined).map((_, index) => {
  const ts = Math.round(new Date().getTime() / 1000);
  const target = ts - 24 * index * 3600;
  return String(new Date(target * 1000).getDate());
});

const months = [
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
];

const monthsFormat = new Array(12).fill(undefined).map((_, index) => {
  const currentMonth = new Date().getMonth();
  return months[(currentMonth - (index % 12) + 12) % 12];
});

type ValuesChartProps = {
  values: any[];
  selectedMode: number;
};

function ValuesChart({ values, selectedMode }: ValuesChartProps) {
  // 0 - hours, 1 - days, 2 months
  const theme = useRecoilValue(themeState);
  const darkSecondary = useRecoilValue(darkThemeSecondaryState);
  const lightSecondary = useRecoilValue(lightThemeSecondaryState);
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
        title:{
          display:true,
          text: "อุณหภูมิ (°C)",
          color: theme === "dark" ? "white" : "black",
          font: {
            size: 16,
            family: "Lato",
          },
        },
      },
      y1: {
        type: "linear" as const,
        display: true,
        position: "right" as const,
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          color: theme === "dark" ? "white" : "black",
          font: {
            size: 16,
            family: "Lato",
          },
        },
        title:{
          display:true,
          text: "ความชื้น (%)",
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
        title:{
          display:true,
          text: "เวลา",
          color: theme === "dark" ? "white" : "black",
          font: {
            size: 16,
            family: "Lato",
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
        text: "กราฟอุณหภูมิและความชื้น",
        font: {
          size: 24,
          family: "Kanit",
        },
        color: theme === "dark" ? "white" : "black",
      },
    },
  };

  const data = {
    labels:
      selectedMode === 0
        ? [...hoursFormat].reverse()
        : selectedMode === 1
        ? [...daysFormat].reverse()
        : [...monthsFormat].reverse(),
    datasets: [
      {
        label: "อุณหภูมิ (°C)",
        data: values ? values.map((value) => value.temp) : [],
        borderColor: "#7c3aed",
        backgroundColor: "rgba(124, 58, 237, 0.5)",
        yAxisID: "y",
      },
      {
        label: "ความชื้นอากาศ (%)",
        data: values ? values.map((value) => value.airHumid) : [],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        yAxisID: "y1",
      },
      {
        label: "ความชื้นดิน (%)",
        data: values ? values.map((value) => value.soilHumid) : [],
        borderColor: "#16a34a",
        backgroundColor: "rgba(22, 163, 74, 0.5)",
        yAxisID: "y1",
      },
    ],
  };

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
  );
}

export default ValuesChart;
