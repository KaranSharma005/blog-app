import { RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import RouterSwitcher from "./routes/routeSwitcher";
import "./app.css";
import { useEffect } from "react";
import makeRequest from "./components/fetchRequest";
import { setLoginStatus,setAuthChecked } from "./store/slices/loginSlice";
import { setUserInfo } from "./store/slices/infoSlice";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    async function onloadFunction() {
      try{
      const result = await makeRequest("/api/auth", {
        method: "GET",
      });
      if(result?.loggedIn == true){
        console.log("kljerio");
          await dispatch(setLoginStatus(true));
          await dispatch(setUserInfo(result?.userData));
      }
      }
      catch(err){
        console.log(err);
      }
      finally{
        dispatch(setAuthChecked(true));
      }
    }
    onloadFunction();
  }, [dispatch]);

  return <RouterSwitcher />;
};

export default App;
