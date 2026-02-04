import axios from 'axios'
import { useEffect, useState } from 'react'
import {
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'

export default function TimeSpentChart({ kidId }) {
    const [data, setData] = useState([])

    useEffect(() => {
        axios
            .get(
                `http://localhost:8081/api/analytics/kids/${kidId}/time-series`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                },
            )
            .then((res) => setData(Array.isArray(res.data) ? res.data : []))
            .catch((err) => {
                console.error(
                    'TimeSeries API error:',
                    err.response?.data || err,
                )
                setData([])
            })
    }, [kidId])

    if (!data.length) return <p>No time series data available.</p>

    return (
        <ResponsiveContainer
            width="100%"
            height={300}
        >
            <LineChart data={data}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                    type="monotone"
                    dataKey="minutes"
                    stroke="#8884d8"
                />
            </LineChart>
        </ResponsiveContainer>
    )
}
