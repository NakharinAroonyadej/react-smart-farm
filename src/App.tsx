import { Layout, Menu, Breadcrumb, Row, Col, Form } from "antd"
import { HomeOutlined } from "@ant-design/icons"
import "./App.css"
import "antd/dist/antd.css"
import ResultCard from "./Components/Card/ResultCard"
import LightControlCard from "./Components/Card/LightControlCard"
import ResultChart from "./Components/Chart/HumidChart"
import { useEffect, useState } from "react"
import Navigation from "./Components/Navigation/Navigation"
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil"
import {
  darkThemePrimaryState,
  darkThemeSecondaryState,
  lightThemePrimaryState,
  lightThemeSecondaryState,
  themeState,
} from "./Components/States/Colors"
import TempChart from "./Components/Chart/TempChart"
import HumidChart from "./Components/Chart/HumidChart"

const { Content, Sider } = Layout

const mockupFields = {
  timestamp: 0,
  temp: 29.5,
  airHumid: 97,
  soilHumid: 78,
}

function App() {
  const [form] = Form.useForm()

  const [windowWidth, setWindowWidth] = useState<number>(0)
  const [theme, setTheme] = useRecoilState(themeState)
  const [darkPrimary] = useRecoilState(darkThemePrimaryState)
  const [darkSecondary] = useRecoilState(darkThemeSecondaryState)
  const [lightPrimary] = useRecoilState(lightThemePrimaryState)
  const [lightSecondary] = useRecoilState(lightThemeSecondaryState)

  const [timestamp, setTimestamp] = useState<number>(0)
  const [temp, setTemp] = useState<number>(0)
  const [airHumid, setAirHumid] = useState<number>(0)
  const [soilHumid, setSoilHumid] = useState<number>(0)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

  const [firstLight, setFirstLight] = useState<boolean>(true)
  const [secondLight, setSecondLight] = useState<boolean>(true)
  const [thirdLight, setThirdLight] = useState<boolean>(true)
  const [fourth, setFourthLight] = useState<boolean>(false)

  const toggleModal = () => setIsModalVisible(!isModalVisible)

  const onFinish = () => {}

  const onFinishFailed = () => {}

  useEffect(() => {
    setTimestamp(mockupFields.timestamp)
    setTemp(mockupFields.temp)
    setAirHumid(mockupFields.airHumid)
    setSoilHumid(mockupFields.soilHumid)
  }, [])

  window.addEventListener("resize", () => {
    setWindowWidth(window.innerWidth)
  })

  return (
    <Layout>
      <Navigation
        darkTheme={theme === "dark"}
        setDarkTheme={(value: boolean) => setTheme(value ? "dark" : "light")}
      />
      <Layout>
        <Sider width={56} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            style={{
              width: 56,
              height: "calc(100% - 64px)",
              position: "fixed",
              left: 0,
              bottom: 0,
              zIndex: 1,
              backgroundColor:
                theme === "dark" ? darkSecondary : lightSecondary,
              borderColor: theme === "dark" ? darkPrimary : lightPrimary,
            }}
          >
            <Menu.Item key="1" icon={<HomeOutlined />}>
              หน้าหลัก
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout
          style={{
            padding: "0 24px 24px",
            backgroundColor: theme === "dark" ? darkPrimary : lightPrimary,
          }}
        >
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              margin: 0,
              minHeight: 280,
              marginTop: "1.25rem",
              backgroundColor: theme === "dark" ? darkPrimary : lightPrimary,
            }}
          >
            <Row gutter={20}>
              <Col span={windowWidth <= 1024 ? 24 : 12}>
                <TempChart />
              </Col>
              <Col span={windowWidth <= 1024 ? 24 : 12}>
                <HumidChart />
              </Col>
            </Row>
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
                  <Col
                    className="gutter-row"
                    span={windowWidth <= 568 ? 24 : 12}
                  >
                    <LightControlCard
                      width={windowWidth}
                      active={firstLight}
                      title="รีเลย์ 1"
                    />
                  </Col>
                  <Col
                    className="gutter-row"
                    span={windowWidth <= 568 ? 24 : 12}
                  >
                    <LightControlCard
                      width={windowWidth}
                      active={secondLight}
                      title="รีเลย์ 2"
                    />
                  </Col>
                  <Col
                    className="gutter-row"
                    span={windowWidth <= 568 ? 24 : 12}
                  >
                    <LightControlCard
                      width={windowWidth}
                      active={thirdLight}
                      title="รีเลย์ 3"
                    />
                  </Col>
                  <Col
                    className="gutter-row"
                    span={windowWidth <= 568 ? 24 : 12}
                  >
                    <LightControlCard
                      width={windowWidth}
                      active={fourth}
                      title="รีเลย์ 4"
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default App
