import { configureStore } from '@reduxjs/toolkit';
import loginSlice from '../slices/loginSlice';
import {thunk} from 'redux-thunk';


const store =configureStore({
    reducer: {
        isLoggedIn : loginSlice,
    },
})

export default store;