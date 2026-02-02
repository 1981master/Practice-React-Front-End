import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:8081/api' })

export const fetchAnalytics = (kidId, token) =>
    API.get(`/analytics/${kidId}`, {
        headers: { Authorization: `Bearer ${token}` },
    })
