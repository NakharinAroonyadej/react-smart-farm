import { Avatar, Switch, Typography } from "antd"
import { Header } from "antd/lib/layout/layout"
import { gold, blue } from "@ant-design/colors"
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs"

const { Title } = Typography

const lightPrimary = "#f1f5f9"
const lightSecondary = "white"
const darkPrimary = "#141418"
const darkSecondary = "#23232e"

type NavigationProps = {
  darkTheme: boolean
  setDarkTheme: (value: boolean) => void
}

function Navigation({ darkTheme, setDarkTheme }: NavigationProps) {
  const onChange = () => {
    setDarkTheme(!darkTheme)
  }

  return (
    <Header
      className="header"
      style={{
        position: "fixed",
        height: 64,
        zIndex: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        backgroundColor: darkTheme ? darkSecondary : lightSecondary,
        padding: "0 32px 0 16px",
        boxShadow: darkTheme ? "" : "rgba(0, 0, 0, 0.16) 0px 1px 4px",
      }}
    >
      <Title
        level={3}
        style={{ margin: 0, color: darkTheme ? "white" : "black" }}
      >
        React Smart Farm
      </Title>
      <div className="avatar-container">
        <Switch
          defaultChecked={false}
          checked={darkTheme}
          checkedChildren={<BsMoonStarsFill style={{ marginTop: ".3rem" }} />}
          unCheckedChildren={<BsSunFill style={{ marginTop: ".3rem" }} />}
          // checkedChildren={}
          onChange={onChange}
          // loading={loading}
          style={{
            // backgroundColor: isActive ? gold[5] : "",
            transform: "scale(1.5)",
            marginRight: "2rem",
            backgroundColor: darkTheme ? blue[5] : gold[5],
          }}
        />
        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          <Avatar
            size={{ xs: 24, sm: 28, md: 32, lg: 36, xl: 40, xxl: 48 }}
            src={
              "https://cdn.discordapp.com/attachments/933038909984739338/953226625980457030/unknown.png"
            }
          />
        </a>
      </div>
    </Header>
  )
}

export default Navigation
