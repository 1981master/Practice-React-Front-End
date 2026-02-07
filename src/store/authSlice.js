import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// ========================
// Axios instance for backend
// ========================
const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
})

// ========================
// Safely load persisted token/user from localStorage
// ========================
let userFromStorage = null

const userStr = localStorage.getItem('user')
if (userStr && userStr !== 'undefined') {
    try {
        userFromStorage = JSON.parse(userStr)
    } catch (e) {
        console.warn('Invalid user in localStorage, clearing it', e)
        localStorage.removeItem('user')
        userFromStorage = null
    }
}

const tokenFromStorage =
    localStorage.getItem('token') !== 'undefined'
        ? localStorage.getItem('token')
        : null

// ========================
// Async thunk for login
// ========================
export const loginUser = createAsyncThunk(
    'auth/login',
    async ({ loginIdentifier, password, userType }, { rejectWithValue }) => {
        try {
            const res = await API.post('/auth/login', {
                parentId: loginIdentifier,
                password,
                userType,
            })
            return res.data
        } catch (err) {
            return rejectWithValue('Invalid credentials')
        }
    },
)

// ========================
// Async thunk for signup
// ========================
export const signupUser = createAsyncThunk(
    'auth/signup',
    async (data, { rejectWithValue }) => {
        try {
            const res = await API.post('/auth/signup', data)
            return res.data // { token, user }
        } catch (err) {
            return rejectWithValue(err.response?.data || 'Signup failed')
        }
    },
)

// ========================
// Auth slice
// ========================
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: tokenFromStorage,
        user: userFromStorage,
        loading: false,
        error: null,
    },
    reducers: {
        logout(state) {
            state.token = null
            state.user = null
            state.loading = false
            state.error = null
            localStorage.clear()
        },
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(loginUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.token = action.payload.token
                state.user = action.payload.user
                state.loading = false
                state.error = null

                localStorage.setItem('token', action.payload.token)
                localStorage.setItem(
                    'user',
                    JSON.stringify(action.payload.user),
                )
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload || 'Login failed'
            })

            // Signup
            .addCase(signupUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.token = action.payload.token
                state.user = action.payload.user
                state.loading = false
                state.error = null

                localStorage.setItem('token', action.payload.token)
                localStorage.setItem(
                    'user',
                    JSON.stringify(action.payload.user),
                )
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload || 'Signup failed'
            })
    },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
