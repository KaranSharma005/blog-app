import makeRequest from "../../components/fetchRequest";
import { setAuthChecked, setLoginStatus } from "./loginSlice";
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
    throw err;
  }
};

const addStudent = (payload) => async (dispatch) => {
  try{
    const response = await makeRequest("/student/addStudent", {
      body: payload,
      method: "POST",
    });
    return response?._id;
  }
  catch(err){
    console.log(err);
    throw err;
  }
}

const deleteStudent = (id) => async() => {
  try{
    const response = await makeRequest(`/student/deleteStudent?id=${id}`,{
      method : "DELETE"
    })
    return response?.message || "Student deleted successfully";
  }
  catch(err){
    console.log(err.message);
    throw err;
  }
}

const logout = () => async (dispatch) => {
  try{
    const response = await makeRequest("/api/logout",{
      method : "DELETE"
    });
    if(response?.success){
      await dispatch(setLoginStatus(false));
      await dispatch(setUserInfo({}));
    }
    
    return response;
  }
  catch(err){
    console.log(err.message);
    throw err;
  }
}

export {
  loginUser, 
  addStudent, 
  deleteStudent,
  logout
};
