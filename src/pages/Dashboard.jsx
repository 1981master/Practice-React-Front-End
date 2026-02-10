import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Analytics from '../components/analytics/Analytics'
import TodoProgressPanel from '../components/analytics/TodoProgressPanel'
import AddKid from '../components/kids/AddKid'
import TopicProgress from '../components/topics/TopicProgress'
import {
    fetchKids,
    selectKidsError,
    selectKidsItems,
    selectKidsLoading,
} from '../store/kidSlice'
import '../styles/dashboard.css'

export default function Dashboard() {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth.user)

    // Kids slice
    const kidsFromStore = useSelector(selectKidsItems)
    const kids = Array.isArray(kidsFromStore) ? kidsFromStore : []
    const loading = useSelector(selectKidsLoading)
    const error = useSelector(selectKidsError)

    useEffect(() => {
        if (user) {
            dispatch(fetchKids())
        }
    }, [user, dispatch])

    if (!user) return <p>Loading...</p>

    const hasPermission = (perm) => {
        // console.log('🔐 Checking permission:', perm)
        // console.log('👤 User:', user)
        // console.log('📜 User permissions:', user.permissions)

        const result =
            Array.isArray(user.permissions) && user.permissions.includes(perm)

        // console.log(`✅ Result for ${perm}:`, result)
        return result
    }

    return (
        <div className="dashboard-page">
            <div className="dashboard-box">
                <div className="logo">🧸</div>

                <h2>Welcome {` ${user.name || ''}`}</h2>

                {hasPermission('VIEW_KIDS') && (
                    <div className="add-kid-section">
                        <h3>Add a New Kid</h3>
                        <AddKid />
                    </div>
                )}

                {hasPermission('VIEW_ANALYTICS') && (
                    <>
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
                                            <h4 className="kid-name">
                                                {k.name}
                                            </h4>
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
                    </>
                )}

                {hasPermission('VIEW_TOPICS') && <TopicProgress />}

                {/* 👶 Kid should see this */}
                {!hasPermission('VIEW_ANALYTICS') && (
                    <>
                        <TodoProgressPanel kidId={user.id} />
                    </>
                )}

                {hasPermission('VIEW_ANALYTICS') && <Analytics />}
            </div>
        </div>
    )
}
