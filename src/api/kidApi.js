import axios from 'axios'

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL })

export const fetchKids = (token) =>
    API.get('/kids', {
        headers: { Authorization: `Bearer ${token}` },
    })

export const fetchKidDashboard = (kidId, token) =>
    API.get(`/kids/${kidId}/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
    })
