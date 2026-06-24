import React from 'react'
import { Briefcase, GraduationCap, Award, Calendar } from 'lucide-react'

const Experience = () => {
  const journey = [
    {
      type: 'work',
      icon: <Briefcase size={18} />,
      role: 'Freelance Developer',
      company: 'Self-Employed (Ragama, Sri Lanka)',
      period: 'Nov 2025 - Present',
      desc: 'Designed and developed custom software solutions for client organizations to streamline business operations, improve daily workflows, and meet specific commercial objectives. Worked closely with clients to capture strict system constraints and deliver professional websites and apps.'
    },
    {
      type: 'education',
      icon: <GraduationCap size={18} />,
      role: 'BSc (Hons) in Information Technology',
      company: 'SLIIT CITY UNI, Colombo (Affiliated with University of Bedfordshire, UK)',
      period: '2024 - Present (Expected Graduation: May 2027)',
      desc: 'Currently in Year 2, Semester 2. Maintaining a GPA of 3.85/4.00. Earned place on the prestigious Dean’s List for outstanding academic scores in Year 1 Semester 1 and Semester 2. Relevant Coursework: Data Structures & Algorithms, OOP (Java), Database Management Systems, Computer Networking, Operating Systems.'
    },
    {
      type: 'education',
      icon: <GraduationCap size={18} />,
      role: 'Foundation Certificate of Computing',
      company: 'SLIIT CITY UNI',
      period: '2023 - 2024',
      desc: 'Completed computing foundation covering fundamental programming methodologies, databases, and mathematics for computer science.'
    },
    {
      type: 'education',
      icon: <Award size={18} />,
      role: 'GCE Ordinary Level Examination',
      company: 'O.K.I International School, Wattala',
      period: 'Completed in 2022',
      desc: 'Achieved outstanding results of 8 A grades and 1 B grade, demonstrating a strong academic foundation.'
    }
  ]

  return (
    <section id="experience" className="section experience-section">
      <h2 className="section-title">Education & Experience</h2>
      
      <p className="section-desc">
        A timeline tracking my academic qualifications, freelance work milestones, and achievements.
      </p>

      <div className="timeline-container">
        <div className="timeline-line"></div>

        {journey.map((item, index) => (
          <div key={index} className="timeline-item">
            {/* Dot Node */}
            <div className={`timeline-icon-node ${item.type} glass-panel`}>
              {item.icon}
            </div>

            {/* Content Panel */}
            <div className="timeline-content glass-panel glass-panel-hover">
              <div className="timeline-header">
                <div className="timeline-title-area">
                  <h3 className="timeline-role">{item.role}</h3>
                  <span className="timeline-company">{item.company}</span>
                </div>
                <div className="timeline-date-badge glass-panel">
                  <Calendar size={14} className="calendar-icon" />
                  <span>{item.period}</span>
                </div>
              </div>
              <p className="timeline-description">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Experience
