import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'

import About from '../pages/About'
import Analytics from '../pages/Analytics'
import Dashboard from '../pages/Dashboard'
import FifthGradePage from '../pages/FifthGradePage'
import FirstGradePage from '../pages/FirstGradePage'
import KindergartenPage from '../pages/KindergartenPage'
import Login from '../pages/Login'
import Settings from '../pages/Settings'
import Signup from '../pages/Signup'
import Test from '../pages/Test'

export default function AppRoutes() {
    return (
        <Routes>
            {/* PUBLIC */}
            <Route
                path="/"
                element={<Login />}
            />
            {/* PUBLIC */}
            <Route
                path="/signup"
                element={<Signup />}
            />{' '}
            {/* PROTECTED */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/test"
                element={
                    <ProtectedRoute>
                        <Test />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/about"
                element={
                    <ProtectedRoute>
                        <About />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/analytics"
                element={
                    <ProtectedRoute permission="VIEW_ANALYTICS">
                        <Analytics />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/settings"
                element={
                    <ProtectedRoute>
                        <Settings />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/kindergarten"
                element={
                    <ProtectedRoute>
                        <KindergartenPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/first-grade"
                element={
                    <ProtectedRoute>
                        <FirstGradePage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/fifth-grade"
                element={
                    <ProtectedRoute>
                        <FifthGradePage />
                    </ProtectedRoute>
                }
            />
        </Routes>
    )
}
