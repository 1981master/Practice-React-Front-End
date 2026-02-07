import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// Axios instance
const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
})

// Async thunk to fetch topics
export const fetchTopics = createAsyncThunk(
    'topics/fetchTopics',
    async (kidId, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token')
            const res = await API.get(`/analytics/kids/${kidId}/topics`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            return res.data
        } catch (err) {
            return rejectWithValue(
                err.response?.data || 'Failed to fetch topics',
            )
        }
    },
)

const topicSlice = createSlice({
    name: 'topics',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearTopics: (state) => {
            state.items = []
            state.loading = false
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTopics.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchTopics.fulfilled, (state, action) => {
                state.items = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(fetchTopics.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload || 'Error fetching topics'
            })
    },
})

export const { clearTopics } = topicSlice.actions

// ======================================================
// ✅ SELECTORS (fixed & safe)
// ======================================================

// Stable fallback (Option 1)
const EMPTY_TOPICS = {
    items: [],
    loading: false,
    error: null,
}

// Base selector (single source of truth)
const selectTopicsState = (state) => state.topics ?? EMPTY_TOPICS

// ✅ Return whole slice
export const selectTopics = selectTopicsState

// ✅ Field selectors (memo-safe)
export const selectTopicsItems = createSelector(
    [selectTopicsState],
    (topics) => topics.items,
)

export const selectTopicsLoading = createSelector(
    [selectTopicsState],
    (topics) => topics.loading,
)

export const selectTopicsError = createSelector(
    [selectTopicsState],
    (topics) => topics.error,
)

export default topicSlice.reducer
