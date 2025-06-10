import { createSlice } from '@reduxjs/toolkit';

const menuIndexSlice = createSlice({
    name : "menuIndex",
    initialState : 1,
    reducers : {
        setMenuIndex(state,action) { 
            return action.payload;
        }
    }
})

export const {setMenuIndex} = menuIndexSlice.actions;
export default menuIndexSlice.reducer;