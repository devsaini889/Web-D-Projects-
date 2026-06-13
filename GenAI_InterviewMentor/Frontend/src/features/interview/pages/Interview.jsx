import React, { useState, useEffect } from 'react'
import '../style/interview.scss'
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate, useParams, Link } from 'react-router'
import Navbar from '../components/Navbar.jsx'

const NAV_ITEMS = [
    { id: 'technical', label: 'Technical Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>) },
    { id: 'behavioral', label: 'Behavioral Prep', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>) },
    { id: 'roadmap', label: 'Study Roadmap', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>) },
]

// ── Sub-components ────────────────────────────────────────────────────────────
const QuestionCard = ({ item, index }) => {
    const [open, setOpen] = useState(false)
    const [copied, setCopied] = useState(false)

    const handleCopy = (e) => {
        e.stopPropagation()
        navigator.clipboard.writeText(item.answer)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className={`q-card ${open ? 'q-card--open' : ''}`}>
            <div className='q-card__header' onClick={() => setOpen(o => !o)}>
                <span className='q-card__index'>Q{index + 1}</span>
                <p className='q-card__question'>{item.question}</p>
                <div className='q-card__header-right'>
                    <button className={`copy-btn ${copied ? 'copy-btn--copied' : ''}`} onClick={handleCopy} title="Copy Model Answer">
                        {copied ? (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                                <span>Copied</span>
                            </>
                        ) : (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                                <span>Copy</span>
                            </>
                        )}
                    </button>
                    <span className={`q-card__chevron ${open ? 'q-card__chevron--open' : ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9" /></svg>
                    </span>
                </div>
            </div>
            {open && (
                <div className='q-card__body'>
                    <div className='q-card__section q-card__section--intention'>
                        <div className="section-label-row">
                            <span className='q-card__tag q-card__tag--intention'>Recruiter's Intention</span>
                            <span className="lightbulb-icon">💡 What they are really asking</span>
                        </div>
                        <p>{item.intention}</p>
                    </div>
                    <div className='q-card__section q-card__section--answer'>
                        <span className='q-card__tag q-card__tag--answer'>Suggested Model Response</span>
                        <p className="model-answer-text">{item.answer}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

const RoadMapDay = ({ day, dayIndex, completedTasks, toggleTask }) => (
    <div className='roadmap-day'>
        <div className='roadmap-day__header'>
            <span className='roadmap-day__badge'>Day {day.day}</span>
            <h3 className='roadmap-day__focus'>{day.focus}</h3>
        </div>
        <ul className='roadmap-day__tasks'>
            {day.tasks.map((task, taskIndex) => {
                const isCompleted = !!completedTasks[`${dayIndex}-${taskIndex}`]
                return (
                    <li key={taskIndex} className={isCompleted ? 'task--completed' : ''} onClick={() => toggleTask(dayIndex, taskIndex)}>
                        <div className={`task-checkbox ${isCompleted ? 'task-checkbox--checked' : ''}`}>
                            {isCompleted && <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>}
                        </div>
                        <span className="task-text">{task}</span>
                    </li>
                )
            })}
        </ul>
    </div>
)

// ── Main Component ────────────────────────────────────────────────────────────
const Interview = () => {
    const [activeNav, setActiveNav] = useState('technical')
    const { report, getReportById, loading, getResumePdf } = useInterview()
    const { interviewId } = useParams()
    const navigate = useNavigate()

    // Interactive Checklist local storage mapping
    const [completedTasks, setCompletedTasks] = useState({})

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
            try {
                const saved = localStorage.getItem(`completed-tasks-${interviewId}`)
                if (saved) {
                    setCompletedTasks(JSON.parse(saved))
                }
            } catch (e) {
                console.error(e)
            }
        }
    }, [interviewId])

    const toggleTask = (dayIndex, taskIndex) => {
        const key = `${dayIndex}-${taskIndex}`
        const updated = { ...completedTasks, [key]: !completedTasks[key] }
        setCompletedTasks(updated)
        try {
            localStorage.setItem(`completed-tasks-${interviewId}`, JSON.stringify(updated))
        } catch (e) {
            console.error(e)
        }
    }

    if (loading || !report) {
        return (
            <main className='loading-screen'>
                <div className="loader-glow">
                    <div className="loader-ring"></div>
                </div>
                <h1>Loading Your Preparation Plan...</h1>
                <p>Retrieving alignment analysis, interview templates, and daily roadmap details.</p>
            </main>
        )
    }

    const scoreColor =
        report.matchScore >= 80 ? 'score--high' :
            report.matchScore >= 60 ? 'score--mid' : 'score--low'

    return (
        <div className='interview-page-container'>
            <Navbar />

            <div className='interview-page'>
                {/* Dashboard Back Nav & Title Bar */}
                <div className="workspace-header">
                    <button onClick={() => navigate('/')} className="back-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                        <span>Dashboard</span>
                    </button>
                    <div className="workspace-title-wrapper">
                        <h1>{report.title || 'Target Position Kit'}</h1>
                        <span className="workspace-subtitle">AI-generated Interview Study Plan</span>
                    </div>
                </div>

                <div className='interview-layout'>
                    {/* ── Left Sidebar Nav ── */}
                    <aside className='interview-nav'>
                        <div className="nav-content">
                            <p className='interview-nav__label'>Workspace Sections</p>
                            <div className="nav-items-list">
                                {NAV_ITEMS.map(item => (
                                    <button
                                        key={item.id}
                                        className={`interview-nav__item ${activeNav === item.id ? 'interview-nav__item--active' : ''}`}
                                        onClick={() => setActiveNav(item.id)}
                                    >
                                        <span className='interview-nav__icon'>{item.icon}</span>
                                        <span className='item-label'>{item.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                        
                        <div className="nav-footer">
                            <button
                                onClick={() => { getResumePdf(interviewId) }}
                                className='download-resume-btn'
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                                <span>Get Tailored Resume</span>
                            </button>
                        </div>
                    </aside>

                    <div className='interview-divider' />

                    {/* ── Center Content Workspace ── */}
                    <main className='interview-content'>
                        {activeNav === 'technical' && (
                            <section>
                                <div className='content-header'>
                                    <h2>Technical Questions &amp; Coding Practice</h2>
                                    <span className='content-header__count'>{report.technicalQuestions.length} Questions</span>
                                </div>
                                <div className='q-list'>
                                    {report.technicalQuestions.map((q, i) => (
                                        <QuestionCard key={i} item={q} index={i} />
                                    ))}
                                </div>
                            </section>
                        )}

                        {activeNav === 'behavioral' && (
                            <section>
                                <div className='content-header'>
                                    <h2>Behavioral &amp; Situational Questions</h2>
                                    <span className='content-header__count'>{report.behavioralQuestions.length} Questions</span>
                                </div>
                                <div className='q-list'>
                                    {report.behavioralQuestions.map((q, i) => (
                                        <QuestionCard key={i} item={q} index={i} />
                                    ))}
                                </div>
                            </section>
                        )}

                        {activeNav === 'roadmap' && (
                            <section>
                                <div className='content-header'>
                                    <h2>Study Road Map Timeline</h2>
                                    <span className='content-header__count'>{report.preparationPlan.length} Days</span>
                                </div>
                                <div className="roadmap-tip-box">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                    <span>Interactive checklist: Click on items to mark them as completed as you study!</span>
                                </div>
                                <div className='roadmap-list'>
                                    {report.preparationPlan.map((day, i) => (
                                        <RoadMapDay 
                                            key={day._id || i} 
                                            day={day} 
                                            dayIndex={i}
                                            completedTasks={completedTasks}
                                            toggleTask={toggleTask}
                                        />
                                    ))}
                                </div>
                            </section>
                        )}
                    </main>

                    <div className='interview-divider' />

                    {/* ── Right Stats Sidebar ── */}
                    <aside className='interview-sidebar'>
                        {/* Match Score Radial arc */}
                        <div className='match-score-widget'>
                            <p className='widget-label'>Match Score Alignment</p>
                            <div className="score-display-wrapper">
                                <div className={`match-score__ring ${scoreColor}`}>
                                    <span className='match-score__value'>{report.matchScore}</span>
                                    <span className='match-score__pct'>%</span>
                                </div>
                            </div>
                            <p className={`match-score__sub ${scoreColor}-text`}>
                                {report.matchScore >= 80 ? 'Excellent Match' : report.matchScore >= 60 ? 'Moderate Fit' : 'Skill Gaps Found'}
                            </p>
                        </div>

                        <div className='sidebar-divider' />

                        {/* Skill Gaps Breakdown */}
                        <div className='skill-gaps-widget'>
                            <p className='widget-label'>Identified Gaps</p>
                            <div className='skill-gaps__list'>
                                {report.skillGaps && report.skillGaps.length > 0 ? (
                                    report.skillGaps.map((gap, i) => (
                                        <div key={i} className={`skill-gap-item skill-gap-item--${gap.severity}`}>
                                            <span className="dot"></span>
                                            <span className="skill-name">{gap.skill}</span>
                                            <span className="severity-badge">{gap.severity}</span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="no-gaps-text">No significant gaps detected between your profile and this role!</p>
                                )}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    )
}

export default Interview