import React from 'react';

export default function AboutSection({ onOpenAboutModal }) {
  return (
    <section id="about" class="about-section">
      <div class="container about-grid">
        {/* Visual Column with Overlapping Layered Art (Matching Image 1) */}
        <div class="about-visuals-wrapper reveal-left">
          <div class="visual-stack">
            {/* Main Android Robot Base Image */}
            <div class="stack-card card-main glass-card">
              <img src="/images/cyber_bot.png" alt="PixelIT Cybernetic Tech" class="stack-img" />
              <div class="card-glow-overlay"></div>
            </div>

            {/* Top Right Holographic Blue Face (Image 1 overlap style) */}
            <div class="stack-card card-top-right glass-card floating-anim-1">
              <img src="/images/neural_face.png" alt="Neural Interface" class="stack-img" />
              <div class="badge-mini">
                <i class="fa-solid fa-microchip"></i> AI & Game Engines
              </div>
            </div>

            {/* Bottom Left Cyber Glasses Portrait (Image 1 overlap style) */}
            <div class="stack-card card-bottom-left glass-card floating-anim-2">
              <img src="/images/cyber_glasses.png" alt="Futuristic Developer" class="stack-img" />
              <div class="badge-mini">
                <i class="fa-solid fa-vr-cardboard"></i> Immersive Tech
              </div>
            </div>
          </div>
        </div>

        {/* Content Column */}
        <div class="about-content reveal-right">
          <div class="section-tag">
            <i class="fa-solid fa-circle-nodes"></i>
            <span>WHO WE ARE</span>
          </div>

          <h2 class="section-title cyan-title">ABOUT US</h2>

          <blockquote class="about-quote glass-card">
            "We believe innovation begins with curiosity. We believe mistakes are opportunities disguised as experience."
          </blockquote>

          <p class="about-paragraph">
            PixelIT is a vibrant ecosystem of creators, developers, designers, and tech enthusiasts. We bridge the gap between imagination and execution by providing hands-on software development, innovation sprints, and collaborative technical challenges.
          </p>

          <p class="about-paragraph">
            Whether you are writing your first line of code, designing intricate software platforms, or building rapid prototypes under tight deadlines, PixelIT gives you the tools, team, and platform to excel.
          </p>

          <div class="about-actions">
            <button class="btn btn-outline-glow" onClick={onOpenAboutModal}>
              <span>Learn More</span>
              <i class="fa-solid fa-chevron-right"></i>
            </button>
            <div class="about-highlights">
              <div class="highlight-pill">
                <i class="fa-solid fa-check text-cyan"></i> Software Dev
              </div>
              <div class="highlight-pill">
                <i class="fa-solid fa-check text-cyan"></i> Innovation Sprints
              </div>
              <div class="highlight-pill">
                <i class="fa-solid fa-check text-cyan"></i> Peer Mentorship
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
