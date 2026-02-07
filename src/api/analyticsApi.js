import axios from 'axios'

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL })

export const fetchAnalytics = (kidId, token) =>
    API.get(`/analytics/${kidId}`, {
        headers: { Authorization: `Bearer ${token}` },
    })
