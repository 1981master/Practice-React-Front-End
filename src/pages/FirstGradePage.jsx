import { useCallback, useState } from 'react'
import FunModal from '../components/FunModal'
import { firstGradeAnimals } from '../data/FirstGradeAnimals'
import { mathChallenges } from '../data/mathChallenges'
import '../styles/style.css'
import ShapeDisplay from './ShapeDisplay' // Import the new ShapeDisplay component

export default function FirstGradePage() {
    const [score, setScore] = useState(0)
    const [completedChallenges, setCompletedChallenges] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [lifeCycleModalOpen, setLifeCycleModalOpen] = useState(false)
    const [modalContent, setModalContent] = useState({
        title: '',
        text: '',
        lifeCycle: null,
    })
    const [cardFeedback, setCardFeedback] = useState({})

    const openModal = useCallback((title, text, lifeCycle = null) => {
        setModalContent({ title, text, lifeCycle })
        setModalOpen(true)
    }, [])

    const openLifeCycleModal = useCallback(() => {
        setLifeCycleModalOpen(true)
    }, [])

    const handleMathAnswer = useCallback(
        (challenge, selected) => {
            if (completedChallenges.includes(challenge.id)) return

            const isCorrect = selected === challenge.answer

            setCardFeedback((prev) => ({
                ...prev,
                [challenge.id]: isCorrect ? 'correct' : 'wrong',
            }))

            setTimeout(() => {
                setCardFeedback((prev) => {
                    const copy = { ...prev }
                    delete copy[challenge.id]
                    return copy
                })
            }, 1000)

            if (isCorrect) {
                setScore((prev) => prev + 1)
                setCompletedChallenges((prev) => [...prev, challenge.id])
            }
        },
        [completedChallenges],
    )

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
                                openModal(
                                    animal.name,
                                    animal.description,
                                    animal.lifeCycle,
                                )
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
                                            e.stopPropagation()
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

                            {cardFeedback[ch.id] === 'correct' && (
                                <>
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

            {/* FUN MODAL (for Animal Info) */}
            <FunModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title={modalContent.title}
            >
                <p>{modalContent.text}</p>

                {/* Show "See Life Cycle" button if lifeCycle exists */}
                {modalContent.lifeCycle && (
                    <button
                        className="btn btn--primary"
                        onClick={openLifeCycleModal}
                    >
                        See Life Cycle
                    </button>
                )}
            </FunModal>

            {/* FUN MODAL (for Life Cycle Info) */}
            <FunModal
                isOpen={lifeCycleModalOpen}
                onClose={() => setLifeCycleModalOpen(false)}
                title={`Life Cycle of ${modalContent.title}`}
            >
                <div className="life-cycle-section">
                    <h3>Life Cycle of {modalContent.title}</h3>
                    <div className="life-cycle-grid">
                        {modalContent.lifeCycle?.map((stage, idx) => (
                            <div
                                key={idx}
                                className="life-cycle-card"
                            >
                                <div className="emoji">{stage.emoji}</div>
                                <div className="stage">{stage.stage}</div>
                                <div className="text">{stage.text}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </FunModal>

            {/* Shape Display Section */}
            <ShapeDisplay />
        </div>
    )
}
