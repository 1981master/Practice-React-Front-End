import TodoItem from './TodoItem'

export default function TodoList({ todos = [], onToggle }) {
    return (
        <ul>
            {todos.map((t) => (
                <TodoItem
                    key={t.id}
                    todo={t}
                    onToggle={onToggle}
                />
            ))}
        </ul>
    )
}
