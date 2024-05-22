import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import installationService from '../installation/installationService'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    installations: []
}

//Registrar una nueva instalacion
export const registerInstallation = createAsyncThunk('installation/registerInstallation', async (installation, thunkAPI) => {
    try{
        return await installationService.registerInstallation(installation)
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Obtener informacion de todas las instalaciones
export const getInstallations = createAsyncThunk('installation/getInstallations', async (installation, thunkAPI) => {
    try{
        return await installationService.getInstallations()
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const installationSlice = createSlice({
    name: 'installation',
    initialState,
    reducers: {
        reset: () => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerInstallation.pending, (state) => {
                state.isLoading = true
            })
            .addCase(registerInstallation.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(registerInstallation.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getInstallations.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getInstallations.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.installations = action.payload //Almacena los usuarios obtenidos en el estado
            })
            .addCase(getInstallations.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = installationSlice.actions
export default installationSlice.reducer