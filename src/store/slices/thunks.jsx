import makeRequest from "../../components/fetchRequest";
import { setLoginStatus } from "./loginSlice";
import { setRole } from "./roleSlice";

const loginUser = (payload) => async (dispatch) => {
  try {
    alert("dfj")
    const response = await makeRequest("/api/signin", {
      body: payload,
      method: "POST",
    });
    if (response.success) {
      await dispatch(setLoginStatus(true));
      
      if(response.isAdmin == true){
        await dispatch(setRole(true));
      }
    } else {
      await dispatch(setLoginStatus(false));
    }
    
    return response;
  } catch (err) {
    await dispatch(setLoginStatus(false));
    throw new Error(err);
  }
};

export {loginUser};
