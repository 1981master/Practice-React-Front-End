import { useState } from 'react'
import '../style.css'

export default function App() {
    const [sidebarOpen, setSidebarOpen] = useState(true)

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen)
    }

    return (
        <div className="page">
            {/* NAVBAR */}
            <nav className="navbar">
                <div className="nav-left">
                    <button
                        className="hamburger-btn"
                        onClick={toggleSidebar}
                    >
                        ☰
                    </button>
                    <div className="logo">Kids Fun Learning</div>
                </div>

                <ul className="nav-links">
                    <li className="active">Home</li>
                    <li>Test</li>
                    <li>About</li>
                </ul>

                <div className="nav-actions">
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="Search..."
                        />
                    </div>
                </div>
            </nav>

            {/* SIDEBAR */}
            <aside className={`sidebar ${sidebarOpen ? 'open' : 'collapsed'}`}>
                <ul className="sidebar-links">
                    <li className="active">Dashboard</li>
                    <li>Analytics</li>
                    <li>Settings</li>
                </ul>
            </aside>

            {/* MAIN CONTENT */}
            <main
                className={`content ${sidebarOpen ? 'with-sidebar' : 'full'}`}
            >
                <h1>Welcome to Kids Fun Learning</h1>
                <p>
                    This is your main content area. Resize the window to see the
                    responsive behavior.
                </p>
                <p>
                    When the sidebar is visible, this content shifts right. When
                    hidden, it takes full width.
                </p>
            </main>
        </div>
    )
}
