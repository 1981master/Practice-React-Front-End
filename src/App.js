import { useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend' // Import the HTML5Backend
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import './styles/PracticeArea.css'
import './styles/style.css'

export default function App() {
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const location = useLocation()
    const navigate = useNavigate()
    const isLoginPage =
        location.pathname === '/' || location.pathname === '/signup'

    const linkClass = ({ isActive }) =>
        isActive ? 'nav-link active' : 'nav-link'

    const handleSignOut = () => {
        // Clear auth info (token/user)
        localStorage.removeItem('token')
        localStorage.removeItem('user')

        // Navigate to login page and replace history
        navigate('/', { replace: true })
    }

    if (isLoginPage) {
        return <AppRoutes /> // Login/signup full screen
    }

    return (
        <div className="page">
            <nav className="navbar">
                <div className="nav-left">
                    <button
                        className="hamburger-btn"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        ☰
                    </button>
                    <div className="logo">Kids Fun Learning</div>
                </div>
                <ul className="nav-links">
                    <li>
                        <NavLink
                            to="/dashboard"
                            className={linkClass}
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/test"
                            className={linkClass}
                        >
                            Test
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/about"
                            className={linkClass}
                        >
                            About
                        </NavLink>
                    </li>
                </ul>
            </nav>

            <div
                className={`body-wrapper ${
                    sidebarOpen ? 'sidebar-open' : 'sidebar-collapsed'
                }`}
            >
                <aside className="sidebar">
                    <ul className="sidebar-links">
                        <li>
                            <NavLink
                                to="/dashboard"
                                className={linkClass}
                            >
                                Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/kindergarten"
                                className={linkClass}
                            >
                                Kindergarten
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/first-grade"
                                className={linkClass}
                            >
                                First Grade
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/fifth-grade"
                                className={linkClass}
                            >
                                Fifth Grade
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/analytics"
                                className={linkClass}
                            >
                                Analytics
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/settings"
                                className={linkClass}
                            >
                                Settings
                            </NavLink>
                        </li>
                    </ul>

                    {/* Sign Out button */}
                    <div>
                        <button
                            onClick={handleSignOut}
                            className="nav-link"
                        >
                            Sign Out
                        </button>
                    </div>
                </aside>

                <main className="content">
                    {/* Wrap your app routes with DndProvider */}
                    <DndProvider backend={HTML5Backend}>
                        <AppRoutes />
                    </DndProvider>
                </main>
            </div>
        </div>
    )
}
