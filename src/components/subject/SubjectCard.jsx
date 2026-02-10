export default function SubjectCard({ subject }) {
    if (!subject) return <p>No subject data available.</p>

    return (
        <div
            style={{
                border: '1px solid #ccc',
                borderRadius: 8,
                padding: 16,
                marginBottom: 16,
                maxWidth: 400,
            }}
        >
            <h2>
                {subject.icon} {subject.name}
            </h2>
            <p>
                <strong>Grade Level:</strong> {subject.gradeLevel}
            </p>
            <p>
                <strong>Display Order:</strong> {subject.displayOrder}
            </p>
            {subject.description && (
                <p>
                    <strong>Description:</strong> {subject.description}
                </p>
            )}
            <p>
                <strong>Status:</strong>{' '}
                {subject.active ? 'Active' : 'Inactive'}
            </p>
            <p style={{ fontSize: '0.8em', color: '#666' }}>
                Created at: {new Date(subject.createdAt).toLocaleString()}{' '}
                <br />
                Updated at: {new Date(subject.updatedAt).toLocaleString()}
            </p>
        </div>
    )
}
