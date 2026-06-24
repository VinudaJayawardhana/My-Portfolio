import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import { collection, getDocs } from 'firebase/firestore'
import { motion } from 'framer-motion'
import { Code2, Layout, Wrench, Shield, Terminal, Users, Brain, MessageSquare, Lightbulb } from 'lucide-react'

const Skills = () => {
  const [cloudSkills, setCloudSkills] = useState([])
  const [clickedCard, setClickedCard] = useState(null)

  const handleCardClick = (catId) => {
    setClickedCard(catId)
    setTimeout(() => setClickedCard(null), 800)
  }

  // Staggered Container Animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  }

  // Individual Card Entrance Animation
  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 70, 
        damping: 14 
      } 
    }
  }

  const categories = [
    { id: 'languages', label: 'Programming Languages', icon: <Code2 size={22} /> },
    { id: 'frameworks', label: 'Frameworks & Libraries', icon: <Layout size={22} /> },
    { id: 'tools', label: 'DevOps & Development Tools', icon: <Wrench size={22} /> },
    { id: 'security', label: 'Security & Networking Tools', icon: <Shield size={22} /> },
    { id: 'softskills', label: 'Core Professional Skills', icon: <Users size={22} /> }
  ]

  const localSkillsData = {
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
    ],
    softskills: [
      { name: 'Problem Solving', level: 92, desc: 'Analyzing complex algorithmic constraints.', icon: <Brain size={16} /> },
      { name: 'Team Collaboration', level: 88, desc: 'Coordinating duties across group assignments.', icon: <Users size={16} /> },
      { name: 'Communication', level: 85, desc: 'Articulating requirements transparently.', icon: <MessageSquare size={16} /> },
      { name: 'Critical Thinking', level: 90, desc: 'Evaluating architecture systematically.', icon: <Lightbulb size={16} /> }
    ]
  }

  useEffect(() => {
    const fetchCloudSkills = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'skills'))
        const parsed = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setCloudSkills(parsed)
      } catch (err) { console.error("Error fetching skills: ", err) }
    }
    fetchCloudSkills()
  }, [])

  const getSkillsForCategory = (catId) => {
    const local = localSkillsData[catId] || []
    const remote = cloudSkills.filter(s => s.category === catId && !local.some(l => l.name.toLowerCase() === s.name.toLowerCase()))
    return [...local, ...remote]
  }

  const assignIcon = (skill, catId) => {
    if (skill.icon) return skill.icon
    if (catId === 'security') return <Shield size={16} />
    return <Terminal size={16} />
  }

  return (
    <motion.section 
      id="skills" 
      className="section skills-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      variants={containerVariants}
    >
      <motion.h2 
        className="section-title"
        variants={{
          hidden: { opacity: 0, y: -20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
        }}
      >
        Professional & Technical Skills
      </motion.h2>
      <motion.p 
        style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '50px', maxWidth: '600px', margin: '0 auto 50px auto' }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.8, delay: 0.1 } }
        }}
      >
        An overview of my core competencies, programming languages, development frameworks, and professional skills.
      </motion.p>

      {/* Grid of categories with Framer Motion stagger support */}
      <motion.div 
        className="skills-all-categories-grid" 
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', width: '100%' }}
        variants={containerVariants}
      >
        {categories.map((cat) => (
          <motion.div 
            key={cat.id} 
            className="skill-category-card glass-panel" 
            variants={cardVariants}
            onClick={() => handleCardClick(cat.id)}
            whileHover={{ 
              y: -8, 
              boxShadow: '0 24px 48px rgba(90, 82, 230, 0.18)',
              borderColor: 'rgba(90, 82, 230, 0.4)'
            }}
            whileTap={{ scale: 0.97, boxShadow: '0 4px 20px rgba(90, 82, 230, 0.35)' }}
            animate={clickedCard === cat.id ? {
              boxShadow: [
                '0 0 0px rgba(90,82,230,0)',
                '0 0 0 4px rgba(90,82,230,0.35), 0 0 40px rgba(90,82,230,0.25)',
                '0 0 0 8px rgba(90,82,230,0.15), 0 0 60px rgba(90,82,230,0.15)',
                '0 0 0 0px rgba(90,82,230,0)'
              ],
              borderColor: [
                'rgba(255,255,255,0.5)',
                'rgba(90,82,230,0.8)',
                'rgba(90,82,230,0.4)',
                'rgba(255,255,255,0.5)'
              ]
            } : {}}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{ 
              padding: '28px', 
              borderRadius: '20px', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '24px', 
              background: 'rgba(255, 255, 255, 0.4)',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              boxShadow: '0 8px 32px rgba(15, 23, 42, 0.03)',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Ripple burst overlay on click */}
            {clickedCard === cat.id && (
              <motion.div
                aria-hidden="true"
                style={{
                  position: 'absolute', inset: 0,
                  background: 'radial-gradient(circle at center, rgba(90,82,230,0.18) 0%, transparent 70%)',
                  borderRadius: '20px',
                  pointerEvents: 'none',
                  zIndex: 0
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1.3, 1.6] }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              />
            )}
            {/* Category Header */}
            <div className="category-header" style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid rgba(99, 102, 241, 0.1)', paddingBottom: '16px' }}>
              <motion.span 
                className="category-icon text-gradient" 
                style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center' }}
                whileHover={{ rotate: 15, scale: 1.1 }}
                animate={clickedCard === cat.id ? { rotate: [0, -15, 15, -8, 0], scale: [1, 1.3, 1.15, 1.2, 1] } : {}}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                {cat.icon}
              </motion.span>
              <h3 className="category-label" style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                {cat.label}
              </h3>
            </div>

            {/* Skills List in Category */}
            <div className="category-skills-list" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {getSkillsForCategory(cat.id).map((skill, index) => (
                <div key={skill.id || index} className="skill-item-block" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div className="skill-meta" style={{ display: 'flex', justifycontent: 'space-between', alignItems: 'center' }}>
                    <div className="skill-info" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="skill-icon text-gradient" style={{ display: 'flex', alignItems: 'center', color: 'var(--primary)' }}>
                        {assignIcon(skill, cat.id)}
                      </span>
                      <span className="skill-name" style={{ fontWeight: '600', fontSize: '0.95rem', color: 'var(--text-primary)' }}>{skill.name}</span>
                    </div>
                    <span className="skill-percentage" style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--primary)', marginLeft: 'auto' }}>{skill.level}%</span>
                  </div>
                  
                  {/* Progress Bar with Loading Animation */}
                  <div className="progress-bar-track" style={{ height: '6px', background: 'rgba(0, 0, 0, 0.05)', borderRadius: '10px', overflow: 'hidden' }}>
                    <motion.div 
                      className="progress-bar-fill" 
                      style={{ 
                        height: '100%', 
                        background: 'linear-gradient(90deg, var(--primary), var(--secondary))', 
                        borderRadius: '10px' 
                      }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeOut", delay: index * 0.05 }}
                    />
                  </div>

                  <p className="skill-description" style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: '1.4', margin: '2px 0 0 0' }}>
                    {skill.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}

export default Skills