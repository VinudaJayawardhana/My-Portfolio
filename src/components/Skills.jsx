import React, { useState } from 'react'
import { Code2, Layout, Wrench, Shield, Terminal } from 'lucide-react'

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('languages')

  const categories = [
    { id: 'languages', label: 'Languages', icon: <Code2 size={18} /> },
    { id: 'frameworks', label: 'Frameworks & Libs', icon: <Layout size={18} /> },
    { id: 'tools', label: 'DevOps & Tools', icon: <Wrench size={18} /> },
    { id: 'security', label: 'Security & Network', icon: <Shield size={18} /> }
  ]

  const skillsData = {
    languages: [
      { name: 'Java', level: 88, desc: 'Core OOP implementation, university tasks and Android apps.' },
      { name: 'JavaScript', level: 85, desc: 'Web script coding, React interface controls.' },
      { name: 'Python', level: 82, desc: 'AI data analysis models and Streamlit app code.' },
      { name: 'PHP', level: 80, desc: 'Dynamic server-side scripting and web query endpoints.' },
      { name: 'C++', level: 75, desc: 'Algorithms & Data Structures optimization.' },
      { name: 'C#', level: 70, desc: '.NET building workflows.' },
      { name: 'HTML & CSS', level: 90, desc: 'Semantic layouts and responsive styled structures.' }
    ],
    frameworks: [
      { name: 'React.js', level: 85, desc: 'Responsive single page architectures and DOM operations.' },
      { name: 'Node.js & Express.js', level: 80, desc: 'REST server setup and API routing.' },
      { name: 'Next.js', level: 70, desc: 'Server side rendered dynamic web apps.' },
      { name: 'Spring Boot', level: 75, desc: 'Enterprise Java backend frameworks.' },
      { name: 'Bootstrap', level: 85, desc: 'Grid alignment styles and quick layout modules.' }
    ],
    tools: [
      { name: 'Git & GitHub', level: 88, desc: 'Version tracking, commit routines and repositories.' },
      { name: 'Firebase', level: 85, desc: 'Realtime Document DB, Authentication and Hosting.' },
      { name: 'Android Studio', level: 80, desc: 'Mobile systems SDK and emulator compilers.' },
      { name: 'Figma & Canva', level: 75, desc: 'Interface mockups and visual template layouts.' }
    ],
    security: [
      { name: 'Cisco IOS', level: 75, desc: 'Network node routes, switch setups and interfaces.' },
      { name: 'Metasploit Framework', level: 70, desc: 'Exploit audits and security evaluation.' },
      { name: 'Kali Linux OS', level: 80, desc: 'Dedicated pentest systems and terminal tools.' },
      { name: 'SQLMap', level: 75, desc: 'Automating database vulnerability checks.' }
    ]
  }

  return (
    <section id="skills" className="section skills-section">
      <h2 className="section-title">My Technical Skills</h2>
      
      <p className="section-desc">
        A detailed map of my technical skillset, including programming languages, backend/frontend frameworks, developer utilities, and network security audit tools.
      </p>

      {/* Tabs */}
      <div className="skills-tabs-container">
        <div className="skills-tabs glass-panel">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`skills-tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Skills Grid */}
      <div className="skills-grid">
        {skillsData[activeCategory].map((skill, index) => (
          <div key={index} className="skill-card glass-panel glass-panel-hover">
            <div className="skill-meta">
              <div className="skill-info">
                <Terminal size={16} className="skill-icon text-gradient" />
                <h3 className="skill-name">{skill.name}</h3>
              </div>
              <span className="skill-percentage">{skill.level}%</span>
            </div>
            
            {/* Custom Interactive Progress Bar */}
            <div className="progress-bar-track">
              <div 
                className="progress-bar-fill" 
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>
            
            <p className="skill-description">{skill.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills
