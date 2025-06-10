import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn : false,
    isAuthChecked : false
}

const loginSlice = createSlice({
    name : "isLogin",
    initialState,
    reducers : {
        setLoginStatus(state,action) { 
            state.isLoggedIn =  action.payload;
        },
        setAuthChecked(state, action){
            state.isAuthChecked = action.payload;
        }
    }
})

export const {setLoginStatus, setAuthChecked} = loginSlice.actions;
export default loginSlice.reducer;