import { Avatar, Typography } from "antd"
import { Header } from "antd/lib/layout/layout"

const { Title } = Typography

function Navigation() {
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
        backgroundColor: "white",
        padding: "0 32px 0 16px",
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
      }}
    >
      <Title level={3} style={{ margin: 0 }}>
        React Smart Farm
      </Title>
      <div className="avatar-container">
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
