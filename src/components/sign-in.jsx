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
import { loginUser } from "../store/slices/thunks";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const { Title } = Typography;
const SignIn = () => {
  const [form] = Form.useForm();
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.isLoggedIn.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  useEffect(() => {
  console.log("SignIn component mounted");
}, []);

  async function onFinish(values) {
    try {
      setloading(true);
      const response = await dispatch(loginUser(values));
      
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

export default SignIn;
