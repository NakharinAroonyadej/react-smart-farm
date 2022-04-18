import { Col, Layout, Modal, Row, Input, Form } from "antd";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import LightControlCard from "../Card/LightControlCard";
import ResultCard from "../Card/ResultCard";
import TempChart from "../Chart/TempChart";
import { LeftOutlined } from "@ant-design/icons";
import {
  darkThemePrimaryState,
  lightThemePrimaryState,
  themeState,
} from "../States/Colors";
import axios from "axios";
const { Content } = Layout;

const mockupFields = {
  timestamp: 0,
  temp: 29.5,
  airHumid: 97,
  soilHumid: 78,
};

type MainContentProps = {
  windowWidth: number;
  device: any;
  onBack: () => void;
};

type currRelayProps = {
  name: string;
  id: string;
  active: boolean;
};

function MainContent({ windowWidth, device, onBack }: MainContentProps) {
  const theme = useRecoilValue(themeState);
  const darkPrimary = useRecoilValue(darkThemePrimaryState);
  const lightPrimary = useRecoilValue(lightThemePrimaryState);

  const [temp, setTemp] = useState<number>(0);
  const [airHumid, setAirHumid] = useState<number>(0);
  const [soilHumid, setSoilHumid] = useState<number>(0);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [currRelay, setCurrRelay] = useState<currRelayProps>();
  const [settingForm] = Form.useForm();

  const handleOk = async (value: any) => {
    const body = {
      name: value.relayName,
      id: currRelay?.id || "",
    }
    
    device.relays.forEach((relay:any) => {
      if (relay.id == currRelay?.id) {
        relay.name = value.relayName
      }
    });

    await axios.patch(
      `http://react-smart-farm-controller.com/relays/${device.id}`,body,{
        headers: {
          "Content-Type" : "application/json"
        } 
      }
    );
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    (async () => {
      const farmEnviValues = (await axios.get(`http://react-smart-farm-controller.com/values/${device.id}`)).data.data
      const latestValue = farmEnviValues.values[farmEnviValues.values.length-1]
      setTemp(latestValue.temp);
      setAirHumid(latestValue.airHumid);
      setSoilHumid(latestValue.soilHumid);
    })()
  }, []);

  return (
    <Content
      className="site-layout-background"
      style={{
        margin: 0,
        minHeight: 280,
        marginTop: "1.25rem",
        backgroundColor: theme === "dark" ? darkPrimary : lightPrimary,
      }}
    >
      <div
        style={{
          color: theme === "dark" ? "white" : "black",
          fontSize: 36,
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <LeftOutlined
          style={{ marginRight: 16, cursor: "pointer", fontSize: 32 }}
          onClick={onBack}
        />
        <span>{device.name}</span>
      </div>
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
            {device.relays.map((relay: any) => {
              return (
                <Col className="gutter-row" span={windowWidth <= 568 ? 24 : 12}>
                  <LightControlCard
                    width={windowWidth}
                    active={relay.active}
                    title={relay.name}
                    device={device.id}
                    id={relay.id}
                    onClick={() => {
                      setCurrRelay({
                        name: relay.name,
                        id: relay.id,
                        active: relay.active,
                      });
                      settingForm.setFieldsValue({
                        relayName: relay.name
                      })
                      setIsModalVisible(true);
                    }}
                  />
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>
      <Row gutter={20} style={{ marginTop: "1rem" }}>
        <Col
          span={windowWidth <= 1024 ? 24 : 24}
          style={{ marginBottom: windowWidth <= 1024 ? ".75rem" : "" }}
        >
          <TempChart />
        </Col>
        {/* <Col span={windowWidth <= 1024 ? 24 : 12}>
          <HumidChart />
        </Col> */}
      </Row>
      <Modal
        title={`Setting of ${currRelay?.name}`}
        visible={isModalVisible}
        onOk={settingForm.submit}
        onCancel={handleCancel}
      >
        <Form
          form={settingForm}
          onFinish={handleOk}
          name="RelaySetting"
        >
          <Form.Item name="relayName">
            <Input addonBefore="Relay name:"/>
          </Form.Item>
        </Form>
      </Modal>
    </Content>
  );
}

export default MainContent;
