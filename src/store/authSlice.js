import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { login } from '../api/authApi'

// Load persisted token/user from localStorage
const tokenFromStorage = localStorage.getItem('token')
const userFromStorage = JSON.parse(localStorage.getItem('user'))

export const loginUser = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const res = await login(email, password)
            return res.data // { token, user }
        } catch (err) {
            // Return error message to extraReducers
            return rejectWithValue(err.response?.data || 'Login failed')
        }
    },
)

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: tokenFromStorage || null,
        user: userFromStorage || null,
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
            .addCase(loginUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.token = action.payload.token
                state.user = action.payload.user
                state.loading = false
                state.error = null

                // Persist to localStorage
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
    },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
