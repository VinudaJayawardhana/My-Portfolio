import React, { useState, useEffect } from 'react'
import { ExternalLink, Github, Plus, Code2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion' // Added AnimatePresence
import { db } from '../firebase'
import { collection, getDocs } from 'firebase/firestore'

const Projects = ({ setSelectedProject }) => {
  const [filter, setFilter] = useState('all')
  const [cloudProjects, setCloudProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [clickedCard, setClickedCard] = useState(null)

  const handleCardClick = (id) => {
    setClickedCard(id)
    setTimeout(() => setClickedCard(null), 800)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1 } 
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } } // Added exit animation
  }

  const filterOptions = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web & Full-Stack' },
    { id: 'mobile', label: 'Mobile Apps' },
    { id: 'ai', label: 'AI & Data Science' }
  ]

  const staticProjectsData = [
    {
      id: 'static-1',
      title: 'iconX Mobile Store System',
      category: 'web',
      tags: ['React.js', 'Node.js', 'Firebase', 'VS Code'],
      shortDesc: 'A fully functional e-commerce site for a major smart mobile seller, featuring product trade-in workflows and admin business tracking portals.',
      github: 'https://github.com/VinudaJayawardhana',
      live: '#',
      details: {
        problem: 'Smart device retail shops struggle with disconnected platforms for online sales, manual employee attendance tracking, and dynamic calculations for mobile trade-in offers.',
        solution: 'Developed an integrated React portal that manages e-commerce shopping client-side, saves relational logs in Firebase, and equips store administrators with attendance grids and salary calculators.',
        achievements: ['Designed a mobile trade-in assessment interface', 'Built an admin dashboard with employee attendance register', 'Integrated real-time database sync'],
        architecture: 'Client Platform (React.js) -> Database Server (Node.js API) -> Realtime Storage (Firebase Database).'
      }
    },
    {
      id: 'static-2',
      title: 'CardioShield AI Predictor',
      category: 'ai',
      tags: ['Python', 'Streamlit', 'Scikit-Learn', 'Spyder'],
      shortDesc: 'Award-winning AI risk assessment web application that estimates heart attack probabilities based on clinical reports.',
      github: 'https://github.com/VinudaJayawardhana',
      live: '#',
      details: {
        problem: 'Early clinical indicator detection for cardiovascular events is highly time-critical and requires analyzing multiple bodily checkup variables.',
        solution: 'Created a machine learning predictive system using Linear Regression methodologies.',
        achievements: ['Awarded "Best AI Project"', 'High evaluation metrics', 'Intuitive clinical form in Streamlit'],
        architecture: 'Dataset Preprocessing -> ML Linear Regression Model -> Web Frontend (Streamlit).'
      }
    },
    {
      id: 'static-3',
      title: 'TourLanka Android App',
      category: 'mobile',
      tags: ['Java', 'Android SDK', 'Firebase', 'Android Studio'],
      shortDesc: 'Tourism assistant application for Sri Lanka featuring package browsing, destination savers, and live weather reports.',
      github: 'https://github.com/VinudaJayawardhana',
      live: '#',
      details: {
        problem: 'Tourists in Sri Lanka lack a consolidated mobile assistant.',
        solution: 'Created a native Java Android application powered by Google Firebase.',
        achievements: ['Engineered Destination Saver', 'Implemented real-time weather APIs', 'High responsive ratings'],
        architecture: 'Native Android Client (Java/XML) -> Weather REST APIs -> Real-time Database (Firebase).'
      }
    },
    {
      id: 'static-4',
      title: 'Rohan Rubber Corporate Site',
      category: 'web',
      tags: ['HTML', 'CSS', 'JavaScript', 'SQL', 'VS Code'],
      shortDesc: 'Official web showcase platform for Rohan Rubber Industries.',
      github: 'https://github.com/VinudaJayawardhana',
      live: 'https://www.rohanrubber.com/',
      details: {
        problem: 'Industrial manufacturing firms require clear catalog representations.',
        solution: 'Built a responsive, professional corporate website.',
        achievements: ['Custom product grids', 'Interactive inquiry forms', 'Production deployment'],
        architecture: 'HTML5/CSS3/Vanilla JS -> Relational Product Map (SQL) -> Hosting.'
      }
    },
    {
      id: 'static-5',
      title: 'Pulse Titan Gym Store',
      category: 'web',
      tags: ['HTML', 'CSS', 'JavaScript', 'PHP', 'SQL'],
      shortDesc: 'Dynamic e-commerce website for gym products, apparel, and supplements.',
      github: 'https://github.com/VinudaJayawardhana',
      live: '#',
      details: {
        problem: 'Fitness enthusiasts need a localized, fast, categories-based e-commerce platform.',
        solution: 'Implemented using custom HTML/CSS and PHP.',
        achievements: ['Modular catalog pages', 'Secure session management', 'Relational database mapping'],
        architecture: 'Browser Interface -> PHP Server -> SQL Database.'
      }
    }
  ]

  useEffect(() => {
    const fetchCloudNodes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'projects'))
        const fetched = querySnapshot.docs.map(doc => {
          const data = doc.data()
          return {
            id: doc.id,
            title: data.title || 'Untitled Node',
            category: data.category || 'web',
            tags: data.tags || ['Cloud Component'],
            shortDesc: data.shortDesc || 'No description provided.',
            github: data.github || 'https://github.com/VinudaJayawardhana',
            live: data.live || '#',
            details: data.details || { problem: 'N/A', solution: 'N/A', achievements: [], architecture: 'N/A' }
          }
        })
        setCloudProjects(fetched)
      } catch (error) {
        console.error("Error:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchCloudNodes()
  }, [])

  const projectsData = [...staticProjectsData, ...cloudProjects]
  const filteredProjects = filter === 'all' ? projectsData : projectsData.filter(proj => proj.category === filter)

  return (
    <motion.section 
      id="projects" 
      className="section projects-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <motion.h2 variants={cardVariants} className="section-title">My Projects</motion.h2>
      <motion.p variants={cardVariants} className="section-desc">
        Here are the software engineering, mobile development, and data science projects I've built.
      </motion.p>

      <div className="project-filters-container">
        <div className="project-filters glass-panel">
          {filterOptions.map((opt) => (
            <button
              key={opt.id}
              className={`filter-btn ${filter === opt.id ? 'active' : ''}`}
              onClick={() => setFilter(opt.id)}
            >
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
      </div>

      <motion.div 
        className="projects-grid"
        variants={containerVariants}
        layout // Animates position changes
      >
        <AnimatePresence mode="popLayout"> {/* Animate Presence for smooth entry/exit */}
          {filteredProjects.map((proj) => (
            <motion.div 
              key={proj.id} 
              className="project-card glass-panel glass-panel-hover"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
              onClick={() => handleCardClick(proj.id)}
              whileTap={{ scale: 0.97 }}
              style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
            >
              {/* Ripple glow burst on click */}
              {clickedCard === proj.id && (
                <motion.div
                  aria-hidden="true"
                  style={{
                    position: 'absolute', inset: 0,
                    background: 'radial-gradient(circle at 50% 30%, rgba(90,82,230,0.22) 0%, transparent 70%)',
                    borderRadius: 'inherit',
                    pointerEvents: 'none',
                    zIndex: 0,
                  }}
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={{ opacity: [0, 1, 0], scale: [0.4, 1.4, 1.8] }}
                  transition={{ duration: 0.65, ease: 'easeOut' }}
                />
              )}
              <div className="project-card-header" style={{ position: 'relative', zIndex: 1 }}>
                <motion.div
                  animate={clickedCard === proj.id ? { rotate: [0, -20, 20, -10, 0], scale: [1, 1.35, 1.1, 1.2, 1] } : {}}
                  transition={{ duration: 0.55, ease: 'easeOut' }}
                  style={{ display: 'inline-flex' }}
                >
                  <Code2 size={24} className="project-card-icon text-gradient" />
                </motion.div>
                <div className="project-card-links">
                  <a href={proj.github} target="_blank" rel="noopener noreferrer" className="project-link-btn"><Github size={18} /></a>
                  {proj.live !== '#' && <a href={proj.live} target="_blank" rel="noopener noreferrer" className="project-link-btn"><ExternalLink size={18} /></a>}
                </div>
              </div>

              <h3 className="project-card-title" style={{ position: 'relative', zIndex: 1 }}>{proj.title}</h3>
              <p className="project-card-desc" style={{ position: 'relative', zIndex: 1 }}>{proj.shortDesc}</p>

              <div className="project-card-tags" style={{ position: 'relative', zIndex: 1 }}>
                {proj.tags.map((tag, idx) => <span key={idx} className="project-tag glass-panel">{tag}</span>)}
              </div>

              <button onClick={(e) => { e.stopPropagation(); setSelectedProject(proj) }} className="btn btn-outline project-more-btn" style={{ position: 'relative', zIndex: 1 }}>
                <Plus size={16} /> Technical Details
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  )
}

export default Projects