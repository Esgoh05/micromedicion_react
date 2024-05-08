import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import deviceService from '../device/deviceService'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    devices: []
}

//Registrar un nuevo dispositivo
export const registerDevice = createAsyncThunk('device/registerDevice', async (device, thunkAPI) => {
    try{
        return await deviceService.registerDevice(device)
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Obtener informacion de todos los dispositivos
export const getDevices = createAsyncThunk('device/getDevices', async (device, thunkAPI) => {
    try{
        return await deviceService.getDevices()
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const deviceSlice = createSlice({
    name: 'device',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerDevice.pending, (state) => {
                state.isLoading = true
            })
            .addCase(registerDevice.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = true
                //state.user = action.payload
            })
            .addCase(registerDevice.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getDevices.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getDevices.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.devices = action.payload //Almacena los usuarios obtenidos en el estado
            })
            .addCase(getDevices.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = deviceSlice.actions
export default deviceSlice.reducer