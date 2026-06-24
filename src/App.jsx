import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ProjectModal from './components/ProjectModal'
import AdminPanel from './components/AdminPanel'
import Chatbot from './components/Chatbot'
import './index.css'

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')
  const [view, setView] = useState('portfolio')
  const [selectedProject, setSelectedProject] = useState(null)
  
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [isFadingOut, setIsFadingOut] = useState(false)

  // This effect manages the lockdown ONLY when isLoading is true
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
      document.body.style.overscrollBehavior = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.body.style.overscrollBehavior = '';
    }
  }, [isLoading]);

  const getTelemetryLog = (pct) => {
    if (pct < 25) return 'Booting local development compilation arrays...'
    if (pct < 55) return 'Indexing custom workspace architecture...'
    if (pct < 85) return 'Injecting high-fidelity UI layout schemas...'
    return 'Environment initialized successfully. Welcome to the portal.'
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    if (progress < 100) {
      const interval = setInterval(() => {
        setProgress(prev => {
          const next = prev + Math.floor(Math.random() * 6) + 3
          return next > 100 ? 100 : next
        })
      }, 240)
      return () => clearInterval(interval)
    } else {
      const fadeTimeout = setTimeout(() => {
        setIsFadingOut(true)
        const unmountTimeout = setTimeout(() => {
          setIsLoading(false)
        }, 900)
        return () => clearTimeout(unmountTimeout)
      }, 1200)
      return () => clearTimeout(fadeTimeout)
    }
  }, [progress])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className="app-container" style={{ background: theme === 'dark' ? '#050508' : '#ffffff', transition: 'background 0.3s ease' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600&family=Space+Grotesk:wght@400;500;700&family=Syne:wght@800;900&family=Playfair+Display:ital,wght@0,300;0,400;1,400&display=swap');
        
        .cinematic-loader-backdrop {
          position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
          z-index: 99999; display: flex; align-items: center; justify-content: center;
          font-family: 'Plus Jakarta Sans', sans-serif; padding: 20px; box-sizing: border-box;
          overflow: hidden; overscroll-behavior: none; touch-action: none;
          transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .cinematic-loader-backdrop.fade-out {
          opacity: 0; pointer-events: none;
        }

        .loader-bg-image { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-image: url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop'); background-size: cover; background-position: center; transform: scale(1.05); animation: slowPan 30s infinite ease-in-out; z-index: 1; }
        @keyframes slowPan { 0%, 100% { transform: scale(1.05) translate(0px, 0px); } 50% { transform: scale(1.08) translate(-4px, -2px); } }
        .glass-blur-layer { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(255, 255, 255, 0.88); backdrop-filter: blur(28px); -webkit-backdrop-filter: blur(28px); z-index: 2; }
        .dramatic-light-beam { position: absolute; top: -20%; right: -10%; width: 55vw; height: 140vh; background: linear-gradient(115deg, transparent 15%, rgba(255, 255, 255, 0.5) 40%, rgba(255, 255, 255, 0.7) 50%, rgba(255, 255, 255, 0.3) 60%, transparent 85%); transform: rotate(-15deg); filter: blur(60px); z-index: 3; pointer-events: none; mix-blend-mode: overlay; }
        .center-showcase-panel { width: 100%; max-width: 600px; z-index: 4; display: flex; flex-direction: column; align-items: center; text-align: center; }
        
        .title-animation-stage { position: relative; width: 100%; min-height: 150px; display: flex; align-items: center; justify-content: center; margin-bottom: 12px; }
        .animated-monogram-vj { font-family: 'Syne', sans-serif; font-weight: 900; font-size: clamp(5rem, 20vw, 8rem); line-height: 0.9; background: linear-gradient(135deg, #090d16 0%, #1e293b 50%, #334155 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; letter-spacing: -0.05em; position: absolute; opacity: 0; transform: scale(0.9); filter: blur(12px) drop-shadow(0 10px 20px rgba(15, 23, 42, 0.12)); transition: all 0.95s cubic-bezier(0.16, 1, 0.3, 1); }
        .animated-monogram-vj.show { opacity: 1; transform: scale(1); filter: blur(0px) drop-shadow(0 20px 40px rgba(15, 23, 42, 0.18)); }
        .animated-monogram-vj.fade-to-text { opacity: 0; transform: scale(1.08) translateY(-30px); filter: blur(16px); pointer-events: none; }
        .animated-full-name { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: clamp(1.8rem, 8vw, 3.2rem); letter-spacing: -0.03em; color: #0f172a; line-height: 1.1; width: 100%; opacity: 0; transform: translateY(25px); filter: blur(6px); transition: all 1s cubic-bezier(0.16, 1, 0.3, 1); }
        .animated-full-name.show { opacity: 1; transform: translateY(0); filter: blur(0px); }
        .animated-tagline { font-family: 'Space Grotesk', sans-serif; font-weight: 400; font-size: clamp(1rem, 4.5vw, 1.3rem); color: #334155; margin-top: 10px; margin-bottom: 28px; opacity: 0; width: 100%; transform: translateY(20px); transition: all 1.1s cubic-bezier(0.16, 1, 0.3, 1); }
        .animated-tagline.show { opacity: 1; transform: translateY(0); }
        .animated-tagline em { font-family: 'Playfair Display', serif; font-style: italic; color: #7c3aed; padding-left: 2px; }
        .cinematic-sub-description { font-family: 'Plus Jakarta Sans', sans-serif; font-size: clamp(0.78rem, 3vw, 0.88rem); font-weight: 500; color: #64748b; margin-bottom: 32px; max-width: 420px; line-height: 1.5; padding: 0 10px; }
        .pill-actions-wrapper { display: flex; align-items: center; gap: 10px; margin-bottom: 40px; }
        .capsule-pill-btn { padding: 8px 18px; border-radius: 100px; font-size: 0.78rem; font-weight: 600; color: #334155; background: rgba(255, 255, 255, 0.7); border: 1px solid rgba(15, 23, 42, 0.08); display: flex; align-items: center; gap: 6px; backdrop-filter: blur(4px); }
        .capsule-pill-btn.primary-glow::before { content: ''; position: absolute; top: -1px; left: -1px; right: -1px; bottom: -1px; border-radius: 100px; padding: 1.5px; background: linear-gradient(90deg, #2563eb, #7c3aed, #db2777); -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite: destination-out; mask-composite: exclude; pointer-events: none; }
        .pill-dot-indicator { width: 5px; height: 5px; background: #7c3aed; border-radius: 50%; }
        .system-stack-header { font-family: 'Space Grotesk', sans-serif; font-size: 0.75rem; font-weight: 700; color: #475569; margin-bottom: 16px; letter-spacing: 0.06em; text-transform: uppercase; }
        .bento-glass-showcase { width: 100%; background: rgba(255, 255, 255, 0.45); border: 1px solid rgba(255, 255, 255, 0.6); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); border-radius: 14px; padding: 20px; box-sizing: border-box; }
        .tech-badges-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
        .bento-badge-item { background: rgba(255, 255, 255, 0.7); border: 1px solid rgba(15, 23, 42, 0.04); border-radius: 8px; padding: 12px 6px; font-family: 'Space Grotesk', sans-serif; font-size: clamp(0.7rem, 2.8vw, 0.8rem); font-weight: 500; color: #94a3b8; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .bento-badge-item.active { color: #0f172a; font-weight: 700; background: #ffffff; border-color: rgba(255, 255, 255, 0.8); box-shadow: 0 4px 12px rgba(0,0,0,0.02); }
        .minimal-progress-bar-container { width: 100%; margin-top: 20px; display: flex; flex-direction: column; gap: 8px; }
        .progress-track-line { width: 100%; height: 3px; background: rgba(15, 23, 42, 0.06); border-radius: 6px; overflow: hidden; }
        .progress-fill-active { height: 100%; background: #0f172a; transition: width 0.2s ease-out; }
      `}</style>

      {isLoading && (
        <div className={`cinematic-loader-backdrop ${isFadingOut ? 'fade-out' : ''}`}>
          <div className="loader-bg-image"></div>
          <div className="glass-blur-layer"></div>
          <div className="dramatic-light-beam"></div>
          
          <div className="center-showcase-panel">
            <div className="title-animation-stage">
              <div className={`animated-monogram-vj ${progress >= 3 ? 'show' : ''} ${progress >= 35 ? 'fade-to-text' : ''}`}>VJ</div>
              <h1 className={`animated-full-name ${progress >= 35 ? 'show' : ''}`}>Vinuda Jayawardhana</h1>
            </div>
            <div className={`animated-tagline ${progress >= 65 ? 'show' : ''}`}>Journey to my <em>coding world</em></div>
            <p className="cinematic-sub-description">{getTelemetryLog(progress)}</p>
            <div className="pill-actions-wrapper">
              <div className="capsule-pill-btn primary-glow" style={{ background: '#ffffff' }}><span>Environment Cluster</span><span className="pill-dot-indicator"></span></div>
              <div className="capsule-pill-btn"><span style={{ color: '#475569', fontFamily: "'Space Grotesk', sans-serif" }}>v2026.ec</span></div>
            </div>
            <div style={{ width: '100%' }}>
              <div className="system-stack-header">System Stack Infrastructure</div>
              <div className="bento-glass-showcase">
                <div className="tech-badges-grid">
                  <div className={`bento-badge-item ${progress >= 15 ? 'active' : ''}`}>React.js</div>
                  <div className={`bento-badge-item ${progress >= 45 ? 'active' : ''}`}>Node.js</div>
                  <div className={`bento-badge-item ${progress >= 68 ? 'active' : ''}`}>Firebase</div>
                  <div className={`bento-badge-item ${progress >= 82 ? 'active' : ''}`}>Tailwind</div>
                  <div className={`bento-badge-item ${progress >= 92 ? 'active' : ''}`}>Framer</div>
                  <div className={`bento-badge-item ${progress >= 98 ? 'active' : ''}`}>Production</div>
                </div>
                <div className="minimal-progress-bar-container">
                  <div className="progress-track-line"><div className="progress-fill-active" style={{ width: `${progress}%` }}></div></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: '#475569', letterSpacing: '0.04em' }}>
                    <span>COMPILING_COMPONENTS</span><span style={{ color: '#0f172a' }}>{progress}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Header theme={theme} toggleTheme={toggleTheme} currentView={view} onViewChange={setView} />
      
      {view === 'portfolio' ? (
        <>
          <main className="animate-fade-in">
            <div id="home"><Hero /></div>
            <div id="about"><About /></div>
            <div id="skills"><Skills /></div>
            <div id="projects"><Projects setSelectedProject={setSelectedProject} /></div>
            <div id="experience"><Experience /></div>
            <div id="contact"><Contact /></div>
          </main>
          <Footer />
        </>
      ) : (
        <div className="animate-fade-in" style={{ marginTop: '90px', padding: '0 20px', minHeight: 'calc(100vh - 90px)', boxSizing: 'border-box' }}>
          <AdminPanel />
        </div>
      )}

      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      <Chatbot />
    </div>
  )
}

export default App