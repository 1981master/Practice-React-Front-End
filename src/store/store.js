import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import kidReducer from './kidSlice'
import uiReducer from './uiSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        kids: kidReducer,
        ui: uiReducer,
    },
})
