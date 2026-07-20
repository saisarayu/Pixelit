import React from 'react';

export default function HeroSection() {
  return (
    <section id="home" class="hero-section">
      <div class="hero-bg-hud">
        <div class="hero-image-frame">
          <img src="/images/hero_hud.png" alt="Developer Coding" class="hud-ring-img" />
          <div class="cyber-scanline"></div>
          <div class="corner-decor corner-tl"></div>
          <div class="corner-decor corner-tr"></div>
          <div class="corner-decor corner-bl"></div>
          <div class="corner-decor corner-br"></div>
        </div>
      </div>

      <div class="container hero-container">
        <div class="hero-badge">
          <i class="fa-solid fa-code-branch"></i>
          <span>Official Technical & Game Dev Club</span>
        </div>

        <h1 class="hero-title">
          IMAGINE. <br />
          <span class="text-gradient">INNOVATE.</span> <br />
          IMPLEMENT.
        </h1>

        <div class="hero-quotes glass-card">
          <p class="quote-item">
            <i class="fa-solid fa-quote-left text-cyan"></i>
            Technology belongs to those willing to learn it.
          </p>
          <p class="quote-item highlight-quote">
            <i class="fa-solid fa-bolt text-purple"></i>
            We build people who build the future.
          </p>
        </div>

        <div class="hero-ctas">
          <a href="#activities" class="btn btn-primary btn-lg">
            <i class="fa-solid fa-gamepad"></i>
            <span>Explore Activities</span>
          </a>
        </div>
      </div>
    </section>
  );
}
