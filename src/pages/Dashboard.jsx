import { useSelector } from 'react-redux'
import KidSelector from '../components/kids/KidSelector'
import TodoList from '../components/todos/TodoList'
import TopicProgress from '../components/topics/TopicProgress'

export default function Dashboard() {
    const user = useSelector((state) => state.auth.user)

    if (!user) return <p>Loading...</p> // or redirect to login

    return (
        <div>
            <h2>Welcome, {user.email}</h2>

            {/* Show KidSelector only if parent has permission */}
            {user.permissions.includes('VIEW_KIDS') && <KidSelector />}

            {/* Show TopicProgress only if parent has permission */}
            {user.permissions.includes('VIEW_TOPICS') && <TopicProgress />}

            {/* Show TodoList only if parent has permission */}
            {user.permissions.includes('VIEW_TODOS') && <TodoList />}
        </div>
    )
}
