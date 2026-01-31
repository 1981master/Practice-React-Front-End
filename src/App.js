import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import './styles/PracticeArea.css'
import './styles/style.css'

export default function App() {
    const [sidebarOpen, setSidebarOpen] = useState(true)

    const linkClass = ({ isActive }) =>
        isActive ? 'nav-link active' : 'nav-link'

    return (
        <div className="page">
            {/* NAVBAR */}
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
                            to="/"
                            end
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

            {/* BODY */}
            <div
                className={`body-wrapper ${
                    sidebarOpen ? 'sidebar-open' : 'sidebar-collapsed'
                }`}
            >
                <aside className="sidebar">
                    <ul className="sidebar-links">
                        <li>
                            <NavLink
                                to="/"
                                end
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
                </aside>

                <main className="content">
                    <AppRoutes />
                </main>
            </div>
        </div>
    )
}
