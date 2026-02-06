import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signup } from '../api/authApi'
import '../styles/Login.css'

export default function Signup() {
    const [loginId, setLoginId] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    const handleSignup = async () => {
        if (!loginId || !password) {
            setMessage('Parent ID and Password are required')
            return
        }

        try {
            await signup({
                loginId,
                email,
                password,
            })

            setMessage('Signup successful! Please login using your Parent ID.')
            setTimeout(() => navigate('/'), 1500)
        } catch (err) {
            setMessage(err.response?.data || 'Signup failed')
        }
    }

    return (
        <div className="login-page">
            <div className="login-box">
                <h1 className="title">Kids Fun Learning</h1>
                <h2 className="subtitle">Create Parent Account</h2>

                {/* Parent ID */}
                <input
                    className="login-input"
                    type="text"
                    placeholder="Parent ID (used for login)"
                    value={loginId}
                    onChange={(e) => setLoginId(e.target.value)}
                />

                {/* Email (optional) */}
                <input
                    className="login-input"
                    type="email"
                    placeholder="Email (optional)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                {/* Password */}
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

                <p
                    className="switch-page"
                    style={{ cursor: 'pointer' }}
                >
                    Already have an account?{' '}
                    <span onClick={() => navigate('/')}>Login</span>
                </p>
            </div>
        </div>
    )
}
