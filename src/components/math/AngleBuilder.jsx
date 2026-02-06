import { useState } from 'react'
import '../../styles/style.css'

export default function AngleBuilder() {
    const [angle, setAngle] = useState(0)

    const rotate = (deg) => setAngle((prev) => (prev + deg) % 360)
    const reset = () => setAngle(0)

    return (
        <div className="angle-builder">
            <h3>📐 Angle Builder</h3>
            <p>Rotate the triangle to match the target angle.</p>
            <div className="angle-container">
                <div
                    className="triangle"
                    style={{ transform: `rotate(${angle}deg)` }}
                ></div>
            </div>

            <div className="angle-controls">
                <button onClick={() => rotate(30)}>+30°</button>
                <button onClick={() => rotate(45)}>+45°</button>
                <button onClick={() => rotate(60)}>+60°</button>
                <button onClick={() => rotate(90)}>+90°</button>
                <button onClick={reset}>Reset</button>
            </div>

            <p>Current: {angle}°</p>
        </div>
    )
}
