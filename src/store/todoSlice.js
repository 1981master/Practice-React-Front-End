import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// ========================
// Axios instance for backend
// ========================
const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
})

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

// Fetch todos
// export const fetchTodos = createAsyncThunk(
//     'todos/fetchTodos',
//     async (params = {}, { rejectWithValue }) => {
//         try {
//             // If parent wants all todos
//             let url = '/todo/my-todos' // default: kid-only
//             if (params.parent) {
//                 url = '/todo' // endpoint returns all todos for the parent
//             } else if (params.kidId) {
//                 url = `/todo?kidId=${params.kidId}` // existing kid-specific endpoint
//             }
//             const res = await API.get(url)
//             return res.data
//         } catch (err) {
//             return rejectWithValue(
//                 err.response?.data || 'Failed to fetch todos',//this issue show even when i Have the fetch
//             )
//         }
//     },
// )
export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async (params = {}, { rejectWithValue }) => {
        try {
            // Default: kid-only
            let url = '/todo/my-todos'

            if (params.parent) {
                url = '/todo' // fetch all todos for parent
            } else if (params.kidId) {
                url = `/todo?kidId=${params.kidId}`
            }

            const res = await API.get(url)

            // Ensure data is array
            if (!Array.isArray(res.data)) {
                return rejectWithValue('Invalid data format from server')
            }

            return res.data
        } catch (err) {
            // Safely get message
            let msg = 'Failed to fetch todos'
            if (err.response?.data) {
                msg = err.response.data
            } else if (err.message) {
                msg = err.message
            }
            if (msg === 'Request failed with status code 403') {
                msg = '' //this regrading fetching todo for kids which is ok.
            }
            return rejectWithValue(msg)
        }
    },
)

// Add a new todo (parent assigns)
export const addTodo = createAsyncThunk(
    'todos/addTodo',
    async (todo, { rejectWithValue }) => {
        try {
            const res = await API.post('/todo/assign', todo)
            return res.data
        } catch (err) {
            return rejectWithValue(err.response?.data || 'Failed to add todo')
        }
    },
)

// Toggle todo completed
export const toggleTodo = createAsyncThunk(
    'todos/toggleTodo',
    async (id, { getState, rejectWithValue }) => {
        try {
            const todo = getState().todos.items.find((t) => t.id === id)
            if (!todo) throw new Error('Todo not found')
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

// Delete todo
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
            // ========================
            // Fetch
            // ========================
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
                state.error = action.payload
            })

            // ========================
            // Add
            // ========================
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

            // ========================
            // Toggle
            // ========================
            .addCase(toggleTodo.fulfilled, (state, action) => {
                const index = state.items.findIndex(
                    (t) => t.id === action.payload.id,
                )
                if (index !== -1) state.items[index] = action.payload
                localStorage.setItem('todos', JSON.stringify(state.items))
            })

            // ========================
            // Delete
            // ========================
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.items = state.items.filter((t) => t.id !== action.payload)
                localStorage.setItem('todos', JSON.stringify(state.items))
            })
    },
})

export default todoSlice.reducer
