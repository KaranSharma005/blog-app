import {
  Button,
  Row,
  Col,
  Drawer,
  Form,
  Input,
  Flex,
  Spin,
  Layout,
  Table,
  notification,
  DatePicker,
  InputNumber,
} from "antd";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
const { Content } = Layout;

const TestList = () => {
  const menuIndex = useSelector((state) => state.selectedIndexOfMenu);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [tableEnteries, setTableEnteries] = useState([]);
  const navigate = useNavigate();

  function onFinish(values) {
    console.log(values);
    setTableEnteries((prev) => [...prev, values]);
  }

  const requiredRule = [
    {
      required: true,
      message: "Please input field value!",
    },
  ];

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Questions",
      key: "questions",
      render: (record) => {
        return record?.questions ? record.questions.length : 0;
      },
    },
    {
      title: "Result",
      key: "result",
      render: () => {
        return <Button>See result</Button>;
      },
    },
    {
      title: "Status",
      key: "status",
      render: (_, record) => {
        const questionsCount = record?.questions?.length || 0;
        const isActive = record?.status === "active";

        if (questionsCount > 0) {
          return isActive ? (
            <Button danger onClick={() => handleDeactivate(record)}>
              Deactivate
            </Button>
          ) : (
            <Button type="primary" onClick={() => handleActivate(record)}>
              Activate
            </Button>
          );
        }

        return <p>-</p>;
      },
    },
  ];

  async function onFinish(values) {
    try {
      console.log(values);
      const formattedValues = {
        ...values,
        date: values.date.format("YYYY-MM-DD"),
      };

      setLoading(true);
      setTableEnteries((prevEntries) => [...prevEntries, formattedValues]);
      setOpen(false);
      setLoading(false);
      form.resetFields();
    } catch (err) {
      notification.error({
        description: "Error in adding student",
        placement: "topRight",
        duration: 2,
      });
    }
  }

  return (
    <>
      {menuIndex == 2 && (
        <Row justify="end">
          <Col>
            <Button type="primary" size="large" onClick={() => setOpen(!open)}>
              Schedule test
            </Button>
          </Col>
        </Row>
      )}

      <Drawer
        closable
        destroyOnHidden
        title={<p>Test Detail</p>}
        placement="right"
        open={open}
        width="30rem"
        onClose={() => setOpen(false)}
      >
        {loading && (
          <Flex align="center" gap="middle">
            <Spin />
          </Flex>
        )}
        <Form
          layout="vertical"
          form={form}
          name="register"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
          scrollToFirstError
        >
          <Form.Item name="date" label="Test Date" rules={requiredRule}>
            <DatePicker
              format="YYYY-MM-DD"
              minDate={dayjs()}
              maxDate={dayjs().add(10, "day")}
            />
          </Form.Item>

          <Form.Item name="title" label="Title" rules={requiredRule}>
            <Input />
          </Form.Item>

          <Form.Item name="subject" label="Subject" rules={requiredRule}>
            <Input />
          </Form.Item>

          <Form.Item name="duration" label="Test Duration" rules={requiredRule}>
            <InputNumber placeholder="Enter duration in minutes" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
      {tableEnteries?.length > 0 && (
        <Content>
          <Table dataSource={tableEnteries} columns={columns} />
          {/*rowKey="_id"  */}
        </Content>
      )}
    </>
  );
};
export default TestList;
