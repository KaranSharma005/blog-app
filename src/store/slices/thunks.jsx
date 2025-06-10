import makeRequest from "../../components/fetchRequest";
import { setLoginStatus } from "./loginSlice";
import { setUserInfo } from "./infoSlice";

const loginUser = (payload) => async (dispatch) => {
  try {
    const response = await makeRequest("/api/signin", {
      body: payload,
      method: "POST",
    });
    if (response.success) {
      await dispatch(setLoginStatus(true));
      await dispatch(setUserInfo(response.user));         //set user detail name,email
    } else {
      await dispatch(setLoginStatus(false));
    }
    
    return response;
  } catch (err) {
    await dispatch(setLoginStatus(false));
    throw new Error(err);
  }
};

const addStudent = (payload) => async (dispatch) => {
  try{
    const response = await makeRequest("/student/addStudent", {
      body: payload,
      method: "POST",
    });
  }
  catch(err){
    console.log(err);
    
  }
}

export {loginUser, addStudent};
