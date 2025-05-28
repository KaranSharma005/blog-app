import { createSlice } from '@reduxjs/toolkit';

const roleSlice = createSlice({
    name : "Admin",
    initialState : false,
    reducers : {
        setRole(state,action) { 
            return action.payload;
        }
    }
})

export const {setRole} = roleSlice.actions;
export default roleSlice.reducer;