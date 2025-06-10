import { Layout, Menu, Flex } from "antd";
import { setMenuIndex } from "../store/slices/menuIndexSlice";
import { useDispatch } from "react-redux";
const { Sider } = Layout;

const siderColor = "#EAE4D5";
const textColor = "#003049";
const menuStyle = {
  background: siderColor,
  color: textColor,
  fontSize: "1.1rem",
};
const menuOptions = [
  { key: "1", label: "Sudents", style: { marginBottom: "1rem" } },
  { key: "2", label: "Tests" },
];

const Sidebar = (e) => {
  const dispatch = useDispatch();

  const handleMenuClick = async (e) => {
    await dispatch(setMenuIndex(e.key));
  };
  return (
    <Sider
      breakpoint="md"
      width="15rem"
      collapsedWidth="0"
      style={{ background: siderColor }}
    >
      <Flex
        vertical
        justify="space-between"
        style={{ height: "100%", width: "100%" }}
      >
        <Menu
          mode="vertical"
          defaultSelectedKeys={["1"]}
          style={menuStyle}
          items={menuOptions}
          onClick={handleMenuClick}
        />

        <Menu
          mode="vertical"
          style={menuStyle}
          items={[
            { key: "3", label: "Logout", style: { marginBottom: "1rem" } },
          ]}
          onClick={handleMenuClick}
        />
      </Flex>
    </Sider>
  );
};

export default Sidebar;
