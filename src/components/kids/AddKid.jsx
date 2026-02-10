import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addKid } from '../../store/kidSlice'
import '../../styles/Login.css'

export default function AddKid() {
    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [grade, setGrade] = useState('')
    const [childLoginId, setChildLoginId] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { loading, error } = useSelector((state) => state.kids)

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Simple validation
        if (!name.trim()) {
            alert("Child's name is required.")
            return
        }

        if (age && isNaN(age)) {
            alert('Age must be a number.')
            return
        }

        if (!childLoginId.trim()) {
            alert("Child's login ID is required.")
            return
        }

        const result = await dispatch(
            addKid({
                name: name.trim(),
                age: age ? Number(age) : null,
                grade: grade || null,
                childLoginId: childLoginId.trim(),
                password: childLoginId.trim(),
            }),
        )

        if (addKid.fulfilled.match(result)) {
            navigate('/dashboard')
        }
    }

    return (
        <div className="login-page">
            <div className="login-box">
                <h2>Add Your Child</h2>
                <p>Let’s set up a learning profile</p>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Child Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoFocus
                    />

                    <input
                        type="number"
                        placeholder="Age (optional)"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Grade (optional)"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Child Login ID"
                        value={childLoginId}
                        onChange={(e) => setChildLoginId(e.target.value)}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Adding...' : 'Add Child'}
                    </button>

                    {error && <pre className="error">{error}</pre>}
                </form>
            </div>
        </div>
    )
}
