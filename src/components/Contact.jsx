import React, { useState } from 'react'
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' or 'error'

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required'
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear errors as user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)
    // Simulate sending email api
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
      // Clear success banner after 5s
      setTimeout(() => setSubmitStatus(null), 5000)
    }, 1500)
  }

  return (
    <section id="contact" className="section contact-section">
      <h2 className="section-title">Get In Touch</h2>
      
      <p className="section-desc">
        Have an internship opening, a freelance project, or want to discuss software systems? Drop me a message, and I'll get back to you as soon as possible.
      </p>

      <div className="contact-grid">
        {/* Contact Info Side */}
        <div className="contact-info-area">
          <h3 className="contact-subtitle">Contact Information</h3>
          <p className="contact-info-lead">Feel free to connect directly via email, phone, or check out my repositories online.</p>
          
          <div className="contact-cards-list">
            <div className="contact-detail-card glass-panel glass-panel-hover">
              <Mail className="detail-icon text-gradient" size={20} />
              <div className="detail-info">
                <span className="detail-label">Email Me</span>
                <a href="mailto:jayawardhanavinuda@gmail.com" className="detail-value">jayawardhanavinuda@gmail.com</a>
              </div>
            </div>

            <div className="contact-detail-card glass-panel glass-panel-hover">
              <Phone className="detail-icon text-gradient" size={20} />
              <div className="detail-info">
                <span className="detail-label">Call / WhatsApp</span>
                <a href="tel:+94711583969" className="detail-value">+94 711583969</a>
              </div>
            </div>

            <div className="contact-detail-card glass-panel glass-panel-hover">
              <MapPin className="detail-icon text-gradient" size={20} />
              <div className="detail-info">
                <span className="detail-label">My Location</span>
                <span className="detail-value">Ragama, Sri Lanka</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Side */}
        <div className="contact-form-area glass-panel">
          <h3 className="form-title">Send a Message</h3>
          
          {submitStatus === 'success' && (
            <div className="success-banner">
              <CheckCircle size={18} className="banner-icon" />
              <span>Thank you! Your message has been sent successfully.</span>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="error-banner">
              <AlertCircle size={18} className="banner-icon" />
              <span>Oops! Something went wrong. Please try again.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="contact-form">
            {/* Name Input */}
            <div className={`input-group ${errors.name ? 'has-error' : ''}`}>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder=" "
                className="form-input"
              />
              <label htmlFor="name" className="form-label">Full Name</label>
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            {/* Email Input */}
            <div className={`input-group ${errors.email ? 'has-error' : ''}`}>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder=" "
                className="form-input"
              />
              <label htmlFor="email" className="form-label">Email Address</label>
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            {/* Subject Input */}
            <div className={`input-group ${errors.subject ? 'has-error' : ''}`}>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder=" "
                className="form-input"
              />
              <label htmlFor="subject" className="form-label">Subject</label>
              {errors.subject && <span className="error-text">{errors.subject}</span>}
            </div>

            {/* Message Textarea */}
            <div className={`input-group ${errors.message ? 'has-error' : ''}`}>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                placeholder=" "
                className="form-input form-textarea"
              ></textarea>
              <label htmlFor="message" className="form-label">Your Message</label>
              {errors.message && <span className="error-text">{errors.message}</span>}
            </div>

            <button type="submit" disabled={isSubmitting} className="btn btn-primary btn-submit">
              {isSubmitting ? (
                <>Sending...</>
              ) : (
                <>
                  Send Message <Send size={16} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
