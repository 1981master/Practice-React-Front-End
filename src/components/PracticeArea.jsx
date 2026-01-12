import '../styles/PracticeArea.css'

export default function PracticeArea({ children }) {
    return (
        <div className="practice-area">
            <h2>Practice Area</h2>
            <div className="practice-content">{children}</div>
        </div>
    )
}
