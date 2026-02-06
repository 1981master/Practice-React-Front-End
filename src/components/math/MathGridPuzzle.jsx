import { useState } from 'react'
import '../../styles/MathGridPuzzle.css' // use your existing CSS or the styles I provided

const gridSize = 4
const targetSum = 10

const MathGridPuzzle = () => {
    const [gridValues, setGridValues] = useState(
        Array(gridSize * gridSize).fill(''),
    )
    const [selectedTile, setSelectedTile] = useState(null)
    const [status, setStatus] = useState(Array(gridSize * gridSize).fill(''))

    const handleBoxClick = (index) => {
        if (selectedTile !== null) {
            const newGrid = [...gridValues]
            newGrid[index] = selectedTile
            setGridValues(newGrid)
            setSelectedTile(null)
        }
    }

    const handleTileClick = (value) => {
        setSelectedTile(value)
    }

    const checkPuzzle = () => {
        const newStatus = Array(gridSize * gridSize).fill('')

        // Check rows
        for (let r = 0; r < gridSize; r++) {
            const rowIndexes = Array.from(
                { length: gridSize },
                (_, i) => r * gridSize + i,
            )
            const sum = rowIndexes.reduce(
                (acc, i) => acc + Number(gridValues[i] || 0),
                0,
            )
            rowIndexes.forEach((i) => {
                if (sum === targetSum) newStatus[i] = 'correct'
                else newStatus[i] = 'wrong'
            })
        }

        // Check columns
        for (let c = 0; c < gridSize; c++) {
            const colIndexes = Array.from(
                { length: gridSize },
                (_, r) => r * gridSize + c,
            )
            const sum = colIndexes.reduce(
                (acc, i) => acc + Number(gridValues[i] || 0),
                0,
            )
            colIndexes.forEach((i) => {
                if (sum === targetSum) newStatus[i] = 'correct'
                else newStatus[i] = 'wrong'
            })
        }

        setStatus(newStatus)
    }

    return (
        <div className="practice-area math-grid-puzzle-wrapper">
            <h2>Math Grid Puzzle</h2>
            <p>
                1️⃣ Understand the goal You have a 4×4 grid (or whatever gridSize
                you set). Each row and each column should sum to targetSum
                (default: 10). The tiles you can use are numbers 1 to targetSum.
            </p>
            <p>
                2️⃣ How to place numbers Click a number in the tile bank (bottom
                row). It will highlight as selected. Click a box in the grid to
                place that number there. Repeat until all boxes are filled.
            </p>

            <p>
                3️⃣ Strategy to solve Start by filling one row at a time so it
                sums to the target. Then, make sure the numbers you placed also
                help the columns sum correctly. Adjust numbers as needed and
                click Check Puzzle after every change. Keep iterating until all
                boxes turn green.
            </p>
            <div className="math-grid-puzzle">
                {gridValues.map((val, idx) => (
                    <div
                        key={idx}
                        className={`puzzle-box ${status[idx]}`}
                        onClick={() => handleBoxClick(idx)}
                    >
                        {val}
                    </div>
                ))}
            </div>

            <div className="tile-bank">
                {Array.from({ length: targetSum }, (_, i) => i + 1).map(
                    (num) => (
                        <div
                            key={num}
                            className={`number-tile ${selectedTile === num ? 'selected' : ''}`}
                            onClick={() => handleTileClick(num)}
                        >
                            {num}
                        </div>
                    ),
                )}
            </div>

            <button
                className="btn btn--primary"
                onClick={checkPuzzle}
            >
                Check Puzzle
            </button>
        </div>
    )
}

export default MathGridPuzzle
