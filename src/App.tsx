import { Layout, Breadcrumb, Form } from "antd"
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

function App() {
  const [form] = Form.useForm()

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
  }, [])

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
          <MainContent windowWidth={windowWidth} />
        </Layout>
      </Layout>
    </Layout>
  )
}

export default App
