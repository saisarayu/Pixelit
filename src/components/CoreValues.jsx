import React from 'react';

const valuesData = [
  {
    title: 'Curiosity',
    desc: 'Questions are the beginning of innovation. We never stop exploring.',
    icon: 'fa-lightbulb',
    iconClass: 'icon-cyan',
    accentClass: 'accent-cyan'
  },
  {
    title: 'Innovation',
    desc: 'Technology should solve problems, not merely exist.',
    icon: 'fa-rocket',
    iconClass: 'icon-purple',
    accentClass: 'accent-purple'
  },
  {
    title: 'Collaboration',
    desc: 'Great ideas grow stronger when people build together.',
    icon: 'fa-users-gear',
    iconClass: 'icon-magenta',
    accentClass: 'accent-magenta'
  },
  {
    title: 'Integrity',
    desc: 'Honesty, ethics, and respect guide everything we build.',
    icon: 'fa-shield-halved',
    iconClass: 'icon-blue',
    accentClass: 'accent-blue'
  },
  {
    title: 'Excellence',
    desc: 'We pursue continuous improvement in our skills and mindset.',
    icon: 'fa-award',
    iconClass: 'icon-teal',
    accentClass: 'accent-teal'
  },
  {
    title: 'Community',
    desc: 'Knowledge gains value when it is shared. We rise by helping others rise.',
    icon: 'fa-hand-holding-heart',
    iconClass: 'icon-gold',
    accentClass: 'accent-gold'
  }
];

export default function CoreValues() {
  return (
    <section id="values" class="values-section">
      <div class="container">
        <div class="section-header text-center reveal-init">
          <div class="section-tag">
            <i class="fa-solid fa-compass"></i>
            <span>OUR FOUNDATION</span>
          </div>
          <h2 class="section-title">
            Core <span class="text-gradient">Values.</span>
          </h2>
          <p class="section-subtitle glass-card">
            "We believe innovation begins with curiosity. We believe mistakes are opportunities disguised as experience."
          </p>
        </div>

        <div class="values-grid">
          {valuesData.map((val, index) => (
            <div key={index} class="value-card glass-card reveal-scale" style={{ transitionDelay: `${index * 0.1}s` }}>
              <div class={`value-icon-box ${val.iconClass}`}>
                <i class={`fa-solid ${val.icon}`}></i>
              </div>
              <h3 class="value-title">{val.title}</h3>
              <p class="value-desc">{val.desc}</p>
              <div class={`card-bottom-accent ${val.accentClass}`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
