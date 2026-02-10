// src/store/subjectSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// Axios instance
const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
})

// ============================
// Async thunk to fetch all subjects
// ============================
export const fetchSubjects = createAsyncThunk(
    'subjects/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return rejectWithValue('No token available')

            const res = await API.get('/subjects', {
                headers: { Authorization: `Bearer ${token}` },
            })

            const data =
                typeof res.data === 'string' ? JSON.parse(res.data) : res.data
            if (!Array.isArray(data))
                return rejectWithValue('Invalid response format')

            return data
        } catch (err) {
            return rejectWithValue(
                err.response?.data || 'Failed to fetch subjects',
            )
        }
    },
)

// ============================
// Subject slice
// ============================
const subjectSlice = createSlice({
    name: 'subjects',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearSubjectError: (state) => {
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSubjects.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchSubjects.fulfilled, (state, action) => {
                state.items = Array.isArray(action.payload)
                    ? action.payload
                    : []
                state.loading = false
                state.error = null
            })
            .addCase(fetchSubjects.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload || 'Failed to fetch subjects'
            })
    },
})

export const { clearSubjectError } = subjectSlice.actions
export const selectSubjectsItems = (state) => state.subjects.items
export const selectSubjectsLoading = (state) => state.subjects.loading
export const selectSubjectsError = (state) => state.subjects.error

export default subjectSlice.reducer
