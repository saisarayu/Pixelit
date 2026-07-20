import React, { useState, useEffect } from 'react';

export default function Navbar({ onOpenSignUp, soundEnabled, onToggleSound }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      let current = 'home';
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute('id');
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header class="navbar-wrapper">
      <nav class="navbar glass-panel">
        <div class="nav-brand">
          <div class="logo-icon-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img 
              src="/images/pixelit_logo.png" 
              alt="PixelIT Logo" 
              class="brand-logo"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
          <div class="brand-text">
            <span class="brand-name">
              PIXEL<span class="highlight">IT</span>
            </span>
            <span class="brand-sub">TECHNICAL CLUB</span>
          </div>
        </div>

        <ul class={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <li class="nav-item">
            <a
              href="#home"
              class={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </a>
          </li>
          <li class="nav-item">
            <a
              href="#about"
              class={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </a>
          </li>
          <li class="nav-item">
            <a
              href="#values"
              class={`nav-link ${activeSection === 'values' ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Core Values
            </a>
          </li>
          <li class="nav-item">
            <a
              href="#activities"
              class={`nav-link ${activeSection === 'activities' ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Activities
            </a>
          </li>
          <li class="nav-item">
            <a
              href="#cycle"
              class={`nav-link ${activeSection === 'cycle' ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Methodology
            </a>
          </li>
          <li class="nav-item">
            <a
              href="#team"
              class={`nav-link ${activeSection === 'team' ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Core Team
            </a>
          </li>
        </ul>

        <div class="nav-actions">
          <button
            class="btn btn-outline"
            onClick={onToggleSound}
            title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
          >
            <i class={`fa-solid ${soundEnabled ? 'fa-volume-high' : 'fa-volume-xmark'}`}></i>
          </button>
          <button class="btn btn-primary" onClick={onOpenSignUp}>
            <span>Sign Up</span>
            <i class="fa-solid fa-arrow-right"></i>
          </button>
          <button
            class="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <i class={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </button>
        </div>
      </nav>
    </header>
  );
}
