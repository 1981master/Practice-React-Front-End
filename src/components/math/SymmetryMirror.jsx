import { useState } from 'react'
import '../../styles/style.css'

const SHAPES = [
    { id: 1, color: '#f94144', size: 40 },
    { id: 2, color: '#f3722c', size: 50 },
    { id: 3, color: '#f9c74f', size: 30 },
]

export default function SymmetryMirror() {
    const [leftPlaced, setLeftPlaced] = useState([])
    const [score, setScore] = useState(0)

    const onDropLeft = (e) => {
        const shapeId = Number(e.dataTransfer.getData('shapeId'))
        const shape = SHAPES.find((s) => s.id === shapeId)
        if (!leftPlaced.find((s) => s.id === shape.id)) {
            setLeftPlaced((prev) => [...prev, shape])
            setScore((prev) => prev + 1)
        }
    }

    return (
        <div className="symmetry-mirror">
            <h2>🪞 Symmetry Mirror</h2>
            <p>
                Drag shapes to the left side; the right side mirrors them
                automatically.
            </p>

            <div className="mirror-container">
                <div
                    className={`mirror-side ${leftPlaced.length === SHAPES.length ? 'completed' : ''}`}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={onDropLeft}
                >
                    {leftPlaced.map((s) => (
                        <div
                            key={s.id}
                            className="shape"
                            style={{
                                width: s.size,
                                height: s.size,
                                backgroundColor: s.color,
                            }}
                        />
                    ))}
                </div>

                <div
                    className={`mirror-side ${leftPlaced.length === SHAPES.length ? 'completed' : ''}`}
                >
                    {leftPlaced.map((s) => (
                        <div
                            key={s.id}
                            className="shape"
                            style={{
                                width: s.size,
                                height: s.size,
                                backgroundColor: s.color,
                            }}
                        />
                    ))}
                </div>
            </div>

            <div className="shapes-bank">
                {SHAPES.filter((s) => !leftPlaced.includes(s)).map((s) => (
                    <div
                        key={s.id}
                        className="shape"
                        draggable
                        onDragStart={(e) =>
                            e.dataTransfer.setData('shapeId', s.id)
                        }
                        style={{
                            width: s.size,
                            height: s.size,
                            backgroundColor: s.color,
                        }}
                    />
                ))}
            </div>

            {leftPlaced.length === SHAPES.length && (
                <div className="feedback correct">🎉 Symmetry Completed!</div>
            )}
            <div>Score: {score}</div>
        </div>
    )
}
