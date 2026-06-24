import React, { useState } from 'react'
import { ExternalLink, Github, Plus, Code2 } from 'lucide-react'

const Projects = ({ setSelectedProject }) => {
  const [filter, setFilter] = useState('all')

  const filterOptions = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web & Full-Stack' },
    { id: 'mobile', label: 'Mobile Apps' },
    { id: 'ai', label: 'AI & Data Science' }
  ]

  const projectsData = [
    {
      id: 1,
      title: 'iconX Mobile Store System',
      category: 'web',
      tags: ['React.js', 'Node.js', 'Firebase', 'VS Code'],
      shortDesc: 'A fully functional e-commerce site for a major smart mobile seller, featuring product trade-in workflows and admin business tracking portals.',
      github: 'https://github.com/VinudaJayawardhana',
      live: '#',
      details: {
        problem: 'Smart device retail shops struggle with disconnected platforms for online sales, manual employee attendance tracking, and dynamic calculations for mobile trade-in offers.',
        solution: 'Developed an integrated React portal that manages e-commerce shopping client-side, saves relational logs in Firebase, and equips store administrators with attendance grids and salary calculators.',
        achievements: [
          'Designed a mobile trade-in assessment interface allowing users to estimate device exchange values.',
          'Built an admin dashboard with a custom employee attendance register, report exporter, and salary calculator.',
          'Integrated real-time database sync in Firebase to manage fast product inventory updates.'
        ],
        architecture: 'Client Platform (React.js) -> Database Server (Node.js API) -> Realtime Storage (Firebase Database).'
      }
    },
    {
      id: 2,
      title: 'CardioShield AI Predictor',
      category: 'ai',
      tags: ['Python', 'Streamlit', 'Scikit-Learn', 'Spyder'],
      shortDesc: 'Award-winning AI risk assessment web application that estimates heart attack probabilities based on clinical reports.',
      github: 'https://github.com/VinudaJayawardhana',
      live: '#',
      details: {
        problem: 'Early clinical indicator detection for cardiovascular events is highly time-critical and requires analyzing multiple bodily checkup variables.',
        solution: 'Created a machine learning predictive system using Linear Regression methodologies. Trained and validated models on a processed clinical dataset of 8,000+ patient records, then deployed it using Streamlit.',
        achievements: [
          'Awarded "Best AI Project" in the Artificial Intelligence university course.',
          'Attained high evaluation metrics by training models on comprehensive diagnostic parameters.',
          'Crafted an intuitive clinical form in Streamlit allowing physicians to input diagnostic metrics and get instantly calculated risks.'
        ],
        architecture: 'Dataset Preprocessing -> ML Linear Regression Model (Python/Scikit-Learn) -> Web Frontend (Streamlit Framework).'
      }
    },
    {
      id: 3,
      title: 'TourLanka Android App',
      category: 'mobile',
      tags: ['Java', 'Android SDK', 'Firebase', 'Android Studio'],
      shortDesc: 'Tourism assistant application for Sri Lanka featuring package browsing, destination savers, and live weather reports.',
      github: 'https://github.com/VinudaJayawardhana',
      live: '#',
      details: {
        problem: 'International and local tourists in Sri Lanka lack a lightweight, consolidated mobile assistant for weather reports, hotels, and customized itinerary planning.',
        solution: 'Created a native Java Android application powered by Google Firebase, offering users interactive hotel lookup lists, trip packages, and real-time destination savers.',
        achievements: [
          'Engineered a localized Destination Saver using Android local preferences and Firebase cloud storage.',
          'Implemented third-party APIs to fetch real-time weather reports for key tourist hotspots in Sri Lanka.',
          'Achieved high responsive ratings across various Android screen ratios using XML layouts.'
        ],
        architecture: 'Native Android Client (Java/XML) -> External Services (Weather REST APIs) -> Real-time Database (Firebase Cloud).'
      }
    },
    {
      id: 4,
      title: 'Rohan Rubber Corporate Site',
      category: 'web',
      tags: ['HTML', 'CSS', 'JavaScript', 'SQL', 'VS Code'],
      shortDesc: 'Official web showcase platform for Rohan Rubber Industries, a leading manufacturer of industrial rubber items in Sri Lanka.',
      github: 'https://github.com/VinudaJayawardhana',
      live: 'https://www.rohanrubber.com/',
      details: {
        problem: 'Industrial manufacturing firms require clear catalog representations, client query routing, and product details mapping to capture enterprise orders.',
        solution: 'Built a responsive, professional corporate website representing products, processing systems, and enterprise contact pipelines.',
        achievements: [
          'Structured custom product grids with responsive layouts using CSS Flexbox/Grid structures.',
          'Developed interactive product inquiry forms utilizing client-side validation logic.',
          'Successfully deployed live on production servers under official domain names.'
        ],
        architecture: 'Web Client (HTML5/CSS3/Vanilla JS) -> Relational Product Map (SQL Database) -> Production Hosting.'
      }
    },
    {
      id: 5,
      title: 'Pulse Titan Gym Store',
      category: 'web',
      tags: ['HTML', 'CSS', 'JavaScript', 'PHP', 'SQL'],
      shortDesc: 'Dynamic e-commerce website for gym products, apparel, supplements, and fitness gear.',
      github: 'https://github.com/VinudaJayawardhana',
      live: '#',
      details: {
        problem: 'Fitness enthusiasts need a localized, fast, categories-based e-commerce platform offering gym gear, clothing, and dietary supplements.',
        solution: 'Designed and implemented an academic project showcase using custom HTML/CSS for structure, JavaScript for dynamic cart interactions, and PHP for processing customer purchases.',
        achievements: [
          'Created modular catalog pages filtered by apparel, supplements, and heavy gym gear.',
          'Implemented secure session management and dynamic user cart addition features in PHP.',
          'Mapped relational products database structures using SQL for secure inventory storage.'
        ],
        architecture: 'Browser Interface (HTML/CSS/JS) -> Server Routing (PHP) -> Relational Database (SQL).'
      }
    }
  ]

  const getProjectCount = (categoryId) => {
    if (categoryId === 'all') return projectsData.length
    return projectsData.filter(proj => proj.category === categoryId).length
  }

  const filteredProjects = filter === 'all' 
    ? projectsData 
    : projectsData.filter(proj => proj.category === filter)

  return (
    <section id="projects" className="section projects-section">
      <h2 className="section-title">My Projects</h2>
      
      <p className="section-desc">
        Here are the software engineering, mobile development, and data science projects I've built. Click on any card to view its system architecture and technical accomplishments.
      </p>

      {/* Filter Tabs */}
      <div className="project-filters-container">
        <div className="project-filters glass-panel">
          {filterOptions.map((opt) => (
            <button
              key={opt.id}
              className={`filter-btn ${filter === opt.id ? 'active' : ''}`}
              onClick={() => setFilter(opt.id)}
            >
              <span>{opt.label}</span>
              <span className="filter-count-bubble">{getProjectCount(opt.id)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="projects-grid">
        {filteredProjects.map((proj) => (
          <div key={proj.id} className="project-card glass-panel glass-panel-hover">
            <div className="project-card-header">
              <Code2 size={24} className="project-card-icon text-gradient" />
              <div className="project-card-links">
                <a 
                  href={proj.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="project-link-btn" 
                  aria-label="GitHub Repository"
                  data-tooltip="View Repo"
                >
                  <Github size={18} />
                </a>
                {proj.live !== '#' && (
                  <a 
                    href={proj.live} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="project-link-btn" 
                    aria-label="Live Site"
                    data-tooltip="Visit Site"
                  >
                    <ExternalLink size={18} />
                  </a>
                )}
              </div>
            </div>

            <h3 className="project-card-title">{proj.title}</h3>
            <p className="project-card-desc">{proj.shortDesc}</p>

            <div className="project-card-tags">
              {proj.tags.map((tag, idx) => (
                <span key={idx} className="project-tag glass-panel">{tag}</span>
              ))}
            </div>

            <button 
              onClick={() => setSelectedProject(proj)} 
              className="btn btn-outline project-more-btn"
            >
              <Plus size={16} /> Technical Details & Flow
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Projects
