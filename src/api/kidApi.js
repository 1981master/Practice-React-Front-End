import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:8081/api' })

export const fetchKids = (token) =>
    API.get('/kids', {
        headers: { Authorization: `Bearer ${token}` },
    })

export const fetchKidDashboard = (kidId, token) =>
    API.get(`/kids/${kidId}/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
    })
