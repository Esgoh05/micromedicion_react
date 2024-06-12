import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import continuousMeasurementService from '../continuousMeasurement/continuousMeasurementService'


const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    graphicsInformation: []
}

export const getContinuousMeasurement = createAsyncThunk('continuousMeasurement/getContinuousMeasurement', async (thunkAPI) => {
    try{
        return await continuousMeasurementService.getContinuousMeasurement()
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
});

export const filterMeasurements = createAsyncThunk('continuousMeasurement/filterMeasurements', async (information, thunkAPI) => {
    try{
        return await continuousMeasurementService.filterMeasurement(information)
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const filterMonthMeasurement = createAsyncThunk('continuousMeasurement/filterMonthMeasurement', async (information, thunkAPI) => {
    try{
        return await continuousMeasurementService.filterMonthMeasurement(information)
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const filterDateMeasurement = createAsyncThunk('continuousMeasurement/filterDateMeasurement', async (information, thunkAPI) => {
    try{
        return await continuousMeasurementService.filterDateMeasurement(information)
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const continuousMeasurementSlice = createSlice({
    name: 'continuousMeasurement',
    initialState,
    reducers: {
        reset: () => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getContinuousMeasurement.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getContinuousMeasurement.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.graphicsInformation = action.payload //Almacena los usuarios obtenidos en el estado
            })
            .addCase(getContinuousMeasurement.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(filterMeasurements.pending, (state) => {
                state.isLoading = true
            })
            .addCase(filterMeasurements.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.graphicsInformation = action.payload // Actualiza el estado con los datos filtrados
            })
            .addCase(filterMeasurements.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(filterMonthMeasurement.pending, (state) => {
                state.isLoading = true
            })
            .addCase(filterMonthMeasurement.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.graphicsInformation = action.payload // Actualiza el estado con los datos filtrados
            })
            .addCase(filterMonthMeasurement.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(filterDateMeasurement.pending, (state) => {
                state.isLoading = true
            })
            .addCase(filterDateMeasurement.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.graphicsInformation = action.payload // Actualiza el estado con los datos filtrados
            })
            .addCase(filterDateMeasurement.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = continuousMeasurementSlice.actions
export default continuousMeasurementSlice.reducer