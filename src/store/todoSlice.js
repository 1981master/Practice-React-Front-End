import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// ========================
// Axios instance for backend
// ========================
const API = axios.create({
    baseURL: 'http://localhost:8081/api', // Spring Boot backend
})

// ========================
// Safely load persisted todos (optional, for persistence)
// ========================
let todosFromStorage = []
const todosStr = localStorage.getItem('todos')
if (todosStr && todosStr !== 'undefined') {
    try {
        todosFromStorage = JSON.parse(todosStr)
    } catch (e) {
        console.warn('Invalid todos in localStorage, clearing it', e)
        localStorage.removeItem('todos')
        todosFromStorage = []
    }
}

// ========================
// Async thunk: fetch todos
// ========================
export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async (kidId, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token')
            const res = await API.get(`/todo/${kidId}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            return res.data // array of todos
        } catch (err) {
            return rejectWithValue(
                err.response?.data || 'Failed to fetch todos',
            )
        }
    },
)

// ========================
// Async thunk: add todo
// ========================
export const addTodo = createAsyncThunk(
    'todos/addTodo',
    async (todo, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token')
            const res = await API.post('/todo/saveToDo', todo, {
                headers: { Authorization: `Bearer ${token}` },
            })
            console.log('Add NEW ToDo: ', res.data)
            return res.data
        } catch (err) {
            return rejectWithValue(err.response?.data || 'Failed to add todo')
        }
    },
)

// ========================
// Async thunk: toggle todo
// ========================
export const toggleTodo = createAsyncThunk(
    'todos/toggleTodo',
    async (id, { getState, rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token')
            const todo = getState().todos.items.find((t) => t.id === id)
            const updated = { ...todo, completed: !todo.completed }
            const res = await API.put(`/todo/${id}`, updated, {
                headers: { Authorization: `Bearer ${token}` },
            })
            return res.data
        } catch (err) {
            return rejectWithValue(
                err.response?.data || 'Failed to toggle todo',
            )
        }
    },
)

// ========================
// Async thunk: delete todo
// ========================
export const deleteTodo = createAsyncThunk(
    'todos/deleteTodo',
    async (id, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token')
            await API.delete(`/todo/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
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
        items: todosFromStorage,
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
                state.error = null
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
                state.error = null
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
