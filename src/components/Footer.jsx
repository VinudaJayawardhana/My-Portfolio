import React from 'react'
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'

const Footer = () => {
  // Use scrollIntoView to ensure reliable scrolling to the top section
  const scrollToTop = () => {
    const homeElement = document.getElementById('home')
    if (homeElement) {
      homeElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      })
    } else {
      // Fallback if home element isn't found
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }

  return (
    <footer className="footer-panel glass-panel">
      <div className="footer-container">
        <div className="footer-left">
          <p className="footer-copyright">
            © {new Date().getFullYear()} <span className="text-gradient">Vinuda Jayawardhana</span>. All rights reserved.
          </p>
          <p className="footer-subtext">Designed & Engineered using React and Vanilla CSS</p>
        </div>

        <div className="footer-right">
          <div className="footer-socials">
            <a href="https://github.com/VinudaJayawardhana" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="GitHub">
              <Github size={18} />
            </a>
            <a href="https://www.linkedin.com/in/vinuda-jayawardhana-92a43934a/" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href="mailto:jayawardhanavinuda@gmail.com" className="footer-social-link" aria-label="Email">
              <Mail size={18} />
            </a>
            <a href="https://wa.me/+94711583969" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="WhatsApp">
              <FaWhatsapp size={18} />
            </a>
          </div>

          <button 
            onClick={scrollToTop} 
            className="btn-scroll-top glass-panel" 
            aria-label="Back to top"
            style={{ cursor: 'pointer' }}
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer