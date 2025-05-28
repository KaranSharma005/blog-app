import { RouterProvider } from "react-router-dom";
import router from "./index";
import  protectedRouter  from "./protected";
import { useSelector } from "react-redux";

const RouterSwitcher = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  return <RouterProvider router={isLoggedIn ? protectedRouter : router} />;
};

export default RouterSwitcher;