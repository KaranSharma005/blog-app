import { createSlice } from '@reduxjs/toolkit';

const infoSlice = createSlice({
    name : "userInfo",
    initialState : {},
    reducers : {
        setUserInfo(state,action) { 
            console.log(action);
            
            return action.payload;
        }
    }
})

export const {setUserInfo} = infoSlice.actions;
export default infoSlice.reducer;