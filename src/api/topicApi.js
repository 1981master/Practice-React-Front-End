import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:8081/api' })

export const fetchTopicsByKid = (kidId, token) =>
    API.get(`/kids/${kidId}/topics`, {
        headers: { Authorization: `Bearer ${token}` },
    })
