import { useEffect } from 'react'
import '../styles/FunModal.css'

export default function FunModal({ isOpen, onClose, title, children }) {
    // Close modal on ESC key
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape') onClose()
        }
        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [onClose])

    if (!isOpen) return null

    return (
        <div
            className="modal-overlay"
            onClick={onClose}
        >
            <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
            >
                <button
                    className="close-btn"
                    onClick={onClose}
                >
                    ✖
                </button>
                {title && <h2 className="modal-title">{title}</h2>}
                <div className="modal-body">{children}</div>
            </div>
        </div>
    )
}
