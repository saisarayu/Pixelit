import React, { useState } from 'react';

const eventsList = [
  {
    id: 'bytetember',
    category: 'hackathon',
    badgeClass: 'badge-hackathon',
    badgeText: 'Innovation Sprint',
    statusClass: '',
    statusText: 'Annual Highlight',
    title: "Byte'tember",
    desc: '24-hour innovation sprint focused on creativity, teamwork, and rapid prototyping.',
    features: [
      { icon: 'fa-clock text-cyan', text: '24 Hours Non-Stop' },
      { icon: 'fa-trophy text-gold', text: 'Certificates & Recognition' },
      { icon: 'fa-laptop-code text-purple', text: 'Builds & Prototypes' }
    ],
    dateText: 'September 2026',
    badgeIcon: 'fa-fire'
  },
  {
    id: 'rapidbuild',
    category: 'vintra',
    badgeClass: 'badge-vintra',
    badgeText: 'Event - Vintra 2025',
    statusClass: 'status-active',
    title: 'Rapid Build 2K25',
    desc: 'A technical sprint where teams build working solutions in a short, high-energy format.',
    features: [
      { icon: 'fa-stopwatch text-cyan', text: 'Sprint Building' },
      { icon: 'fa-bolt text-purple', text: 'Rapid Prototypes' },
      { icon: 'fa-comments text-teal', text: 'Mentor Feedback' }
    ],
    dateText: 'Vintra 2025 Edition',
    badgeIcon: 'fa-bolt'
  },
  {
    id: 'pitchbuild',
    category: 'euphoria',
    badgeClass: 'badge-euphoria',
    badgeText: 'Event - Euphoria 2026',
    title: 'Pitch & Build',
    desc: 'A presentation event where participants share ideas, solutions, and live prototypes.',
    features: [
      { icon: 'fa-display text-cyan', text: 'Live Concept Pitching' },
      { icon: 'fa-lightbulb text-purple', text: 'Solution Showcase' },
      { icon: 'fa-handshake text-teal', text: 'Team Formation' }
    ],
    dateText: 'Euphoria 2026 Fest',
    badgeIcon: 'fa-crown'
  }
];

export default function ActivitiesSection({ onOpenRegister }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredEvents = eventsList.filter(
    (ev) => activeFilter === 'all' || ev.category === activeFilter
  );

  return (
    <section id="activities" class="activities-section">
      <div class="container">
        <div class="section-header text-center">
          <div class="section-tag">
            <i class="fa-solid fa-calendar-check"></i>
            <span>EVENTS & HACKATHONS</span>
          </div>
          <h2 class="section-title">
            Annual <span class="text-gradient">Activities.</span>
          </h2>
          <p class="section-subtitle">
            Hands-on learning, real-world projects, and collaborative problem-solving.
          </p>
        </div>

        {/* Filter Tabs */}
        <div class="activity-filters glass-panel">
          <button
            class={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All Events
          </button>
          <button
            class={`filter-btn ${activeFilter === 'hackathon' ? 'active' : ''}`}
            onClick={() => setActiveFilter('hackathon')}
          >
            Innovation Sprints
          </button>
          <button
            class={`filter-btn ${activeFilter === 'vintra' ? 'active' : ''}`}
            onClick={() => setActiveFilter('vintra')}
          >
            Vintra 
          </button>
          <button
            class={`filter-btn ${activeFilter === 'euphoria' ? 'active' : ''}`}
            onClick={() => setActiveFilter('euphoria')}
          >
            Euphoria
          </button>
        </div>

        {/* Events Grid */}
        <div class="activities-grid">
          {filteredEvents.map((ev) => (
            <div key={ev.id} class="activity-card glass-card">
              <div class="activity-header">
                <span class={`badge ${ev.badgeClass}`}>
                  <i class={`fa-solid ${ev.badgeIcon}`}></i> {ev.badgeText}
                </span>
                <span class={`badge badge-status ${ev.statusClass}`}>{ev.statusText}</span>
              </div>

              <div class="activity-body">
                <h3 class="activity-title">{ev.title}</h3>
                <p class="activity-desc">{ev.desc}</p>

                <div class="activity-features">
                  {ev.features.map((feat, idx) => (
                    <div key={idx} class="feat-item">
                      <i class={`fa-solid ${feat.icon}`}></i> {feat.text}
                    </div>
                  ))}
                </div>
              </div>

              <div class="activity-footer">
                <div class="time-meta">
                  <i class="fa-regular fa-calendar"></i> {ev.dateText}
                </div>
                <button
                  class="btn btn-sm btn-primary"
                  onClick={() => onOpenRegister(ev.title)}
                >
                  {ev.btnText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
