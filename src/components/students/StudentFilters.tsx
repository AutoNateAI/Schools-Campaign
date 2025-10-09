import React from 'react';
import type { Student } from '../../types/database';
import { getUniqueDistricts, getUniqueSchools, getUniqueGrades, getGradeLabel } from '../../lib/students';
import styles from './StudentFilters.module.css';

interface StudentFiltersProps {
  students: Student[];
  selectedDistricts: string[];
  selectedGrades: number[];
  selectedSchools: string[];
  searchQuery: string;
  onDistrictsChange: (districts: string[]) => void;
  onGradesChange: (grades: number[]) => void;
  onSchoolsChange: (schools: string[]) => void;
  onSearchChange: (query: string) => void;
  onClearFilters: () => void;
}

export default function StudentFilters({
  students,
  selectedDistricts,
  selectedGrades,
  selectedSchools,
  searchQuery,
  onDistrictsChange,
  onGradesChange,
  onSchoolsChange,
  onSearchChange,
  onClearFilters
}: StudentFiltersProps): React.ReactElement {
  const districts = getUniqueDistricts(students);
  const grades = getUniqueGrades(students);
  const schools = getUniqueSchools(students, selectedDistricts[0]);

  const handleDistrictToggle = (district: string) => {
    if (selectedDistricts.includes(district)) {
      onDistrictsChange(selectedDistricts.filter(d => d !== district));
    } else {
      onDistrictsChange([...selectedDistricts, district]);
    }
  };

  const handleGradeToggle = (grade: number) => {
    if (selectedGrades.includes(grade)) {
      onGradesChange(selectedGrades.filter(g => g !== grade));
    } else {
      onGradesChange([...selectedGrades, grade]);
    }
  };

  const handleSchoolToggle = (school: string) => {
    if (selectedSchools.includes(school)) {
      onSchoolsChange(selectedSchools.filter(s => s !== school));
    } else {
      onSchoolsChange([...selectedSchools, school]);
    }
  };

  const hasActiveFilters = 
    selectedDistricts.length > 0 || 
    selectedGrades.length > 0 || 
    selectedSchools.length > 0 || 
    searchQuery.trim().length > 0;

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.filtersHeader}>
        <h3 className={styles.filtersTitle}>Filter Students</h3>
        {hasActiveFilters && (
          <button onClick={onClearFilters} className={styles.clearButton}>
            Clear All
          </button>
        )}
      </div>

      {/* Search */}
      <div className={styles.filterSection}>
        <label className={styles.filterLabel}>Search</label>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search by name, interests, school..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Districts */}
      <div className={styles.filterSection}>
        <label className={styles.filterLabel}>District</label>
        <div className={styles.checkboxGroup}>
          {districts.map(district => (
            <label key={district} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={selectedDistricts.includes(district)}
                onChange={() => handleDistrictToggle(district)}
              />
              <span>{district}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Grades */}
      <div className={styles.filterSection}>
        <label className={styles.filterLabel}>Grade</label>
        <div className={styles.checkboxGroup}>
          {grades.map(grade => (
            <label key={grade} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={selectedGrades.includes(grade)}
                onChange={() => handleGradeToggle(grade)}
              />
              <span>{getGradeLabel(grade)}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Schools */}
      {schools.length > 0 && (
        <div className={styles.filterSection}>
          <label className={styles.filterLabel}>School</label>
          <div className={styles.checkboxGroup}>
            {schools.map(school => (
              <label key={school} className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={selectedSchools.includes(school)}
                  onChange={() => handleSchoolToggle(school)}
                />
                <span>{school}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
