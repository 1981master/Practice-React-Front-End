import { useState } from 'react'
import { mathChallenges } from './fifthGradeData'

export default function MathQuiz() {
    const [current, setCurrent] = useState(0)
    const [message, setMessage] = useState('')
    const [attempts, setAttempts] = useState(0)
    const [finished, setFinished] = useState(false)

    const question = mathChallenges[current]

    const checkAnswer = (selected) => {
        // 🔑 Normalize both sides to string
        const isCorrect =
            String(selected).trim() === String(question.answer).trim()

        if (isCorrect) {
            setMessage('🎉 Great job!')
            setAttempts(0)

            setTimeout(() => {
                if (current < mathChallenges.length - 1) {
                    setCurrent((prev) => prev + 1)
                    setMessage('')
                } else {
                    setFinished(true)
                }
            }, 900)
        } else {
            setAttempts((prev) => prev + 1)
            setMessage('❌ Try again')
        }
    }

    if (finished) {
        return <h2>✅ Quiz completed!</h2>
    }

    return (
        <div>
            <h3>{question.question}</h3>

            {/* Optional long division display */}
            {question.division && (
                <pre style={{ background: '#f5f5f5', padding: '10px' }}>
                    {question.division}
                </pre>
            )}

            <div>
                {question.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => checkAnswer(option)}
                        style={{ display: 'block', margin: '6px 0' }}
                    >
                        {option}
                    </button>
                ))}
            </div>

            {message && <p>{message}</p>}
        </div>
    )
}
