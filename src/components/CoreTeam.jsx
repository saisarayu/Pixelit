import React from 'react';

const teamMembers = [
  {
    icon: 'fa-user-gear',
    name: 'Lead Coordinator',
    role: 'Club Executive',
    bio: 'Architecting innovation challenges, guiding project sprints, and overseeing technical curriculum.'
  },
  {
    icon: 'fa-rocket',
    name: 'Build Lead',
    role: 'Technical Mentor',
    bio: 'Specializing in software design, prototyping, and product development.'
  },
  {
    icon: 'fa-code',
    name: 'Web & Tech Lead',
    role: 'PixelIT Web Team',
    bio: 'Building full-stack platforms, event portals, and interactive club experiences.'
  },
  {
    icon: 'fa-bullhorn',
    name: 'Community Lead',
    role: 'Outreach & Events',
    bio: 'Connecting creators, coordinating sponsor partnerships, and fostering peer learning.'
  }
];

export default function CoreTeam() {
  return (
    <section id="team" class="team-section">
      <div class="container">
        <div class="section-header text-center">
          <div class="section-tag">
            <i class="fa-solid fa-user-astronaut"></i>
            <span>THE CREW</span>
          </div>
          <h2 class="section-title">
            Core <span class="text-gradient">Team.</span>
          </h2>
          <p class="section-subtitle">
            Meet the minds driving PixelIT's workshops, innovation challenges, and technical initiatives.
          </p>
        </div>

        <div class="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} class="team-card glass-card">
              <div class="team-avatar">
                <i class={`fa-solid ${member.icon}`}></i>
              </div>
              <h4 class="team-name">{member.name}</h4>
              <span class="team-role">{member.role}</span>
              <p class="team-bio">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
