import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signup } from '../api/authApi'
import '../styles/Login.css' // reuse Login styles

export default function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    const handleSignup = async () => {
        try {
            await signup({ email, password })
            setMessage('Signup successful! Redirecting to login...')
            setTimeout(() => navigate('/'), 1500)
        } catch (err) {
            setMessage(err.response?.data || 'Signup failed')
        }
    }

    return (
        <div className="login-page">
            <div className="login-box">
                <h1 className="title">Kids Fun Learning</h1>
                <h2 className="subtitle">Sign Up</h2>

                <input
                    className="login-input"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="login-input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    className="login-button"
                    onClick={handleSignup}
                >
                    Sign Up
                </button>

                {message && <p className="login-message">{message}</p>}

                <p className="switch-page">
                    Already have an account?{' '}
                    <span onClick={() => navigate('/')}>Login</span>
                </p>
            </div>
        </div>
    )
}
