import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Trophy, Heart, Cpu, Code, Shield, Download } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: <GraduationCap size={20} />, label: 'Education', value: 'BSc (Hons) in Computer Science', sub: 'Bedfordshire & SLIIT City Uni', progress: 90 },
    { icon: <Award size={20} />, label: 'Academic Standing', value: 'GPA 3.85 / 4.00', sub: "Dean's List Honors", progress: 96 },
    { icon: <Trophy size={20} />, label: 'Distinction', value: 'Best AI Project', sub: 'CardioShield AI Award', progress: 100 }
  ];

  const certifications = ['Introduction to Artificial Intelligence', 'Introduction to User Experience (UX) Designing'];
  
  const interests = [
    { icon: <Code size={14} />, text: 'Web Application Development' },
    { icon: <Cpu size={14} />, text: 'Android App Development' },
    { icon: <Heart size={14} />, text: 'Artificial Intelligence' },
    { icon: <Shield size={14} />, text: 'Security & Pentesting Tools' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <motion.section 
      id="about" 
      className="section about-section"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.h2 variants={itemVariants} className="section-title">About Me</motion.h2>

      <div className="about-grid">
        {/* Left: Profile Photo Card */}
        <motion.div variants={itemVariants} className="about-image-area">
          <div className="profile-photo-card glass-panel">
            <div className="profile-ring-wrapper">
                <div className="profile-ring">
                <div className="profile-photo-circle">
                  <img src="/me_2.jpg" alt="Vinuda Jayawardhana" className="profile-photo-img" />
                </div>
              </div>
            </div>
            
            <div className="profile-info-block">
              <h3 className="profile-name">Vinuda Jayawardhana</h3>
              <p className="profile-role text-gradient">Software Engineering Undergraduate</p>
              <p className="profile-location">📍 Ragama, Sri Lanka</p>
              
              {/* Refined Grab My CV Button */}
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/Vinuda_Jayawardhana_CV_1.pdf" 
                download="Vinuda_Jayawardhana_CV.pdf"
                className="glass-panel cv-btn"
              >
                <Download size={16} /> Grab My CV
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Right: Text Content */}
        <div className="about-text-area">
          <motion.h3 variants={itemVariants} className="about-subtitle">
            Crafting elegant software and solving <span className="text-gradient">complex problems</span>.
          </motion.h3>

          <motion.div variants={itemVariants}>
            <p className="about-paragraph">
              I am a Computer Science undergraduate with a passion for building scalable, secure, and user-centric digital experiences. 
              My academic journey has provided me with a rigorous foundation in algorithms, systems architecture, and modern software development lifecycles.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="stats-container">
            {stats.map((stat, i) => (
              <div key={i} className="stat-card glass-panel">
                <div className="stat-header"><span>{stat.icon}</span> {stat.label}</div>
                <div className="stat-value">{stat.value}</div>
                <div className="progress-bar-track"><div className="progress-bar-fill" style={{ width: `${stat.progress}%` }}></div></div>
              </div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="about-meta-grid">
            <div className="about-certifications glass-panel">
              <h4>Certifications</h4>
              {certifications.map((c, i) => <p key={i}>• {c}</p>)}
            </div>
            <div className="about-hobbies glass-panel">
              <h4>Fields of Interest</h4>
              <div className="hobby-tags">
                {interests.map((h, i) => <span key={i} className="hobby-tag">{h.icon} {h.text}</span>)}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;