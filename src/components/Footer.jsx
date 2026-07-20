import React from 'react';

export default function Footer() {
  return (
    <footer class="footer">
      <div class="container footer-container">
        <div class="footer-brand-col">
          <div class="nav-brand footer-logo-box">
            <img src="/images/pixelit_logo.png" alt="PixelIT Logo" class="brand-logo" />
            <div class="brand-text">
              <span class="brand-name">
                PIXEL<span class="highlight">IT</span>
              </span>
              <span class="brand-sub">TECHNICAL CLUB</span>
            </div>
          </div>

          <p class="footer-motto">Learn. Build. Share. Improve. Repeat.</p>

          <div class="social-links">
            <a
              href="https://www.instagram.com/pixelit_kare/"
              target="_blank"
              rel="noopener noreferrer"
              class="social-icon"
              aria-label="Instagram"
              title="Instagram"
            >
              <i class="fa-brands fa-instagram"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/pixelit-it-242a69330/"
              target="_blank"
              rel="noopener noreferrer"
              class="social-icon"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <i class="fa-brands fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        <div class="footer-links-col">
          <h4 class="footer-heading">Directory</h4>
          <ul class="footer-links">
            <li>
              <a href="#about">
                <i class="fa-solid fa-angle-right"></i> About Us
              </a>
            </li>
            <li>
              <a href="#values">
                <i class="fa-solid fa-angle-right"></i> Community
              </a>
            </li>
            <li>
              <a href="#activities">
                <i class="fa-solid fa-angle-right"></i> Activities
              </a>
            </li>
            <li>
              <a href="#cycle">
                <i class="fa-solid fa-angle-right"></i> Resources
              </a>
            </li>
            <li>
              <a href="#team">
                <i class="fa-solid fa-angle-right"></i> Core Team
              </a>
            </li>
          </ul>
        </div>

        <div class="footer-links-col">
          <h4 class="footer-heading">Annual Events</h4>
          <ul class="footer-links">
            <li>
              <a href="#activities">
                <i class="fa-solid fa-caret-right text-cyan"></i> Byte'tember Innovation Sprint
              </a>
            </li>
            <li>
              <a href="#activities">
                <i class="fa-solid fa-caret-right text-purple"></i> Vintra 2025 — Rapid Build
              </a>
            </li>
            <li>
              <a href="#activities">
                <i class="fa-solid fa-caret-right text-magenta"></i> Euphoria 2026 — Pitch & Build
              </a>
            </li>
          </ul>
        </div>

        <div class="footer-newsletter-col">
          <h4 class="footer-heading">Join The Movement</h4>
          <p class="newsletter-desc">
            Follow PixelIT on Instagram for live event drops, hackathon highlights, and campus tech news.
          </p>

          <a
            href="https://www.instagram.com/pixelit_kare/"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-primary"
            style={{ marginTop: '8px', gap: '10px' }}
          >
            <i class="fa-brands fa-instagram" style={{ fontSize: '1.2rem' }}></i>
            <span>Follow @pixelit_kare</span>
          </a>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="container footer-bottom-flex">
          <p>© 2026 PixelIT. All rights reserved.</p>
          <p class="built-by">
            Built with <i class="fa-solid fa-heart text-magenta"></i> by{' '}
            <span>PixelIT web team</span>.
          </p>
        </div>
      </div>
    </footer>
  );
}
