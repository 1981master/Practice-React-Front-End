import { useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'

import './styles/dashboard.css'
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
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/', { replace: true })
    }

    if (isLoginPage) {
        return <AppRoutes /> // Login/signup full screen
    }

    // Sticky note colors
    const colors = [
        'sticky-yellow',
        'sticky-pink',
        'sticky-green',
        'sticky-blue',
        'sticky-orange',
        'sticky-purple',
    ]

    // Sidebar items
    const sidebarItems = [
        { to: '/dashboard', label: 'Dashboard' },
        { to: '/kindergarten', label: 'Kindergarten' },
        { to: '/first-grade', label: 'First Grade' },
        { to: '/fifth-grade', label: 'Fifth Grade' },
        { to: '/analytics', label: 'Analytics' },
        { to: '/settings', label: 'Settings' },
    ]

    return (
        <div className="page">
            {/* Navbar */}
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

            {/* Sidebar + Main content */}
            <div
                className={`body-wrapper ${
                    sidebarOpen ? 'sidebar-open' : 'sidebar-collapsed'
                }`}
            >
                {/* Sidebar */}
                <aside className="sidebar">
                    <ul className="sidebar-links">
                        {sidebarItems.map((item, i) => (
                            <li
                                key={item.to}
                                className={`sidebar-item ${colors[i % colors.length]}`}
                            >
                                <NavLink
                                    to={item.to}
                                    className={linkClass}
                                >
                                    {item.label}
                                </NavLink>
                            </li>
                        ))}

                        {/* Sign Out as a sticky note at the end */}
                        <li
                            className="sidebar-item sticky-red"
                            onClick={handleSignOut} // whole note is clickable
                            style={{ marginTop: 'auto' }} // pushes it to bottom
                        >
                            Sign Out
                        </li>
                    </ul>
                </aside>

                {/* Main Content */}
                <main className="content">
                    <DndProvider backend={HTML5Backend}>
                        <AppRoutes />
                    </DndProvider>
                </main>
            </div>
        </div>
    )
}
