import React, { useState } from 'react';
import Footer from '../Home/Footer';
import './Contact.css';
import { toast } from 'react-toastify';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you can handle form submission, e.g., send data to an API
    console.log('Form submitted:', formData);
    toast.success('Message sent successfully!');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <div className="container text-white">
          <h1 className="display-4 fw-bold">Contact Us</h1>
          <p className="lead">If you have any questions, feel free to reach out to us!</p>
        </div>
      </div>

      <div className="container">
        <div className="contact-grid">
          <div className="contact-form-section">
            <h2 className='text-danger fw-bold'>Send us a message</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-outline-danger">
                Send Message
              </button>
            </form>
          </div>

          <div className="contact-info-section">
            <h2 className='text-danger fw-bold'>Get in touch</h2>
            <div className="contact-info-card">
              <div className="info-item">
                <div className="info-icon"><i className="fas fa-location text-danger"></i></div>
                <div className="info-content">
                  <h4>Our Location</h4>
                  <p>123 Sports Avenue, Vadodara, GJ 10001</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon"><i className="fas fa-phone text-danger"></i></div>
                <div className="info-content">
                  <h4>Phone Number</h4>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon"><i className="fas fa-envelope text-danger"></i></div>
                <div className="info-content">
                  <h4>Email Address</h4>
                  <p>support@sporthub.com</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon"><i className="fas fa-clock text-danger"></i></div>
                <div className="info-content">
                  <h4>Opening Hours</h4>
                  <p>Monday - Friday: 9:00 - 18:00</p>
                  <p>Saturday: 10:00 - 16:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="map-section">
          <iframe
            title="Sport Hub Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4028.4437497739696!2d73.14876824082722!3d22.333070053928324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc8e8dffa6a45%3A0x474d3c0731c3e6bf!2sGorwa%2C%20Vadodara%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1755768701678!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <Footer />


    </div>
  );
};

export default Contact;
