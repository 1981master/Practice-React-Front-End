import { useState } from 'react'
import { mathChallenges } from '../data/fifthGradeData'
import '../styles/FifthGradePage.css'

export default function FifthGradePage() {
    const [score, setScore] = useState(0)
    const [completed, setCompleted] = useState([])
    const [tableAnswers, setTableAnswers] = useState({}) // multiplication table

    const handleAnswer = (challenge, answer) => {
        if (completed.includes(challenge.id)) return

        if (answer === challenge.answer) {
            setScore(score + 1)
            alert('🎉 Correct!')
        } else {
            alert('❌ Try Again!')
        }
        setCompleted([...completed, challenge.id])
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

    const tableSize = 10

    return (
        <div className="fifth-grade-page">
            <h1>Fifth Grade Math Fun!</h1>
            <h2>
                Score: {score} / {mathChallenges.length}
            </h2>

            {/* Multiple Choice / Division Challenges */}
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
                        {q.division && (
                            <div className="long-division">
                                <p>
                                    <strong>Long Division:</strong>
                                </p>
                                <pre>{q.division}</pre>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Multiplication Table */}
            <h2>Multiplication Table Practice</h2>
            <p>
                Fill in the table. Correct answers turn green, wrong answers
                turn red.
            </p>
            <table className="multiplication-table">
                <tbody>
                    {Array.from({ length: tableSize }, (_, rowIdx) => {
                        const row = rowIdx + 1
                        return (
                            <tr key={row}>
                                {Array.from(
                                    { length: tableSize },
                                    (_, colIdx) => {
                                        const col = colIdx + 1
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
                                    },
                                )}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
