import { createBrowserRouter, Navigate } from "react-router-dom";
import MainPage from "../components/mainPage";

const protectedRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />, 
  },
]);

export default protectedRouter;