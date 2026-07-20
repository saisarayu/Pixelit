import React, { useState } from 'react';
import { submitEventRegistration, submitClubMember } from '../firebase/services';
import { sendApplicationToWhatsApp } from '../services/whatsapp';

const TARGET_WHATSAPP_NUMBER = '917094720278';

export default function Modal({ isOpen, onClose, modalData, onShowToast }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', role: '', team: '' });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleJoinSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Save application to Firebase Firestore / local fallback
      await submitClubMember(formData);

      // 2. Dispatch Application message to WhatsApp (9030082926)
      sendApplicationToWhatsApp(TARGET_WHATSAPP_NUMBER, 'Join The Club Application', {
        'Full Name': formData.name,
        'Institutional Email': formData.email,
        'Primary Interest': formData.role || 'General Tech & Coding'
      });

      onShowToast('Application Submitted! Opening WhatsApp...', 'success');
      onClose();
    } catch (err) {
      // Fallback open WhatsApp
      sendApplicationToWhatsApp(TARGET_WHATSAPP_NUMBER, 'Join The Club Application', {
        'Full Name': formData.name,
        'Institutional Email': formData.email,
        'Primary Interest': formData.role || 'General Tech & Coding'
      });
      onShowToast('Submitted! Opening WhatsApp...', 'info');
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Save event registration to Firebase
      await submitEventRegistration({
        eventName: modalData?.eventName,
        ...formData
      });

      // 2. Dispatch to WhatsApp (9030082926)
      sendApplicationToWhatsApp(TARGET_WHATSAPP_NUMBER, `Event Registration: ${modalData?.eventName}`, {
        'Event Name': modalData?.eventName,
        'Student Name': formData.name,
        'Email Address': formData.email,
        'Team Name': formData.team || 'Individual Registration'
      });

      onShowToast(`Registered for ${modalData?.eventName}! Opening WhatsApp...`, 'success');
      onClose();
    } catch (err) {
      sendApplicationToWhatsApp(TARGET_WHATSAPP_NUMBER, `Event Registration: ${modalData?.eventName}`, {
        'Event Name': modalData?.eventName,
        'Student Name': formData.name,
        'Email Address': formData.email,
        'Team Name': formData.team || 'Individual Registration'
      });
      onShowToast(`Registered! Opening WhatsApp...`, 'info');
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="modal-backdrop active" onClick={onClose}>
      <div class="modal-window glass-card" onClick={(e) => e.stopPropagation()}>
        <button class="modal-close" onClick={onClose}>
          <i class="fa-solid fa-xmark"></i>
        </button>

        <div class="modal-content">
          {modalData?.type === 'join' && (
            <div>
              <div class="section-tag">
                <i class="fa-solid fa-rocket"></i> JOIN THE CLUB
              </div>
              <h2 class="section-title text-gradient">Become a Club Member</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '20px', fontSize: '0.95rem' }}>
                Step into the arena of innovation. Gain access to workshops, project teams, and hackathons.
              </p>
              <form onSubmit={handleJoinSubmit}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <input
                    type="text"
                    name="name"
                    class="input-field"
                    placeholder="Full Name"
                    required
                    onChange={handleChange}
                  />
                  <input
                    type="email"
                    name="email"
                    class="input-field"
                    placeholder="Institutional Email"
                    required
                    onChange={handleChange}
                  />
                  <select
                    name="role"
                    class="input-field"
                    style={{ background: '#0d1326', color: '#fff' }}
                    required
                    onChange={handleChange}
                  >
                    <option value="" disabled selected>Select Primary Interest</option>
                    <option value="Software Development & App Building">Software Development & App Building</option>
                    <option value="Web & Full Stack Development">Web & Full Stack Development</option>
                    <option value="UI/UX & Product Design">UI/UX & Product Design</option>
                    <option value="Innovation Challenges & Competitive Coding">Innovation Challenges & Competitive Coding</option>
                  </select>
                  <button type="submit" class="btn btn-primary btn-lg" style={{ marginTop: '10px' }} disabled={loading}>
                    <span>{loading ? 'Submitting...' : 'Submit Application via WhatsApp'}</span>
                    <i class={`fa-brands fa-whatsapp`} style={{ fontSize: '1.2rem' }}></i>
                  </button>
                </div>
              </form>
            </div>
          )}

          {modalData?.type === 'register' && (
            <div>
              <div class="section-tag">
                <i class="fa-solid fa-calendar-plus"></i> EVENT REGISTRATION
              </div>
              <h2 class="section-title text-gradient">{modalData.eventName}</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '20px', fontSize: '0.95rem' }}>
                Reserve your team's spot for {modalData.eventName}. Application will be sent directly via WhatsApp.
              </p>
              <form onSubmit={handleEventSubmit}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <input
                    type="text"
                    name="name"
                    class="input-field"
                    placeholder="Team Leader / Student Name"
                    required
                    onChange={handleChange}
                  />
                  <input
                    type="email"
                    name="email"
                    class="input-field"
                    placeholder="Email Address"
                    required
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="team"
                    class="input-field"
                    placeholder="Team Name (if applicable)"
                    onChange={handleChange}
                  />
                  <button type="submit" class="btn btn-primary btn-lg" style={{ marginTop: '10px' }} disabled={loading}>
                    <span>{loading ? 'Submitting...' : 'Confirm Registration via WhatsApp'}</span>
                    <i class={`fa-brands fa-whatsapp`} style={{ fontSize: '1.2rem' }}></i>
                  </button>
                </div>
              </form>
            </div>
          )}

          {modalData?.type === 'about' && (
            <div>
              <div class="section-tag">
                <i class="fa-solid fa-shield"></i> OUR MISSION & STORY
              </div>
              <h2 class="section-title cyan-title">The PixelIT Legacy</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '16px' }}>
                Founded with the conviction that <em>"Technology belongs to those willing to learn it,"</em> PixelIT has grown into a hub for student innovators and builders.
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '20px' }}>
                Our annual flagship events—<strong>Byte'tember</strong> innovation sprints, <strong>Vintra 2025's Rapid Build 2K25</strong>, and <strong>Euphoria 2026's Pitch & Build</strong>—offer hands-on experience in rapid prototyping and creative problem-solving.
              </p>
              <div style={{ background: 'rgba(0,240,255,0.08)', border: '1px solid var(--cyan-primary)', padding: '14px', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                <strong style={{ color: 'var(--cyan-primary)' }}>Learn. Build. Share. Improve. Repeat.</strong>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
