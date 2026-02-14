import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Analytics from '../components/analytics/Analytics'
import TodoProgressPanel from '../components/analytics/TodoProgressPanel'
import AddKid from '../components/kids/AddKid'
import SubjectList from '../components/subject/SubjectList'
import TopicProgress from '../components/topics/TopicProgress'
import {
    fetchKids,
    selectKidsError,
    selectKidsItems,
    selectKidsLoading,
} from '../store/kidSlice'
import { fetchTodos } from '../store/todoSlice'
import '../styles/dashboard.css'

export default function Dashboard() {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth.user)

    const hasPermission = useCallback(
        (perm) =>
            Array.isArray(user?.permissions) && user.permissions.includes(perm),
        [user?.permissions],
    )

    // Kids slice
    const kidsFromStore = useSelector(selectKidsItems)
    const kids = Array.isArray(kidsFromStore) ? kidsFromStore : []
    const loading = useSelector(selectKidsLoading)
    const error = useSelector(selectKidsError)

    // Todos slice
    const todosFromStore = useSelector((state) => state.todos.items || [])
    const todosLoading = useSelector((state) => state.todos.loading)
    const todosError = useSelector((state) => state.todos.error)

    useEffect(() => {
        if (!user) return

        dispatch(fetchKids()) // always fetch kids for parent

        if (user.permissions.includes('VIEW_ANALYTICS')) {
            // Parent: fetch all todos
            dispatch(fetchTodos({ parent: true }))
        } else {
            // Kid: fetch only their own todos
            dispatch(fetchTodos({ kidId: user.id }))
        }
    }, [user, dispatch])

    if (!user) return <p>Loading...</p>

    return (
        <div className="dashboard-page">
            <div className="dashboard-box">
                <div className="logo">🧸</div>

                <h2>Welcome {user.name || ''}</h2>

                {/* Add kid section visible only to parents with VIEW_KIDS permission */}
                {hasPermission('VIEW_KIDS') && (
                    <div className="add-kid-section">
                        <h3>Add a New Kid</h3>
                        <AddKid />
                    </div>
                )}

                {/* Parent: show kids list */}
                {hasPermission('VIEW_ANALYTICS') && (
                    <>
                        <h3>Your Kids</h3>
                        {loading ? (
                            <p>Loading kids...</p>
                        ) : error ? (
                            <p className="error">Error: {error}</p>
                        ) : kids.length > 0 ? (
                            <div className="kids-list">
                                {kids.map((k) => (
                                    <div
                                        key={k.id}
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

                {/* Todo Progress Panel */}
                <TodoProgressPanel
                    todos={todosFromStore}
                    todosLoading={todosLoading}
                    todosError={todosError}
                    kids={hasPermission('VIEW_ANALYTICS') ? kids : []} // only pass kids to parent
                    isParent={hasPermission('VIEW_ANALYTICS')}
                    userId={user.id}
                />

                {/* Topic Progress for parent/kid */}
                {hasPermission('VIEW_TOPICS') && <TopicProgress />}

                <div style={{ padding: 24 }}>
                    <h1>Subjects</h1>
                    <SubjectList />
                </div>

                {/* Analytics visible only to parents */}
                {hasPermission('VIEW_ANALYTICS') && <Analytics />}
            </div>
        </div>
    )
}
