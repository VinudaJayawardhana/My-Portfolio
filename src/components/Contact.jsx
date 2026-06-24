import React, { useState } from 'react'
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  }

  const leftPanelVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
  }

  const rightPanelVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email required'
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required'
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)

    // Configuration using your provided keys
    const serviceID = 'service_f1411xp'
    const templateID = 'template_pk1kumj'
    const publicKey = 'MDdHi3pvdNMMENmnh'

    emailjs.send(serviceID, templateID, formData, publicKey)
      .then(() => {
        setIsSubmitting(false)
        setSubmitStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setSubmitStatus(null), 5000)
      })
      .catch((error) => {
        setIsSubmitting(false)
        setSubmitStatus('error')
        console.error('EmailJS Error:', error)
      })
  }

  return (
    <motion.section 
      id="contact" 
      className="section contact-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <h2 className="section-title">Get In Touch</h2>
      <p className="section-desc">Have an opportunity or project? Drop me a message.</p>

      <div className="contact-grid">
        <motion.div className="contact-info-area" variants={leftPanelVariants}>
          <h3 className="contact-subtitle">Contact Information</h3>
          <p className="contact-info-lead">Connect directly via email, phone, or online.</p>
          
          <div className="contact-cards-list">
            {[
              { icon: Mail, label: 'Email Me', value: 'jayawardhanavinuda@gmail.com', href: 'mailto:jayawardhanavinuda@gmail.com' },
              { icon: Phone, label: 'Call / WhatsApp', value: '+94 711583969', href: 'tel:+94711583969' },
              { icon: MapPin, label: 'My Location', value: 'Ragama, Sri Lanka' }
            ].map((item, idx) => (
              <motion.div 
                key={idx} 
                className="contact-detail-card glass-panel glass-panel-hover"
                whileHover={{ scale: 1.02 }}
              >
                <item.icon className="detail-icon text-gradient" size={20} />
                <div className="detail-info">
                  <span className="detail-label">{item.label}</span>
                  {item.href ? (
                    <a href={item.href} className="detail-value">{item.value}</a>
                  ) : (
                    <span className="detail-value">{item.value}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div className="contact-form-area glass-panel" variants={rightPanelVariants}>
          <h3 className="form-title">Send a Message</h3>
          
          {submitStatus === 'success' && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="success-banner">
              <CheckCircle size={18} /> <span>Message sent successfully!</span>
            </motion.div>
          )}
          {submitStatus === 'error' && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="error-banner">
              <AlertCircle size={18} /> <span>Failed to send. Please try again.</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="contact-form">
            <div className={`input-group ${errors.name ? 'has-error' : ''}`}>
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder=" " className="form-input" />
              <label className="form-label">Full Name</label>
            </div>
            <div className={`input-group ${errors.email ? 'has-error' : ''}`}>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder=" " className="form-input" />
              <label className="form-label">Email Address</label>
            </div>
            <div className={`input-group ${errors.subject ? 'has-error' : ''}`}>
              <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder=" " className="form-input" />
              <label className="form-label">Subject</label>
            </div>
            <div className={`input-group ${errors.message ? 'has-error' : ''}`}>
              <textarea name="message" rows="4" value={formData.message} onChange={handleChange} placeholder=" " className="form-input form-textarea"></textarea>
              <label className="form-label">Your Message</label>
            </div>

            <button type="submit" disabled={isSubmitting} className="btn btn-primary btn-submit">
              {isSubmitting ? 'Sending...' : <>Send Message <Send size={16} /></>}
            </button>
          </form>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default Contact