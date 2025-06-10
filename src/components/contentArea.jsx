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
} from "antd";
import React,{ useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { addStudent } from "../store/slices/thunks";
import { useDispatch } from "react-redux";
import makeRequest from "./fetchRequest";
const { Content } = Layout;
const ContentArea = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const menuIndex = useSelector((state) => state.selectedIndexOfMenu);
  const [tableEnteries, setTableEnteries] = useState([]);

  useEffect(() => {
    async function fetchData(){
      if(menuIndex ==1){
        try{
        const response = await makeRequest("/student/getAll", { method : 'GET'});
        setTableEnteries((prevEnteries) => [...prevEnteries,...(response.data || [])]);
      }
      catch(err){
        notification.error({
        description: err.message,
        placement: "topRight",
        duration: 3,
      });
      }
      }
    }
    fetchData();
  },[menuIndex]);

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
        <Button danger onClick={() => handleDelete(record)}>
          Delete
        </Button>
      ),
    },
  ];

  async function onFinish(values) {
    setLoading(true);
    await dispatch(addStudent(values));
    setTableEnteries((prevEntries) => [...prevEntries, values]);
    setOpen(false);
    setLoading(false);
    form.resetFields();
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
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>

      <Content>
        <Table dataSource={tableEnteries} columns={columns} />;
      </Content>
    </>
  );
};

export default ContentArea;
