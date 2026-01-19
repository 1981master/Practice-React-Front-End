import { useState } from 'react'
import FunModal from '../components/FunModal'
import { firstGradeAnimals } from '../data/FirstGradeAnimals'
import { mathChallenges } from '../data/mathChallenges'
import '../styles/FirstGradePage.css'
import '../styles/FunModal.css'

export default function FirstGradePage() {
    const [score, setScore] = useState(0)
    const [completedChallenges, setCompletedChallenges] = useState([])

    const [modalOpen, setModalOpen] = useState(false)
    const [modalContent, setModalContent] = useState({ title: '', text: '' })

    // Open modal with title & text
    const openModal = (title, text) => {
        setModalContent({ title, text })
        setModalOpen(true)
    }

    // Handle math answers
    const handleMathAnswer = (challenge, selected) => {
        if (selected === challenge.answer) {
            if (!completedChallenges.includes(challenge.id)) {
                setScore((prev) => prev + 1)
                setCompletedChallenges((prev) => [...prev, challenge.id])
            }
            alert('✅ Correct!')
        } else {
            alert('❌ Try Again!')
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
                            className="math-card"
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
