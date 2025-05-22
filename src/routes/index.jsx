import { createBrowserRouter } from "react-router-dom";
import SignUp from "../components/sign-up";
import SignIn from "../components/sign-in";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignUp />,
  },
  {
    path:"/sign-in",
    element: <SignIn/>
  }
]);
export default router;
