import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// ========================
// Axios instance for backend
// ========================
const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL, // e.g., http://localhost:8081/api
})

// Attach token automatically before every request
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error),
)

// ========================
// Async thunks
// ========================

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async (kidId, { rejectWithValue }) => {
        try {
            const res = await API.get(`/todo/${kidId}`)
            return res.data
        } catch (err) {
            return rejectWithValue(
                err.response?.data || 'Failed to fetch todos',
            )
        }
    },
)

export const addTodo = createAsyncThunk(
    'todos/addTodo',
    async (todo, { rejectWithValue }) => {
        try {
            const res = await API.post('/todo/saveToDo', todo)
            return res.data
        } catch (err) {
            return rejectWithValue(err.response?.data || 'Failed to add todo')
        }
    },
)

export const toggleTodo = createAsyncThunk(
    'todos/toggleTodo',
    async (id, { getState, rejectWithValue }) => {
        try {
            const todo = getState().todos.items.find((t) => t.id === id)
            const updated = { ...todo, completed: !todo.completed }
            const res = await API.put(`/todo/${id}`, updated)
            return res.data
        } catch (err) {
            return rejectWithValue(
                err.response?.data || 'Failed to toggle todo',
            )
        }
    },
)

export const deleteTodo = createAsyncThunk(
    'todos/deleteTodo',
    async (id, { rejectWithValue }) => {
        try {
            await API.delete(`/todo/${id}`)
            return id
        } catch (err) {
            return rejectWithValue(
                err.response?.data || 'Failed to delete todo',
            )
        }
    },
)

// ========================
// Todo slice
// ========================
const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch
            .addCase(fetchTodos.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.items = Array.isArray(action.payload)
                    ? action.payload
                    : []
                state.loading = false
                localStorage.setItem('todos', JSON.stringify(state.items))
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload || 'Failed to fetch todos'
            })

            // Add
            .addCase(addTodo.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(addTodo.fulfilled, (state, action) => {
                state.items.push(action.payload)
                state.loading = false
                localStorage.setItem('todos', JSON.stringify(state.items))
            })
            .addCase(addTodo.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload || 'Failed to add todo'
            })

            // Toggle
            .addCase(toggleTodo.fulfilled, (state, action) => {
                const index = state.items.findIndex(
                    (t) => t.id === action.payload.id,
                )
                if (index !== -1) state.items[index] = action.payload
                localStorage.setItem('todos', JSON.stringify(state.items))
            })

            // Delete
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.items = state.items.filter((t) => t.id !== action.payload)
                localStorage.setItem('todos', JSON.stringify(state.items))
            })
    },
})

export default todoSlice.reducer
