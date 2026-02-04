import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    addTodo,
    deleteTodo,
    fetchTodos,
    toggleTodo,
} from '../../store/todoSlice'
import '../../styles/todo.css'

export default function TodoProgressPanel({ kidId }) {
    const dispatch = useDispatch()

    // Destructure items array from todo slice safely
    const {
        items: todos = [],
        loading = false,
        error = null,
    } = useSelector((state) => state.todos || {})

    const [input, setInput] = useState('')
    const [note, setNote] = useState('')
    const [priority, setPriority] = useState('MEDIUM')

    // Fetch todos on kidId change
    useEffect(() => {
        if (kidId) {
            dispatch(fetchTodos(kidId))
        }
    }, [kidId, dispatch])

    // Add new todo
    const handleAddTodo = (e) => {
        e.preventDefault()
        if (!input.trim()) return

        const newTodo = {
            kidId,
            text: input.trim(),
            note: note.trim() || null,
            priority,
            completed: false,
        }

        dispatch(addTodo(newTodo))
        setInput('')
        setNote('')
        setPriority('MEDIUM')
    }

    const handleToggle = (id) => dispatch(toggleTodo(id))
    const handleDelete = (id) => dispatch(deleteTodo(id))

    // Calculate progress safely
    const completed = todos.filter((t) => t.completed).length
    const total = todos.length
    const percent = total ? (completed / total) * 100 : 0

    return (
        <div className="todo-page">
            <div className="todo-box">
                <h2>Todo Progress</h2>
                <p>
                    Completed {completed} of {total} tasks ({percent.toFixed(0)}
                    %)
                </p>

                {/* Add Todo Form */}
                <form
                    className="todo-form"
                    onSubmit={handleAddTodo}
                >
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

                {/* Todo List */}
                {todos.length === 0 ? (
                    <p>No todo items available.</p>
                ) : (
                    <ul className="todo-list">
                        {todos.map((t) => (
                            <li
                                key={t.id}
                                className={`todo-item ${t.completed ? 'completed' : ''}`}
                            >
                                <div onClick={() => handleToggle(t.id)}>
                                    <strong>{t.text}</strong> ({t.priority}){' '}
                                    {t.completed ? '✅' : '❌'}
                                    {t.note && <small> 📝 {t.note}</small>}
                                </div>
                                <button onClick={() => handleDelete(t.id)}>
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                )}

                {error && <p className="error">{error}</p>}
            </div>
        </div>
    )
}
