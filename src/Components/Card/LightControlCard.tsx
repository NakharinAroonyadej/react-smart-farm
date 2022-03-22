import { Card } from "antd"
import { Switch } from "antd"
import { gold } from "@ant-design/colors"
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import {
  darkThemeSecondaryState,
  lightThemeSecondaryState,
  themeState,
} from "../States/Colors"
import { SettingOutlined } from "@ant-design/icons"

type LightControlCardProps = {
  active: boolean
  title: string
  width: number
}

function LightControlCard({ active, title, width }: LightControlCardProps) {
  const [loading, setLoading] = useState<boolean>(false)
  const [isActive, setIsActive] = useState<boolean>(false)
  const [spin, setSpin] = useState<boolean>(false)

  const [theme] = useRecoilState(themeState)
  const [darkSecondary] = useRecoilState(darkThemeSecondaryState)
  const [lightSecondary] = useRecoilState(lightThemeSecondaryState)

  const onChange = () => {
    setLoading(true)
    // Mockup.
    setTimeout(() => {
      setLoading(false)
      setIsActive(!isActive)
    }, 2000)
  }

  const onSetting = () => {
    setSpin(true)
    setTimeout(() => {
      setSpin(false)
    }, 150)
  }

  useEffect(() => {
    setIsActive(active)
  }, [])

  return (
    <Card
      bordered={false}
      style={{
        position: "relative",
        minHeight: 160,
        boxShadow:
          theme === "dark" ? "" : "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        justifyContent: width <= 768 ? "space-between" : "center",
        backgroundColor: theme === "dark" ? darkSecondary : lightSecondary,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: width <= 768 ? "row" : "column",
          justifyContent: width <= 768 ? "space-between" : "center",
          alignItems: "center",
          height: 100,
          padding: "0 1rem",
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            margin: 0,
            color: theme === "dark" ? "white" : "black",
          }}
        >
          {title}
        </h1>
        <Switch
          defaultChecked={false}
          checked={isActive}
          onChange={onChange}
          loading={loading}
          style={{
            backgroundColor: isActive ? gold[5] : "",
            transform: "scale(2)",
            width: "fit-content",
            marginRight: width <= 768 ? "1rem" : 0,
            marginTop: width <= 768 ? 0 : "1.5rem",
          }}
        />
      </div>
      <SettingOutlined
        style={{
          position: "absolute",
          right: 8,
          top: 8,
          fontSize: "1.5rem",
          color: theme === "dark" ? "white" : "black",
          cursor: "pointer",
        }}
        spin={spin}
        onClick={onSetting}
      />
    </Card>
  )
}

export default LightControlCard
