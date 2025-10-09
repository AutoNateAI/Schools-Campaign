import React, { useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import type { Student } from '../../types/database';
import { formatStudentName } from '../../lib/students';
import styles from './StudentCart.module.css';

interface StudentCartProps {
  selectedStudents: Student[];
  onRemove: (studentId: string) => void;
  onClearAll: () => void;
}

export default function StudentCart({
  selectedStudents,
  onRemove,
  onClearAll
}: StudentCartProps): React.ReactElement {
  const [returnToForm, setReturnToForm] = useState(false);

  useEffect(() => {
    // Check if user came from the form
    if (typeof window !== 'undefined') {
      const fromForm = sessionStorage.getItem('fromSponsorshipForm');
      setReturnToForm(fromForm === 'true');
    }
  }, []);

  // Save selected students to sessionStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined' && selectedStudents.length > 0) {
      sessionStorage.setItem('selectedStudents', JSON.stringify(selectedStudents));
    }
  }, [selectedStudents]);

  const handleProceed = () => {
    if (typeof window !== 'undefined') {
      // Clear the flag when proceeding
      sessionStorage.removeItem('fromSponsorshipForm');
    }
  };

  if (selectedStudents.length === 0) {
    return null;
  }

  const totalCost = selectedStudents.length * 250;

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartHeader}>
        <h3 className={styles.cartTitle}>
          Selected Students ({selectedStudents.length})
        </h3>
        <button onClick={onClearAll} className={styles.clearAllButton}>
          Clear All
        </button>
      </div>

      <div className={styles.studentList}>
        {selectedStudents.map(student => (
          <div key={student.id} className={styles.studentItem}>
            <div className={styles.studentItemInfo}>
              <span className={styles.studentItemName}>
                {formatStudentName(student)}
              </span>
              <span className={styles.studentItemSchool}>
                {student.school}
              </span>
            </div>
            <button
              onClick={() => student.id && onRemove(student.id)}
              className={styles.removeButton}
              aria-label={`Remove ${formatStudentName(student)}`}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div className={styles.cartFooter}>
        <div className={styles.totalCost}>
          <span>Total:</span>
          <span className={styles.amount}>${totalCost.toLocaleString()}</span>
        </div>
        <p className={styles.costNote}>
          ${250}/student
        </p>
        <Link
          to="/contact#sponsor"
          className={styles.proceedButton}
          onClick={handleProceed}
        >
          {returnToForm ? 'Complete Sponsorship Form' : 'Proceed to Sponsorship Form'}
        </Link>
      </div>
    </div>
  );
}
