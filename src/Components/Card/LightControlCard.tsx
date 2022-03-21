import { Card } from "antd"
import { Switch } from "antd"
import { gold } from "@ant-design/colors"

type LightControlCardProps = {
  active: boolean
  title: string
}

function LightControlCard({ active, title }: LightControlCardProps) {
  const onChange = () => {}

  return (
    <Card
      title={title}
      bordered={false}
      style={{
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "end",
        }}
      >
        <Switch
          defaultChecked={false}
          checked={active}
          onChange={onChange}
          style={{ backgroundColor: active ? gold[5] : "" }}
        />
      </div>
    </Card>
  )
}

export default LightControlCard
