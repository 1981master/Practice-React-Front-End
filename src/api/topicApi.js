import axios from 'axios'

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL })

export const fetchTopicsByKid = (kidId, token) =>
    API.get(`/kids/${kidId}/topics`, {
        headers: { Authorization: `Bearer ${token}` },
    })
