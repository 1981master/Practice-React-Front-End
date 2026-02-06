import { useEffect, useState } from 'react'
import '../styles/style.css'

const randomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min

const generateFraction = (id) => {
    const denominator = randomInt(2, 12)
    const numerator = randomInt(1, denominator - 1)

    return {
        id,
        numerator,
        denominator,
        label: `${numerator}/${denominator}`,
        value: numerator / denominator,
    }
}

const generateFractions = (count = 20) =>
    Array.from({ length: count }, (_, i) => generateFraction(i))

export default function FractionBalance() {
    const [fractions, setFractions] = useState([])
    const [left, setLeft] = useState([])
    const [right, setRight] = useState([])

    useEffect(() => {
        setFractions(generateFractions(20))
    }, [])

    const sum = (arr) => arr.reduce((s, f) => s + f.value, 0)
    const leftTotal = sum(left)
    const rightTotal = sum(right)
    const diff = leftTotal - rightTotal

    // movement amount for visual tilt
    const MAX_MOVE = 40
    const leftMove = Math.max(-MAX_MOVE, Math.min(MAX_MOVE, diff * 80))
    const rightMove = -leftMove

    const isBalanced =
        left.length > 0 && right.length > 0 && Math.abs(diff) < 0.001

    const onDrop = (side, e) => {
        const fraction = JSON.parse(e.dataTransfer.getData('fraction'))

        if (side === 'left') setLeft((p) => [...p, fraction])
        if (side === 'right') setRight((p) => [...p, fraction])
    }

    const reset = () => {
        setLeft([])
        setRight([])
        setFractions(generateFractions(20))
    }

    return (
        <div className="fraction-game">
            <h2>⚖️ Fraction Balance</h2>
            <p>Drag fractions so both sides balance</p>

            {/* ---------- FRACTION BANK (2 ROWS) ---------- */}
            <div className="fraction-bank grid-2-rows">
                {fractions.map((f) => (
                    <div
                        key={f.id}
                        className={`fraction-tile ${isBalanced ? 'balanced' : ''}`}
                        draggable
                        onDragStart={(e) =>
                            e.dataTransfer.setData(
                                'fraction',
                                JSON.stringify(f),
                            )
                        }
                    >
                        {f.label}
                    </div>
                ))}
            </div>

            {/* ---------- BALANCE AREA ---------- */}
            <div className="balance-area">
                <div
                    className={`circle ${isBalanced ? 'balanced' : ''}`}
                    style={{
                        transform: `translateY(${left.length > 0 ? leftMove : 0}px)`,
                    }}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => onDrop('left', e)}
                >
                    <strong>Left</strong>
                    {left.map((f, i) => (
                        <span key={i}>{f.label}</span>
                    ))}
                    <div className="total">{leftTotal.toFixed(3)}</div>
                </div>

                <div
                    className={`circle ${isBalanced ? 'balanced' : ''}`}
                    style={{
                        transform: `translateY(${right.length > 0 ? rightMove : 0}px)`,
                    }}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => onDrop('right', e)}
                >
                    <strong>Right</strong>
                    {right.map((f, i) => (
                        <span key={i}>{f.label}</span>
                    ))}
                    <div className="total">{rightTotal.toFixed(3)}</div>
                </div>
            </div>

            {isBalanced && (
                <div className="balanced-message">🎉 Perfect Balance!</div>
            )}

            <button
                className="btn btn--secondary"
                onClick={reset}
            >
                New Fractions
            </button>
        </div>
    )
}
