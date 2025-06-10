import { useSelector } from "react-redux";
import { Layout } from "antd";
import HeaderComponent from './header';
import Sidebar from "./sidebar";
import ContentArea from "./contentArea";
const { Content } = Layout;

const MainPage = () => {
  const userInfo = useSelector((state) => state?.userDetails);
  const isAdmin = userInfo?.isAdmin;
  const textColor = "#003049";  
  return (
    <>
      {isAdmin && (
        <Layout style={{ minHeight: "100vh", margin: 0, padding: 0 }}>
          <HeaderComponent/>

          <Layout>
            <Sidebar/>
            <Content
              style={{
                margin: "16px",
                padding: 24,
                background: "#ffffff",
                borderRadius: 8,
                color: textColor
              }}
            >
              <ContentArea/> 
            </Content>
          </Layout>
        </Layout>
      )}
    </>
  );
};

export default MainPage;
