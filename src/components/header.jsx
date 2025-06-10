import { Header } from "antd/es/layout/layout";
import { UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { Flex } from "antd";
const headerColor = "#B6B09F";
const textColor = "#003049";

const HeaderComponent = () => {
  const userName = useSelector((state) => state.userDetails.name);
  console.log(userName);

  return (
    <Header
      style={{ background: headerColor, textAlign: "left", paddingLeft: 0 }}
    >
      <Flex justify="space-between">
        <h2 style={{ margin: 0, color: textColor, marginLeft: '1rem'}}>Admin Portal</h2>
        <h2 style={{ margin: 0, color: textColor}}>Testify</h2>

        <Flex align="center" gap={15}>
          <p style={{ margin: 0, color: textColor, fontWeight: 400, fontSize : 20 }}>{userName}</p>
          <UserOutlined style={{ fontSize: 28, color: 'black' }} />
        </Flex>
      </Flex>
    </Header>
  );
};

export default HeaderComponent;
