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

export default function FractionPizza() {
    const [fractions, setFractions] = useState([])
    const [left, setLeft] = useState([])
    const [right, setRight] = useState([])
    const [errorSide, setErrorSide] = useState('') // to show red flash

    useEffect(() => {
        setFractions(generateFractions(20))
    }, [])

    const sumValues = (arr) => arr.reduce((s, f) => s + f.value, 0)

    const canAddFraction = (currentArr, f) =>
        sumValues(currentArr) + f.value <= 1

    const onDrop = (side, e) => {
        const fraction = JSON.parse(e.dataTransfer.getData('fraction'))
        const currentArr = side === 'left' ? left : right
        const total = sumValues(currentArr)

        if (total + fraction.value > 1) {
            // exceed capacity -> show red briefly
            setErrorSide(side)
            setTimeout(() => setErrorSide(''), 500)
            return
        }

        if (side === 'left') setLeft((p) => [...p, fraction])
        if (side === 'right') setRight((p) => [...p, fraction])
    }

    const reset = () => {
        setFractions(generateFractions(20))
        setLeft([])
        setRight([])
        setErrorSide('')
    }

    const renderPizza = (fractionsArray) => {
        let startAngle = 0
        const total = sumValues(fractionsArray)
        const isFull = Math.abs(total - 1) < 0.001
        const slices = fractionsArray.map((f) => {
            const sliceAngle = f.value * 360
            const slice = (
                <path
                    key={f.id}
                    d={describeArc(
                        90,
                        90,
                        80,
                        startAngle,
                        startAngle + sliceAngle,
                    )}
                    fill="#34d399"
                    stroke="#065f46"
                    strokeWidth="2"
                />
            )
            startAngle += sliceAngle
            return slice
        })
        return (
            <svg
                width="180"
                height="180"
                viewBox="0 0 180 180"
            >
                <circle
                    cx="90"
                    cy="90"
                    r="80"
                    fill={
                        isFull
                            ? '#4ade80'
                            : errorSide === 'left'
                              ? '#f87171'
                              : '#fde68a'
                    }
                    stroke="#f59e0b"
                    strokeWidth="4"
                />
                {slices}
            </svg>
        )
    }

    // ---------- Arc helper ----------
    const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
        const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0
        return {
            x: centerX + radius * Math.cos(angleInRadians),
            y: centerY + radius * Math.sin(angleInRadians),
        }
    }

    const describeArc = (x, y, radius, startAngle, endAngle) => {
        const start = polarToCartesian(x, y, radius, endAngle)
        const end = polarToCartesian(x, y, radius, startAngle)
        const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'
        return `M ${x} ${y} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y} Z`
    }

    return (
        <div className="fraction-pizza-game">
            <h2>🍕 Fraction Pizza Balance</h2>
            <p>Drag fractions to fill the pizza proportionally</p>

            <div className="fraction-bank grid-2-rows">
                {fractions.map((f) => (
                    <div
                        key={f.id}
                        className="fraction-tile"
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

            <div className="pizza-area">
                <div
                    className={`circle-pizza ${errorSide === 'left' ? 'error' : ''}`}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => onDrop('left', e)}
                >
                    <strong>Left Pizza</strong>
                    {renderPizza(left)}
                </div>

                <div
                    className={`circle-pizza ${errorSide === 'right' ? 'error' : ''}`}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => onDrop('right', e)}
                >
                    <strong>Right Pizza</strong>
                    {renderPizza(right)}
                </div>
            </div>

            <button
                className="btn btn--secondary"
                onClick={reset}
            >
                New Fractions
            </button>
        </div>
    )
}
