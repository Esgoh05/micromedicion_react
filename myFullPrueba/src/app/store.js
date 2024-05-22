import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import deviceReducer from '../features/device/deviceSlice'
import installationReducer from '../features/installation/installationSlice'
import continuousMeasurementReducer from '../features/continuousMeasurement/continuousMeasurementSlice'
import modalReducer from '../features/modal/modalSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        device: deviceReducer,
        installation: installationReducer,
        continuousMeasurements: continuousMeasurementReducer,
        modal: modalReducer
    }
})