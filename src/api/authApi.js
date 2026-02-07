import axios from 'axios'

const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
})

// ============================
// Login API: send loginIdentifier (Parent ID or Email) + password
// ============================
export const login = (parentId, password) =>
    API.post('/login', { parentId, password }) // <-- match backend

// ============================
// Get current user info
// ============================
export const getMe = (token) =>
    API.get('/me', {
        headers: { Authorization: `Bearer ${token}` },
    })

// ============================
// Signup API
// ============================
export const signup = (data) =>
    API.post('/signup', data, { withCredentials: true })
