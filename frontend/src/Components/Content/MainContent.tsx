import { Col, Layout, Modal, Row } from "antd"
import { useEffect, useRef, useState } from "react"
import { useRecoilValue } from "recoil"
import LightControlCard from "../Card/LightControlCard"
import ResultCard from "../Card/ResultCard"
import HumidChart from "../Chart/HumidChart"
import TempChart from "../Chart/TempChart"
import { LeftOutlined } from "@ant-design/icons"
import {
  darkThemePrimaryState,
  lightThemePrimaryState,
  themeState,
} from "../States/Colors"
const { Content } = Layout

const mockupFields = {
  timestamp: 0,
  temp: 29.5,
  airHumid: 97,
  soilHumid: 78,
}

type MainContentProps = {
  windowWidth: number
  device: any
  onBack: () => void
}

function MainContent({ windowWidth, device, onBack }: MainContentProps) {
  const theme = useRecoilValue(themeState)
  const darkPrimary = useRecoilValue(darkThemePrimaryState)
  const lightPrimary = useRecoilValue(lightThemePrimaryState)

  const [timestamp, setTimestamp] = useState<number>(0)
  const [temp, setTemp] = useState<number>(0)
  const [airHumid, setAirHumid] = useState<number>(0)
  const [soilHumid, setSoilHumid] = useState<number>(0)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

  const [firstRelay, setFirstRelay] = useState<boolean>(true)
  const [secondRelay, setSecondRelay] = useState<boolean>(true)
  const [thirdRelay, setThirdRelay] = useState<boolean>(true)
  const [fourthRelay, setFourthRelay] = useState<boolean>(false)

  const handleOk = () => {}

  const handleCancel = () => {}

  useEffect(() => {
    setTimestamp(mockupFields.timestamp)
    setTemp(mockupFields.temp)
    setAirHumid(mockupFields.airHumid)
    setSoilHumid(mockupFields.soilHumid)
  }, [])

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
            {device.relays.map((relay: any) => {
              return (
                <Col className="gutter-row" span={windowWidth <= 568 ? 24 : 12}>
                  <LightControlCard
                    width={windowWidth}
                    active={relay.active}
                    title={relay.name}
                    onClick={() => setIsModalVisible(true)}
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
          <TempChart />
        </Col>
        {/* <Col span={windowWidth <= 1024 ? 24 : 12}>
          <HumidChart />
        </Col> */}
      </Row>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </Content>
  )
}

export default MainContent
