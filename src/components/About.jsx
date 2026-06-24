import React from 'react'
import { GraduationCap, Award, Trophy, Heart, ShieldCheck } from 'lucide-react'

const About = () => {
  const stats = [
    { icon: <GraduationCap className="stat-icon" />, label: 'Education', value: 'BSc (Hons) in IT / SE', sub: 'Bedfordshire & SLIIT City Uni' },
    { icon: <Award className="stat-icon" />, label: 'Academic Standing', value: 'GPA 3.85 / 4.00', sub: "Dean's List Honors" },
    { icon: <Trophy className="stat-icon" />, label: 'Distinction', value: 'Best AI Project', sub: 'CardioShield AI Award' }
  ]

  const certifications = [
    'Introduction to Artificial Intelligence',
    'Introduction to User Experience (UX) Designing'
  ]

  return (
    <section id="about" className="section about-section">
      <h2 className="section-title">About Me</h2>
      
      <div className="about-grid">
        {/* Charming SVG Illustration Column */}
        <div className="about-image-area">
          <div className="svg-illustration-container glass-panel">
            <svg viewBox="0 0 400 400" className="charming-developer-svg" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="screenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#e0e7ff" />
                  <stop offset="100%" stopColor="#c7d2fe" />
                </linearGradient>
                <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#5a52e6" />
                  <stop offset="100%" stopColor="#ff6b8b" />
                </linearGradient>
                <filter id="softGlow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#5a52e6" floodOpacity="0.15" />
                </filter>
              </defs>
              
              {/* Floor/Desk shadow */}
              <ellipse cx="200" cy="330" rx="140" ry="12" fill="#e2e8f0" opacity="0.8" />
              
              {/* Floating aesthetic background shapes */}
              <circle cx="90" cy="110" r="16" fill="#ff6b8b" opacity="0.15" />
              <rect x="290" y="80" width="30" height="30" rx="8" transform="rotate(15, 290, 80)" fill="#2dd4bf" opacity="0.15" />
              <path d="M 280,220 L 300,240 L 260,260 Z" fill="#5a52e6" opacity="0.1" />

              {/* The Desk */}
              <rect x="70" y="300" width="260" height="15" rx="6" fill="#e2e8f0" />
              <rect x="90" y="315" width="20" height="35" fill="#cbd5e1" />
              <rect x="290" y="315" width="20" height="35" fill="#cbd5e1" />

              {/* Monitor Stand */}
              <rect x="185" y="240" width="30" height="70" fill="#cbd5e1" />
              <path d="M 170,300 L 230,300 L 210,285 L 190,285 Z" fill="#94a3b8" />

              {/* Curved Modern Desk Lamp */}
              <path d="M 90,300 Q 60,200 120,180" fill="none" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
              <path d="M 110,170 L 135,190 L 115,200 Z" fill="#ff6b8b" />
              <ellipse cx="125" cy="195" rx="10" ry="4" fill="#ffd166" transform="rotate(30, 125, 195)" />

              {/* Main Monitor Screen with border */}
              <rect x="110" y="90" width="180" height="120" rx="12" fill="#cbd5e1" filter="url(#softGlow)" />
              <rect x="115" y="95" width="170" height="110" rx="8" fill="url(#screenGrad)" />
              <rect x="115" y="95" width="170" height="24" rx="4" fill="#ffffff" opacity="0.6" />
              
              {/* Window buttons */}
              <circle cx="130" cy="107" r="4" fill="#ff6b8b" />
              <circle cx="142" cy="107" r="4" fill="#f59e0b" />
              <circle cx="154" cy="107" r="4" fill="#2dd4bf" />

              {/* Mock code lines on screen */}
              <rect x="130" y="135" width="60" height="8" rx="4" fill="#5a52e6" opacity="0.8" />
              <rect x="130" y="150" width="110" height="8" rx="4" fill="#ff6b8b" opacity="0.8" />
              <rect x="130" y="165" width="85" height="8" rx="4" fill="#2dd4bf" opacity="0.8" />
              <rect x="130" y="180" width="40" height="8" rx="4" fill="#cbd5e1" />
              <circle cx="250" cy="155" r="14" fill="#5a52e6" opacity="0.2" />
              <path d="M 245,155 L 255,155 M 250,150 L 250,160" stroke="#5a52e6" strokeWidth="2.5" strokeLinecap="round" />

              {/* Coffee Cup with steaming aroma */}
              <rect x="295" y="275" width="22" height="26" rx="4" fill="#ff6b8b" />
              <path d="M 317,282 C 322,282 322,292 317,292" fill="none" stroke="#ff6b8b" strokeWidth="3" />
              <path d="M 298,265 Q 302,260 300,255" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M 306,267 Q 310,262 308,257" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />

              {/* Small Cute Potted Cactus */}
              <rect x="80" y="278" width="16" height="22" rx="3" fill="#cbd5e1" />
              <path d="M 88,255 L 88,278 M 82,263 Q 82,269 88,269 M 94,261 Q 94,267 88,267" fill="none" stroke="#2dd4bf" strokeWidth="4.5" strokeLinecap="round" />

              {/* Keyboard */}
              <rect x="155" y="288" width="70" height="6" rx="3" fill="#94a3b8" />
              {/* Mouse */}
              <rect x="235" y="288" width="10" height="6" rx="3" fill="#94a3b8" />

            </svg>
          </div>
        </div>

        {/* Text Content & Stats Column */}
        <div className="about-text-area">
          <h3 className="about-subtitle">
            Crafting elegant software and solving <span className="text-gradient">complex problems</span>.
          </h3>
          
          <p className="about-paragraph">
            I am a Software Engineering undergraduate at the University of Bedfordshire (collaborating with SLIIT City Uni) with a strong foundation in designing, coding, and testing web and mobile systems.
          </p>
          
          <p className="about-paragraph">
            With hands-on experience in Java, React, PHP, and Android development, I strive to write readable, secure, and optimized code that addresses real-world business and client objectives.
          </p>

          {/* Core Stats */}
          <div className="stats-container">
            {stats.map((stat, i) => (
              <div key={i} className="stat-card glass-panel glass-panel-hover">
                <div className="stat-header">
                  {stat.icon}
                  <span className="stat-label">{stat.label}</span>
                </div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-sub">{stat.sub}</div>
              </div>
            ))}
          </div>

          {/* Certifications Block */}
          <div className="about-certifications glass-panel">
            <h4 className="cert-title">
              <ShieldCheck size={18} className="cert-title-icon text-gradient" /> Certifications
            </h4>
            <div className="cert-list">
              {certifications.map((cert, index) => (
                <div key={index} className="cert-item">
                  <span className="cert-bullet"></span>
                  <span className="cert-name">{cert}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="about-hobbies">
            <h4 className="hobbies-title"><Heart size={16} className="heart-icon" /> My Fields of Interest:</h4>
            <div className="hobby-tags">
              <span className="hobby-tag glass-panel">💻 Web Application Development</span>
              <span className="hobby-tag glass-panel">📱 Android App Development</span>
              <span className="hobby-tag glass-panel">🤖 Artificial Intelligence</span>
              <span className="hobby-tag glass-panel">🔐 Security & Pentesting Tools</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
