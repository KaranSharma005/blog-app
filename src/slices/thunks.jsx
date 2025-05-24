import makeRequest from "../fetchRequest";
import { setLoginStatus } from "./loginSlice";


const loginUser = (payload) => async (dispatch) => {
  try {
    const response = await makeRequest("/api/signin", {
      body: payload,
      method: "POST",
    });
    if (response.success) {
      await dispatch(setLoginStatus(true));
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
