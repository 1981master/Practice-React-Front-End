import axios from 'axios'
import { useEffect, useState } from 'react'
import '../../styles/Analytics.css'

export default function OverviewCards({ kidId }) {
    const [data, setData] = useState(null)

    useEffect(() => {
        axios
            .get(
                `${process.env.REACT_APP_API_URL}/analytics/kids/${kidId}/overview`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                },
            )
            .then((res) => setData(res.data))
            .catch((err) => {
                console.error('Overview API error:', err.response?.data || err)
                setData({})
            })
    }, [kidId])

    if (!data) return <p>Loading overview...</p>

    return (
        <div className="analytics-cards">
            <div className="analytics-card">
                <h3>Sessions</h3>
                <p>{data.sessions || 0}</p>
            </div>
            <div className="analytics-card">
                <h3>Total Minutes</h3>
                <p>{data.totalMinutes || 0}</p>
            </div>
            <div className="analytics-card">
                <h3>Total Attempts</h3>
                <p>{data.totalAttempts || 0}</p>
            </div>
            <div className="analytics-card">
                <h3>Accuracy</h3>
                <p>{data.accuracy?.toFixed(2) || 0}%</p>
            </div>
        </div>
    )
}
