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
} from "antd";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { addStudent, deleteStudent, logout } from "../store/slices/thunks";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import makeRequest from "./fetchRequest";
import TestList from "../components/testlist";
const { Content } = Layout;

const ContentArea = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableEnteries, setTableEnteries] = useState([]);
  const [processDelete, setDeleteProcess] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.isLoggedIn.isLoggedIn);
  const menuIndex = useSelector((state) => state.selectedIndexOfMenu);

  useEffect(() => {
    async function fetchData() {
      if (menuIndex == 1) {
        try {
          const response = await makeRequest("/student/getAll", {
            method: "GET",
          });
          setTableEnteries(response?.data || []);
        } catch (err) {
          notification.error({
            description: err?.message || "Error in fetching table records",
            placement: "topRight",
            duration: 2,
          });
        }
      }
    }
    fetchData();
  }, [menuIndex]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const checkIndex = async () => {
      if (menuIndex == 3) {
        try {
          const response = await dispatch(logout());
          if (response?.success) {
            notification.success({
              message: response.msg || "User logged out Successfully",
              placement: "topRight",
              duration: 2,
            });
          }
        } catch (err) {
          notification.error({
            description: "Can't logout user at this time",
            placement: "topRight",
            duration: 2,
          });
        }
      }
    };
    checkIndex();
  }, [menuIndex]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Roll no",
      dataIndex: "rollNo",
      key: "rollNo",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button danger onClick={() => handleDelete(record)} disabled={processDelete}>
          Delete
        </Button>
      ),
    },
  ];

  async function handleDelete(record) {
    setDeleteProcess(true);
    try {
      await dispatch(deleteStudent(record?._id));
      const tabularData = tableEnteries.filter(
        (item) => item._id != record._id
      );
      setTableEnteries(tabularData);
    } catch (err) {
      notification.error({
        description: err?.message || "Error in deleting student",
        placement: "topRight",
        duration: 2,
      });
    }
    setDeleteProcess(false);
  }

  async function onFinish(values) {
    try {
      setLoading(true);
      const id = await dispatch(addStudent(values));
      values = { ...values, _id: id };
      setTableEnteries((prevEntries) => [...prevEntries, values]);
      setOpen(false);
      setLoading(false);
      form.resetFields();
    } catch (err) {
      notification.error({
        description: err?.message || "Error in adding student",
        placement: "topRight",
        duration: 2,
      });
    }
  }

  return (
    <>
      {menuIndex == 1 && (
        <Row justify="end">
          <Col>
            <Button type="primary" size="large" onClick={() => setOpen(!open)}>
              Add student
            </Button>
          </Col>
        </Row>
      )}

      <Drawer
        closable
        destroyOnHidden
        title={<p>Student Detail</p>}
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
          <Form.Item
            name="name"
            label="Student Name"
            rules={[
              {
                required: true,
                message: "Please input student name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input student E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="rollNo"
            label="Roll no"
            rules={[
              {
                required: true,
                message: "Please enter roll no!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>

      {menuIndex == 1 && (
        <Content>
          {processDelete && (
            <Flex align="center" gap="middle">
              <Spin />
            </Flex>
          )}
          <Table dataSource={tableEnteries} columns={columns} rowKey="_id" />
        </Content>
      )}

      {menuIndex == 2 && (
        <TestList /> // List of test history
      )}
    </>
  );
};

export default ContentArea;
