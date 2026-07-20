import React, { useState, useEffect } from 'react';
import ParticleCanvas from './components/ParticleCanvas';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import CoreValues from './components/CoreValues';
import ActivitiesSection from './components/ActivitiesSection';
import MethodologyCycle from './components/MethodologyCycle';
import CoreTeam from './components/CoreTeam';
import Footer from './components/Footer';
import Modal from './components/Modal';
import Toast from './components/Toast';

export default function App() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [toasts, setToasts] = useState([]);

  // Scroll Reveal Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
          }
        });
      },
      { threshold: 0.12 }
    );

    const revealElements = document.querySelectorAll(
      '.reveal-init, .reveal-left, .reveal-right, .reveal-scale'
    );
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const playSound = (freq = 600) => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.08);
    } catch (e) {}
  };

  const showToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    playSound(850);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleOpenModal = (data) => {
    setModalData(data);
    setModalOpen(true);
    playSound(750);
  };

  return (
    <div class="app-root">
      <ParticleCanvas />
      <Navbar
        onOpenSignUp={() => handleOpenModal({ type: 'join' })}
        soundEnabled={soundEnabled}
        onToggleSound={() => {
          setSoundEnabled(!soundEnabled);
          showToast(!soundEnabled ? 'UI Sounds Enabled' : 'UI Sounds Muted');
        }}
      />
      <main>
        <HeroSection onOpenTrailer={() => handleOpenModal({ type: 'trailer' })} />
        <AboutSection onOpenAboutModal={() => handleOpenModal({ type: 'about' })} />
        <CoreValues />
        <ActivitiesSection
          onOpenRegister={(eventName) => handleOpenModal({ type: 'register', eventName })}
        />
        <MethodologyCycle />
        <CoreTeam />
      </main>
      <Footer onShowToast={showToast} />
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        modalData={modalData}
        onShowToast={showToast}
      />
      <Toast toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
