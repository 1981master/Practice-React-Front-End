import { useState } from 'react'
import callPythonHealth from '../../service/pythonServiceAPI'

export default function PythonEchoTester() {
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)

    const handleHealthClick = async () => {
        console.log('Health button clicked!')
        try {
            const result = await callPythonHealth()
            console.log('Health API result:', result)
            setResponse(result.data)
        } catch (err) {
            console.error(err)
            setError(err)
        }
    }

    return (
        <div>
            <button onClick={handleHealthClick}>Call Python Echo API</button>
            {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    )
}
