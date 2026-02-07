import { kindergartenItems } from '../data/learningItems'
import '../styles/style.css'

export default function KindergartenPage() {
    return (
        <div className="kindergarten-page">
            <h1>Kindergarten Learning</h1>

            <div className="learning-grid">
                {kindergartenItems.map((item, index) => {
                    const letter = item.name.charAt(0).toUpperCase()

                    return (
                        <div
                            key={index}
                            className="learning-card"
                        >
                            <div className="letter">{letter}</div>
                            <div className="emoji">{item.emoji}</div>
                            <div className="name">{item.name}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
