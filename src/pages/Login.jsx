import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../store/authSlice'
import '../styles/Login.css'

export default function Login() {
    const [loginId, setLoginId] = useState('') // could be childLoginId or parentId
    const [password, setPassword] = useState('')
    const [userType, setUserType] = useState('KID') // default to Kid
    const [localError, setLocalError] = useState(null)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, error } = useSelector((state) => state.auth)

    const handleLogin = async (e) => {
        e.preventDefault()
        setLocalError(null)

        if (!loginId.trim()) {
            setLocalError(
                `${userType === 'PARENT' ? 'Parent ID' : 'Child Login ID'} is required`,
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
                    userType, // always sent
                }),
            ).unwrap()

            navigate('/dashboard')
        } catch (err) {
            setLocalError(err || 'Login failed')
        }
    }

    const toggleUserType = () => {
        setUserType(userType === 'KID' ? 'PARENT' : 'KID')
        setLoginId('')
        setPassword('')
        setLocalError(null)
    }

    return (
        <div className="login-page">
            <div className="login-box">
                <div className="logo">🧸 Kids Fun Learning</div>
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

                {/* Switch Login Type */}
                <p className="switch-page">
                    {userType === 'KID' ? (
                        <>
                            Logging in as Parent?{' '}
                            <button
                                type="button"
                                onClick={toggleUserType}
                            >
                                Parent Login
                            </button>
                        </>
                    ) : (
                        <>
                            Back to Kid Login?{' '}
                            <button
                                type="button"
                                onClick={toggleUserType}
                            >
                                Kid Login
                            </button>
                        </>
                    )}
                </p>

                {/* Show Signup link only for Parent */}
                {
                    <p className="switch-page">
                        Don’t have an account?{' '}
                        <span
                            style={{ cursor: 'pointer', color: 'blue' }}
                            onClick={() => navigate('/signup')}
                        >
                            Sign up
                        </span>
                    </p>
                }
            </div>
        </div>
    )
}
