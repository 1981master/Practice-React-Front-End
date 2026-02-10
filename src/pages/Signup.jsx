import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signupUser } from '../store/authSlice'
import '../styles/Login.css'

export default function Signup() {
    const [loginId, setLoginId] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loading, error } = useSelector((state) => state.auth)

    const handleSignup = async () => {
        // Basic validation
        if (!loginId.trim() || !password.trim()) {
            setMessage('Parent ID and Password are required')
            return
        }

        try {
            // Call your API function to create a new parent
            // await signup({
            //     loginId: loginId.trim(),
            //     email: email.trim() || '', // optional
            //     password: password.trim(),
            // })
            const resultAction = await dispatch(
                signupUser({
                    loginId: loginId.trim(),
                    email: email.trim() || '',
                    password: password.trim(),
                }),
            )

            // setMessage('Signup successful! Please login using your Parent ID.')
            if (signupUser.fulfilled.match(resultAction)) {
                setMessage('Signup successful! Redirecting to login...')
                setTimeout(() => navigate('/'), 1500)
            } else {
                setMessage(resultAction.payload || 'Signup failed')
            }

            // Redirect to login after short delay
            setTimeout(() => navigate('/'), 1500)
        } catch (err) {
            // Show backend error message or fallback
            // setMessage(err.response?.data || 'Signup failed')
            setMessage('Signup failed')
        }
    }

    return (
        <div className="login-page">
            <div className="login-box">
                <h1 className="title">🧸 Kids Fun Learning</h1>
                <h2 className="subtitle">Create Parent Account</h2>

                {/* Parent ID */}
                <input
                    className="login-input"
                    type="text"
                    placeholder="Parent ID (used for login)"
                    value={loginId}
                    onChange={(e) => setLoginId(e.target.value)}
                    autoFocus
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

                {/* Signup Button */}
                <button
                    className="login-button"
                    onClick={handleSignup}
                    disabled={loading}
                >
                    Sign Up
                    {loading ? 'Signing up...' : 'Sign Up'}
                </button>

                {/* Message */}
                {message && <p className="login-message">{message}</p>}
                {error && <p className="login-message error">{error}</p>}

                {/* Switch to Login */}
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
