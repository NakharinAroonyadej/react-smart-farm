import { Menu, Layout } from "antd"
import { useRecoilValue } from "recoil"
import {
  darkThemePrimaryState,
  darkThemeSecondaryState,
  lightThemePrimaryState,
  lightThemeSecondaryState,
  themeState,
} from "../States/Colors"
import { FaHome } from "react-icons/fa"
const { Sider } = Layout

function Sidebar() {
  const theme = useRecoilValue(themeState)
  const darkPrimary = useRecoilValue(darkThemePrimaryState)
  const darkSecondary = useRecoilValue(darkThemeSecondaryState)
  const lightPrimary = useRecoilValue(lightThemePrimaryState)
  const lightSecondary = useRecoilValue(lightThemeSecondaryState)
  return (
    <Sider width={64} className="site-layout-background">
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        style={{
          width: 64,
          height: "calc(100% - 64px)",
          position: "fixed",
          left: 0,
          bottom: 0,
          zIndex: 1,
          backgroundColor: theme === "dark" ? darkSecondary : lightSecondary,
          borderColor: theme === "dark" ? darkPrimary : lightPrimary,
        }}
      >
        <Menu.Item key="1" icon={<FaHome style={{ fontSize: "1.25rem" }} />}>
          หน้าหลัก
        </Menu.Item>
      </Menu>
    </Sider>
  )
}

export default Sidebar
