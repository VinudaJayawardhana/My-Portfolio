import React, { useState, useEffect } from 'react'
import { db } from '../firebase' 
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc 
} from 'firebase/firestore' 
import { 
  Folder, Briefcase, Cpu, Plus, Pencil, Trash2, Save, X, Database,
  CheckCircle, Lock, User, LogOut, Layers, Activity, Sparkles, Sun, Moon, Terminal, ShieldAlert, Home
} from 'lucide-react'

const AdminPanel = () => {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginForm, setLoginForm] = useState({ username: '', password: '' })
  const [authError, setAuthError] = useState('')
  const [activeTab, setActiveTab] = useState('projects')
  const [notification, setNotification] = useState(null)

  // Live state hooks for backend items
  const [projects, setProjects] = useState([])
  const [experiences, setExperiences] = useState([])
  const [skills, setSkills] = useState([])

  // Form Mutation Buffers
  const [isEditing, setIsEditing] = useState(false)
  const [currentId, setCurrentId] = useState(null)
  const [projectForm, setProjectForm] = useState({ title: '', category: 'web', shortDesc: '' })
  const [expForm, setExpForm] = useState({ role: '', company: '', period: '' })
  const [skillForm, setSkillForm] = useState({ name: '', level: 50, category: 'languages' })

  // References to your Firestore Collections
  const projectsCollectionRef = collection(db, "projects")
  const experienceCollectionRef = collection(db, "experience")
  const skillsCollectionRef = collection(db, "skills")

  // --- FETCH DATA FROM FIREBASE ON LOAD ---
  useEffect(() => {
    if (isAuthenticated) {
      fetchProjects()
      fetchExperiences()
      fetchSkills()
    }
  }, [isAuthenticated])

  const fetchProjects = async () => {
    try {
      const data = await getDocs(projectsCollectionRef)
      setProjects(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    } catch (error) {
      console.error("Error fetching projects: ", error)
    }
  }

  const fetchExperiences = async () => {
    try {
      const data = await getDocs(experienceCollectionRef)
      setExperiences(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    } catch (error) {
      console.error("Error fetching experiences: ", error)
    }
  }

  const fetchSkills = async () => {
    try {
      const data = await getDocs(skillsCollectionRef)
      setSkills(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    } catch (error) {
      console.error("Error fetching skills: ", error)
    }
  }

  const triggerNotification = (message) => {
    setNotification(message)
    setTimeout(() => setNotification(null), 4000)
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    if (loginForm.username === 'admin' && loginForm.password === 'iconx2026') {
      setIsAuthenticated(true)
      setAuthError('')
      triggerNotification('Administrative runtime session established.')
    } else {
      setAuthError('Invalid hardware access credentials key sequence.')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setLoginForm({ username: '', password: '' })
    triggerNotification('Session destroyed securely. Redirected to terminal lockscreen.')
  }

  const handleGoHome = () => {
    // If you are using standard window href navigation:
    window.location.href = '/'
    
    // NOTE: If you are using react-router-dom, change this method to standard navigation hooks:
    // navigate('/')
  }

  // --- FIREBASE CRUD ACTIONS ---
  const handleProjectSubmit = async (e) => {
    e.preventDefault()
    try {
      if (isEditing) {
        const projectDoc = doc(db, "projects", currentId)
        await updateDoc(projectDoc, projectForm)
        triggerNotification('Matrix segment hot-swapped in Cloud.')
      } else {
        await addDoc(projectsCollectionRef, projectForm)
        triggerNotification('Project node deployed to Firestore.')
      }
      fetchProjects()
      resetForms()
    } catch (error) {
      console.error("Error updating project tree: ", error)
    }
  }

  const deleteProject = async (id, title) => {
    if (window.confirm(`Purge project sequence "${title}" from Firebase?`)) {
      try {
        const projectDoc = doc(db, "projects", id)
        await deleteDoc(projectDoc)
        fetchProjects()
        triggerNotification('Project cluster discarded.')
      } catch (error) {
        console.error("Error purging cloud project: ", error)
      }
    }
  }

  const handleExpSubmit = async (e) => {
    e.preventDefault()
    try {
      if (isEditing) {
        const expDoc = doc(db, "experience", currentId)
        await updateDoc(expDoc, expForm)
      } else {
        await addDoc(experienceCollectionRef, expForm)
      }
      triggerNotification('Milestone cluster state updated.')
      fetchExperiences()
      resetForms()
    } catch (error) {
      console.error("Error syncing milestone log: ", error)
    }
  }

  const deleteExperience = async (id, role) => {
    if (window.confirm('Delete this entry from Cloud?')) {
      try {
        const expDoc = doc(db, "experience", id)
        await deleteDoc(expDoc)
        fetchExperiences()
        triggerNotification('Experience log slice removed.')
      } catch (error) {
        console.error("Error purging milestone entry: ", error)
      }
    }
  }

  const handleSkillSubmit = async (e) => {
    e.preventDefault()
    try {
      if (isEditing) {
        const skillDoc = doc(db, "skills", currentId)
        await updateDoc(skillDoc, skillForm)
      } else {
        await addDoc(skillsCollectionRef, skillForm)
      }
      triggerNotification('Global proficiency matrix mapped.')
      fetchSkills()
      resetForms()
    } catch (error) {
      console.error("Error updating capability matrix: ", error)
    }
  }

  const deleteSkill = async (id, name) => {
    if (window.confirm('Delete this skill from cloud matrix?')) {
      try {
        const skillDoc = doc(db, "skills", id)
        await deleteDoc(skillDoc)
        fetchSkills()
        triggerNotification('Skill target erased.')
      } catch (error) {
        console.error("Error erasing capability target: ", error)
      }
    }
  }

  const startEdit = (type, item) => {
    setIsEditing(true)
    setCurrentId(item.id)
    if (type === 'project') setProjectForm({ title: item.title, category: item.category, shortDesc: item.shortDesc })
    if (type === 'experience') setExpForm({ role: item.role, company: item.company, period: item.period })
    if (type === 'skill') setSkillForm({ name: item.name, level: item.level, category: item.category })
  }

  const resetForms = () => {
    setIsEditing(false)
    setCurrentId(null)
    setProjectForm({ title: '', category: 'web', shortDesc: '' })
    setExpForm({ role: '', company: '', period: '' })
    setSkillForm({ name: '', level: 50, category: 'languages' })
  }

  // --- Dynamic Theme Variables ---
  const dynamicTheme = {
    backgroundBody: isDarkMode ? '#06060c' : '#f5f7fb',
    panelBg: isDarkMode ? 'rgba(15, 15, 30, 0.7)' : 'rgba(255, 255, 255, 0.75)',
    panelBorder: isDarkMode ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(0, 0, 0, 0.06)',
    heroBg: isDarkMode ? 'linear-gradient(135deg, #111126 0%, #090914 100%)' : 'linear-gradient(135deg, #ffffff 0%, #edf1f9 100%)',
    heroMesh: isDarkMode ? 'radial-gradient(at 0% 0%, rgba(90, 82, 230, 0.18) 0px, transparent 60%), radial-gradient(at 100% 100%, rgba(255, 107, 139, 0.12) 0px, transparent 60%)' : 'radial-gradient(at 0% 0%, rgba(90, 82, 230, 0.06) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(255, 107, 139, 0.06) 0px, transparent 50%)',
    heroBorder: isDarkMode ? '1px solid rgba(255, 255, 255, 0.07)' : '1px solid rgba(90, 82, 230, 0.1)',
    textColor: isDarkMode ? '#ffffff' : '#0f172a',
    subText: isDarkMode ? '#8292ab' : '#475569',
    tableThColor: isDarkMode ? '#64748b' : '#94a3b8',
    tableTdBg: isDarkMode ? 'rgba(255,255,255,0.01)' : 'rgba(255,255,255,0.6)',
    tableTrHover: isDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(90,82,230,0.02)',
    inputBg: isDarkMode ? 'rgba(5,5,10,0.5)' : '#ffffff',
    inputBorder: isDarkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(203,213,225,0.8)',
    sidebarBtnColor: isDarkMode ? '#94a3b8' : '#475569',
    sidebarBtnActiveBg: isDarkMode ? 'linear-gradient(135deg, rgba(90,82,230,0.15) 0%, rgba(255,107,139,0.05) 100%)' : 'linear-gradient(135deg, rgba(90,82,230,0.06) 0%, rgba(255,107,139,0.02) 100%)',
    sidebarBtnActiveBorder: isDarkMode ? 'rgba(255,107,139,0.2)' : 'rgba(90,82,230,0.12)'
  }

  return (
    <div className="admin-dashboard-layout" style={{ ...styles.adminContainer, background: dynamicTheme.backgroundBody, color: dynamicTheme.textColor }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap');
        body { background-color: ${dynamicTheme.backgroundBody}; font-family: 'Plus Jakarta Sans', sans-serif; transition: background-color 0.4s ease; margin: 0; }
        .glass-panel { background: ${dynamicTheme.panelBg}; backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: ${dynamicTheme.panelBorder}; transition: background 0.4s ease, border 0.4s ease; }
        .hero-canvas { background: ${dynamicTheme.heroBg}; background-image: ${dynamicTheme.heroMesh}; border: ${dynamicTheme.heroBorder}; position: relative; overflow: hidden; border-radius: 24px; padding: 40px; transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: ${isDarkMode ? '0 25px 60px rgba(0,0,0,0.4)' : '0 25px 50px rgba(165,175,200,0.12)'}; }
        .hero-theme-toggle { position: absolute; top: 24px; right: 24px; border: none; width: 44px; height: 44px; border-radius: 14px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.3s ease; background: ${isDarkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)'}; border: 1px solid ${isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}; color: ${dynamicTheme.textColor}; z-index: 10; }
        .hero-theme-toggle:hover { transform: scale(1.08) rotate(8deg); background: ${isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}; }
        .admin-sidebar-btn { display: flex; align-items: center; gap: 14px; width: 100%; padding: 14px 18px; background: transparent; border: 1px solid transparent; color: ${dynamicTheme.sidebarBtnColor}; text-align: left; cursor: pointer; border-radius: 14px; transition: all 0.3s ease; font-size: 0.92rem; font-weight: 500; }
        .admin-sidebar-btn:hover { color: ${isDarkMode ? '#fff' : '#0f172a'}; background: rgba(90,82,230,0.04); transform: translateX(4px); }
        .admin-sidebar-btn.active { color: ${isDarkMode ? '#fff' : '#4f46e5'}; background: ${dynamicTheme.sidebarBtnActiveBg}; border: 1px solid ${dynamicTheme.sidebarBtnActiveBorder}; font-weight: 600; }
        .crud-table { width: 100%; border-collapse: separate; border-spacing: 0 8px; margin-top: 10px; overflow-x: auto; display: block; }
        @media (min-width: 768px) { .crud-table { display: table; } }
        .crud-table th { padding: 16px; text-align: left; color: ${dynamicTheme.tableThColor}; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; }
        .crud-table td { padding: 16px; background: ${dynamicTheme.tableTdBg}; border-top: 1px solid rgba(0,0,0,0.01); border-bottom: 1px solid rgba(0,0,0,0.01); transition: all 0.25s ease; color: ${isDarkMode ? '#cbd5e1' : '#334155'}; }
        .crud-table tr td:first-child { border-top-left-radius: 14px; border-bottom-left-radius: 14px; }
        .crud-table tr td:last-child { border-top-right-radius: 14px; border-bottom-right-radius: 14px; }
        .crud-table tr:hover td { background: ${dynamicTheme.tableTrHover}; }
        .input-glow-field:focus { border-color: rgba(90,82,230,0.5) !important; box-shadow: 0 0 15px rgba(90,82,230,0.12); }
        .action-icon-btn { background: ${isDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'}; border: 1px solid ${isDarkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)'}; color: ${isDarkMode ? '#fff' : '#0f172a'}; cursor: pointer; padding: 8px; transition: all 0.2s ease; border-radius: 8px; display: inline-flex; align-items: center; justify-content: center; }
        .action-icon-btn:hover { transform: translateY(-2px); }
        .text-gradient { background: linear-gradient(135deg, #4f46e5 0%, #ff6b8b 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .progress-container { width: 100%; height: 6px; border-radius: 10px; overflow: hidden; position: relative; }
        .progress-bar-fill { height: 100%; background: linear-gradient(90deg, #4f46e5 0%, #ff6b8b 100%); border-radius: 10px; transition: width 0.5s ease; }
        .category-badge { font-size: 0.72rem; font-weight: 700; text-transform: uppercase; padding: 4px 10px; border-radius: 8px; background: rgba(90,82,230,0.1); color: #6366f1; letter-spacing: 0.04em; }
        
        /* Responsive Mobile Architecture */
        @media (max-width: 991px) {
          .admin-dashboard-layout { flex-direction: column !important; padding: 16px !important; gap: 16px !important; }
          .admin-sidebar-container { width: 100% !important; }
          .hero-canvas { padding: 24px !important; }
          .hero-title { font-size: 1.85rem !important; }
        }
      `}</style>

      {notification && (
        <div style={styles.notificationToast} className="glass-panel">
          <CheckCircle size={16} color="#2ed573" />
          <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>{notification}</span>
        </div>
      )}

      {!isAuthenticated ? (
        <div style={{ ...styles.loginOverlay, background: isDarkMode ? '#030307' : '#f0f4f8' }}>
          <div style={styles.loginCard} className="glass-panel">
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div style={styles.lockIconContainer}>
                <Terminal size={24} className="text-gradient" />
              </div>
              <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '1.75rem', fontWeight: 700, margin: '14px 0 6px 0', color: dynamicTheme.textColor }}>Initialize Terminal</h2>
              <p style={{ color: '#64748b', fontSize: '0.88rem' }}>Enter root keys to deploy live state engine</p>
            </div>
            <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={styles.fieldLabel}>Identity Operator Profile</label>
                <div style={styles.inputWrapper}>
                  <User size={16} style={styles.inputIcon} />
                  <input type="text" value={loginForm.username} onChange={(e) => setLoginForm({...loginForm, username: e.target.value})} className="input-glow-field" style={{ ...styles.loginInput, background: dynamicTheme.inputBg, border: dynamicTheme.inputBorder, color: dynamicTheme.textColor }} placeholder="Operator ID" required />
                </div>
              </div>
              <div>
                <label style={styles.fieldLabel}>Runtime Cryptographic Token Key</label>
                <div style={styles.inputWrapper}>
                  <Lock size={16} style={styles.inputIcon} />
                  <input type="password" value={loginForm.password} onChange={(e) => setLoginForm({...loginForm, password: e.target.value})} className="input-glow-field" style={{ ...styles.loginInput, background: dynamicTheme.inputBg, border: dynamicTheme.inputBorder, color: dynamicTheme.textColor }} placeholder="••••••••••••" required />
                </div>
              </div>
              {authError && <div style={styles.authErrorContainer}><ShieldAlert size={14} /><span>{authError}</span></div>}
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '6px' }}>
                <button type="submit" style={styles.loginBtn}>Decrypt & Launch Engine</button>
                <button type="button" onClick={handleGoHome} style={{ ...styles.homeBtn, border: dynamicTheme.inputBorder, color: dynamicTheme.textColor }}><Home size={15} /> Go to Portfolio Home</button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <>
          <aside style={styles.sidebar} className="glass-panel admin-sidebar-container">
            <div style={styles.sidebarHeader}>
              <Database size={22} className="text-gradient" />
              <h2 style={{ ...styles.sidebarTitle, color: dynamicTheme.textColor }}>portfolio<span style={{color: '#ff6b8b'}}>.</span>db</h2>
            </div>
            <div style={{ ...styles.profileCard, background: isDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)' }}>
              <div style={styles.avatarGlow}><Sparkles size={14} color="#ff6b8b" /></div>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: dynamicTheme.textColor }}>Root Operator</div>
                <div style={{ fontSize: '0.72rem', color: '#2ed573', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px', fontFamily: 'Space Grotesk' }}><span style={styles.onlinePulse}></span> Connected</div>
              </div>
            </div>
            <nav style={styles.navStack}>
              <button onClick={() => { setActiveTab('projects'); resetForms(); }} className={`admin-sidebar-btn ${activeTab === 'projects' ? 'active' : ''}`}><Folder size={18} /> <span>Projects Repository</span></button>
              <button onClick={() => { setActiveTab('experience'); resetForms(); }} className={`admin-sidebar-btn ${activeTab === 'experience' ? 'active' : ''}`}><Briefcase size={18} /> <span>Experience Registry</span></button>
              <button onClick={() => { setActiveTab('skills'); resetForms(); }} className={`admin-sidebar-btn ${activeTab === 'skills' ? 'active' : ''}`}><Cpu size={18} /> <span>Matrix Skill Tree</span></button>
              <button onClick={handleGoHome} className="admin-sidebar-btn"><Home size={18} /> <span>Return to Portfolio</span></button>
            </nav>
            <div style={{ marginTop: 'auto', paddingTop: '20px' }}><button onClick={handleLogout} style={styles.logoutBtn}><LogOut size={15} /> <span>Revoke Session</span></button></div>
          </aside>

          <main style={styles.mainContent}>
            <div className="hero-canvas">
              <button className="hero-theme-toggle" onClick={() => setIsDarkMode(!isDarkMode)}>{isDarkMode ? <Sun size={20} color="#ffb300" /> : <Moon size={20} color="#6366f1" />}</button>
              <div style={styles.heroLayoutRow}>
                <div style={{ flex: 1, zIndex: 2, minWidth: '260px' }}>
                  <span style={{ ...styles.heroBadge, background: isDarkMode ? 'rgba(90,82,230,0.15)' : 'rgba(90,82,230,0.06)', color: '#6366f1' }}><Activity size={12} /> Live Environment Control</span>
                  <h1 style={{ ...styles.heroTitle, color: dynamicTheme.textColor }}>Master Control <span className="text-gradient">Console</span></h1>
                  <p style={{ ...styles.heroSubtitle, color: dynamicTheme.subText }}>Deploy live architectural components directly into your cloud repository effortlessly.</p>
                </div>
                <div style={styles.heroStatsStack}>
                  <div style={{ ...styles.heroStatItem, background: isDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.7)', border: dynamicTheme.panelBorder }}><Layers size={16} color="#4f46e5" /><div><div style={styles.heroStatValue}>{projects.length} Nodes</div><div style={styles.heroStatLabel}>Cloud Blueprints</div></div></div>
                  <div style={{ ...styles.heroStatItem, background: isDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.7)', border: dynamicTheme.panelBorder }}><Cpu size={16} color="#ff6b8b" /><div><div style={styles.heroStatValue}>{skills.length} Vectors</div><div style={styles.heroStatLabel}>Skills Connected</div></div></div>
                </div>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '32px', borderRadius: '24px', flex: 1 }}>
              {activeTab === 'projects' && (
                <div style={styles.tabContentWrapper}>
                  <form onSubmit={handleProjectSubmit} style={styles.formContainer} className="glass-panel">
                    <h3 style={{ ...styles.formSectionTitle, color: dynamicTheme.textColor }}>{isEditing ? 'Hot-Swap Target Properties' : 'Append Dynamic Project Resource'}</h3>
                    <div style={styles.formRow}>
                      <div style={{ flex: 2, minWidth: '200px' }}>
                        <label style={styles.fieldLabel}>Project Identifier Title</label>
                        <input type="text" value={projectForm.title} onChange={(e) => setProjectForm({...projectForm, title: e.target.value})} className="input-glow-field" style={{ ...styles.inputStyle, background: dynamicTheme.inputBg, border: dynamicTheme.inputBorder, color: dynamicTheme.textColor }} placeholder="Project Title" required />
                      </div>
                      <div style={{ flex: 1, minWidth: '160px' }}>
                        <label style={styles.fieldLabel}>Deployment Category</label>
                        <select value={projectForm.category} onChange={(e) => setProjectForm({...projectForm, category: e.target.value})} className="input-glow-field" style={{ ...styles.inputStyle, background: dynamicTheme.inputBg, border: dynamicTheme.inputBorder, color: dynamicTheme.textColor }}>
                          <option value="web">Web Core</option>
                          <option value="mobile">Mobile Systems</option>
                          <option value="ai">AI System Layer</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label style={styles.fieldLabel}>Structural System Description Metadata</label>
                      <textarea rows="2" value={projectForm.shortDesc} onChange={(e) => setProjectForm({...projectForm, shortDesc: e.target.value})} className="input-glow-field" style={{ ...styles.inputStyle, background: dynamicTheme.inputBg, border: dynamicTheme.inputBorder, color: dynamicTheme.textColor }} placeholder="Describe tech specs..." required />
                    </div>
                    <div style={styles.formButtonRow}>
                      <button type="submit" style={styles.saveBtn}><Save size={15} /> Save Cloud Node</button>
                      {isEditing && <button type="button" onClick={resetForms} style={styles.cancelBtn}><X size={15} /> Abort</button>}
                    </div>
                  </form>
                  <table className="crud-table">
                    <thead><tr><th>Entity Identifier</th><th>Domain Cluster</th><th>Short Metadata Desc</th><th>Mutations</th></tr></thead>
                    <tbody>
                      {projects.map(p => (
                        <tr key={p.id}>
                          <td style={{ fontWeight: 700, fontSize: '0.92rem', color: isDarkMode ? '#f1f5f9' : '#0f172a' }}>{p.title}</td>
                          <td><span className="category-badge">{p.category}</span></td>
                          <td style={{ color: dynamicTheme.subText, fontSize: '0.85rem' }}>{p.shortDesc}</td>
                          <td>
                            <div style={{ display: 'flex', gap: '6px' }}>
                              <button onClick={() => startEdit('project', p)} className="action-icon-btn" style={{ color: '#ffa502' }}><Pencil size={13} /></button>
                              <button onClick={() => deleteProject(p.id, p.title)} className="action-icon-btn" style={{ color: '#ff4757' }}><Trash2 size={13} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'experience' && (
                <div style={styles.tabContentWrapper}>
                  <form onSubmit={handleExpSubmit} style={styles.formContainer} className="glass-panel">
                    <h3 style={{ ...styles.formSectionTitle, color: dynamicTheme.textColor }}>{isEditing ? 'Modify Milestone Mapping' : 'Append Experience Profile Record'}</h3>
                    <div style={styles.formRow}>
                      <div style={{ flex: 1, minWidth: '180px' }}>
                        <label style={styles.fieldLabel}>Designation Title</label>
                        <input type="text" value={expForm.role} onChange={(e) => setExpForm({...expForm, role: e.target.value})} className="input-glow-field" style={{ ...styles.inputStyle, background: dynamicTheme.inputBg, border: dynamicTheme.inputBorder, color: dynamicTheme.textColor }} required />
                      </div>
                      <div style={{ flex: 1, minWidth: '180px' }}>
                        <label style={styles.fieldLabel}>Corporate Context Entity</label>
                        <input type="text" value={expForm.company} onChange={(e) => setExpForm({...expForm, company: e.target.value})} className="input-glow-field" style={{ ...styles.inputStyle, background: dynamicTheme.inputBg, border: dynamicTheme.inputBorder, color: dynamicTheme.textColor }} required />
                      </div>
                      <div style={{ width: '180px', flexGrow: 1 }}>
                        <label style={styles.fieldLabel}>Timeline Parameters</label>
                        <input type="text" value={expForm.period} onChange={(e) => setExpForm({...expForm, period: e.target.value})} className="input-glow-field" style={{ ...styles.inputStyle, background: dynamicTheme.inputBg, border: dynamicTheme.inputBorder, color: dynamicTheme.textColor }} required />
                      </div>
                    </div>
                    <div style={styles.formButtonRow}>
                      <button type="submit" style={styles.saveBtn}><Save size={15} /> Commit Record</button>
                      {isEditing && <button type="button" onClick={resetForms} style={styles.cancelBtn}><X size={15} /> Drop</button>}
                    </div>
                  </form>
                  <table className="crud-table">
                    <thead><tr><th>Role Assignment</th><th>Enterprise Context</th><th>Timeline Metrics</th><th>Mutations</th></tr></thead>
                    <tbody>
                      {experiences.map(exp => (
                        <tr key={exp.id}>
                          <td style={{ fontWeight: 700, fontSize: '0.92rem', color: isDarkMode ? '#f1f5f9' : '#0f172a' }}>{exp.role}</td>
                          <td style={{ color: isDarkMode ? '#cbd5e1' : '#334155' }}>{exp.company}</td>
                          <td style={{ fontSize: '0.85rem', color: dynamicTheme.subText }}>{exp.period}</td>
                          <td>
                            <div style={{ display: 'flex', gap: '6px' }}>
                              <button onClick={() => startEdit('experience', exp)} className="action-icon-btn" style={{ color: '#ffa502' }}><Pencil size={13} /></button>
                              <button onClick={() => deleteExperience(exp.id, exp.role)} className="action-icon-btn" style={{ color: '#ff4757' }}><Trash2 size={13} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'skills' && (
                <div style={styles.tabContentWrapper}>
                  <form onSubmit={handleSkillSubmit} style={styles.formContainer} className="glass-panel">
                    <h3 style={{ ...styles.formSectionTitle, color: dynamicTheme.textColor }}>{isEditing ? 'Calibrate Technical Density' : 'Inject Structural Attribute Target'}</h3>
                    <div style={styles.formRow}>
                      <div style={{ flex: 2, minWidth: '180px' }}>
                        <label style={styles.fieldLabel}>Attribute Factor Identifier Name</label>
                        <input type="text" value={skillForm.name} onChange={(e) => setSkillForm({...skillForm, name: e.target.value})} className="input-glow-field" style={{ ...styles.inputStyle, background: dynamicTheme.inputBg, border: dynamicTheme.inputBorder, color: dynamicTheme.textColor }} required />
                      </div>
                      <div style={{ flex: 1, minWidth: '130px' }}>
                        <label style={styles.fieldLabel}>Density Ratio ({skillForm.level}%)</label>
                        <input type="range" min="1" max="100" value={skillForm.level} onChange={(e) => setSkillForm({...skillForm, level: parseInt(e.target.value)})} style={{ ...styles.inputStyle, background: 'transparent', border: 'none', padding: 0 }} />
                      </div>
                      <div style={{ flex: 1, minWidth: '190px' }}>
                        <label style={styles.fieldLabel}>Matrix Category Node</label>
                        <select value={skillForm.category} onChange={(e) => setSkillForm({...skillForm, category: e.target.value})} className="input-glow-field" style={{ ...styles.inputStyle, background: dynamicTheme.inputBg, border: dynamicTheme.inputBorder, color: dynamicTheme.textColor }}>
                          <option value="languages">Languages</option>
                          <option value="frameworks">Frameworks & Libs</option>
                          <option value="tools">DevOps & Tools</option>
                          <option value="security">Security & Network</option>
                          <option value="soft_skills">Soft Skills</option>
                        </select>
                      </div>
                    </div>
                    <div style={styles.formButtonRow}>
                      <button type="submit" style={styles.saveBtn}><Save size={15} /> Inject Data</button>
                      {isEditing && <button type="button" onClick={resetForms} style={styles.cancelBtn}><X size={15} /> Reset</button>}
                    </div>
                  </form>
                  <table className="crud-table">
                    <thead><tr><th>Skill Matrix Name</th><th>Branch Category Location</th><th>Runtime Level Capacity</th><th>Mutations</th></tr></thead>
                    <tbody>
                      {skills.map(s => (
                        <tr key={s.id}>
                          <td style={{ fontWeight: 700, fontSize: '0.92rem', color: isDarkMode ? '#f1f5f9' : '#0f172a' }}>{s.name}</td>
                          <td><span className="category-badge">{s.category}</span></td>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <div className="progress-container" style={{ background: isDarkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.06)' }}><div className="progress-bar-fill" style={{ width: `${s.level}%` }}></div></div>
                              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ff6b8b' }}>{s.level}%</span>
                            </div>
                          </td>
                          <td>
                            <div style={{ display: 'flex', gap: '6px' }}>
                              <button onClick={() => startEdit('skill', s)} className="action-icon-btn" style={{ color: '#ffa502' }}><Pencil size={13} /></button>
                              <button onClick={() => deleteSkill(s.id, s.name)} className="action-icon-btn" style={{ color: '#ff4757' }}><Trash2 size={13} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </main>
        </>
      )}
    </div>
  )
}

// Layout styles
const styles = {
  adminContainer: { display: 'flex', gap: '24px', padding: '24px', minHeight: '100vh', boxSizing: 'border-box' },
  sidebar: { width: '280px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '22px', borderRadius: '24px', flexShrink: 0 },
  sidebarHeader: { display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '12px' },
  sidebarTitle: { fontFamily: 'Space Grotesk', fontSize: '1.3rem', fontWeight: 700, letterSpacing: '-0.03em', margin: 0 },
  navStack: { display: 'flex', flexDirection: 'column', gap: '6px' },
  profileCard: { display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '16px' },
  avatarGlow: { width: '34px', height: '34px', borderRadius: '10px', background: 'linear-gradient(135deg, rgba(90,82,230,0.15), rgba(255,107,139,0.15))', border: '1px solid rgba(255,107,139,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  onlinePulse: { display: 'inline-block', width: '6px', height: '6px', background: '#2ed573', borderRadius: '50%', boxShadow: '0 0 8px #2ed573' },
  mainContent: { flex: 1, display: 'flex', flexDirection: 'column', gap: '24px', minWidth: 0 },
  heroLayoutRow: { display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'center' },
  heroBadge: { display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem', fontWeight: 700, padding: '6px 12px', borderRadius: '10px', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '14px' },
  heroTitle: { fontFamily: 'Space Grotesk', fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.03em', margin: '0 0 8px 0' },
  heroSubtitle: { fontSize: '0.95rem', margin: 0, lineHeight: 1.5, maxWidth: '480px' },
  heroStatsStack: { display: 'flex', gap: '14px', flexWrap: 'wrap' },
  heroStatItem: { display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 20px', borderRadius: '18px', minWidth: '150px' },
  heroStatValue: { fontFamily: 'Space Grotesk', fontSize: '1.15rem', fontWeight: 700, letterSpacing: '-0.01em' },
  heroStatLabel: { fontSize: '0.75rem', color: '#64748b', marginTop: '2px', fontWeight: 500 },
  tabContentWrapper: { display: 'flex', flexDirection: 'column', gap: '24px' },
  formContainer: { padding: '24px', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '18px' },
  formSectionTitle: { fontSize: '1.05rem', fontWeight: 700, margin: 0 },
  formRow: { display: 'flex', flexWrap: 'wrap', gap: '16px' },
  fieldLabel: { display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#64748b', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.04em' },
  inputStyle: { width: '100%', padding: '12px 16px', borderRadius: '12px', fontSize: '0.9rem', outline: 'none', transition: 'all 0.3s ease', boxSizing: 'border-box' },
  formButtonRow: { display: 'flex', gap: '10px', marginTop: '4px' },
  saveBtn: { background: 'linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: '12px', fontSize: '0.88rem', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(79,70,229,0.2)' },
  cancelBtn: { background: 'rgba(255,71,87,0.1)', color: '#ff4757', border: '1px solid rgba(255,71,87,0.15)', padding: '12px 20px', borderRadius: '12px', fontSize: '0.88rem', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' },
  logoutBtn: { width: '100%', padding: '12px', background: 'rgba(255,71,87,0.06)', border: '1px solid rgba(255,71,87,0.1)', color: '#ff4757', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.88rem', fontWeight: 600, transition: 'all 0.2s ease' },
  notificationToast: { position: 'fixed', bottom: '24px', right: '24px', display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 24px', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', zIndex: 100, borderLeft: '4px solid #2ed573', animation: 'slideUp 0.3s ease forwards' },
  loginOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' },
  loginCard: { width: '100%', maxWidth: '420px', padding: '40px', borderRadius: '28px', boxShadow: '0 30px 70px rgba(0,0,0,0.5)' },
  lockIconContainer: { width: '54px', height: '54px', borderRadius: '16px', background: 'rgba(90,82,230,0.08)', border: '1px solid rgba(90,82,230,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' },
  inputWrapper: { position: 'relative', display: 'flex', alignItems: 'center' },
  inputIcon: { position: 'absolute', left: '16px', color: '#64748b' },
  loginInput: { width: '100%', padding: '14px 16px 14px 46px', borderRadius: '14px', fontSize: '0.95rem', outline: 'none', transition: 'all 0.3s ease' },
  authErrorContainer: { background: 'rgba(255,71,87,0.08)', border: '1px solid rgba(255,71,87,0.15)', color: '#ff4757', padding: '12px 16px', borderRadius: '12px', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '8px' },
  loginBtn: { background: 'linear-gradient(135deg, #4f46e5 0%, #ff6b8b 100%)', color: '#fff', border: 'none', padding: '14px', borderRadius: '14px', fontSize: '0.92rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: '0 8px 20px rgba(79,70,229,0.25)' },
  homeBtn: { background: 'transparent', padding: '14px', borderRadius: '14px', fontSize: '0.92rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.3s ease' }
}

export default AdminPanel