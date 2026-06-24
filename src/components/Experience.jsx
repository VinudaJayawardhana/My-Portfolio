import React, { useState, useEffect } from 'react'
import { Briefcase, GraduationCap, Award, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'
import { db } from '../firebase'
import { collection, getDocs } from 'firebase/firestore'

const Experience = () => {
  const [cloudJourney, setCloudJourney] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [clickedCard, setClickedCard] = useState(null)

  const handleCardClick = (id) => {
    setClickedCard(id)
    setTimeout(() => setClickedCard(null), 800)
  }

  // Container variants for staggering the list items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  }

  // Unique animation: Scale-up pop with subtle rotation
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.85, 
      rotate: -2 
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotate: 0,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15,
        duration: 0.8 
      } 
    }
  }

  const getTimelineIcon = (type) => {
    switch (type) {
      case 'work': return <Briefcase size={18} />
      case 'award': return <Award size={18} />
      case 'education': default: return <GraduationCap size={18} />
    }
  }

  const getStartYear = (periodString) => {
    if (!periodString) return 0
    const match = periodString.match(/\b(19|20)\d{2}\b/)
    return match ? parseInt(match[0], 10) : 0
  }

  const staticJourney = [
    {
      id: 'static-exp-1',
      type: 'work',
      role: 'Freelance Developer',
      company: 'Self-Employed (Ragama, Sri Lanka)',
      period: 'Nov 2025 - Present',
      desc: 'Designed and developed custom software solutions for client organizations to streamline business operations, improve daily workflows, and meet specific commercial objectives.'
    },
    {
      id: 'static-exp-2',
      type: 'education',
      role: 'BSc (Hons) in Computer Science',
      company: 'University of Bedfordshire',
      period: '2026 - Present',
      desc: 'Currently in Year 2, Semester 2. Maintaining a GPA of 3.85/4.00. Earned place on the Dean’s List for outstanding academic scores.'
    },

    {
      id: 'static-exp-3',
      type: 'education',
      role: 'Higher Diploma in Information Technology',
      company: 'SLIIT CITY UNI, Colombo',
      period: '2024 - Present',
      desc: 'Currently in Year 2, Semester 2. Maintaining a GPA of 3.85/4.00. Earned place on the Dean’s List for outstanding academic scores.'
    },
    {
      id: 'static-exp-4',
      type: 'education',
      role: 'Foundation Certificate of Computing',
      company: 'SLIIT CITY UNI',
      period: '2023 - 2024',
      desc: 'Completed computing foundation covering fundamental programming methodologies, databases, and mathematics.'
    },
    {
      id: 'static-exp-5',
      type: 'award',
      role: 'GCE Ordinary Level Examination',
      company: 'O.K.I International School, Wattala',
      period: 'Completed in 2022',
      desc: 'Achieved outstanding results of 8 A grades and 1 B grade, demonstrating a strong academic foundation.'
    }
  ]

  useEffect(() => {
    const fetchCloudExperience = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'experience'))
        const fetched = querySnapshot.docs.map(doc => {
          const data = doc.data()
          return {
            id: doc.id,
            type: data.type || 'education',
            role: data.role || 'Untitled Role',
            company: data.company || 'Entity',
            period: data.period || 'Timeline',
            desc: data.desc || 'No details provided.'
          }
        })
        setCloudJourney(fetched)
      } catch (error) {
        console.error("Error drawing live timeline:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchCloudExperience()
  }, [])

  const journey = [...cloudJourney, ...staticJourney].sort((a, b) => getStartYear(b.period) - getStartYear(a.period))

  return (
    <motion.section 
      id="experience" 
      className="section experience-section"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.h2 variants={itemVariants} className="section-title">Education & Experience</motion.h2>
      
      <motion.p variants={itemVariants} className="section-desc">
        A timeline tracking my academic qualifications, freelance work milestones, and achievements.
      </motion.p>

      <div className="timeline-container">
        <div className="timeline-line"></div>

        {journey.map((item, index) => (
          <motion.div 
            key={item.id || index} 
            className="timeline-item"
            variants={itemVariants}
          >
            <motion.div
              className={`timeline-icon-node ${item.type} glass-panel`}
              animate={clickedCard === (item.id || index) ? { scale: [1, 1.4, 1.15, 1.2, 1], rotate: [0, -15, 15, -8, 0] } : {}}
              transition={{ duration: 0.55, ease: 'easeOut' }}
            >
              {getTimelineIcon(item.type)}
            </motion.div>

            <motion.div
              className="timeline-content glass-panel glass-panel-hover"
              onClick={() => handleCardClick(item.id || index)}
              whileTap={{ scale: 0.98 }}
              style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
            >
              {/* Ripple glow burst on click */}
              {clickedCard === (item.id || index) && (
                <motion.div
                  aria-hidden="true"
                  style={{
                    position: 'absolute', inset: 0,
                    background: item.type === 'work'
                      ? 'radial-gradient(circle at 20% 50%, rgba(90,82,230,0.2) 0%, transparent 70%)'
                      : item.type === 'award'
                        ? 'radial-gradient(circle at 20% 50%, rgba(245,158,11,0.2) 0%, transparent 70%)'
                        : 'radial-gradient(circle at 20% 50%, rgba(45,212,191,0.18) 0%, transparent 70%)',
                    borderRadius: 'inherit',
                    pointerEvents: 'none',
                    zIndex: 0,
                  }}
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={{ opacity: [0, 1, 0], scale: [0.4, 1.5, 2] }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                />
              )}
              <div className="timeline-header" style={{ position: 'relative', zIndex: 1 }}>
                <div className="timeline-title-area">
                  <h3 className="timeline-role">{item.role}</h3>
                  <span className="timeline-company">{item.company}</span>
                </div>
                <div className="timeline-date-badge glass-panel">
                  <Calendar size={14} className="calendar-icon" />
                  <span>{item.period}</span>
                </div>
              </div>
              <p className="timeline-description" style={{ position: 'relative', zIndex: 1 }}>{item.desc}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

export default Experience