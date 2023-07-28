import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../features/users'
import worksiteReducer from '../features/worksites.reducer'

export default configureStore({
    reducer: {
        user: userReducer,
        worksite: worksiteReducer,
    }
})