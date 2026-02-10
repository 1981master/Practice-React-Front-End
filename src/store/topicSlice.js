// src/store/topicSlice.js
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// ============================
// Axios instance
// ============================
const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
})

// ============================
// Async thunk to fetch all topics
// ============================
export const fetchTopics = createAsyncThunk(
    'topics/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return rejectWithValue('No token available')

            const res = await API.get('/topics', {
                headers: { Authorization: `Bearer ${token}` },
            })

            const data =
                typeof res.data === 'string' ? JSON.parse(res.data) : res.data
            return data
        } catch (err) {
            console.error(err)
            return rejectWithValue(
                err.response?.data || 'Failed to fetch topics',
            )
        }
    },
)

// ============================
// Async thunk to fetch topics by subject
// ============================
export const fetchTopicsBySubject = createAsyncThunk(
    'topics/fetchBySubject',
    async (subjectId, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return rejectWithValue('No token available')

            const res = await API.get(`/topics/subject/${subjectId}`, {
                headers: { Authorization: `Bearer ${token}` },
            })

            const data =
                typeof res.data === 'string' ? JSON.parse(res.data) : res.data
            if (!Array.isArray(data))
                return rejectWithValue('Invalid response format')

            return { subjectId, topics: data }
        } catch (err) {
            return rejectWithValue(
                err.response?.data || 'Failed to fetch topics by subject',
            )
        }
    },
)

// ============================
// Topic slice
// ============================
const topicSlice = createSlice({
    name: 'topics',
    initialState: {
        items: [], // all topics
        itemsBySubject: {}, // { subjectId: [topics] }
        loading: false,
        error: null,
    },
    reducers: {
        clearTopicError: (state) => {
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch all topics
            .addCase(fetchTopics.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchTopics.fulfilled, (state, action) => {
                state.items = Array.isArray(action.payload)
                    ? action.payload
                    : []
                state.loading = false
                state.error = null
            })
            .addCase(fetchTopics.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload || 'Failed to fetch topics'
            })

            // Fetch topics by subject
            .addCase(fetchTopicsBySubject.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchTopicsBySubject.fulfilled, (state, action) => {
                const { subjectId, topics } = action.payload
                state.itemsBySubject[subjectId] = Array.isArray(topics)
                    ? topics
                    : []
                state.loading = false
                state.error = null
            })
            .addCase(fetchTopicsBySubject.rejected, (state, action) => {
                state.loading = false
                state.error =
                    action.payload || 'Failed to fetch topics by subject'
            })
    },
})

export const { clearTopicError } = topicSlice.actions

// ============================
// Memoized selectors
// ============================
export const selectTopicsItems = createSelector(
    (state) => state.topics.items,
    (items) => items || [],
)

export const selectTopicsItemsBySubject = createSelector(
    (state) => state.topics.itemsBySubject,
    (_, subjectId) => subjectId,
    (itemsBySubject, subjectId) => itemsBySubject[subjectId] || [],
)

export const selectTopicsLoading = createSelector(
    (state) => state.topics.loading,
    (loading) => loading,
)

export const selectTopicsError = createSelector(
    (state) => state.topics.error,
    (error) => error,
)

export default topicSlice.reducer
