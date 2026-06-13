import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'

const Register = () => {
    const navigate = useNavigate()
    const { loading, handleRegister } = useAuth()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        if (!username || !email || !password) {
            setError("Please fill in all fields")
            return
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters long")
            return
        }
        const success = await handleRegister({ username, email, password })
        if (success) {
            navigate("/")
        } else {
            setError("Registration failed. Email might already be in use.")
        }
    }

    return (
        <main className="auth-page">
            <div className="auth-container">
                {/* Left Side: Form */}
                <div className="auth-form-side">
                    <div className="auth-header-mobile">
                        <div className="logo">
                            <svg className="logo-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10H12V2z"/><path d="M12 2a10 10 0 0 1 10 10h-10V2z"/><path d="M12 12L2.5 12"/><path d="M12 12l9.5 0"/><path d="M12 12v9.5"/><path d="M12 2v10"/></svg>
                            <span className="logo-text">Prep<span>AI</span></span>
                        </div>
                    </div>

                    <div className="form-card">
                        <div className="form-header">
                            <h2>Get Started</h2>
                            <p>Create your account and start generating custom prep plans</p>
                        </div>

                        {error && (
                            <div className="error-banner">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                                <span>{error}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="input-group">
                                <label htmlFor="username">Username</label>
                                <div className="input-wrapper">
                                    <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                    <input
                                        value={username}
                                        onChange={(e) => { setUsername(e.target.value) }}
                                        type="text" 
                                        id="username" 
                                        name='username' 
                                        placeholder='Enter your username' 
                                        required 
                                    />
                                </div>
                            </div>

                            <div className="input-group">
                                <label htmlFor="email">Email Address</label>
                                <div className="input-wrapper">
                                    <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                                    <input
                                        value={email}
                                        onChange={(e) => { setEmail(e.target.value) }}
                                        type="email" 
                                        id="email" 
                                        name='email' 
                                        placeholder='name@example.com' 
                                        required 
                                    />
                                </div>
                            </div>
                            
                            <div className="input-group">
                                <label htmlFor="password">Password</label>
                                <div className="input-wrapper">
                                    <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                                    <input
                                        value={password}
                                        onChange={(e) => { setPassword(e.target.value) }}
                                        type="password" 
                                        id="password" 
                                        name='password' 
                                        placeholder='Min 6 characters' 
                                        required 
                                    />
                                </div>
                            </div>

                            <button className='auth-btn' disabled={loading}>
                                {loading ? (
                                    <span className="btn-spinner"></span>
                                ) : (
                                    <>
                                        Register Now
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                                    </>
                                )}
                            </button>
                        </form>

                        <p className="auth-footer">
                            Already have an account? <Link to={"/login"}>Sign In</Link>
                        </p>
                    </div>
                </div>

                {/* Right Side: Features/Branding (Desktop Only) */}
                <div className="auth-branding-side">
                    <div className="branding-overlay"></div>
                    <div className="branding-content">
                        <div className="logo">
                            <svg className="logo-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10H12V2z"/><path d="M12 2a10 10 0 0 1 10 10h-10V2z"/><path d="M12 12L2.5 12"/><path d="M12 12l9.5 0"/><path d="M12 12v9.5"/><path d="M12 2v10"/></svg>
                            <span className="logo-text">Prep<span>AI</span></span>
                        </div>
                        <div className="branding-hero">
                            <h3>Accelerate Your Career Transition</h3>
                            <p>Generate role-specific interview preparation kits in seconds using Gemini advanced neural reasoning.</p>
                        </div>
                        <div className="feature-list">
                            <div className="feature-item">
                                <span className="feat-icon">⚡</span>
                                <div className="feat-text">
                                    <h4>Instant Report Generation</h4>
                                    <p>Get a comprehensive preparation kit mapped directly to your target role.</p>
                                </div>
                            </div>
                            <div className="feature-item">
                                <span className="feat-icon">🎯</span>
                                <div className="feat-text">
                                    <h4>Resume Score Alignment</h4>
                                    <p>Discover how closely your profile matches the job requirements with custom scoring.</p>
                                </div>
                            </div>
                            <div className="feature-item">
                                <span className="feat-icon">🛡️</span>
                                <div className="feat-text">
                                    <h4>Recruiter Intention Analysis</h4>
                                    <p>Understand the exact reason and expectations behind technical & behavioral questions.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Register