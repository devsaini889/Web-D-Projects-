import React, { useState, useRef } from 'react'
import "../style/home.scss"
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate } from 'react-router'
import Navbar from '../components/Navbar.jsx'

const Home = () => {
    const { loading, generateReport, reports } = useInterview()
    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const [selectedFile, setSelectedFile] = useState(null)
    const [dragActive, setDragActive] = useState(false)
    const resumeInputRef = useRef()
    const navigate = useNavigate()

    const handleGenerateReport = async () => {
        const resumeFile = selectedFile
        if (!jobDescription.trim()) {
            alert("Please provide the target job description.")
            return
        }
        if (!resumeFile && !selfDescription.trim()) {
            alert("Please upload your resume or write a self-description to allow personalization.")
            return
        }

        const data = await generateReport({ jobDescription, selfDescription, resumeFile })
        if (data && data._id) {
            navigate(`/interview/${data._id}`)
        } else {
            alert("Failed to generate report. Please try again.")
        }
    }

    // Drag-and-drop handlers
    const handleDrag = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }

    const handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0]
            if (file.type === "application/pdf" || file.name.endsWith(".pdf") || file.name.endsWith(".docx")) {
                setSelectedFile(file)
            } else {
                alert("Please upload a PDF or DOCX file.")
            }
        }
    }

    const clearFile = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setSelectedFile(null)
        if (resumeInputRef.current) {
            resumeInputRef.current.value = ""
        }
    }

    if (loading) {
        return (
            <main className='loading-screen'>
                <div className="loader-glow">
                    <div className="loader-ring"></div>
                </div>
                <h1>Assembling Your Interview Prep Kit...</h1>
                <p>Our AI model is matching your profile with the target role, extracting core competencies, and building strategic questions with roadmap tasks. This will take about 30 seconds.</p>
            </main>
        )
    }

    return (
        <div className='home-page-container'>
            <Navbar />

            <div className='home-page'>
                {/* Hero Header */}
                <header className='page-header'>
                    <h1>Forge Your Winning <span className='highlight'>Interview Strategy</span></h1>
                    <p>Provide a job description along with your profile. Our AI will dissect the requirements and generate custom prep tools tailored specifically for you.</p>
                </header>

                {/* Main Card Grid */}
                <div className='interview-card'>
                    <div className='interview-card__body'>

                        {/* Left Panel: Target Job Description */}
                        <div className='panel panel--left'>
                            <div className='panel__header'>
                                <span className='panel__icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                                </span>
                                <h2>Target Job Description</h2>
                                <span className='badge badge--required'>Required</span>
                            </div>
                            
                            <textarea
                                value={jobDescription}
                                onChange={(e) => { setJobDescription(e.target.value) }}
                                className='panel__textarea'
                                placeholder={`Paste the full job details here...\ne.g., 'Senior Frontend Engineer at Stripe: Experience with React, TypeScript, large scale architecture, state management...'`}
                                maxLength={5000}
                            />
                            <div className='char-counter'>{jobDescription.length} / 5000 characters</div>
                        </div>

                        {/* Middle divider */}
                        <div className='panel-divider' />

                        {/* Right Panel: Your Profile */}
                        <div className='panel panel--right'>
                            <div className='panel__header'>
                                <span className='panel__icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                </span>
                                <h2>Your Profile Details</h2>
                            </div>

                            {/* Resume Upload Box */}
                            <div className='upload-section'>
                                <label className='section-label'>
                                    Upload Resume
                                    <span className='badge badge--best'>Best Results</span>
                                </label>

                                <div 
                                    className={`dropzone ${dragActive ? 'dropzone--active' : ''} ${selectedFile ? 'dropzone--filled' : ''}`}
                                    onDragEnter={handleDrag}
                                    onDragOver={handleDrag}
                                    onDragLeave={handleDrag}
                                    onDrop={handleDrop}
                                    onClick={() => resumeInputRef.current.click()}
                                >
                                    <span className='dropzone__icon'>
                                        {selectedFile ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" /></svg>
                                        )}
                                    </span>
                                    
                                    <div className='dropzone-info-container'>
                                        <p className='dropzone__title'>
                                            {selectedFile ? selectedFile.name : "Click to upload or drag & drop"}
                                        </p>
                                        <p className='dropzone__subtitle'>
                                            {selectedFile ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB` : "PDF or DOCX (Max 5MB)"}
                                        </p>
                                    </div>

                                    {selectedFile && (
                                        <button className="clear-file-btn" onClick={clearFile} title="Remove File">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                        </button>
                                    )}

                                    <input 
                                        ref={resumeInputRef} 
                                        hidden 
                                        type='file' 
                                        id='resume' 
                                        name='resume' 
                                        accept='.pdf,.docx' 
                                        onChange={(e) => {
                                            if (e.target.files && e.target.files[0]) {
                                                setSelectedFile(e.target.files[0])
                                            }
                                        }}
                                    />
                                </div>
                            </div>

                            {/* OR Divider */}
                            <div className='or-divider'>
                                <span>OR</span>
                            </div>

                            {/* Self Description Section */}
                            <div className='self-description'>
                                <label className='section-label' htmlFor='selfDescription'>Quick Bio / Experience Summary</label>
                                <textarea
                                    value={selfDescription}
                                    onChange={(e) => { setSelfDescription(e.target.value) }}
                                    id='selfDescription'
                                    name='selfDescription'
                                    className='panel__textarea panel__textarea--short'
                                    placeholder="e.g., 'React developer with 3 years of experience in state management, Redux, and modern styling architectures. Deeply familiar with REST APIs...'"
                                />
                            </div>

                            {/* Help Banner */}
                            <div className='info-box'>
                                <span className='info-box__icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                                </span>
                                <p>Provide either your <strong>Resume</strong> or <strong>Experience Summary</strong> to contextually align generated materials.</p>
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className='interview-card__footer'>
                        <span className='footer-info'>
                            <span className="pulse-dot"></span>
                            Neural processing takes about 30 seconds
                        </span>
                        <button
                            onClick={handleGenerateReport}
                            className='generate-btn'
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                            Generate Prep Kit
                        </button>
                    </div>
                </div>

                {/* History Section */}
                {reports.length > 0 && (
                    <section className='recent-reports'>
                        <div className="section-title-wrapper">
                            <h2>Your Preparation History</h2>
                            <span className="history-count">{reports.length} Kits</span>
                        </div>
                        
                        <div className='reports-grid'>
                            {reports.map(report => {
                                const scoreColorClass = 
                                    report.matchScore >= 80 ? 'score--high' : 
                                    report.matchScore >= 60 ? 'score--mid' : 'score--low';
                                return (
                                    <div key={report._id} className='report-card' onClick={() => navigate(`/interview/${report._id}`)}>
                                        <div className="card-top">
                                            <div className="card-logo-placeholder">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                                            </div>
                                            <div className={`score-badge ${scoreColorClass}`}>
                                                {report.matchScore}% Match
                                            </div>
                                        </div>
                                        
                                        <div className="card-middle">
                                            <h3>{report.title || 'Untitled Position'}</h3>
                                            <p className="card-desc">
                                                {report.jobDescription ? report.jobDescription.substring(0, 100) + '...' : 'No description provided.'}
                                            </p>
                                        </div>

                                        <div className="card-bottom">
                                            <span className='report-meta'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                                {new Date(report.createdAt).toLocaleDateString(undefined, {month: 'short', day: 'numeric', year: 'numeric'})}
                                            </span>
                                            <span className="arrow-link">
                                                Prepare
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                                            </span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </section>
                )}

                {/* Footer Section */}
                <footer className='page-footer'>
                    <a href='#'>Support Center</a>
                    <span>•</span>
                    <a href='#'>Security &amp; Privacy</a>
                    <span>•</span>
                    <a href='#'>Terms of Service</a>
                </footer>
            </div>
        </div>
    )
}

export default Home