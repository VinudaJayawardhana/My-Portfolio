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
import { Terminal } from 'lucide-react'

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light'
  })
  const [selectedProject, setSelectedProject] = useState(null)
  
  // Welcome Preloader States
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [isFadingOut, setIsFadingOut] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  // Progress Bar Simulation
  useEffect(() => {
    if (progress < 100) {
      const interval = setInterval(() => {
        setProgress(prev => {
          const next = prev + Math.floor(Math.random() * 15) + 5
          return next > 100 ? 100 : next
        })
      }, 150)
      return () => clearInterval(interval)
    } else {
      // Trigger fade out
      const fadeTimeout = setTimeout(() => {
        setIsFadingOut(true)
        // Complete unmount after animation completes
        const unmountTimeout = setTimeout(() => {
          setIsLoading(false)
        }, 600)
        return () => clearTimeout(unmountTimeout)
      }, 500)
      return () => clearTimeout(fadeTimeout)
    }
  }, [progress])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className="app-container">
      {isLoading && (
        <div className={`welcome-screen ${isFadingOut ? 'fade-out' : ''}`}>
          <div className="welcome-content">
            <div className="welcome-logo glass-panel">
              <Terminal size={40} className="welcome-icon text-gradient" />
            </div>
            
            <h1 className="welcome-title text-gradient">vinuda.dev</h1>
            
            <div className="welcome-terminal glass-panel">
              <div className="welcome-terminal-header">
                <div className="terminal-dot red"></div>
                <div className="terminal-dot yellow"></div>
                <div className="terminal-dot green"></div>
              </div>
              <div className="welcome-terminal-body">
                <div className="terminal-line">
                  <span className="terminal-prompt">vinuda@portfolio:~$</span>
                  <span className="terminal-command"> npm start --silent</span>
                </div>
                <div className="terminal-line success">
                  <span>✓ Loading portfolio core bundles...</span>
                </div>
                <div className="terminal-line progress-info">
                  <span>Fetching assets: {progress}%</span>
                </div>
              </div>
            </div>

            <div className="welcome-progress-bar">
              <div className="welcome-progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>
      )}

      {/* Decorative Blobs */}
      <div className="bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <Header theme={theme} toggleTheme={toggleTheme} />
      
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects setSelectedProject={setSelectedProject} />
        <Experience />
        <Contact />
      </main>

      <Footer />

      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </div>
  )
}

export default App
