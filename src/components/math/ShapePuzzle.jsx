import { useState } from 'react'
import '../../styles/style.css'

const PIECES = [
    { id: 1, color: '#f94144', width: 60, height: 60, targetX: 0, targetY: 0 },
    { id: 2, color: '#f3722c', width: 60, height: 60, targetX: 60, targetY: 0 },
    {
        id: 3,
        color: '#f9c74f',
        width: 120,
        height: 60,
        targetX: 0,
        targetY: 60,
    },
]

export default function ShapePuzzle() {
    const [placed, setPlaced] = useState([])
    const [score, setScore] = useState(0)

    const onDrop = (e) => {
        const pieceId = Number(e.dataTransfer.getData('pieceId'))
        const piece = PIECES.find((p) => p.id === pieceId)

        // simple placement: add to placed if not already
        if (!placed.find((p) => p.id === piece.id)) {
            setPlaced((prev) => [...prev, piece])
            setScore((prev) => prev + 1)
        }
    }

    return (
        <div className="shape-puzzle">
            <h2>🧩 Shape Puzzle</h2>
            <p>Drag the shapes into the container to fill it perfectly.</p>
            <div
                className={`puzzle-container ${placed.length === PIECES.length ? 'completed' : ''}`}
                onDragOver={(e) => e.preventDefault()}
                onDrop={onDrop}
            >
                {placed.map((p) => (
                    <div
                        key={p.id}
                        className="puzzle-piece placed"
                        style={{
                            width: p.width,
                            height: p.height,
                            backgroundColor: p.color,
                        }}
                    />
                ))}
            </div>

            <div className="pieces-bank">
                {PIECES.filter((p) => !placed.includes(p)).map((p) => (
                    <div
                        key={p.id}
                        className="puzzle-piece"
                        draggable
                        onDragStart={(e) =>
                            e.dataTransfer.setData('pieceId', p.id)
                        }
                        style={{
                            width: p.width,
                            height: p.height,
                            backgroundColor: p.color,
                        }}
                    />
                ))}
            </div>

            {placed.length === PIECES.length && (
                <div className="feedback correct">🎉 Puzzle Completed!</div>
            )}
            <div>Score: {score}</div>
        </div>
    )
}
