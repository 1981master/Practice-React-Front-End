import { useEffect, useState } from 'react'
import saveToDo, { deleteToDoAPI, fetchAllTodos } from '../../api/todoAPI'
import './todo.css'

export default function TodoList() {
    const [todos, setTodos] = useState([])
    const [input, setInput] = useState('')
    const [note, setNote] = useState('')
    const [priority, setPriority] = useState('MEDIUM')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    // Load todos
    useEffect(() => {
        const loadTodos = async () => {
            try {
                setLoading(true)
                const todosData = await fetchAllTodos()
                setTodos(todosData)
            } catch (err) {
                setError('Failed to load todos')
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        loadTodos()
    }, [])

    // Add new todo
    const addTodo = async (e) => {
        e.preventDefault()
        if (input.trim() === '') return

        const newTodo = {
            text: input,
            note: note.trim() || null,
            completed: false,
            priority,
        }

        try {
            setLoading(true)
            const savedTodo = await saveToDo(newTodo)
            setTodos((prev) => [...prev, savedTodo])
            setInput('')
            setNote('')
            setPriority('MEDIUM')
        } catch (err) {
            console.error(err)
            setError('Failed to save todo')
        } finally {
            setLoading(false)
        }
    }

    // Toggle complete (frontend lifecycle logic)
    const toggleTodo = (id) => {
        setTodos((prev) =>
            prev.map((todo) => {
                if (todo.id !== id) return todo

                const now = new Date().toISOString()
                const completed = !todo.completed

                return {
                    ...todo,
                    completed,
                    updatedAt: now,
                    completedAt: completed ? now : null,
                }
            }),
        )
    }

    // Delete todo
    const deleteTodo = async (todoId) => {
        try {
            const status = await deleteToDoAPI(todoId)

            if (status === 204 || status === 200) {
                setTodos((prev) => prev.filter((todo) => todo.id !== todoId))
            } else {
                console.error('Failed to delete todo, status:', status)
            }
        } catch (err) {
            console.error('Error deleting todo:', err)
        }
    }

    // Priority sorting
    const priorityOrder = { HIGH: 1, MEDIUM: 2, LOW: 3 }

    const sortedTodos = [...todos].sort(
        (a, b) =>
            priorityOrder[a.priority || 'MEDIUM'] -
            priorityOrder[b.priority || 'MEDIUM'],
    )

    return (
        <div className="todo-app">
            <h1>Todo List</h1>

            {/* Error */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Input */}
            <form
                onSubmit={addTodo}
                className="todo-input"
            >
                <input
                    type="text"
                    placeholder="Add new todo..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={loading}
                />

                <textarea
                    placeholder="Optional note..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    disabled={loading}
                    rows={2}
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
                    {loading ? 'Adding...' : 'Add'}
                </button>
            </form>

            {/* Todo List */}
            {sortedTodos.length === 0 ? (
                <p>No todos yet!</p>
            ) : (
                <ul className="todo-list">
                    {sortedTodos.map((todo) => (
                        <li
                            key={todo.id}
                            className={`todo-item ${
                                todo.completed ? 'completed' : ''
                            }`}
                        >
                            <div
                                onClick={() => toggleTodo(todo.id)}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '4px',
                                    cursor: 'pointer',
                                }}
                            >
                                <small>ID: {todo.id}</small>
                                <span>Text: {todo.text}</span>

                                {todo.note && (
                                    <small style={{ color: '#475569' }}>
                                        📝 {todo.note}
                                    </small>
                                )}

                                <small
                                    className={`priority ${todo.priority?.toLowerCase()}`}
                                >
                                    Priority: {todo.priority}
                                </small>

                                {todo.createdAt && (
                                    <small>
                                        Created:{' '}
                                        {new Date(
                                            todo.createdAt,
                                        ).toLocaleString()}
                                    </small>
                                )}

                                {todo.updatedAt && (
                                    <small>
                                        Updated:{' '}
                                        {new Date(
                                            todo.updatedAt,
                                        ).toLocaleString()}
                                    </small>
                                )}

                                {todo.completedAt && (
                                    <small>
                                        Completed:{' '}
                                        {new Date(
                                            todo.completedAt,
                                        ).toLocaleString()}
                                    </small>
                                )}
                            </div>

                            <button onClick={() => deleteTodo(todo.id)}>
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
