import { db, isFirebaseConfigured } from './firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

/**
 * Save Event Registration to Firebase Firestore collection 'event_registrations'
 */
export async function submitEventRegistration(registrationData) {
  const payload = {
    ...registrationData,
    submittedAt: isFirebaseConfigured ? serverTimestamp() : new Date().toISOString()
  };

  if (isFirebaseConfigured && db) {
    try {
      const docRef = await addDoc(collection(db, 'event_registrations'), payload);
      console.log('🔥 Saved to Firebase Firestore doc ID:', docRef.id);
      return { success: true, docId: docRef.id, mode: 'firebase' };
    } catch (error) {
      console.error('Error saving event registration to Firestore:', error);
      throw error;
    }
  } else {
    // Demo Mode Fallback
    const existing = JSON.parse(localStorage.getItem('pixelit_registrations') || '[]');
    existing.push(payload);
    localStorage.setItem('pixelit_registrations', JSON.stringify(existing));
    console.log('📝 Demo Mode: Saved Event Registration locally:', payload);
    return { success: true, mode: 'demo' };
  }
}

/**
 * Save Club Member Application to Firebase Firestore collection 'club_members'
 */
export async function submitClubMember(memberData) {
  const payload = {
    ...memberData,
    appliedAt: isFirebaseConfigured ? serverTimestamp() : new Date().toISOString()
  };

  if (isFirebaseConfigured && db) {
    try {
      const docRef = await addDoc(collection(db, 'club_members'), payload);
      console.log('🔥 Member saved to Firestore doc ID:', docRef.id);
      return { success: true, docId: docRef.id, mode: 'firebase' };
    } catch (error) {
      console.error('Error saving member to Firestore:', error);
      throw error;
    }
  } else {
    // Demo Mode Fallback
    const existing = JSON.parse(localStorage.getItem('pixelit_members') || '[]');
    existing.push(payload);
    localStorage.setItem('pixelit_members', JSON.stringify(existing));
    console.log('📝 Demo Mode: Saved Club Member locally:', payload);
    return { success: true, mode: 'demo' };
  }
}

/**
 * Save Newsletter Subscriber to Firebase Firestore collection 'newsletter_subscribers'
 */
export async function subscribeToNewsletter(email) {
  const payload = {
    email,
    subscribedAt: isFirebaseConfigured ? serverTimestamp() : new Date().toISOString()
  };

  if (isFirebaseConfigured && db) {
    try {
      const docRef = await addDoc(collection(db, 'newsletter_subscribers'), payload);
      console.log('🔥 Newsletter sub saved to Firestore doc ID:', docRef.id);
      return { success: true, docId: docRef.id, mode: 'firebase' };
    } catch (error) {
      console.error('Error saving newsletter sub to Firestore:', error);
      throw error;
    }
  } else {
    // Demo Mode Fallback
    const existing = JSON.parse(localStorage.getItem('pixelit_subscribers') || '[]');
    existing.push(payload);
    localStorage.setItem('pixelit_subscribers', JSON.stringify(existing));
    console.log('📝 Demo Mode: Saved Newsletter Subscriber locally:', payload);
    return { success: true, mode: 'demo' };
  }
}
