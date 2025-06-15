import { createBrowserRouter } from "react-router-dom";
// import SignUp from "../components/sign-up";
import SignIn from "../components/sign-in";
import About from "../components/about";
const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <SignUp />,
  // },
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: '/abt',
    element : <About/>
  }
  
]);
export default router;
