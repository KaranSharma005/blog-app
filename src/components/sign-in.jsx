import { Card, Typography, Form, Input, Button } from "antd";
import { useState } from "react";

const { Title } = Typography;
const SignIn = () => {
  const [form] = Form.useForm();


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

        <Form layout="horizontal" form={form} >

          <Form.Item name="email" label="Email" rules={[{ type: "email", required : true
           }]}>
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
            <Button type="primary" htmlType="submit" >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default SignIn;
