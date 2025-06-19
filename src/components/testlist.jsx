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
  Space,
} from "antd";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTest, getTestList, deleteTest } from "../store/slices/thunks";
import dayjs from "dayjs";
const { Content } = Layout;

const TestList = () => {
  const menuIndex = useSelector((state) => state.selectedIndexOfMenu);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [tableEnteries, setTableEnteries] = useState([]);

  async function handleDelete(record) {
    try{
      await dispatch(deleteTest(record._id));
      console.log(record._id);
      
      const updatedEnteries = tableEnteries.filter((data) => data._id != record._id);
      setTableEnteries(updatedEnteries);
    }
    catch(err){
      notification.error({
        description: "Can't delete test at this moment",
        placement: "topRight",
        duration: 2,
      });
    }
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
    try {
      const response = await dispatch(addTest(values));
      console.log(response,"sdchi");
      alert("kchoi")
      
      const formattedValues = {
        _id: response._id,
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
        description: "Error in adding test",
        placement: "topRight",
        duration: 2,
      });
    }
  }

  useEffect(() => {
    async function onloadFunction() {
      const data = await dispatch(getTestList());
      setTableEnteries(data);
    }
    onloadFunction();
  }, []);

  return (
    <>
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
            <InputNumber min={1} placeholder="Enter duration in minutes" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
      <Content>
        <Space direction="vertical" style={{ display: "flex" }} size="large">
          {menuIndex == 2 && (
            <Row justify="end">
              <Col>
                <Button
                  type="primary"
                  size="large"
                  onClick={() => setOpen(!open)}
                >
                  Schedule test
                </Button>
              </Col>
            </Row>
          )}
          {tableEnteries?.length > 0 && (
            <Table
              dataSource={tableEnteries}
              columns={columns}
              rowKey="_id"
              scroll={{ x: "max-content" }}
            />
          )}
        </Space>
      </Content>
    </>
  );
};
export default TestList;
