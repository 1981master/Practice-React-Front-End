import { useState } from 'react'
import FunModal from '../components/FunModal'
import { firstGradeAnimals } from '../data/FirstGradeAnimals'
import { mathChallenges } from '../data/mathChallenges'
import '../styles/style.css'

export default function FirstGradePage() {
    const [score, setScore] = useState(0)
    const [completedChallenges, setCompletedChallenges] = useState([])

    const [modalOpen, setModalOpen] = useState(false)
    const [modalContent, setModalContent] = useState({ title: '', text: '' })

    // New state for inline feedback cards
    const [cardFeedback, setCardFeedback] = useState({})

    // Open modal with title & text
    const openModal = (title, text) => {
        setModalContent({ title, text })
        setModalOpen(true)
    }

    // Handle math answers
    const handleMathAnswer = (challenge, selected) => {
        // Prevent double scoring
        if (completedChallenges.includes(challenge.id)) return

        const isCorrect = selected === challenge.answer

        // Show feedback card
        setCardFeedback((prev) => ({
            ...prev,
            [challenge.id]: isCorrect ? 'correct' : 'wrong',
        }))

        // Hide feedback after 1s
        setTimeout(() => {
            setCardFeedback((prev) => {
                const copy = { ...prev }
                delete copy[challenge.id]
                return copy
            })
        }, 1000)

        // Only lock if correct
        if (isCorrect) {
            setScore((prev) => prev + 1)
            setCompletedChallenges((prev) => [...prev, challenge.id])
        }
    }

    return (
        <div className="first-grade-page">
            <h1>Underwater Sea Adventure</h1>
            <h2>Score: {score}</h2>

            {/* SEA ANIMALS */}
            <section>
                <h2>Explore Sea Animals</h2>
                <div className="sea-grid">
                    {firstGradeAnimals.map((animal) => (
                        <div
                            key={animal.id}
                            className="sea-card"
                            onClick={() =>
                                openModal(animal.emoji, animal.description)
                            }
                        >
                            <div className="emoji">{animal.emoji}</div>
                            <div className="name">{animal.name}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* MATH CHALLENGES */}
            <section>
                <h2>Math Challenges</h2>
                <div className="math-grid">
                    {mathChallenges.map((ch) => (
                        <div
                            key={ch.id}
                            className={`math-card ${
                                completedChallenges.includes(ch.id)
                                    ? 'completed'
                                    : ''
                            }`}
                            onClick={() =>
                                openModal('Math Challenge', ch.question)
                            }
                        >
                            <p>{ch.question}</p>
                            <div className="options">
                                {ch.options.map((opt, idx) => (
                                    <button
                                        key={idx}
                                        onClick={(e) => {
                                            e.stopPropagation() // prevent modal
                                            handleMathAnswer(ch, opt)
                                        }}
                                        disabled={completedChallenges.includes(
                                            ch.id,
                                        )}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>

                            {/* 🎉 FEEDBACK CARD */}
                            {cardFeedback[ch.id] === 'correct' && (
                                <>
                                    {' '}
                                    <div className="card-feedback correct">
                                        ✅ Correct!
                                    </div>
                                    <div className="card-feedback correct">
                                        🎉 Great job!
                                    </div>
                                </>
                            )}
                            {cardFeedback[ch.id] === 'wrong' && (
                                <div className="card-feedback wrong">
                                    ❌ Try Again!
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* FUN MODAL */}
            <FunModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title={modalContent.title}
            >
                <p>{modalContent.text}</p>
            </FunModal>
        </div>
    )
}
