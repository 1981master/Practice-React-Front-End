import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    addTodo,
    deleteTodo,
    fetchTodos,
    toggleTodo,
} from '../../store/todoSlice'
import '../../styles/todo.css'

export default function TodoProgressPanel({
    kidId: defaultKidId = null,
    kids = [],
}) {
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth || {})

    const {
        items: todos = [],
        loading = false,
        error = null,
    } = useSelector((state) => state.todos || {})

    // ✅ Permission-based control: parent/admin
    const canManageTodos = user?.permissions?.includes('VIEW_ANALYTICS')

    const [input, setInput] = useState('')
    const [note, setNote] = useState('')
    const [priority, setPriority] = useState('MEDIUM')
    const [selectedKidId, setSelectedKidId] = useState(defaultKidId || null)

    // ✅ Auto-select first kid for parent/admin
    useEffect(() => {
        if (canManageTodos && kids.length > 0 && !selectedKidId) {
            setSelectedKidId(kids[0].id)
        }
    }, [canManageTodos, kids, selectedKidId])

    // ✅ Fetch todos when kid changes
    useEffect(() => {
        if (selectedKidId) {
            dispatch(fetchTodos(selectedKidId))
        }
    }, [selectedKidId, dispatch])

    const handleAddTodo = (e) => {
        e.preventDefault()

        if (!input.trim()) return
        if (canManageTodos && !selectedKidId) return

        dispatch(
            addTodo({
                kidId: selectedKidId,
                text: input.trim(),
                note: note.trim() || null,
                priority,
                completed: false,
            }),
        )

        setInput('')
        setNote('')
        setPriority('MEDIUM')
    }

    const completed = todos.filter((t) => t.completed).length
    const total = todos.length
    const percent = total ? (completed / total) * 100 : 0

    function dateFormat(timestamp) {
        if (!timestamp) return ''
        const date = new Date(timestamp.slice(0, 23))
        const pad2 = (n) => n.toString().padStart(2, '0')
        return `${pad2(date.getMonth() + 1)}/${pad2(date.getDate())}/${date
            .getFullYear()
            .toString()
            .slice(2)} ${pad2(date.getHours())}:${pad2(date.getMinutes())}`
    }

    return (
        <div className="todo-page">
            <div className="todo-box">
                <h2>Todo Progress</h2>

                <p className="todo-progress">
                    {completed}/{total} completed ({percent.toFixed(0)}%)
                </p>

                {/* ✅ Only Parent/Admin can see form */}
                {canManageTodos && (
                    <form
                        className="todo-form"
                        onSubmit={handleAddTodo}
                    >
                        {kids.length > 0 && (
                            <select
                                value={selectedKidId || ''}
                                onChange={(e) =>
                                    setSelectedKidId(Number(e.target.value))
                                }
                                disabled={loading}
                            >
                                {kids.map((k) => (
                                    <option
                                        key={k.id}
                                        value={k.id}
                                    >
                                        {k.name} {k.age ? `(${k.age} yrs)` : ''}
                                    </option>
                                ))}
                            </select>
                        )}

                        <input
                            type="text"
                            placeholder="New todo..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            disabled={loading}
                        />

                        <input
                            type="text"
                            placeholder="Optional note..."
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            disabled={loading}
                        />

                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            disabled={loading}
                        >
                            <option value="LOW">Low</option>
                            <option value="MEDIUM">Medium</option>
                            <option value="HIGH">High</option>
                        </select>

                        <button
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Adding...' : 'Add Todo'}
                        </button>
                    </form>
                )}

                {todos.length === 0 ? (
                    <p className="empty">No todo items available.</p>
                ) : (
                    <ul className="todo-list">
                        {todos.map((t) => (
                            <li
                                key={t.id}
                                className={`todo-item ${
                                    t.completed ? 'completed' : ''
                                }`}
                            >
                                <div className="todo-left">
                                    <input
                                        type="checkbox"
                                        checked={t.completed}
                                        onChange={() =>
                                            dispatch(toggleTodo(t.id))
                                        }
                                    />

                                    <div className="todo-content">
                                        <span className="todo-text">
                                            {t.text}
                                        </span>

                                        {t.note && (
                                            <span className="todo-note">
                                                📝 {t.note}
                                            </span>
                                        )}
                                    </div>

                                    <span
                                        className={`priority ${t.priority.toLowerCase()}`}
                                    >
                                        {t.priority}
                                    </span>
                                </div>

                                <div style={{ margin: '6px' }}>
                                    <small>{dateFormat(t.createdAt)}</small>
                                </div>

                                <div className="todo-actions">
                                    {/* Show kid name for parent/admin */}
                                    {kids.length > 0 && (
                                        <span
                                            style={{
                                                marginRight: '8px',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            {kids.find((k) => k.id === t.kidId)
                                                ?.name || 'Unknown'}
                                        </span>
                                    )}

                                    {/* Edit button */}
                                    <button
                                        className="edit-btn"
                                        title="Update todo"
                                        type="button"
                                        onClick={() => {
                                            setInput(t.text)
                                            setNote(t.note || '')
                                            setPriority(t.priority)
                                            if (kids.length > 0)
                                                setSelectedKidId(t.kidId)
                                        }}
                                    >
                                        ✏️
                                    </button>

                                    {/* Delete button */}
                                    <button
                                        className="delete-btn"
                                        title="Delete todo"
                                        type="button"
                                        onClick={() =>
                                            dispatch(deleteTodo(t.id))
                                        }
                                    >
                                        🗑
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}

                {error && <p className="error">{error}</p>}
            </div>
        </div>
    )
}
