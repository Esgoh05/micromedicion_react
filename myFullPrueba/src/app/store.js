import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import deviceReducer from '../features/device/deviceSlice'
import modalReducer from '../features/modal/modalSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        device: deviceReducer,
        modal: modalReducer
    }
})