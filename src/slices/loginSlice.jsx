import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
    name : "isLogin",
    initialState : false,
    reducers : {
        setLoginStatus(state,action) { 
            return action.payload;
        }
    }
})

export const {setLoginStatus} = loginSlice.actions;
export default loginSlice.reducer;