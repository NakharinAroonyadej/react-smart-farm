import { Card } from "antd"
import ResultField from "./ResultField"
import { orange, green, gold } from "@ant-design/colors"

type ResultCardProps = {
  title: string
  temp: number
  airHumid: number
  soilHumid: number
}

function ResultCard({ title, temp, airHumid, soilHumid }: ResultCardProps) {
  return (
    <Card
      title={title}
      bordered={false}
      style={{
        height: "100%",
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      }}
    >
      <ResultField
        color={orange[5]}
        title="อุณหภูมิ"
        value={temp.toString()}
        unit="°C"
      />
      <ResultField
        color={green[5]}
        title="ความชื้น"
        value={airHumid.toString()}
        unit="%"
      />
      <ResultField
        color={gold[7]}
        title="ความชื้นดิน"
        value={soilHumid.toString()}
        unit="%"
      />
    </Card>
  )
}

export default ResultCard
