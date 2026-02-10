export default function TopicList({ topics }) {
    return (
        <>
            <ul>
                {topics.map((t) => (
                    <li key={t.id}>{t.name}</li>
                ))}
            </ul>
        </>
    )
}
