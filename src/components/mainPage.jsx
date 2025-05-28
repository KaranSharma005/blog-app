import { useSelector, useDispatch } from "react-redux";
import { Layout } from "antd";
const { Header, Footer, Sider, Content } = Layout;

const MainPage = () => {
  const isAdmin = useSelector((state) => state.isAdmin);
  return (
    <>
      {isAdmin && (
        <Layout>
          <Header>Header</Header>
          <Layout>
            <Sider width="25%" >
              Sider
            </Sider>
            <Content>Content</Content>
          </Layout>
          <Footer>Footer</Footer>
        </Layout>
      )}
    </>
  );
};

export default MainPage;
