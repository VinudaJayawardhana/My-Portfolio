import React from 'react'
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <footer className="footer-panel glass-panel">
      <div className="footer-container">
        <div className="footer-left">
          <p className="footer-copyright">
            © {new Date().getFullYear()} <span className="text-gradient">Vinuda Jayawardhana</span>. All rights reserved.
          </p>
          <p className="footer-subtext">Designed & Engineered with React & Vanilla CSS.</p>
        </div>

        <div className="footer-right">
          <div className="footer-socials">
            <a href="https://github.com/VinudaJayawardhana" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="GitHub">
              <Github size={18} />
            </a>
            <a href="https://www.linkedin.com/in/vinuda-jayawardhana" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href="mailto:jayawardhanavinuda@gmail.com" className="footer-social-link" aria-label="Email">
              <Mail size={18} />
            </a>
          </div>

          <button onClick={scrollToTop} className="btn-scroll-top glass-panel" aria-label="Scroll to top" data-tooltip="Back to Top">
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
