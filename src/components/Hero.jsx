import React, { useState, useEffect } from 'react'
import { Github, Linkedin, Mail, ArrowDown, ChevronRight, Sparkles } from 'lucide-react'

const Hero = () => {
  const titles = [
    'Software Engineering Undergraduate',
    'Full-Stack Developer',
    'Mobile App Developer',
    'Freelance Programmer'
  ]
  const [titleIndex, setTitleIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  // Typing effect loop
  useEffect(() => {
    let timer
    const currentFullTitle = titles[titleIndex]
    const typingSpeed = isDeleting ? 30 : 80

    if (!isDeleting && displayText === currentFullTitle) {
      // Pause at full text
      timer = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false)
      setTitleIndex((prev) => (prev + 1) % titles.length)
    } else {
      timer = setTimeout(() => {
        setDisplayText(
          isDeleting
            ? currentFullTitle.substring(0, displayText.length - 1)
            : currentFullTitle.substring(0, displayText.length + 1)
        )
      }, typingSpeed)
    }

    return () => clearTimeout(timer)
  }, [displayText, isDeleting, titleIndex])

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) {
      const offset = 80
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = el.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section id="home" className="section hero-section animate-fade-in-up">
      <div className="hero-content">
        <div className="hero-text-area">
          <div className="hero-badge glass-panel">
            <Sparkles size={16} className="badge-icon" />
            <span>Open for internships & software projects</span>
          </div>
          
          <h1 className="hero-title">
            Hi, I'm <span className="text-gradient">Vinuda Jayawardhana</span>
          </h1>

          <div className="hero-subtitle">
            <span>I'm a </span>
            <span className="typewriter-text">{displayText}</span>
            <span className="typewriter-cursor">|</span>
          </div>

          <p className="hero-description">
            A full stack software engineering undergraduate at the University of Bedfordshire 
            with hands-on experience in web and mobile application development. Skilled in building 
            scalable, secure, and user-focused digital systems.
          </p>

          <div className="hero-actions">
            <button onClick={() => scrollToSection('projects')} className="btn btn-primary">
              Explore Projects <ChevronRight size={18} />
            </button>
            <button onClick={() => scrollToSection('contact')} className="btn btn-outline">
              Let's Connect
            </button>
          </div>

          <div className="hero-socials">
            <a href="https://github.com/VinudaJayawardhana" target="_blank" rel="noopener noreferrer" className="social-icon-btn glass-panel" aria-label="GitHub">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/vinuda-jayawardhana" target="_blank" rel="noopener noreferrer" className="social-icon-btn glass-panel" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
            <a href="mailto:jayawardhanavinuda@gmail.com" className="social-icon-btn glass-panel" aria-label="Email">
              <Mail size={20} />
            </a>
          </div>
        </div>

        <div className="hero-graphics-area">
          <div className="code-window glass-panel">
            <div className="code-window-header">
              <div className="window-dot dot-red"></div>
              <div className="window-dot dot-yellow"></div>
              <div className="window-dot dot-green"></div>
              <span className="window-title">developer.js</span>
            </div>
            <div className="code-window-body">
              <pre>
                <code>
<span className="code-keyword">const</span> developer = &#123;<br />
  &nbsp;&nbsp;name: <span className="code-string">'Vinuda Jayawardhana'</span>,<br />
  &nbsp;&nbsp;role: <span className="code-string">'Software Engineering Student'</span>,<br />
  &nbsp;&nbsp;skills: [<br />
  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-string">'Java'</span>, <span className="code-string">'React.js'</span>, <span className="code-string">'Node.js'</span>,<br />
  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-string">'PHP'</span>, <span className="code-string">'Python'</span>, <span className="code-string">'Firebase'</span>,<br />
  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-string">'Android Studio'</span><br />
  &nbsp;&nbsp;],<br />
  &nbsp;&nbsp;loc: <span className="code-string">'Ragama, Sri Lanka'</span>,<br />
  &nbsp;&nbsp;problemSolver: <span className="code-boolean">true</span>,<br />
  &nbsp;&nbsp;gpa: <span className="code-number">3.85</span>,<br />
  &nbsp;&nbsp;hireable: <span className="code-keyword">function</span>() &#123;<br />
  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">return</span> (<br />
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">this</span>.gpa &gt;= <span className="code-number">3.5</span> &amp;&amp;<br />
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">this</span>.skills.includes(<span className="code-string">'React.js'</span>)<br />
  &nbsp;&nbsp;&nbsp;&nbsp;);<br />
  &nbsp;&nbsp;&#125;<br />
&#125;;
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      <button onClick={() => scrollToSection('about')} className="scroll-indicator" aria-label="Scroll Down">
        <ArrowDown size={20} className="bounce-arrow" />
      </button>
    </section>
  )
}

export default Hero
