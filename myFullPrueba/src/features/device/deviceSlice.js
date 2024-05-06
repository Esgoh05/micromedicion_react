import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"


const initialState = {
    device: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const deviceSlice = createSlice({
    name: 'device',
    initialState,
    reducers: {
        reset: (state) => initialState
    }
},
    /*extraReducers: (builder) => {

    }*/
)

export const {reset} = deviceSlice.actions
export default deviceSlice.reducer