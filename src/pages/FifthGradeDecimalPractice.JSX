import { useState } from 'react'
import FunModal from './FunModal'

export default function FifthGradeDecimalPractice() {
    const [modalOpen, setModalOpen] = useState(false)
    const [decimalAnswer, setDecimalAnswer] = useState('')
    const [feedback, setFeedback] = useState('')

    const challenge = {
        question: "What's 0.3 + 0.4 ?",
        answer: 0.7,
    }

    const checkAnswer = () => {
        if (Number(decimalAnswer).toFixed(2) === challenge.answer.toFixed(2)) {
            setFeedback('✅ Correct! 🎉')
        } else {
            setFeedback('❌ Try again!')
        }
    }

    return (
        <div>
            <button onClick={() => setModalOpen(true)}>
                Decimal Fun Challenge!
            </button>

            <FunModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title="Decimal Challenge"
            >
                <p>{challenge.question}</p>
                <input
                    type="number"
                    step="0.001"
                    value={decimalAnswer}
                    onChange={(e) => setDecimalAnswer(e.target.value)}
                />
                <button onClick={checkAnswer}>Submit</button>
                {feedback && <p>{feedback}</p>}
            </FunModal>
        </div>
    )
}
