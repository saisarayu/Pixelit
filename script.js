/* ==========================================================================
   PIXELIT LANDING PAGE - INTERACTIVE JAVASCRIPT ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------------
     1. BACKGROUND CANVAS PARTICLE CONSTELLATION
     ------------------------------------------------------------------------ */
  const canvas = document.getElementById('bg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let particles = [];
    const particleCount = Math.min(Math.floor(width / 18), 70);

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 2 + 1;
        this.color = Math.random() > 0.5 ? '#00f0ff' : '#8b5cf6';
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fill();
      }
    }

    function initParticles() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    function connectParticles() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 240, 255, ${0.15 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
    }

    function animateCanvas() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      connectParticles();
      requestAnimationFrame(animateCanvas);
    }

    initParticles();
    animateCanvas();

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    });
  }


  /* ------------------------------------------------------------------------
     2. SOUND FX ENGINE (WEB AUDIO API)
     ------------------------------------------------------------------------ */
  let soundEnabled = true;
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  function playUiSound(freq = 600, duration = 0.08) {
    if (!soundEnabled) return;
    try {
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Ignore audio restriction errors
    }
  }

  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      showToast(soundEnabled ? 'UI Sound Effects Enabled' : 'UI Sound Effects Muted', 'info');
      playUiSound(soundEnabled ? 800 : 300, 0.1);
    });
  }


  /* ------------------------------------------------------------------------
     3. NAVBAR & MOBILE MENU TOGGLE
     ------------------------------------------------------------------------ */
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      playUiSound(500);
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // Active navigation highlight on scroll
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });


  /* ------------------------------------------------------------------------
     4. HERO STATS ANIMATED COUNTER
     ------------------------------------------------------------------------ */
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  function runCounters() {
    statNumbers.forEach(stat => {
      const target = +stat.getAttribute('data-target');
      const duration = 2000;
      const stepTime = 30;
      const steps = duration / stepTime;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          stat.textContent = target;
          clearInterval(timer);
        } else {
          stat.textContent = Math.ceil(current);
        }
      }, stepTime);
    });
  }

  const heroStatsSection = document.querySelector('.hero-stats');
  if (heroStatsSection) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !animated) {
        runCounters();
        animated = true;
      }
    }, { threshold: 0.5 });
    observer.observe(heroStatsSection);
  }


  /* ------------------------------------------------------------------------
     5. ACTIVITIES FILTER SYSTEM
     ------------------------------------------------------------------------ */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const activityCards = document.querySelectorAll('.activity-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      playUiSound(700);
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      activityCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'toastIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });


  /* ------------------------------------------------------------------------
     6. MODALS SYSTEM (JOIN, ABOUT, REGISTRATION, TRAILER)
     ------------------------------------------------------------------------ */
  const backdrop = document.getElementById('modal-backdrop');
  const modalContent = document.getElementById('modal-content');
  const modalClose = document.getElementById('modal-close');

  function openModal(html) {
    if (modalContent && backdrop) {
      modalContent.innerHTML = html;
      backdrop.classList.add('active');
      playUiSound(800, 0.12);
    }
  }

  function closeModal() {
    if (backdrop) {
      backdrop.classList.remove('active');
      playUiSound(400);
    }
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }
  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeModal();
    });
  }

  // Join Club / Sign Up Trigger
  const openJoinModalBtn = document.getElementById('open-join-modal');
  if (openJoinModalBtn) {
    openJoinModalBtn.addEventListener('click', () => {
      openModal(`
        <div class="modal-form-wrap">
          <div class="section-tag"><i class="fa-solid fa-rocket"></i> JOIN THE CLUB</div>
          <h2 class="section-title text-gradient">Become a PixelIT Member</h2>
          <p style="color: var(--text-muted); margin-bottom: 20px; font-size: 0.95rem;">
            Step into the arena of innovation. Gain access to workshops, game dev teams, and hackathons.
          </p>
          <form id="join-form" onsubmit="event.preventDefault(); window.handleModalSubmit('Sign Up Complete!');">
            <div style="display: flex; flex-direction: column; gap: 14px;">
              <input type="text" class="input-field" placeholder="Full Name" required>
              <input type="email" class="input-field" placeholder="Institutional Email" required>
              <select class="input-field" style="background: #0d1326; color: #fff;" required>
                <option value="" disabled selected>Select Primary Interest</option>
                <option value="game-dev">Game Development (Unity/UE5)</option>
                <option value="web-dev">Web & Full Stack Development</option>
                <option value="ui-ux">UI/UX & 3D Design</option>
                <option value="competitive">Hackathons & Competitive Coding</option>
              </select>
              <button type="submit" class="btn btn-primary btn-lg" style="margin-top: 10px;">
                <span>Submit Application</span>
                <i class="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </form>
        </div>
      `);
    });
  }

  // About Us Learn More Trigger
  const openAboutModalBtn = document.getElementById('open-about-modal');
  if (openAboutModalBtn) {
    openAboutModalBtn.addEventListener('click', () => {
      openModal(`
        <div>
          <div class="section-tag"><i class="fa-solid fa-shield"></i> OUR MISSION & STORY</div>
          <h2 class="section-title cyan-title">The PixelIT Legacy</h2>
          <p style="color: var(--text-muted); line-height: 1.7; margin-bottom: 16px;">
            Founded with the conviction that <em>"Technology belongs to those willing to learn it,"</em> PixelIT has grown into an incubator for innovators and game developers.
          </p>
          <p style="color: var(--text-muted); line-height: 1.7; margin-bottom: 20px;">
            Our annual flagship events—<strong>Byte'tember</strong> 24-hour hackathons, <strong>Vintra 2025's Rapid Gamez 2K25</strong>, and <strong>Euphoria 2026's Pitch and Play</strong>—offer hands-on experience in rapid prototyping and creative problem-solving.
          </p>
          <div style="background: rgba(0,240,255,0.08); border: 1px solid var(--cyan-primary); padding: 14px; border-radius: var(--radius-md); text-align: center;">
            <strong style="color: var(--cyan-primary);">Learn. Build. Share. Improve. Repeat.</strong>
          </div>
        </div>
      `);
    });
  }

  // Activity Register Buttons Trigger
  document.querySelectorAll('.register-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const eventName = btn.getAttribute('data-event');
      openModal(`
        <div>
          <div class="section-tag"><i class="fa-solid fa-calendar-plus"></i> EVENT REGISTRATION</div>
          <h2 class="section-title text-gradient">${eventName}</h2>
          <p style="color: var(--text-muted); margin-bottom: 20px; font-size: 0.95rem;">
            Reserve your team's spot for ${eventName}. Limited slots available.
          </p>
          <form onsubmit="event.preventDefault(); window.handleModalSubmit('Registered for ${eventName}!');">
            <div style="display: flex; flex-direction: column; gap: 14px;">
              <input type="text" class="input-field" placeholder="Team Leader / Student Name" required>
              <input type="email" class="input-field" placeholder="Email Address" required>
              <input type="text" class="input-field" placeholder="Team Name (if applicable)">
              <button type="submit" class="btn btn-primary btn-lg" style="margin-top: 10px;">
                <span>Confirm Registration</span>
                <i class="fa-solid fa-check"></i>
              </button>
            </div>
          </form>
        </div>
      `);
    });
  });

  // Hero Watch Trailer
  const heroWatchBtn = document.getElementById('hero-watch-demo');
  if (heroWatchBtn) {
    heroWatchBtn.addEventListener('click', () => {
      openModal(`
        <div style="text-align: center;">
          <div class="section-tag"><i class="fa-solid fa-film"></i> PIXELIT TRAILER</div>
          <h2 class="section-title text-gradient">Imagine. Innovate. Implement.</h2>
          <div style="margin: 20px 0; background: #000; border-radius: 12px; padding: 40px 20px; border: 1px solid var(--glass-border);">
            <i class="fa-solid fa-circle-play" style="font-size: 4rem; color: var(--cyan-primary); cursor: pointer;" onclick="alert('Playing PixelIT 2026 Highlight Reel!')"></i>
            <p style="color: var(--text-muted); margin-top: 12px;">Click icon to start highlight reel</p>
          </div>
        </div>
      `);
    });
  }

  // Newsletter Form
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Subscribed to PixelIT Updates!', 'success');
      newsletterForm.reset();
      playUiSound(900);
    });
  }

  window.handleModalSubmit = function(msg) {
    closeModal();
    showToast(msg, 'success');
  };


  /* ------------------------------------------------------------------------
     7. TOAST NOTIFICATION SYSTEM
     ------------------------------------------------------------------------ */
  function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <i class="fa-solid fa-circle-check text-cyan"></i>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(50px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // Attach button sound listeners
  document.querySelectorAll('button, .btn, a').forEach(el => {
    el.addEventListener('mouseenter', () => playUiSound(900, 0.03));
  });

});
