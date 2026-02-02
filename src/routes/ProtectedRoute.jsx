import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children, permission }) {
    const { token, user } = useSelector((state) => state.auth)

    if (!token)
        return (
            <Navigate
                to="/"
                replace
            />
        )

    if (permission && !user?.permissions?.includes(permission)) {
        return (
            <Navigate
                to="/dashboard"
                replace
            />
        )
    }

    return children
}
