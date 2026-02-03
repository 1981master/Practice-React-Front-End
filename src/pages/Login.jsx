import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../store/authSlice'
import '../styles/Login.css'

export default function Login() {
    const [parentId, setParentId] = useState('')
    const [password, setPassword] = useState('')
    const [localError, setLocalError] = useState(null)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, error } = useSelector((state) => state.auth)

    const handleLogin = async (e) => {
        e.preventDefault()
        setLocalError(null)

        if (!parentId.trim()) {
            setLocalError('Parent ID is required')
            return
        }
        if (!password) {
            setLocalError('Password is required')
            return
        }

        try {
            // Dispatch thunk with the exact field expected by backend
            await dispatch(
                loginUser({ parentId: parentId.trim(), password }),
            ).unwrap()
            navigate('/dashboard') // redirect on success
        } catch (err) {
            // Show HTML error if backend returns it
            setLocalError(err || 'Login failed')
        }
    }

    return (
        <div className="login-page">
            <div className="login-box">
                <div className="logo">🧸 Kids Fun Learning</div>
                <h2>Welcome!</h2>
                <p>Enter your Parent ID and password to continue</p>

                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Parent ID"
                        value={parentId}
                        onChange={(e) => setParentId(e.target.value)}
                        required
                        autoFocus
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
                        <pre className="error">{localError || error}</pre>
                    )}
                </form>

                <p className="switch-page">
                    Don’t have an account? <a href="/signup">Sign up</a>
                </p>
            </div>
        </div>
    )
}
