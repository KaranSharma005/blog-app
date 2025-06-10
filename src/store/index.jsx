import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './slices/loginSlice';
import infoSlice from './slices/infoSlice';
import menuIndexSlice from './slices/menuIndexSlice'

const store =configureStore({
    reducer: {
        isLoggedIn : loginSlice,
        userDetails : infoSlice,
        selectedIndexOfMenu : menuIndexSlice,
    },
})

export default store;