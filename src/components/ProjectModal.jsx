import React, { useEffect } from 'react'
import { X, Github, ExternalLink, ShieldCheck, Cpu, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion' // Added Framer Motion

const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = 'unset' }
  }, [])

  // Animation Variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 300, damping: 25 } 
    },
    exit: { opacity: 0, scale: 0.9, y: 20 }
  }

  return (
    <AnimatePresence>
      <motion.div 
        className="modal-backdrop" 
        onClick={onClose}
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={backdropVariants}
      >
        <motion.div 
          className="modal-content glass-panel"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking content
          variants={modalVariants}
        >
          {/* Modal Header */}
          <div className="modal-header">
            <div className="modal-category-badge text-gradient">
              {project.category.toUpperCase()} PROJECT
            </div>
            <button className="modal-close-btn" onClick={onClose} aria-label="Close Modal">
              <X size={20} />
            </button>
          </div>

          {/* Modal Scrollable Body */}
          <div className="modal-body">
            <h3 className="modal-title">{project.title}</h3>
            
            <div className="modal-tags">
              {project.tags.map((tag, idx) => (
                <span key={idx} className="project-tag modal-tag glass-panel">{tag}</span>
              ))}
            </div>

            <hr className="modal-divider" />

            <div className="modal-text-section">
              <h4 className="modal-section-title">
                <Cpu size={16} className="modal-section-icon" /> Overview
              </h4>
              <div className="modal-qa">
                <div className="qa-item">
                  <span className="qa-label">The Challenge:</span>
                  <p className="qa-text">{project.details.problem}</p>
                </div>
                <div className="qa-item">
                  <span className="qa-label">The Solution:</span>
                  <p className="qa-text">{project.details.solution}</p>
                </div>
              </div>
            </div>

            <div className="modal-text-section">
              <h4 className="modal-section-title">
                <ShieldCheck size={16} className="modal-section-icon" /> Engineering Accomplishments
              </h4>
              <ul className="modal-achievements-list">
                {project.details.achievements.map((ach, idx) => (
                  <li key={idx} className="achievement-item">
                    <ArrowRight size={14} className="bullet-arrow" />
                    <span>{ach}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="modal-text-section">
              <h4 className="modal-section-title">System Data Flow & Architecture</h4>
              <div className="architecture-box glass-panel">
                <code>{project.details.architecture}</code>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="modal-footer">
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              <Github size={18} /> View Repository
            </a>
            {project.live && project.live !== '#' && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <ExternalLink size={18} /> Visit Live Site
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ProjectModal