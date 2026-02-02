import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:8081/api' })

export const fetchTodos = (kidId, token) =>
    API.get(`/kids/${kidId}/todos`, {
        headers: { Authorization: `Bearer ${token}` },
    })

export const createTodo = (kidId, text, token) =>
    API.post(
        `/kids/${kidId}/todos`,
        { text },
        { headers: { Authorization: `Bearer ${token}` } },
    )

export const toggleTodo = (id, completed, token) =>
    API.patch(
        `/todos/${id}`,
        { completed },
        { headers: { Authorization: `Bearer ${token}` } },
    )
