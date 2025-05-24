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

      const result = await makeRequest("/api/signup", { body: values,method : 'POST'});
      notification.success({
        message: result.msg || "User Signed in Successfully",
        placement: "topRight",
        duration: 2,
      });

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
          <Form.Item label="Name" name="name">
            <Input placeholder="Enter Name" />
          </Form.Item>

          <Form.Item name="email" label="Email" rules={[{ type: "email" }]}>
            <Input placeholder="Your email" />
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
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
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

export default SignUp;
