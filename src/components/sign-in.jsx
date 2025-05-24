import {
  Card,
  Typography,
  Form,
  Input,
  Button,
  notification,
  Flex,
  Spin
} from "antd";
import { useState } from "react";
import { loginUser } from "../slices/thunks";
import { useDispatch } from "react-redux";

const { Title } = Typography;
const SignIn = () => {
  const [form] = Form.useForm();
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();

  async function onFinish(values) {
    try {
      setloading(true);
      const response = await dispatch(loginUser(values));
      console.log(response);
      
      notification.success({
        message: response.msg || "User logged in Successfully",
        placement: "topRight",
        duration: 2,
      });

      setloading(false);
    } catch (err) {
      setloading(false);
      notification.error({
        message: "Sign in Error",
        description: err.message,
        placement: "topRight",
        duration: 4,
      });
    }
  }

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
          Sign-in to your account
        </Title>

        <Form layout="horizontal" form={form} onFinish={onFinish}>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ type: "email", required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item style={{ display: "flex", justifyContent: "center" }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>

      {loading && (
        <Flex align="center" justify="center">
          <Spin size="large" />
        </Flex>
      )}
    </>
  );
};

export default SignIn;
