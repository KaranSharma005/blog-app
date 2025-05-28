import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './slices/loginSlice';
import roleSlice from './slices/roleSlice';

const store =configureStore({
    reducer: {
        isLoggedIn : loginSlice,
        isAdmin : roleSlice
    },
})

export default store;