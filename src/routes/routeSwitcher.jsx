import { RouterProvider } from "react-router-dom";
import router from "./index";
import  protectedRouter  from "./protected";
import { useSelector } from "react-redux";
import { Spin ,
  Flex
} from 'antd';

const RouterSwitcher = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn.isLoggedIn);
  const isAuthChecked = useSelector((state) => state.isLoggedIn.isAuthChecked);

  if(!isAuthChecked){
    return (
      <Flex align="center" justify="center">
          <Spin size="large" />
        </Flex>
    )
  }

  return <RouterProvider router={isLoggedIn ? protectedRouter : router} />;
};

export default RouterSwitcher;