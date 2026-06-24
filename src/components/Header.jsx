import React, { useState, useEffect } from 'react'
import { Sun, Moon, Menu, X, Terminal, Database, ArrowLeft, LayoutDashboard } from 'lucide-react'

const Header = ({ theme, toggleTheme, currentView, onViewChange }) => {
  const [activeSection, setActiveSection] = useState('home')
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' }
  ]

  const isAdmin = currentView !== 'portfolio';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Logic to highlight tab based on scroll position
  useEffect(() => {
    if (isAdmin) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, {
      root: null,
      rootMargin: '-30% 0px -50% 0px',
      threshold: 0
    });

    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [isAdmin]);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setActiveSection(id);
    
    if (isAdmin) {
      onViewChange('portfolio');
      // Wait for view change to render before scrolling
      setTimeout(() => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className={`navbar glass-panel ${isScrolled ? 'navbar-scrolled' : ''} ${isAdmin ? 'admin-mode-navbar' : ''}`}>
        <div className="navbar-container">
          <a href="#home" className="navbar-logo" onClick={(e) => handleNavClick(e, 'home')}>
            <Terminal size={24} className="logo-icon" />
            <span>vinuda<span className="text-gradient">.dev</span></span>
          </a>

          <div className="navbar-links">
            {isAdmin ? (
              <div className="admin-status-badge">
                <LayoutDashboard size={16} /> 
                <span>SYSTEM_WORKSPACE_ACTIVE</span>
              </div>
            ) : (
              navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                >
                  {item.label}
                </a>
              ))
            )}
          </div>

          <div className="navbar-actions">
            <button onClick={toggleTheme} className="theme-toggle-btn" aria-label="Toggle Theme">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <button 
              onClick={() => onViewChange(isAdmin ? 'portfolio' : 'admin')} 
              className={`btn ${isAdmin ? 'btn-primary' : 'btn-outline'} btn-nav`}
            >
              {isAdmin ? <><ArrowLeft size={14} /> Back</> : <><Database size={14} /> Admin</>}
            </button>

            <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-drawer glass-panel ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-links">
          {isAdmin ? (
            <div className="admin-status-badge" style={{ justifyContent: 'center' }}>
              <LayoutDashboard size={16} /> 
              <span>SYSTEM_WORKSPACE_ACTIVE</span>
            </div>
          ) : (
            navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`mobile-nav-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={(e) => {
                  handleNavClick(e, item.id);
                  setMobileMenuOpen(false);
                }}
              >
                {item.label}
              </a>
            ))
          )}
        </div>
      </div>
    </>
  )
}


export default Header