import React from 'react';
import { Terminal } from 'lucide-react';
import './Logo.css';

const Logo = () => {
  return (
    <div className="logo-brand">
      {/* Icon Wrapper with a sleek glassmorphism feel */}
      <div className="logo-icon-wrapper">
        <Terminal size={20} className="logo-icon" />
      </div>
      
      {/* Text Grouping */}
      <div className="logo-text-group">
        <div className="logo-title">
          Vinuda <span className="logo-highlight">Jayawardhana</span>
        </div>
        <div className="logo-subtitle">vinuda.dev</div>
      </div>
    </div>
  );
};

export default Logo;