import makeRequest from "../../components/fetchRequest";
import { setLoginStatus } from "./loginSlice";
import { setUserInfo } from "./infoSlice";
import dayjs from "dayjs";


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
    throw err;
  }
}

const addTest = (payload) => async(dispatch) => {
  try{
    const response = await makeRequest("/test/addTest",{
      body : payload,
      method : "POST"
    });
    return response;
  }
  catch(err){
    throw err;
  }
}

const getTestList = () => async(dispatch) => {
  try{
    const response = await makeRequest("/test/getAll", {
      method : "GET",
    });

    const formattedData = response.data.map((ele) => {
      return {
        ...ele ,
        date : dayjs(ele.date).format("YYYY-MM-DD")
      }
    })
    return formattedData;
  }
  catch(err){
    throw err;
  }
}

const deleteTest = (id) => async (dispatch) => {
  try{
    const response = await makeRequest(`/test/delete?id=${id}`,{
      method : "DELETE"
    });
  }
  catch(err){
    throw err;
  }
}

export {
  loginUser, 
  addStudent, 
  deleteStudent,
  logout, 
  addTest,
  getTestList,
  deleteTest
};
