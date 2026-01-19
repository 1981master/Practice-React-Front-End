import { useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { CounterContext } from '../context/CounterContext'
import '../styles/button.css'
import '../styles/counter.css'

export default function Counter() {
    const { count, setCount, counter } = useContext(CounterContext)

    return (
        <div className="counter">
            <h3>Counter: {count}</h3>

            <div className="counter-buttons">
                <button
                    className="button-primary"
                    onClick={() => setCount(count + 1)}
                >
                    Increase Counter
                </button>

                <button
                    className="button-secondary"
                    onClick={() => setCount(count - 1)}
                >
                    Decrease Counter
                </button>

                <button
                    className="button-danger"
                    onClick={() => setCount(0)}
                >
                    Reset Counter
                </button>
            </div>

            <div style={{ marginTop: '20px' }}>
                <h4>Fetched Counters:</h4>

                {!Array.isArray(counter) || counter.length === 0 ? (
                    <p>Loading...</p>
                ) : (
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {counter.map((item) => (
                            <li
                                key={uuidv4()}
                                style={{
                                    padding: '8px',
                                    margin: '4px 0',
                                    border: '1px solid #9b7777',
                                    borderRadius: '8px',
                                }}
                            >
                                {item.counter} → {item.id}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}
