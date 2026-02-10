import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTopics } from '../../store/topicSlice'

export default function TopicMasteryTable({ kidId }) {
    const dispatch = useDispatch()

    // Provide default empty object to avoid destructure error
    const {
        topics = [],
        loading = false,
        error = null,
    } = useSelector((state) => state.topics || {})

    useEffect(() => {
        if (kidId) dispatch(fetchTopics(kidId))
    }, [kidId, dispatch])

    if (loading) return <p>Loading topic mastery...</p>
    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>
    if (!topics.length) return <p>No topic mastery data available.</p>

    return (
        <table
            style={{ width: '100%', marginTop: 24, borderCollapse: 'collapse' }}
        >
            <thead>
                <tr>
                    <th>Topic</th>
                    <th>Total Attempts</th>
                    <th>Correct</th>
                    <th>Accuracy</th>
                    <th>Mastery Level</th>
                </tr>
            </thead>
            <tbody>
                {topics.map((t) => (
                    <tr key={t.topicId}>
                        <td>{t.topicName}</td>
                        <td>{t.totalAttempts || 0}</td>
                        <td>{t.correctAttempts || 0}</td>
                        <td>{t.accuracy?.toFixed(2) || 0}%</td>
                        <td>{t.masteryLevel || 'N/A'}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
