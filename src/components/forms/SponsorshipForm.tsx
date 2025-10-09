import React, { useState, useEffect } from 'react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import type { Sponsorship, NamedStudent } from '../../types/database';
import WorkshopSelector from '../workshops/WorkshopSelector';
import styles from './Forms.module.css';

export default function SponsorshipForm(): React.ReactElement {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    type: 'individual' as 'school-district' | 'local-business' | 'church' | 'individual',
    numberOfStudents: 1,
    workshopId: '',
    selectionMethod: 'districts' as 'specific' | 'districts' | 'named',
    districtPreferences: [] as string[],
    namedStudents: [] as NamedStudent[],
    sponsorMessage: ''
  });

  useEffect(() => {
    // Check for pre-filled type from URL params
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const typeParam = params.get('type');
      if (typeParam && ['school-district', 'local-business', 'church'].includes(typeParam)) {
        setFormData(prev => ({ ...prev, type: typeParam as any }));
      }
    }
  }, []);

  const [districtInput, setDistrictInput] = useState('');
  const [namedStudentInput, setNamedStudentInput] = useState({ name: '', school: '', district: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validation
    if (!formData.workshopId) {
      setError('Please select a workshop date');
      setLoading(false);
      return;
    }

    try {
      // Create sponsor first (simplified - in production, check if exists)
      const sponsorData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        type: formData.type,
        organization: formData.organization,
        createdAt: Timestamp.now(),
        totalSponsored: formData.numberOfStudents
      };

      const sponsorRef = await addDoc(collection(db, 'sponsors'), sponsorData);

      // Create sponsorship
      const sponsorshipData: Omit<Sponsorship, 'id'> = {
        sponsorId: sponsorRef.id,
        workshopId: formData.workshopId,
        numberOfStudents: formData.numberOfStudents,
        selectedStudentIds: [], // Will be populated from student catalog in Phase 4
        namedStudents: formData.namedStudents,
        districtPreferences: formData.districtPreferences,
        amount: formData.numberOfStudents * 250, // $250 per student
        status: 'pending',
        sponsorMessage: formData.sponsorMessage,
        createdAt: Timestamp.now()
      };

      await addDoc(collection(db, 'sponsorships'), sponsorshipData);
      
      setSuccess(true);
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        organization: '',
        type: 'individual',
        numberOfStudents: 1,
        workshopId: '',
        selectionMethod: 'districts',
        districtPreferences: [],
        namedStudents: [],
        sponsorMessage: ''
      });
    } catch (err) {
      console.error('Error submitting sponsorship:', err);
      setError('Failed to submit sponsorship. Please try again or contact us directly.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.type === 'number' ? parseInt(e.target.value) : e.target.value;
    setFormData(prev => ({
      ...prev,
      [e.target.name]: value
    }));
  };

  const addDistrict = () => {
    if (districtInput.trim()) {
      setFormData(prev => ({
        ...prev,
        districtPreferences: [...prev.districtPreferences, districtInput.trim()]
      }));
      setDistrictInput('');
    }
  };

  const removeDistrict = (index: number) => {
    setFormData(prev => ({
      ...prev,
      districtPreferences: prev.districtPreferences.filter((_, i) => i !== index)
    }));
  };

  const addNamedStudent = () => {
    if (namedStudentInput.name && namedStudentInput.school && namedStudentInput.district) {
      setFormData(prev => ({
        ...prev,
        namedStudents: [...prev.namedStudents, { ...namedStudentInput }]
      }));
      setNamedStudentInput({ name: '', school: '', district: '' });
    }
  };

  const removeNamedStudent = (index: number) => {
    setFormData(prev => ({
      ...prev,
      namedStudents: prev.namedStudents.filter((_, i) => i !== index)
    }));
  };

  if (success) {
    return (
      <div className={styles.successMessage}>
        <div className={styles.successIcon}>✓</div>
        <h3>Sponsorship Request Received!</h3>
        <p>Thank you for sponsoring {formData.numberOfStudents} student{formData.numberOfStudents > 1 ? 's' : ''}!</p>
        <p>We'll send you an invoice within 24 hours to complete your sponsorship.</p>
        <button 
          onClick={() => setSuccess(false)}
          className={styles.resetButton}
        >
          Sponsor More Students
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {/* Sponsor Information */}
      <div className={styles.formSection}>
        <h3 className={styles.sectionTitle}>Sponsor Information</h3>
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
              placeholder="Your organization name"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="type">Sponsor Type *</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="individual">Individual</option>
              <option value="school-district">School District</option>
              <option value="local-business">Local Business</option>
              <option value="church">Church</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="numberOfStudents">Number of Students *</label>
            <input
              type="number"
              id="numberOfStudents"
              name="numberOfStudents"
              value={formData.numberOfStudents}
              onChange={handleChange}
              required
              min="1"
              max="100"
            />
            <small className={styles.fieldHint}>
              ${formData.numberOfStudents * 250} total (${250}/student)
            </small>
          </div>
        </div>
      </div>

      {/* Workshop Selection */}
      <div className={styles.formSection}>
        <h3 className={styles.sectionTitle}>Select Workshop Date *</h3>
        <WorkshopSelector
          selectedWorkshopId={formData.workshopId}
          onSelect={(id) => setFormData(prev => ({ ...prev, workshopId: id }))}
          requiredSpots={formData.numberOfStudents}
          showTitle={false}
        />
      </div>

      {/* Student Selection Method */}
      <div className={styles.formSection}>
        <h3 className={styles.sectionTitle}>Student Selection</h3>
        
        <div className={styles.radioGroup}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="selectionMethod"
              value="districts"
              checked={formData.selectionMethod === 'districts'}
              onChange={handleChange}
            />
            <span>Let AutoNateAI distribute across specific districts</span>
          </label>

          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="selectionMethod"
              value="named"
              checked={formData.selectionMethod === 'named'}
              onChange={handleChange}
            />
            <span>I have specific students in mind</span>
          </label>
        </div>

        {formData.selectionMethod === 'districts' && (
          <div className={styles.districtSelector}>
            <div className={styles.inputWithButton}>
              <input
                type="text"
                value={districtInput}
                onChange={(e) => setDistrictInput(e.target.value)}
                placeholder="Enter district name"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addDistrict())}
              />
              <button type="button" onClick={addDistrict} className={styles.addButton}>
                Add District
              </button>
            </div>
            {formData.districtPreferences.length > 0 && (
              <div className={styles.tagList}>
                {formData.districtPreferences.map((district, index) => (
                  <span key={index} className={styles.tag}>
                    {district}
                    <button type="button" onClick={() => removeDistrict(index)}>×</button>
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {formData.selectionMethod === 'named' && (
          <div className={styles.namedStudents}>
            <div className={styles.namedStudentForm}>
              <input
                type="text"
                value={namedStudentInput.name}
                onChange={(e) => setNamedStudentInput(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Student name"
              />
              <input
                type="text"
                value={namedStudentInput.school}
                onChange={(e) => setNamedStudentInput(prev => ({ ...prev, school: e.target.value }))}
                placeholder="School"
              />
              <input
                type="text"
                value={namedStudentInput.district}
                onChange={(e) => setNamedStudentInput(prev => ({ ...prev, district: e.target.value }))}
                placeholder="District"
              />
              <button type="button" onClick={addNamedStudent} className={styles.addButton}>
                Add Student
              </button>
            </div>
            {formData.namedStudents.length > 0 && (
              <div className={styles.studentList}>
                {formData.namedStudents.map((student, index) => (
                  <div key={index} className={styles.studentItem}>
                    <div>
                      <strong>{student.name}</strong>
                      <br />
                      <small>{student.school} - {student.district}</small>
                    </div>
                    <button type="button" onClick={() => removeNamedStudent(index)}>×</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Optional Message */}
      <div className={styles.formSection}>
        <h3 className={styles.sectionTitle}>Personal Message (Optional)</h3>
        <div className={styles.formGroup}>
          <label htmlFor="sponsorMessage">Message to Students</label>
          <textarea
            id="sponsorMessage"
            name="sponsorMessage"
            value={formData.sponsorMessage}
            onChange={handleChange}
            rows={4}
            placeholder="Share why you're sponsoring students and what you hope they gain from this experience..."
          />
        </div>
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
        {loading ? 'Submitting...' : `Submit Sponsorship Request ($${formData.numberOfStudents * 250})`}
      </button>
    </form>
  );
}
