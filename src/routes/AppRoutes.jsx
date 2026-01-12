import { Route, Routes } from 'react-router-dom'
import About from '../pages/About'
import Analytics from '../pages/Analytics'
import Home from '../pages/Home'
import Settings from '../pages/Settings'
import Test from '../pages/Test'

export default function AppRoutes() {
    return (
        <Routes>
            <Route
                path="/"
                element={<Home />}
            />
            <Route
                path="/test"
                element={<Test />}
            />
            <Route
                path="/about"
                element={<About />}
            />
            <Route
                path="/analytics"
                element={<Analytics />}
            />
            <Route
                path="/settings"
                element={<Settings />}
            />
        </Routes>
    )
}
