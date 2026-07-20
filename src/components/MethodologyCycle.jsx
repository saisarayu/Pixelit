import React, { useState, useEffect } from 'react';

const cycleSteps = [
  { word: 'Learn.', glowClass: 'glow-cyan' },
  { word: 'Build.', glowClass: 'glow-purple' },
  { word: 'Share.', glowClass: 'glow-magenta' },
  { word: 'Improve.', glowClass: 'glow-teal' },
  { word: 'Repeat.', glowClass: 'glow-gold' }
];

export default function MethodologyCycle() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % cycleSteps.length);
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="cycle" class="cycle-section">
      <div class="container">
        <div class="cycle-box glass-panel text-center reveal-scale">
          <div class="brand-tag">PIXELIT CREATIVE LOOP</div>
          <h2 class="cycle-title">
            {cycleSteps.map((step, idx) => (
              <React.Fragment key={idx}>
                <span
                  class={`cycle-word ${step.glowClass} ${activeIdx === idx ? 'cycle-active' : ''}`}
                  data-active={activeIdx === idx}
                >
                  {step.word}
                </span>
                {idx < cycleSteps.length - 1 && (
                  <span class="cycle-arrow">
                    <i class="fa-solid fa-chevron-right"></i>
                  </span>
                )}
                {idx === cycleSteps.length - 1 && (
                  <span class="cycle-arrow">
                    <i class="fa-solid fa-repeat text-cyan"></i>
                  </span>
                )}
              </React.Fragment>
            ))}
          </h2>
          <p class="cycle-sub">The continuous evolution framework powering every builder at PixelIT.</p>
        </div>
      </div>
    </section>
  );
}
