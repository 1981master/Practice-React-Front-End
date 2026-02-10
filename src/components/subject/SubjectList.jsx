import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    fetchSubjects,
    selectSubjectsError,
    selectSubjectsItems,
    selectSubjectsLoading,
} from '../../store/subjectSlice'
import '../../styles/dashboard.css'

const SubjectList = () => {
    const dispatch = useDispatch()

    const subjects = useSelector(selectSubjectsItems)
    const loading = useSelector(selectSubjectsLoading)
    const error = useSelector(selectSubjectsError)

    useEffect(() => {
        dispatch(fetchSubjects())
    }, [dispatch])

    if (loading) return <p>Loading subjects...</p>
    if (error) return <p className="error">{error}</p>

    return (
        <div className="dashboard-page">
            <div className="dashboard-box">
                <div className="logo">📘</div>
                <h2>Subjects</h2>

                {subjects.map((subj) => (
                    <div
                        key={subj.id}
                        className="subject-card"
                    >
                        <h3 className="subject-title">{subj.name}</h3>

                        <div className="topic-list">
                            {subj.topics?.map((topic) => (
                                <span
                                    key={topic.id}
                                    className="topic-pill"
                                >
                                    {topic.name}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SubjectList
