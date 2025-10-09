import React from 'react';
import type { Student } from '../../types/database';
import { formatStudentName, getGradeLabel } from '../../lib/students';
import styles from './StudentCard.module.css';

interface StudentCardProps {
  student: Student;
  isSelected?: boolean;
  onSelect?: (studentId: string) => void;
  showSelectButton?: boolean;
}

export default function StudentCard({ 
  student, 
  isSelected = false,
  onSelect,
  showSelectButton = true
}: StudentCardProps): React.ReactElement {
  const handleSelect = () => {
    if (onSelect && student.id) {
      onSelect(student.id);
    }
  };

  return (
    <div className={`${styles.studentCard} ${isSelected ? styles.selected : ''}`}>
      {/* Profile Image Placeholder */}
      <div className={styles.profileImage}>
        <div className={styles.avatar}>
          {student.firstName.charAt(0)}{student.lastName.charAt(0)}
        </div>
      </div>

      {/* Student Info */}
      <div className={styles.studentInfo}>
        <h3 className={styles.studentName}>{formatStudentName(student)}</h3>
        <p className={styles.gradeSchool}>
          {getGradeLabel(student.grade)} • {student.school}
        </p>
        <p className={styles.district}>{student.district}</p>
      </div>

      {/* Bio */}
      <div className={styles.bio}>
        <p>{student.bio}</p>
      </div>

      {/* Interests */}
      {student.interests && student.interests.length > 0 && (
        <div className={styles.interests}>
          <span className={styles.interestsLabel}>Interests:</span>
          <div className={styles.interestTags}>
            {student.interests.map((interest, index) => (
              <span key={index} className={styles.interestTag}>
                {interest}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Select Button */}
      {showSelectButton && (
        <button
          className={`${styles.selectButton} ${isSelected ? styles.selectedButton : ''}`}
          onClick={handleSelect}
          disabled={!student.isAvailable}
        >
          {isSelected ? (
            <>
              <span className={styles.checkmark}>✓</span> Selected
            </>
          ) : (
            student.isAvailable ? 'Select' : 'Not Available'
          )}
        </button>
      )}

      {/* Privacy Notice */}
      <div className={styles.privacyNotice}>
        <small>Info from: {student.publicSource}</small>
      </div>
    </div>
  );
}
