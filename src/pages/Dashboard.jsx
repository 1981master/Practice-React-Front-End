// src/pages/Dashboard.js
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Analytics from '../components/analytics/Analytics'
import AddKid from '../components/kids/AddKid'
import TodoList from '../components/todos/TodoList'
import TopicProgress from '../components/topics/TopicProgress'
import {
    fetchKids,
    selectKidsError,
    selectKidsItems,
    selectKidsLoading,
} from '../store/kidSlice'
import '../styles/Login.css' // keep styling consistent

export default function Dashboard() {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth.user)

    // Kids slice
    const kidsFromStore = useSelector(selectKidsItems)
    const kids = Array.isArray(kidsFromStore) ? kidsFromStore : [] // ensure array
    const loading = useSelector(selectKidsLoading)
    const error = useSelector(selectKidsError)

    // Fetch kids on mount or when user changes
    useEffect(() => {
        if (user) {
            dispatch(fetchKids())
            console.log('-----user-----', user)
        }
    }, [user, dispatch])

    // Log kids whenever they come back from DB
    useEffect(() => {
        console.log('-----kids from store-----', kids)
    }, [kids])

    if (!user) return <p>Loading...</p>

    return (
        <div className="login-page">
            <div className="login-box">
                <div className="logo">🧸</div>
                <h2>Welcome, {user.email || user.parentId}</h2>

                {/* Add Kid form */}
                {user.permissions?.includes('VIEW_KIDS') && <AddKid />}

                <h3>Your Kids</h3>
                {loading ? (
                    <p>Loading kids...</p>
                ) : error ? (
                    <p className="error">Error: {error}</p>
                ) : kids.length > 0 ? (
                    <ul>
                        {kids.map((k, index) => (
                            <li key={k.id || index}>
                                {k.name} {k.age ? `(${k.age} yrs)` : ''}{' '}
                                {k.grade && `- Grade ${k.grade}`}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No kids added yet.</p>
                )}

                {/* Other sections */}
                {user.permissions?.includes('VIEW_TOPICS') && <TopicProgress />}
                {user.permissions?.includes('VIEW_TODOS') && <TodoList />}
                {user.permissions?.includes('VIEW_ANALYTICS') && <Analytics />}
            </div>
        </div>
    )
}
