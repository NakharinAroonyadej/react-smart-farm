import { Col, Layout, Modal, Row, Input, Form, Select } from "antd"
import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import LightControlCard from "../Card/LightControlCard"
import ResultCard from "../Card/ResultCard"
import ValuesChart from "../Chart/ValuesChart"
import { LeftOutlined } from "@ant-design/icons"
import {
  darkThemePrimaryState,
  lightThemePrimaryState,
  themeState,
} from "../States/Colors"
import axios from "axios"
const { Content } = Layout

type MainContentProps = {
  windowWidth: number
  device: any
  onBack: () => void
}

type currRelayProps = {
  name: string
  id: string
  active: boolean
}

const now = new Date()
const daysInMonth = new Date(
  now.getUTCFullYear(),
  now.getMonth() + 1,
  0
).getDate()
const daysInYear =
  (now.getUTCFullYear() % 4 === 0 && now.getUTCFullYear() % 100 > 0) ||
  now.getUTCFullYear() % 400 == 0
    ? 366
    : 365

function MainContent({ windowWidth, device, onBack }: MainContentProps) {
  const theme = useRecoilValue(themeState)
  const darkPrimary = useRecoilValue(darkThemePrimaryState)
  const lightPrimary = useRecoilValue(lightThemePrimaryState)

  // 0 - hours, 1 - days, 2 - months
  const [mode, setMode] = useState<number>(0)
  const [values, setValues] = useState<any[]>()
  const [temp, setTemp] = useState<number>(0)
  const [airHumid, setAirHumid] = useState<number>(0)
  const [soilHumid, setSoilHumid] = useState<number>(0)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [currRelay, setCurrRelay] = useState<currRelayProps>()
  const [settingForm] = Form.useForm()

  const handleOk = async (value: any) => {
    const body = {
      name: value.relayName,
      id: currRelay?.id || "",
    }

    device.relays.forEach((relay: any) => {
      if (relay.id == currRelay?.id) {
        relay.name = value.relayName
      }
    })

    await axios.patch(
      `http://react-smart-farm-controller.com/relays/${device.id}`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const handleChange = (newValue: any) => {
    setMode(Number(newValue))
  }

  useEffect(() => {
    ;(async () => {
      const farmEnviValues = (
        await axios.get(
          `http://react-smart-farm-controller.com/values/${device.id}`
        )
      ).data.data
      const latestValue =
        farmEnviValues.values[farmEnviValues.values.length - 1]
      setTemp(latestValue.temp)
      setAirHumid(latestValue.airHumid)
      setSoilHumid(latestValue.soilHumid)
      const amount =
        mode === 0 ? 24 : mode === 1 ? 24 * daysInMonth : 24 * daysInYear
      const modeValues = (
        await axios.get(
          `http://react-smart-farm-controller.com/values/${device.id}/${amount}`
        )
      ).data.data
      setValues(modeValues.values)
    })()
  }, [mode])

  return (
    <Content
      className="site-layout-background"
      style={{
        margin: 0,
        minHeight: 280,
        marginTop: "1.25rem",
        backgroundColor: theme === "dark" ? darkPrimary : lightPrimary,
      }}
    >
      <div
        style={{
          color: theme === "dark" ? "white" : "black",
          fontSize: 36,
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <LeftOutlined
          style={{ marginRight: 16, cursor: "pointer", fontSize: 32 }}
          onClick={onBack}
        />
        <span>{device.name}</span>
      </div>
      <Row gutter={{ xs: 8, sm: 16, md: 20 }}>
        <Col className="gutter-row" span={windowWidth <= 768 ? 24 : 10}>
          <ResultCard
            title={"ค่าที่อ่านได้"}
            temp={temp}
            airHumid={airHumid}
            soilHumid={soilHumid}
          />
        </Col>
        <Col span={windowWidth <= 768 ? 24 : 14}>
          <Row gutter={{ xs: 8, sm: 16, md: 20 }}>
            {device.relays.map((relay: any, index: number) => {
              return (
                <Col
                  key={`relay-${index}`}
                  className="gutter-row"
                  span={windowWidth <= 568 ? 24 : 12}
                >
                  <LightControlCard
                    width={windowWidth}
                    active={relay.active}
                    title={relay.name}
                    device={device.id}
                    id={relay.id}
                    onClick={() => {
                      setCurrRelay({
                        name: relay.name,
                        id: relay.id,
                        active: relay.active,
                      })
                      settingForm.setFieldsValue({
                        relayName: relay.name,
                      })
                      setIsModalVisible(true)
                    }}
                  />
                </Col>
              )
            })}
          </Row>
        </Col>
      </Row>
      <Row gutter={20} style={{ marginTop: "1rem" }}>
        <Col
          span={windowWidth <= 1024 ? 24 : 24}
          style={{ marginBottom: windowWidth <= 1024 ? ".75rem" : "" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <span
              style={{
                color: theme === "dark" ? "white" : "black",
                fontSize: 24,
                marginRight: 8,
              }}
            >
              การแสดงผล
            </span>
            <Select
              defaultValue="0"
              style={{ width: 120, fontSize: 18 }}
              onChange={handleChange}
            >
              <Select.Option value="0">รายชั่วโมง</Select.Option>
              <Select.Option value="1">รายวัน</Select.Option>
              <Select.Option value="2">รายเดือน</Select.Option>
            </Select>
          </div>
          <ValuesChart values={values!} selectedMode={Number(mode)} />
        </Col>
      </Row>
      <Modal
        title={`Setting of ${currRelay?.name}`}
        visible={isModalVisible}
        onOk={settingForm.submit}
        onCancel={handleCancel}
      >
        <Form form={settingForm} onFinish={handleOk} name="RelaySetting">
          <Form.Item name="relayName">
            <Input addonBefore="Relay name:" />
          </Form.Item>
        </Form>
      </Modal>
    </Content>
  )
}

export default MainContent
