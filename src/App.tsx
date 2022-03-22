import { Layout, Menu, Breadcrumb, Row, Col, Form } from "antd"
import { HomeOutlined } from "@ant-design/icons"
import "./App.css"
import "antd/dist/antd.css"
import ResultCard from "./Components/Card/ResultCard"
import LightControlCard from "./Components/Card/LightControlCard"
import ResultChart from "./Components/Chart/ResultChart"
import { useEffect, useState } from "react"
import Navigation from "./Components/Navigation/Navigation"
import { purple, blue } from "@ant-design/colors"

const { Content, Sider } = Layout

const mockupFields = {
  timestamp: 0,
  temp: 29.5,
  airHumid: 97,
  soilHumid: 78,
}

function App() {
  const [form] = Form.useForm()

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
    all();
  }, [])

  const all = async () => {
    // const data = await fetch("http://react-smart-farm-controller.default.svr.cluster.local:5000/").then(data => data.json())
    const data = await fetch("http://localhost:5000/").then(data => data.text())
    console.log(data);
  }

  return (
    <Layout>
      <Navigation />
      <Layout>
        <Sider width={256} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            style={{
              width: 256,
              height: "calc(100% - 64px)",
              position: "fixed",
              left: 0,
              bottom: 0,
              zIndex: 1,
            }}
          >
            <Menu.Item key="1" icon={<HomeOutlined />}>
              หน้าหลัก
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px", backgroundColor: blue[1] }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              marginTop: "2.5rem",
            }}
          >
            {/* <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "end",
              }}
            >
              <Button
                onClick={toggleModal}
                type="primary"
                icon={<PlusOutlined />}
              >
                สร้างการ์ดใหม่
              </Button>
            </div> */}
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col className="gutter-row" span={8}>
                <ResultCard
                  title={"ค่าที่อ่านได้"}
                  temp={temp}
                  airHumid={airHumid}
                  soilHumid={soilHumid}
                />
              </Col>
              <Col span={16}>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                  <Col className="gutter-row" span={12}>
                    <LightControlCard active={firstLight} title="ไฟดวงที่ 1" />
                  </Col>
                  <Col className="gutter-row" span={12}>
                    <LightControlCard active={secondLight} title="ไฟดวงที่ 2" />
                  </Col>
                  <Col className="gutter-row" span={12}>
                    <LightControlCard active={thirdLight} title="ไฟดวงที่ 3" />
                  </Col>
                  <Col className="gutter-row" span={12}>
                    <LightControlCard active={fourth} title="ไฟดวงที่ 4" />
                  </Col>
                </Row>
              </Col>
            </Row>
            <ResultChart />
          </Content>
        </Layout>
      </Layout>
      {/* <Modal
        title="สร้างการ์ดใหม่"
        visible={isModalVisible}
        onOk={onFinish}
        onCancel={toggleModal}
      >
        <Form
          form={form}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="ชื่อ"
            name="name"
            rules={[{ required: true, message: "โปรดกรอกชื่อ" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="อุณหภูมิ"
            name="temp"
            rules={[{ required: true, message: "โปรดกรอกอุณหภูมิ" }]}
          >
            <Input status="error" />
          </Form.Item>
          <Form.Item
            label="ความชื้น"
            name="airHumid"
            rules={[{ required: true, message: "โปรดกรอกความชื้น" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="ความชื้นดิน"
            name="soilHumid"
            rules={[{ required: true, message: "โปรดกรอกความชื้นดิน" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal> */}
    </Layout>
  )
}

export default App
