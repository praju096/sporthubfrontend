import React from 'react';
import Footer from '../Home/Footer';
import './About.css';

const About: React.FC = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <div className="about-hero">
        <div className="container">
          <h1>About Sport Hub</h1>
          <p>Your premier destination for all things sports</p>
        </div>
      </div>

      <div className="container">
        {/* Our Story */}
        <section className="our-story">
          <h2>Our Story</h2>
          <p>
            Founded in 2025, Sport Hub began as a small local shop dedicated to providing 
            high-quality sports equipment to amateur athletes in our community. Today, 
            we've grown into one of the leading online sports retailers, serving customers 
            across the country with the same passion and commitment to quality that 
            started it all.
          </p>
          <p>
            Our team consists of former athletes, fitness enthusiasts, and sports 
            professionals who understand exactly what you need to perform at your best.
          </p>
        </section>

        {/* Core Values */}
        <section className="core-values">
          <h2>Our Core Values</h2>
          <div className="values-grid">
            <div className="value-card shadow-lg">
              <div className="value-icon">🏆</div>
              <h3>Performance</h3>
              <p>We provide equipment that helps athletes achieve their personal best.</p>
            </div>
            
            <div className="value-card shadow-lg">
              <div className="value-icon">🚚</div>
              <h3>Service</h3>
              <p>Fast shipping and hassle-free returns because we know your time is valuable.</p>
            </div>
            
            <div className="value-card shadow-lg">
              <div className="value-icon">🎧</div>
              <h3>Expertise</h3>
              <p>Our team provides knowledgeable advice to help you make the right choices.</p>
            </div>
            
            <div className="value-card shadow-lg">
              <div className="value-icon">🌱</div>
              <h3>Sustainability</h3>
              <p>We're committed to eco-friendly products and sustainable business practices.</p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default About;
