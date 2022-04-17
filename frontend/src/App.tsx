import { Layout, Breadcrumb, Form, Row } from "antd"
import "./App.css"
import "antd/dist/antd.css"
import { useEffect, useState } from "react"
import Navigation from "./Components/Navigation/Navigation"
import { useRecoilState } from "recoil"
import {
  darkThemePrimaryState,
  darkThemeSecondaryState,
  lightThemePrimaryState,
  lightThemeSecondaryState,
  themeState,
} from "./Components/States/Colors"
import Sidebar from "./Components/Sidebar/Sidebar"
import MainContent from "./Components/Content/MainContent"
import { Content } from "antd/lib/layout/layout"
import { PlusOutlined } from "@ant-design/icons"
import axios from "axios"

function App() {
  const [form] = Form.useForm()

  const [devices, setDevices] = useState<any[]>([])
  const [currentDevice, setCurrentDevice] = useState<any>(null)
  const [showDetail, setShowDetail] = useState<boolean>(false)
  const [windowWidth, setWindowWidth] = useState<number>(0)
  const [theme, setTheme] = useRecoilState(themeState)
  const [darkPrimary] = useRecoilState(darkThemePrimaryState)
  const [darkSecondary] = useRecoilState(darkThemeSecondaryState)
  const [lightPrimary] = useRecoilState(lightThemePrimaryState)
  const [lightSecondary] = useRecoilState(lightThemeSecondaryState)

  useEffect(() => {
    const userTheme = localStorage.getItem("react-smart-farm-theme")
    if (userTheme) setTheme(userTheme)
    else {
      localStorage.setItem("react-smart-farm-theme", "dark")
    }
    setWindowWidth(window.innerWidth)

    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth)
    })
    all()
  }, [])

  const all = async () => {
    // const data = await fetch("http://react-smart-farm-controller.com/").then(
    //   (data) => data.text()
    // )
    const res = await axios.get("http://localhost:8080/devices")
    setDevices(res.data.data)
  }

  return (
    <Layout>
      <Navigation
        darkTheme={theme === "dark"}
        setDarkTheme={(value: boolean) => setTheme(value ? "dark" : "light")}
      />
      <Layout>
        <Sidebar />
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
          {showDetail && (
            <MainContent
              windowWidth={windowWidth}
              device={currentDevice}
              onBack={() => setShowDetail(false)}
            />
          )}
          {!showDetail && (
            <Content
              className="site-layout-background"
              style={{
                margin: 0,
                minHeight: "calc(100vh - 64px - 34px)",
                marginTop: "2rem",
                backgroundColor: theme === "dark" ? darkPrimary : lightPrimary,
                display: "flex",
                justifyContent: "start",
              }}
            >
              <div
                style={{
                  width: 100,
                  height: 100,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: 48,
                  cursor: "pointer",
                  backgroundColor:
                    theme === "dark" ? darkSecondary : lightSecondary,
                  color: theme === "dark" ? "white" : "black",
                  marginRight: 16,
                }}
              >
                <PlusOutlined />
              </div>
              {devices.map((device) => {
                return (
                  <div
                    key={`device-${device.id}`}
                    style={{
                      width: 250,
                      height: 100,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: 36,
                      cursor: "pointer",
                      backgroundColor:
                        theme === "dark" ? darkSecondary : lightSecondary,
                      color: theme === "dark" ? "white" : "black",
                      marginRight: 16,
                    }}
                    onClick={() => {
                      setCurrentDevice(device)
                      setShowDetail(true)
                    }}
                  >
                    {device.name}
                  </div>
                )
              })}
            </Content>
          )}
        </Layout>
      </Layout>
    </Layout>
  )
}

export default App
