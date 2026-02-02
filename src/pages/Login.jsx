import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../store/authSlice'
import '../styles/Login.css'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [localError, setLocalError] = useState(null)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, error } = useSelector((state) => state.auth)

    const handleLogin = async (e) => {
        e.preventDefault()
        setLocalError(null)

        try {
            await dispatch(loginUser({ email, password })).unwrap()
            navigate('/dashboard') // redirect after login
        } catch (err) {
            setLocalError(err)
        }
    }

    return (
        <div className="login-page">
            <div className="login-box">
                <div className="logo">🧸 Kids Fun Learning</div>
                <h2>Welcome!</h2>
                <p>Enter your email and password to continue</p>
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Parent Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                    {(error || localError) && (
                        <p className="error">{localError || error}</p>
                    )}
                </form>
                <p>
                    Don’t have an account? <a href="/signup">Sign up</a>
                </p>
            </div>
        </div>
    )
}
