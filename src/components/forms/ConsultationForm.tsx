import React, { useState } from 'react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import type { Consultation } from '../../types/database';
import styles from './Forms.module.css';

export default function ConsultationForm(): React.ReactElement {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    type: 'other' as 'school-district' | 'local-business' | 'church' | 'other',
    message: '',
    preferredContact: 'email' as 'email' | 'phone'
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const consultationData: Omit<Consultation, 'id'> = {
        ...formData,
        status: 'pending',
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      };

      await addDoc(collection(db, 'consultations'), consultationData);
      
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        organization: '',
        type: 'other',
        message: '',
        preferredContact: 'email'
      });

      // Reset success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error('Error submitting consultation:', err);
      setError('Failed to submit request. Please try again or email us directly.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (success) {
    return (
      <div className={styles.successMessage}>
        <div className={styles.successIcon}>✓</div>
        <h3>Request Received!</h3>
        <p>Thank you for your interest in AutoNateAI. We'll be in touch within 24 hours.</p>
        <button 
          onClick={() => setSuccess(false)}
          className={styles.resetButton}
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Your full name"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="your.email@example.com"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="phone">Phone *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="(555) 123-4567"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="organization">Organization *</label>
          <input
            type="text"
            id="organization"
            name="organization"
            value={formData.organization}
            onChange={handleChange}
            required
            placeholder="School district, business, or organization name"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="type">Organization Type</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="school-district">School District</option>
            <option value="local-business">Local Business</option>
            <option value="church">Church</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="preferredContact">Preferred Contact Method</label>
          <select
            id="preferredContact"
            name="preferredContact"
            value={formData.preferredContact}
            onChange={handleChange}
          >
            <option value="email">Email</option>
            <option value="phone">Phone</option>
          </select>
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="message">Message / Questions *</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          placeholder="Tell us about your goals, questions, or how we can help..."
        />
      </div>

      {error && (
        <div className={styles.errorMessage}>
          {error}
        </div>
      )}

      <button 
        type="submit" 
        className={styles.submitButton}
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit Request'}
      </button>
    </form>
  );
}
