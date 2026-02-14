import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearError, loginUser } from '../store/authSlice'
import '../styles/Login.css'

export default function Login() {
    const [loginId, setLoginId] = useState('')
    const [password, setPassword] = useState('')
    const [userType, setUserType] = useState('KID')
    const [localError, setLocalError] = useState(null)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, error } = useSelector((state) => state.auth)

    const handleLogin = async (e) => {
        e.preventDefault()
        setLocalError(null)

        if (!loginId.trim()) {
            setLocalError(
                userType === 'PARENT'
                    ? 'Parent ID And Password are required'
                    : 'Child Login ID And Password are required',
            )
            return
        }

        if (!password) {
            setLocalError('Password is required')
            return
        }

        try {
            await dispatch(
                loginUser({
                    loginIdentifier: loginId.trim(),
                    password,
                    userType,
                }),
            ).unwrap()

            navigate('/dashboard')
        } catch (err) {
            setLocalError(err || 'Login failed')
        }
    }

    const toggleUserType = () => {
        if (loading) return
        setUserType(userType === 'KID' ? 'PARENT' : 'KID')
        setLoginId('')
        setPassword('')
        setLocalError(null)
    }

    return (
        <div className="login-page">
            <div className="login-box">
                <div className="logo">🧸</div>
                <div className="logo">Kids Fun/L</div>
                <h2>Welcome!</h2>
                <p>
                    {userType === 'PARENT'
                        ? 'Enter your Parent ID'
                        : 'Enter your Child Login ID'}{' '}
                    and password
                </p>

                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder={
                            userType === 'PARENT'
                                ? 'Parent ID'
                                : 'Child Login ID'
                        }
                        value={loginId}
                        onChange={(e) => setLoginId(e.target.value)}
                        autoFocus
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        className="login-button"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>

                    {(localError || error) && (
                        <p className="login-message error">
                            {localError || error}
                        </p>
                    )}
                </form>

                {/* Switch Login Type */}
                <p className="switch-page">
                    {userType === 'KID' ? (
                        <>
                            Logging in as Kid?{' '}
                            <button
                                type="button"
                                onClick={toggleUserType}
                                disabled={loading}
                            >
                                Parent Login
                            </button>
                        </>
                    ) : (
                        <>
                            {userType === 'KID'
                                ? 'Logging as Kid'
                                : 'Logging as Parent'}
                            <button
                                type="button"
                                onClick={toggleUserType}
                                disabled={loading}
                            >
                                Kid Login
                            </button>
                            Back to Kid Login?{' '}
                        </>
                    )}
                </p>

                {/* Signup only for Parent */}
                {
                    <p className="switch-page">
                        Don’t have an account?{' '}
                        <span
                            style={{ cursor: 'pointer', color: 'blue' }}
                            onClick={() => {
                                setLocalError(null)
                                dispatch(clearError())
                                navigate('/signup')
                            }}
                        >
                            Sign up
                        </span>
                    </p>
                }
            </div>
        </div>
    )
}
