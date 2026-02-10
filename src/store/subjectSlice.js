// src/store/subjectSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// ============================
// Axios instance
// ============================
const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL, // e.g. http://localhost:8081/api
})

// ============================
// Async thunk: fetch all subjects
// ============================
export const fetchSubjects = createAsyncThunk(
    'subjects/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token')
            if (!token) {
                return rejectWithValue('Authentication token missing')
            }

            const response = await API.get('/subjects', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            // Axios already parses JSON
            if (!Array.isArray(response.data)) {
                return rejectWithValue('Invalid subjects response format')
            }

            return response.data
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                    error.response?.data ||
                    'Failed to fetch subjects',
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
        items: [], // [{ id, name, topics: [] }]
        loading: false,
        error: null,
    },
    reducers: {
        clearSubjectError(state) {
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
                state.items = action.payload
                state.loading = false
            })
            .addCase(fetchSubjects.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    },
})

// ============================
// Exports
// ============================
export const { clearSubjectError } = subjectSlice.actions

// ============================
// Selectors (SAFE)
// ============================
export const selectSubjectsItems = (state) => state.subjects?.items ?? []

export const selectSubjectsLoading = (state) => state.subjects?.loading ?? false

export const selectSubjectsError = (state) => state.subjects?.error ?? null

export default subjectSlice.reducer
