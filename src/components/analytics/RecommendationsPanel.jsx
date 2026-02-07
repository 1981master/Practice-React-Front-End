import axios from 'axios'
import { useEffect, useState } from 'react'

export default function RecommendationsPanel({ kidId }) {
    const [recs, setRecs] = useState([])

    useEffect(() => {
        axios
            .get(
                `${process.env.REACT_APP_API_URL}/analytics/kids/${kidId}/recommendations`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                },
            )
            .then((res) => setRecs(Array.isArray(res.data) ? res.data : []))
            .catch((err) => {
                console.error(
                    'Recommendations API error:',
                    err.response?.data || err,
                )
                setRecs([])
            })
    }, [kidId])

    if (!recs.length) return <p>No recommendations available.</p>

    return (
        <div style={{ marginTop: 24 }}>
            <h3>Recommendations</h3>
            <ul>
                {recs.map((r) => (
                    <li key={r.id}>
                        {r.message} ({r.status || 'Pending'})
                    </li>
                ))}
            </ul>
        </div>
    )
}
