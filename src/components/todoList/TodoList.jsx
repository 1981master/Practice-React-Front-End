import { useState } from 'react'
import './todo.css'

export default function TodoList() {
    const [todos, setTodos] = useState([])
    const [input, setInput] = useState('')

    // Add new Todo
    const addTodo = (e) => {
        e.preventDefault()
        if (input.trim() === '') return
        setTodos([...todos, { id: Date.now(), text: input, complete: false }])
        setInput('')
    }

    // Toggle complete
    const toggleTodo = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, complete: !todo.complete } : todo,
            ),
        )
    }

    // Delete todo
    const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id))
    }

    return (
        <div className="todo-app">
            <h1>Todo List</h1>

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
                />
                <button type="submit">Add</button>
            </form>

            {/* Todo List */}
            {todos.length === 0 ? (
                <p>No todos yet!</p>
            ) : (
                <ul className="todo-list">
                    {todos.map((todo) => (
                        <li
                            key={todo.id}
                            className={`todo-item ${
                                todo.complete ? 'completed' : ''
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
                                <span>{todo.text}</span>
                                <small
                                    style={{
                                        color: '#64748b',
                                        fontSize: '0.8rem',
                                    }}
                                >
                                    {new Date(todo.createdAt).toLocaleString()}
                                </small>
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
