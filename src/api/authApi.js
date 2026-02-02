import axios from 'axios'

const API = axios.create({
    baseURL: 'http://localhost:8081/api',
})

export const login = (email, password) =>
    API.post('/auth/login', { email, password })

export const getMe = (token) =>
    API.get('/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
    })

export const signup = (data) => {
    return axios.post('http://localhost:8081/api/auth/signup', data, {
        withCredentials: true,
    })
}
