import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import authService from './authService'

//obtenemos del localstorage los datos del usuario

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    users: []
}

//Registrar un nuevo usuario
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try{
        return await authService.register(user)
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Iniciar sesion
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try{
        return await authService.login(user)
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//LogOut
export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout()
})

//Obtener informacion de todos los usuarios
export const getUsers = createAsyncThunk('auth/getUsers', async (user, thunkAPI) => {
    try{
        return await authService.getUsers()
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false,
            state.isSuccess = false,
            state.isError = false,
            state.message = ''        
        },
        addUser: (state, action) => {
            state.auth.push(action.payload)
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = true
                //state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
            .addCase(getUsers.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.users = action.payload //Almacena los usuarios obtenidos en el estado
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset, addUser } = authSlice.actions
export default authSlice.reducer