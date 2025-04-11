import React, { useState } from 'react';
import { Menu, X, LogIn } from 'lucide-react';
import './Home.css';
import LoginPage from './LoginPage';

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToLogin = () => {
    const loginSection = document.getElementById('login');
    if (loginSection) {
      loginSection.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  return (
    <div className="app-container">
      <header className="header">
        <div
          className="logo"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <img
            src="https://thumbs.dreamstime.com/b/electrician-has-screwdriver-his-hand-89764045.jpg?w=768"
            alt="logo"
            style={{
              width: '100px',
              height: '80px',
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
          <span
            style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              fontFamily: "'Vollkorn', serif",
            }}
          >
            CampusFix
          </span>
        </div>

        <nav className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <ul>
            <li>
              <a href="#hero" onClick={() => setMenuOpen(false)}>
                Home
              </a>
            </li>
            <li>
              <a href="#features" onClick={() => setMenuOpen(false)}>
                Features
              </a>
            </li>
            <li>
              <a href="#services" onClick={() => setMenuOpen(false)}>
                Services
              </a>
            </li>
            <li>
              <a href="#about" onClick={() => setMenuOpen(false)}>
                About
              </a>
            </li>
            <li>
              <a href="#footer" onClick={() => setMenuOpen(false)}>
                Contact
              </a>
            </li>
            <li className="mobile-only login-item">
              <button className="login-link" onClick={scrollToLogin}>
                <LogIn size={18} />
                <span>Login</span>
              </button>
            </li>
          </ul>
        </nav>

        <div className="header-buttons">
          <button className="btn-primary desktop-btn" onClick={scrollToLogin}>
            Get Started
          </button>
          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <section className="hero" id='hero'>
        <div className="hero-content">
          <h1>Redefining Campus Life Through Technology</h1>
          <p>
            Integrated platform for facility management, student services, and
            campus engagement.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={scrollToLogin}>
              Explore Features
            </button>
            <button className="btn-primary" onClick={scrollToLogin}>
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      <section id="features" className="features">
        <h2>Core Features</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <i className="fas fa-bed"></i>
            <h3>Hostel Management</h3>
            <p>Streamlined hostel operations and maintenance tracking system.</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-university"></i>
            <h3>Campus Management</h3>
            <p>Comprehensive tools for efficient campus facility management.</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-exclamation-circle"></i>
            <h3>Complaint Management</h3>
            <p>Quick and efficient issue reporting and resolution system.</p>
          </div>
        </div>
      </section>

      <section id="services" className="maintenance">
        <h2>Campus Maintenance Services</h2>
        <p>Quick solutions for hostel and campus facility issues</p>
        <div className="services-grid">
          {[
            {
              img: 'https://tridentairnc.com/wp-content/uploads/2025/01/Plumbing-10.jpeg',
              title: 'Plumbing Services',
              desc:
                '24/7 emergency pipe repairs, leak fixes, and drainage solutions.',
            },
            {
              img:
                'https://www.snellheatingandair.com/wp-content/uploads/Electrical-Services-Technician-Snell-Image.jpg',
              title: 'Electrical Repairs',
              desc:
                'Quick response for wiring issues, power outages, and appliance repairs.',
            },
            {
              img:
                'https://carpentry-services-dubai.com/wp-content/uploads/doors-installation-repairing/Door-Repairing-Carpenter-Villa-Main-Entrance-Door-installation-Replace.webp',
              title: 'Carpentry Services',
              desc:
                'Furniture repairs, door/window fixes, and custom installations.',
            },
          ].map((svc, i) => (
            <div key={i} className="service-card">
              <img src={svc.img} alt={svc.title} />
              <div className="service-card-content">
                <h3>{svc.title}</h3>
                <p>{svc.desc}</p>
                <button
                  className="btn-primary"
                  onClick={scrollToLogin}
                >
                  Report Issue
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        id="about"
        style={{
          background: 'var(--gradient-primary)',
          color: 'white',
          padding: '8rem 6%',
          borderRadius: '10px',
          marginBottom: '6rem',
          marginTop:'2rem',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            alignItems: 'center',
          }}
        >
          <div style={{ borderRadius: '1.5rem', overflow: 'hidden' }}>
            <img
              src="https://res.cloudinary.com/tharunbudidha/image/upload/v1744152469/cttt-removebg-preview_xxbgag.png"
              alt="CampusFix Team"
              style={{ width: '100%', height: '400px', objectFit: 'cover' }}
            />
          </div>
          <div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>
              About CampusFix
            </h2>
            <p style={{ marginBottom: '1.5rem', lineHeight: '1.7' }}>
              CampusFix is a comprehensive campus management platform designed to
              streamline student life and administrative operations. Our mission
              is to bridge the gap between students and campus services through
              technology, ensuring seamless access to essential resources.
            </p>
            <ul
              style={{
                listStyle: 'none',
                marginBottom: '2rem',
                padding: 0,
              }}
            >
              {[
                'Real-time facility booking system',
                'Instant maintenance request tracking',
                'Integrated event management portal',
              ].map((item, idx) => (
                <li
                  key={idx}
                  style={{
                    marginBottom: '1rem',
                    paddingLeft: '1.5rem',
                    position: 'relative',
                  }}
                >
                  <i
                    className="fas fa-check"
                    style={{ position: 'absolute', left: 0 }}
                  ></i>
                  {item}
                </li>
              ))}
            </ul>
            <button
              className="btn"
              style={{
                background: 'white',
                color: 'var(--dark)',
                padding: '1rem 2rem',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer',
              }}
              onClick={scrollToLogin}
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* This is the login section */}
      <section id="login" className="login-section">
        <LoginPage />
      </section>

      <footer id="footer" className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>Email: tharunbudidha@gmail.com</p>
            <p>Phone: +91 9948672403</p>
          </div>
          <div className="footer-section">
            <h3 style={{ position: 'relative' }}>
              <i
                className="fas fa-code"
                style={{
                  position: 'absolute',
                  left: '-35px',
                  top: '3px',
                  fontSize: '1.5rem',
                  color: 'var(--accent)',
                }}
              ></i>
              Development Team
            </h3>
            <div className="developer-info">
              <p className="developer-name">Tharun Budidha</p>
              <p className="developer-role">Full Stack Developer</p>
              <a
                href="https://www.linkedin.com/in/tharun-budidha"
                target="_blank"
                rel="noopener noreferrer"
                className="developer-link"
                style={{ color: 'white' }}
              >
                <i className="fab fa-linkedin" style={{ color: 'white' }}></i>{' '}
                Portfolio & Experience
              </a>
            </div>
          </div>
          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-links">
              <a
                href="https://www.linkedin.com/in/tharun-budidha"
                aria-label="Linkedin"
              >
                Linkedin
              </a>
              <a href="#" aria-label="Instagram">
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 CampusFix. All rights reserved.</p>
          <p className="credits">
            Crafted with <span className="heart">❤️</span> by Tharun Budidha
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
