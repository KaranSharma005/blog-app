import { Card, Form, Button, Input, notification, Spin, Flex } from "antd";
import { Typography } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import makeRequest from "../fetchRequest";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const SignUp = () => {
  const [form] = Form.useForm();
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log(values);
    try {
      setloading(true);
      const result = await makeRequest("sign-up", { body: values });
      notification.success({
        message : "Sign-up successfully",
        placement: "topRight",
        duration: 2
      })
      setloading(false);
      navigate("/sign-in");
    } catch (err) {
      setloading(false);
      notification.error({
        message: "Sign Up Error",
        description: err.message,
        placement: "topRight",
        duration: 4,
      });
    }
  };

  return (
    <>
      <Card
        style={{
          maxWidth: 500,
          margin: "auto",
          marginTop: 50,
          padding: 20,
          backgroundColor: "#f0f2f5",
        }}
      >
        <Title style={{ textAlign: "center", color: "#537D5D" }}>
          Sign-up to blog website
        </Title>

        <Form layout="horizontal" form={form} onFinish={onFinish}>
          <Form.Item label="Name">
            <Input placeholder="Enter Name" />
          </Form.Item>

          <Form.Item label="Email">
            <Input placeholder="Enteer Email" />
          </Form.Item>

          <Form.Item label="Password">
            <Input.Password
              placeholder="Enter password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Form.Item label="Password">
            <Input.Password
              placeholder="Enter password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Form.Item style={{ display: "flex", justifyContent: "center" }}>
            <Button type="primary" htmlType="submit" disabled={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>

        {loading && (
          <Flex align="center" justify="center">
            <Spin size="large" />
          </Flex>
        )}
      </Card>
    </>
  );
};

export default SignUp;
