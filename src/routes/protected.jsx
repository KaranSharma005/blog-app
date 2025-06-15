import { createBrowserRouter, Navigate } from "react-router-dom";
import MainPage from "../components/mainPage";
import About from "../components/about";

const protectedRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
     errorElement: <div>Error rendering protected route</div>, 
  },
  {
    path: '/abt',
    element : <About/>
  }
]);

export default protectedRouter;