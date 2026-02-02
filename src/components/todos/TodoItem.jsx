export default function TodoItem({ todo, onToggle }) {
    return (
        <li>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo)}
            />
            {todo.text}
        </li>
    )
}
