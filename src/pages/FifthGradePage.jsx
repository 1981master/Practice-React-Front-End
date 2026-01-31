import { useState } from 'react'
import { mathChallenges } from '../data/fifthGradeData'
import '../styles/style.css'

export default function FifthGradePage() {
    const [score, setScore] = useState(0)
    const [completed, setCompleted] = useState([])
    const [cardFeedback, setCardFeedback] = useState({})
    const [tableAnswers, setTableAnswers] = useState({})

    const handleAnswer = (challenge, answer) => {
        // block only if already solved correctly
        if (completed.includes(challenge.id)) return

        const isCorrect = answer === challenge.answer

        setCardFeedback((prev) => ({
            ...prev,
            [challenge.id]: isCorrect ? 'correct' : 'wrong',
        }))

        // hide feedback after .5s
        setTimeout(() => {
            setCardFeedback((prev) => {
                const copy = { ...prev }
                delete copy[challenge.id]
                return copy
            })
        }, 500)

        // ✅ ONLY LOCK WHEN CORRECT
        if (isCorrect) {
            setScore((s) => s + 1)
            setCompleted((prev) => [...prev, challenge.id])
        }
    }

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
                Score: {score} / {mathChallenges.length}
            </h2>

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
                            {q.options.map((opt, idx) => (
                                <div
                                    key={idx}
                                    className="answer-bubble"
                                    onClick={() => handleAnswer(q, opt)}
                                >
                                    {opt}
                                </div>
                            ))}
                        </div>

                        {/* 🎉 FEEDBACK */}
                        {cardFeedback[q.id] === 'correct' && (
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

                        {cardFeedback[q.id] === 'wrong' && (
                            <div className="card-feedback wrong">
                                ❌ Try again!
                            </div>
                        )}

                        {q.division && (
                            <div className="long-division">
                                <pre>{q.division}</pre>
                            </div>
                        )}
                    </div>
                ))}
            </div>

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
        </div>
    )
}
