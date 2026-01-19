import { kindergartenItems } from '../data/learningItems'
import '../styles/KindergartenPage.css'

export default function KindergartenPage() {
    return (
        <div className="kindergarten-page">
            <h1>Kindergarten Learning</h1>
            <div className="learning-grid">
                {kindergartenItems.map((item) => (
                    <div
                        key={item.id}
                        className="learning-card"
                    >
                        <div className="emoji">{item.emoji}</div>
                        <div className="name">{item.name}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
