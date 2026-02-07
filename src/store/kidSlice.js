// src/store/kidSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// ============================
// Axios instance for backend
// ============================
const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
})

// ============================
// Async thunk to fetch kids
// ============================
export const fetchKids = createAsyncThunk(
    'kids/fetchKids',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return rejectWithValue('No token available')

            const res = await API.get('/kids', {
                headers: { Authorization: `Bearer ${token}` },
            })

            const data =
                typeof res.data === 'string' ? JSON.parse(res.data) : res.data

            if (!Array.isArray(data))
                return rejectWithValue('Invalid response format')

            return data
        } catch (err) {
            return rejectWithValue('Failed to fetch kids')
        }
    },
)

// ============================
// Async thunk to add a kid
// ============================
export const addKid = createAsyncThunk(
    'kids/addKid',
    async (kidData, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return rejectWithValue('No token available')

            const res = await API.post('/kids', kidData, {
                headers: { Authorization: `Bearer ${token}` },
            })

            const data =
                typeof res.data === 'string' ? JSON.parse(res.data) : res.data
            return data
        } catch (err) {
            return rejectWithValue('Failed to add kid')
        }
    },
)

// ============================
// Kids slice
// ============================
const kidSlice = createSlice({
    name: 'kids',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearKids(state) {
            state.items = []
            state.loading = false
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Kids
            .addCase(fetchKids.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchKids.fulfilled, (state, action) => {
                state.items = Array.isArray(action.payload)
                    ? action.payload
                    : []
                state.loading = false
                state.error = null
            })
            .addCase(fetchKids.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload || 'Failed to fetch kids'
            })

            // Add Kid
            .addCase(addKid.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(addKid.fulfilled, (state, action) => {
                if (!Array.isArray(state.items)) state.items = []
                state.items.push(action.payload)
                state.loading = false
                state.error = null
            })
            .addCase(addKid.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload || 'Failed to add kid'
            })
    },
})

export const { clearKids } = kidSlice.actions
export const selectKidsItems = (state) => state.kids.items
export const selectKidsLoading = (state) => state.kids.loading
export const selectKidsError = (state) => state.kids.error

export default kidSlice.reducer
