import { Layout, Breadcrumb, Form, Modal, Input } from "antd"
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
  const [deviceForm] = Form.useForm()

  const [devices, setDevices] = useState<any[]>([])
  const [currentDevice, setCurrentDevice] = useState<any>(null)
  const [showDetail, setShowDetail] = useState<boolean>(false)
  const [windowWidth, setWindowWidth] = useState<number>(0)
  const [theme, setTheme] = useRecoilState(themeState)
  const [darkPrimary] = useRecoilState(darkThemePrimaryState)
  const [darkSecondary] = useRecoilState(darkThemeSecondaryState)
  const [lightPrimary] = useRecoilState(lightThemePrimaryState)
  const [lightSecondary] = useRecoilState(lightThemeSecondaryState)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

  const all = async () => {
    const res = await axios.get(
      "http://react-smart-farm-controller.com/devices"
    )
    setDevices(res.data.data)
  }

  const onCreateDevice = async () => {}

  const handleOk = async (value: any) => {
    await axios.post("http://react-smart-farm-controller.com/devices", {
      name: value.deviceName,
    })
    deviceForm.resetFields()
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    deviceForm.resetFields()
    setIsModalVisible(false)
  }

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
  }, [handleOk])

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
                onClick={(e) => setIsModalVisible(true)}
              >
                <PlusOutlined />
              </div>
              <Modal
                title={`Create new device`}
                visible={isModalVisible}
                onOk={deviceForm.submit}
                onCancel={handleCancel}
              >
                <Form
                  form={deviceForm}
                  onFinish={handleOk}
                  name="RelaySetting"
                  fields={[
                    {
                      name: ["deviceName"],
                    },
                  ]}
                >
                  <Form.Item name="deviceName">
                    <Input addonBefore="Device name:" />
                  </Form.Item>
                </Form>
              </Modal>
            </Content>
          )}
        </Layout>
      </Layout>
    </Layout>
  )
}

export default App
