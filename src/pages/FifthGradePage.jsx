import { useState } from 'react'
import FunModal from '../components/FunModal'
import { mathChallenges } from '../data/fifthGradeData'
import FractionBalance from '../pages/FractionBalance'
import FractionPizzaBalance from '../pages/FractionPizzaBalance'
import '../styles/style.css'

export default function FifthGradePage() {
    const [score, setScore] = useState(0)
    const [completed, setCompleted] = useState([])
    const [cardFeedback, setCardFeedback] = useState({})
    const [tableAnswers, setTableAnswers] = useState({})

    // ---------- Decimal Challenge ----------
    const [modalOpen, setModalOpen] = useState(false)
    const [decimalChallenge, setDecimalChallenge] = useState(
        generateDecimalChallenge(),
    )
    const [decimalAnswer, setDecimalAnswer] = useState('')
    const [decimalFeedback, setDecimalFeedback] = useState('')

    function generateDecimalChallenge() {
        const a = (Math.random() * 0.9 + 0.1).toFixed(3)
        const b = (Math.random() * 0.9 + 0.1).toFixed(3)
        return {
            question: `What's ${a} + ${b}?`,
            answer: (parseFloat(a) + parseFloat(b)).toFixed(3),
        }
    }

    const handleDecimalSubmit = () => {
        if (
            Number(decimalAnswer).toFixed(3) ===
            Number(decimalChallenge.answer).toFixed(3)
        ) {
            setDecimalFeedback('✅ Correct! 🎉')
            setScore((s) => s + 1)
            setTimeout(() => {
                setDecimalChallenge(generateDecimalChallenge())
                setDecimalAnswer('')
                setDecimalFeedback('')
            }, 1000)
        } else {
            setDecimalFeedback('❌ Try again!')
        }
    }

    // ---------- Multiple Choice ----------
    const handleAnswer = (challenge, answer) => {
        if (completed.includes(challenge.id)) return

        const isCorrect = answer === challenge.answer

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
        }, 500)

        if (isCorrect) {
            setScore((s) => s + 1)
            setCompleted((prev) => [...prev, challenge.id])
        }
    }

    // ---------- Multiplication Table ----------
    const handleTableChange = (row, col, value) => {
        const numericValue = Number(value)
        const correct = row * col

        setTableAnswers((prev) => ({
            ...prev,
            [`${row}-${col}`]: {
                value,
                correct: numericValue === correct,
            },
        }))
    }

    return (
        <div className="fifth-grade-page">
            <h1>Fifth Grade Math Fun!</h1>
            <h2>
                Score: {score} / {mathChallenges.length + 5}
            </h2>

            {/* ---------- Multiple Choice Questions ---------- */}
            <div className="questions-grid">
                {mathChallenges.map((q) => (
                    <div
                        key={q.id}
                        className={`question-card ${
                            completed.includes(q.id) ? 'completed' : ''
                        }`}
                    >
                        <p className="question">{q.question}</p>

                        <div className="answers">
                            {q.options.map((opt, idx) => {
                                let btnClass = 'btn answer-bubble'

                                if (completed.includes(q.id)) {
                                    btnClass =
                                        opt === q.answer
                                            ? 'btn btn--correct'
                                            : 'btn btn--disabled'
                                } else if (
                                    cardFeedback[q.id] === 'wrong' &&
                                    opt !== q.answer
                                ) {
                                    btnClass = 'btn btn--wrong'
                                }

                                return (
                                    <button
                                        key={idx}
                                        className={btnClass}
                                        disabled={completed.includes(q.id)}
                                        onClick={() => handleAnswer(q, opt)}
                                    >
                                        {opt}
                                    </button>
                                )
                            })}
                        </div>

                        {cardFeedback[q.id] === 'correct' && (
                            <div className="feedback correct">
                                ✅ Correct! 🎉
                            </div>
                        )}
                        {cardFeedback[q.id] === 'wrong' && (
                            <div className="feedback wrong">❌ Try again!</div>
                        )}

                        {q.division && (
                            <div className="long-division">
                                <pre>{q.division}</pre>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* ---------- Multiplication Table ---------- */}
            <h2>Multiplication Table Practice</h2>
            <table className="multiplication-table">
                <tbody>
                    {Array.from({ length: 10 }, (_, r) => {
                        const row = r + 1
                        return (
                            <tr key={row}>
                                {Array.from({ length: 10 }, (_, c) => {
                                    const col = c + 1
                                    const key = `${row}-${col}`
                                    const answer = tableAnswers[key]

                                    return (
                                        <td key={col}>
                                            <div className="cell">
                                                <span className="expression">
                                                    {row} × {col} =
                                                </span>
                                                <input
                                                    type="number"
                                                    value={
                                                        answer
                                                            ? answer.value
                                                            : ''
                                                    }
                                                    onChange={(e) =>
                                                        handleTableChange(
                                                            row,
                                                            col,
                                                            e.target.value,
                                                        )
                                                    }
                                                    className={
                                                        answer
                                                            ? answer.correct
                                                                ? 'correct'
                                                                : 'wrong'
                                                            : ''
                                                    }
                                                />
                                            </div>
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            {/* ---------- Decimal FunModal ---------- */}
            <h2>Decimal Fun!</h2>
            <button
                className="btn btn--primary"
                onClick={() => setModalOpen(true)}
            >
                Try Decimal Challenge!
            </button>

            <FunModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title="Decimal Challenge"
            >
                <p>{decimalChallenge.question}</p>
                <input
                    type="number"
                    step="0.001"
                    value={decimalAnswer}
                    onChange={(e) => setDecimalAnswer(e.target.value)}
                    className="decimal-input"
                />
                <button
                    className="btn btn--primary"
                    onClick={handleDecimalSubmit}
                >
                    Submit
                </button>
                {decimalFeedback && <p>{decimalFeedback}</p>}
            </FunModal>

            {/* ---------- Fraction Balance Game (ADDED LAST) ---------- */}
            <FractionBalance />
            {/* ---------- Fraction Pizza Game ---------- */}
            <FractionPizzaBalance />
        </div>
    )
}
