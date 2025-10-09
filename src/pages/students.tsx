import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import type { Student } from '../types/database';
import { getAvailableStudents, filterStudents } from '../lib/students';
import StudentCard from '../components/students/StudentCard';
import StudentFilters from '../components/students/StudentFilters';
import StudentCart from '../components/students/StudentCart';
import styles from './students.module.css';

export default function StudentsPage(): ReactNode {
  const [allStudents, setAllStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter state
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [selectedGrades, setSelectedGrades] = useState<number[]>([]);
  const [selectedSchools, setSelectedSchools] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Load students on mount
  useEffect(() => {
    loadStudents();
  }, []);

  // Apply filters whenever filter state changes
  useEffect(() => {
    const filtered = filterStudents(allStudents, {
      districts: selectedDistricts,
      grades: selectedGrades,
      schools: selectedSchools,
      searchQuery
    });
    setFilteredStudents(filtered);
  }, [allStudents, selectedDistricts, selectedGrades, selectedSchools, searchQuery]);

  async function loadStudents() {
    try {
      setLoading(true);
      setError(null);
      const students = await getAvailableStudents();
      setAllStudents(students);
      setFilteredStudents(students);
    } catch (err) {
      console.error('Error loading students:', err);
      setError('Failed to load students. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const handleStudentSelect = (studentId: string) => {
    if (selectedStudentIds.includes(studentId)) {
      setSelectedStudentIds(selectedStudentIds.filter(id => id !== studentId));
    } else {
      setSelectedStudentIds([...selectedStudentIds, studentId]);
    }
  };

  const handleRemoveFromCart = (studentId: string) => {
    setSelectedStudentIds(selectedStudentIds.filter(id => id !== studentId));
  };

  const handleClearCart = () => {
    setSelectedStudentIds([]);
  };

  const handleClearFilters = () => {
    setSelectedDistricts([]);
    setSelectedGrades([]);
    setSelectedSchools([]);
    setSearchQuery('');
  };

  const selectedStudents = allStudents.filter(s => s.id && selectedStudentIds.includes(s.id));

  return (
    <Layout
      title="Student Catalog"
      description="Browse and select students to sponsor for AutoNateAI's Critical Thinking Workshop">
      <main className={styles.studentsPage}>
        <section className={styles.hero}>
          <div className="container">
            <Heading as="h1" className={styles.title}>
              Student Catalog
            </Heading>
            <p className={styles.subtitle}>
              Select students to sponsor for our next Critical Thinking Workshop. 
              All information is publicly sourced and privacy-protected.
            </p>
          </div>
        </section>

        <section className={styles.content}>
          <div className="container">
            {loading && (
              <div className={styles.loading}>
                <div className={styles.spinner}></div>
                <p>Loading students...</p>
              </div>
            )}

            {error && (
              <div className={styles.error}>
                <p>{error}</p>
                <button onClick={loadStudents} className={styles.retryButton}>
                  Try Again
                </button>
              </div>
            )}

            {!loading && !error && (
              <div className={styles.catalogLayout}>
                {/* Filters Sidebar */}
                <aside className={styles.sidebar}>
                  <StudentFilters
                    students={allStudents}
                    selectedDistricts={selectedDistricts}
                    selectedGrades={selectedGrades}
                    selectedSchools={selectedSchools}
                    searchQuery={searchQuery}
                    onDistrictsChange={setSelectedDistricts}
                    onGradesChange={setSelectedGrades}
                    onSchoolsChange={setSelectedSchools}
                    onSearchChange={setSearchQuery}
                    onClearFilters={handleClearFilters}
                  />
                </aside>

                {/* Student Grid */}
                <div className={styles.mainContent}>
                  <div className={styles.resultsHeader}>
                    <p className={styles.resultsCount}>
                      Showing {filteredStudents.length} of {allStudents.length} students
                    </p>
                  </div>

                  {filteredStudents.length === 0 ? (
                    <div className={styles.emptyState}>
                      <p>No students match your filters.</p>
                      <button onClick={handleClearFilters} className={styles.clearFiltersButton}>
                        Clear Filters
                      </button>
                    </div>
                  ) : (
                    <div className={styles.studentGrid}>
                      {filteredStudents.map(student => (
                        <StudentCard
                          key={student.id}
                          student={student}
                          isSelected={student.id ? selectedStudentIds.includes(student.id) : false}
                          onSelect={handleStudentSelect}
                          showSelectButton={true}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Floating Cart */}
        <StudentCart
          selectedStudents={selectedStudents}
          onRemove={handleRemoveFromCart}
          onClearAll={handleClearCart}
        />

        {/* Privacy Notice */}
        <section className={styles.privacySection}>
          <div className="container">
            <div className={styles.privacyNotice}>
              <h3>Privacy & Data Protection</h3>
              <p>
                All student information displayed here is sourced from publicly available records 
                (honor rolls, academic awards, school publications, etc.). We display only first names 
                and last initials to protect student privacy. No contact information is shared.
              </p>
              <p>
                For questions about data usage, please review our{' '}
                <a href="/privacy">Privacy Policy</a>.
              </p>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
