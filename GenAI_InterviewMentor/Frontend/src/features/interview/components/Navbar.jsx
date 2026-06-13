import React from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../../auth/hooks/useAuth'

const Navbar = () => {
    const { user, handleLogout } = useAuth()
    const navigate = useNavigate()

    const onLogout = async () => {
        const success = await handleLogout()
        if (success) {
            navigate('/login')
        }
    }

    return (
        <nav className="global-navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <svg className="logo-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10H12V2z"/><path d="M12 2a10 10 0 0 1 10 10h-10V2z"/><path d="M12 12L2.5 12"/><path d="M12 12l9.5 0"/><path d="M12 12v9.5"/><path d="M12 2v10"/></svg>
                    <span className="logo-text">Prep<span>AI</span></span>
                </Link>

                <div className="navbar-menu">
                    {user && (
                        <div className="user-profile">
                            <div className="user-avatar">
                                {user.username ? user.username.charAt(0).toUpperCase() : 'U'}
                            </div>
                            <span className="user-name">{user.username || user.email}</span>
                        </div>
                    )}

                    <button onClick={onLogout} className="logout-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                        <span>Sign Out</span>
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
