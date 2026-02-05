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
import '../styles/dashboard.css' // New CSS for styling the Dashboard display name and logo

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
    // useEffect(() => {
    //     console.log('-----kids from store-----', kids)
    // }, [kids])

    if (!user) return <p>Loading...</p>

    return (
        <div className="dashboard-page">
            <div className="dashboard-box">
                {/* Logo */}
                <div className="logo">🧸</div>

                {/* Welcome Message */}
                <h2>Welcome, {user.email || user.parentId}</h2>

                {/* Add Kid Section */}
                {user.permissions?.includes('VIEW_KIDS') && (
                    <div className="add-kid-section">
                        <h3>Add a New Kid</h3>
                        <AddKid />
                    </div>
                )}

                {/* Kids List */}
                <h3>Your Kids</h3>
                {loading ? (
                    <p>Loading kids...</p>
                ) : error ? (
                    <p className="error">Error: {error}</p>
                ) : kids.length > 0 ? (
                    <div className="kids-list">
                        {kids.map((k, index) => (
                            <div
                                key={k.id || index}
                                className="kid-card"
                            >
                                <div className="kid-info">
                                    <h4 className="kid-name">{k.name}</h4>
                                    <p className="kid-details">
                                        <span className="kid-age">
                                            {k.age
                                                ? `${k.age} yrs`
                                                : 'Age not available'}
                                        </span>
                                        {k.grade && (
                                            <span className="kid-grade">
                                                {' '}
                                                - Grade {k.grade}
                                            </span>
                                        )}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
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
