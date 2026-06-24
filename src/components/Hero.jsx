import React, { useState, useEffect } from 'react'
import { Github, Linkedin, Mail, ArrowDown, ChevronRight, Sparkles } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa' // Updated import
import { motion } from 'framer-motion'

// Floating orbs data — purely decorative, new additions
const ORBS = [
  { size: 340, top: '-10%', left: '-8%', color: 'rgba(90,82,230,0.13)', delay: 0, duration: 9 },
  { size: 260, top: '55%', left: '70%', color: 'rgba(255,107,139,0.10)', delay: 1.5, duration: 11 },
  { size: 180, top: '30%', left: '50%', color: 'rgba(45,212,191,0.09)', delay: 0.8, duration: 8 },
]

// Floating particles data — purely decorative, new additions
const PARTICLES = [
  { size: 6, top: '18%', left: '12%', delay: 0 },
  { size: 4, top: '72%', left: '22%', delay: 0.6 },
  { size: 5, top: '42%', left: '82%', delay: 1.1 },
  { size: 3, top: '85%', left: '60%', delay: 0.3 },
  { size: 6, top: '10%', left: '65%', delay: 1.8 },
  { size: 4, top: '60%', left: '5%', delay: 0.9 },
]

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

  useEffect(() => {
    let timer
    const currentFullTitle = titles[titleIndex]
    const typingSpeed = isDeleting ? 30 : 80

    if (!isDeleting && displayText === currentFullTitle) {
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
    <motion.section 
      id="home" 
      className="section hero-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* ── NEW: Floating ambient orbs ── */}
      {ORBS.map((orb, i) => (
        <motion.div
          key={`orb-${i}`}
          aria-hidden="true"
          style={{
            position: 'absolute',
            width: orb.size,
            height: orb.size,
            borderRadius: '50%',
            background: orb.color,
            top: orb.top,
            left: orb.left,
            filter: 'blur(60px)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ 
            opacity: [0, 1, 0.85, 1],
            scale: [0.7, 1.08, 0.95, 1.05],
            y: [0, -18, 8, -12, 0],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* ── NEW: Floating sparkle particles ── */}
      {PARTICLES.map((p, i) => (
        <motion.div
          key={`particle-${i}`}
          aria-hidden="true"
          style={{
            position: 'absolute',
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: 'var(--primary)',
            top: p.top,
            left: p.left,
            pointerEvents: 'none',
            zIndex: 0,
            opacity: 0,
          }}
          animate={{
            opacity: [0, 0.7, 0],
            y: [0, -24, -48],
            scale: [1, 1.2, 0.4],
          }}
          transition={{
            duration: 4.5,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}

      <div className="hero-content" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-text-area">
          {/* Badge — enhanced visibility */}
          <motion.div 
            className="hero-badge glass-panel"
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.15, type: 'spring', stiffness: 80, damping: 14 }}
            style={{
              background: 'linear-gradient(135deg, rgba(90,82,230,0.15) 0%, rgba(255,107,139,0.10) 100%)',
              border: '1.5px solid rgba(90,82,230,0.55)',
              boxShadow: '0 0 18px rgba(90,82,230,0.18), inset 0 1px 0 rgba(255,255,255,0.25)',
              color: 'var(--primary)',
              fontWeight: 700,
              letterSpacing: '0.01em',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Sparkles size={16} className="badge-icon" />
            <span>Open for internships &amp; software projects</span>
          </motion.div>
          
          {/* ── Hero Title — word-by-word reveal ── */}
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.28, type: 'spring', stiffness: 70, damping: 14 }}
          >
            Hi, I'm <span className="text-gradient">Vinuda Jayawardhana</span>
          </motion.h1>

          {/* ── Typewriter subtitle — unchanged ── */}
          <motion.div 
            className="hero-subtitle"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.42, type: 'spring', stiffness: 80, damping: 16 }}
          >
            <span>I'm a </span>
            <span className="typewriter-text">{displayText}</span>
            <span className="typewriter-cursor">|</span>
          </motion.div>

          {/* ── Description ── */}
          <motion.p 
            className="hero-description"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.54, duration: 0.7, ease: 'easeOut' }}
          >
            A full stack software engineering undergraduate at the University of Bedfordshire 
            with hands-on experience in web and mobile application development. Skilled in building 
            scalable, secure, and user-focused digital systems.
          </motion.p>

          {/* ── CTA Buttons — staggered spring ── */}
          <motion.div 
            className="hero-actions"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.66, type: 'spring', stiffness: 75, damping: 14 }}
          >
            <motion.button
              onClick={() => scrollToSection('projects')}
              className="btn btn-primary"
              whileHover={{ scale: 1.05, boxShadow: '0 8px 30px rgba(90,82,230,0.35)' }}
              whileTap={{ scale: 0.97 }}
            >
              Explore Projects <ChevronRight size={18} />
            </motion.button>
            <motion.button
              onClick={() => scrollToSection('contact')}
              className="btn btn-outline"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Let's Connect
            </motion.button>
          </motion.div>

          {/* ── Social Icons — staggered pop-in ── */}
          <motion.div 
            className="hero-socials"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.78 }}
          >
            {[
              { href: 'https://github.com/VinudaJayawardhana', label: 'GitHub', icon: <Github size={20} /> },
              { href: 'https://www.linkedin.com/in/vinuda-jayawardhana-92a43934a/', label: 'LinkedIn', icon: <Linkedin size={20} /> },
              { href: 'mailto:jayawardhanavinuda@gmail.com', label: 'Email', icon: <Mail size={20} /> },
              { href: 'https://wa.me/+94711583969', label: 'WhatsApp', icon: <FaWhatsapp size={20} /> },
            ].map((social, i) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.label !== 'Email' ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="social-icon-btn glass-panel"
                aria-label={social.label}
                initial={{ opacity: 0, y: 16, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.82 + i * 0.1, type: 'spring', stiffness: 200, damping: 16 }}
                whileHover={{ scale: 1.18, rotate: 6, boxShadow: '0 6px 20px rgba(90,82,230,0.28)' }}
                whileTap={{ scale: 0.9 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* ── Code Window — floats on entry + subtle hover tilt ── */}
        <motion.div 
          className="hero-graphics-area"
          initial={{ opacity: 0, x: 60, scale: 0.92 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 0.35, type: 'spring', stiffness: 60, damping: 14 }}
        >
          {/* ── NEW: Animated glow halo behind the code window ── */}
          <motion.div
            aria-hidden="true"
            style={{
              position: 'absolute',
              width: '110%',
              height: '110%',
              top: '-5%',
              left: '-5%',
              borderRadius: '24px',
              background: 'radial-gradient(ellipse at center, rgba(90,82,230,0.15) 0%, transparent 70%)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
            animate={{ opacity: [0.5, 1, 0.5], scale: [0.98, 1.03, 0.98] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />

          <motion.div
            className="code-window glass-panel"
            style={{ position: 'relative', zIndex: 1 }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: 1.02, boxShadow: '0 28px 60px rgba(90,82,230,0.22)' }}
          >
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
          </motion.div>
        </motion.div>
      </div>

      <motion.button 
        onClick={() => scrollToSection('about')} 
        className="scroll-indicator" 
        aria-label="Scroll Down"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        whileHover={{ scale: 1.2 }}
      >
        <ArrowDown size={20} className="bounce-arrow" />
      </motion.button>
    </motion.section>
  )
}

export default Hero