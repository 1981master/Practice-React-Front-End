import axios from 'axios'

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL })

export const startSession = (kidId, subjectId, token) =>
    API.post(
        '/sessions/start',
        { kidId, subjectId },
        { headers: { Authorization: `Bearer ${token}` } },
    )

export const submitAttempt = (payload, token) =>
    API.post('/attempts', payload, {
        headers: { Authorization: `Bearer ${token}` },
    })
