import { Avatar, Dropdown, Menu, Switch, Typography } from "antd"
import { Header } from "antd/lib/layout/layout"
import { gold, blue } from "@ant-design/colors"
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs"
import styled from "@emotion/styled"
import { FaSignOutAlt } from "react-icons/fa"
import { useState } from "react"
import { MdAgriculture } from "react-icons/md"

const { Title } = Typography

const lightSecondary = "white"
const darkPrimary = "#141418"
const darkSecondary = "#23232e"

const { Item } = Menu

const StyledMenu = styled(Menu)`
  background-color: ${darkSecondary};
  width: 12rem;
`

const StyledMenuItem = styled(Item)`
  height: 3rem;
  &:hover {
    background-color: ${darkPrimary};
  }
`

const StyledLink = styled.a`
  color: white !important;
  font-size: 1rem;
`

const StyledLogOut = styled.a`
  color: red !important;
  font-size: 1rem;
`

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledAgricultureIcon = styled(MdAgriculture)`
  font-size: 2rem;
  margin-right: 0.5rem;
  color: ${blue[5]};
`

const StyledAppTitle = styled.h1`
  font-weight: normal;
  font-size: 2rem;
  margin: 0;
  color: ${blue[5]};
  font-family: Lato;
`

const menu = (
  <StyledMenu style={{ backgroundColor: darkSecondary }}>
    <StyledMenuItem>
      <StyledLink>1st menu item</StyledLink>
    </StyledMenuItem>
    <StyledMenuItem>
      <StyledLink>2nd menu item</StyledLink>
    </StyledMenuItem>
    <StyledMenuItem
      icon={<FaSignOutAlt style={{ color: "red", fontSize: "1.25rem" }} />}
    >
      <StyledLogOut>ออกจากระบบ</StyledLogOut>
    </StyledMenuItem>
  </StyledMenu>
)

type NavigationProps = {
  darkTheme: boolean
  setDarkTheme: (value: boolean) => void
}

function Navigation({ darkTheme, setDarkTheme }: NavigationProps) {
  const [loading, setLoading] = useState<boolean>(false)

  const onChange = () => {
    setLoading(true)
    setTimeout(() => {
      setDarkTheme(!darkTheme)
      localStorage.setItem(
        "react-smart-farm-theme",
        !darkTheme ? "dark" : "light"
      )
      setLoading(false)
    }, 100)
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
      <FlexContainer>
        <StyledAgricultureIcon />
        <StyledAppTitle>React Smart Farm</StyledAppTitle>
      </FlexContainer>
      <div className="avatar-container">
        <Switch
          defaultChecked={false}
          checked={darkTheme}
          checkedChildren={<BsMoonStarsFill style={{ marginTop: ".3rem" }} />}
          unCheckedChildren={<BsSunFill style={{ marginTop: ".3rem" }} />}
          onChange={onChange}
          loading={loading}
          style={{
            // backgroundColor: isActive ? gold[5] : "",
            transform: "scale(1.5)",
            marginRight: "2rem",
            backgroundColor: darkTheme ? blue[5] : gold[5],
          }}
        />
        <Dropdown
          overlay={menu}
          placement="bottomRight"
          arrow={{ pointAtCenter: true }}
        >
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            <Avatar
              size={{ xs: 24, sm: 28, md: 32, lg: 36, xl: 40, xxl: 48 }}
              src={
                "https://cdn.discordapp.com/attachments/933038909984739338/953226625980457030/unknown.png"
              }
            />
          </a>
        </Dropdown>
      </div>
    </Header>
  )
}

export default Navigation
