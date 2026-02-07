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

export default function AccuracyTrendChart({ kidId }) {
    const [data, setData] = useState([])

    useEffect(() => {
        axios
            .get(
                `${process.env.REACT_APP_API_URL}/analytics/kids/${kidId}/accuracy-trend`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                },
            )
            .then((res) => setData(Array.isArray(res.data) ? res.data : []))
            .catch((err) => {
                console.error(
                    'AccuracyTrend API error:',
                    err.response?.data || err,
                )
                setData([])
            })
    }, [kidId])

    if (!data.length) return <p>No accuracy trend data available.</p>

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
                    dataKey="accuracy"
                    stroke="#82ca9d"
                />
            </LineChart>
        </ResponsiveContainer>
    )
}
