import { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  query, 
  where, 
  orderBy 
} from 'firebase/firestore';
import { db } from './firebase';
import { Student } from '../types/database';

const STUDENTS_COLLECTION = 'students';

/**
 * Get all available students
 */
export async function getAvailableStudents(): Promise<Student[]> {
  try {
    const studentsRef = collection(db, STUDENTS_COLLECTION);
    const q = query(studentsRef, where('isAvailable', '==', true));
    const snapshot = await getDocs(q);
    
    // Sort in-memory to avoid needing a composite index
    const students = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Student));
    
    return students.sort((a, b) => a.lastName.localeCompare(b.lastName));
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
}

/**
 * Get student by ID
 */
export async function getStudentById(studentId: string): Promise<Student | null> {
  try {
    const studentRef = doc(db, STUDENTS_COLLECTION, studentId);
    const snapshot = await getDoc(studentRef);
    
    if (!snapshot.exists()) {
      return null;
    }
    
    return {
      id: snapshot.id,
      ...snapshot.data()
    } as Student;
  } catch (error) {
    console.error('Error fetching student:', error);
    throw error;
  }
}

/**
 * Filter students by criteria
 */
export function filterStudents(
  students: Student[],
  filters: {
    districts?: string[];
    grades?: number[];
    schools?: string[];
    searchQuery?: string;
  }
): Student[] {
  let filtered = [...students];

  // Filter by districts
  if (filters.districts && filters.districts.length > 0) {
    filtered = filtered.filter(s => filters.districts!.includes(s.district));
  }

  // Filter by grades
  if (filters.grades && filters.grades.length > 0) {
    filtered = filtered.filter(s => filters.grades!.includes(s.grade));
  }

  // Filter by schools
  if (filters.schools && filters.schools.length > 0) {
    filtered = filtered.filter(s => filters.schools!.includes(s.school));
  }

  // Filter by search query
  if (filters.searchQuery && filters.searchQuery.trim()) {
    const query = filters.searchQuery.toLowerCase();
    filtered = filtered.filter(s => 
      s.firstName.toLowerCase().includes(query) ||
      s.lastName.toLowerCase().includes(query) ||
      s.bio.toLowerCase().includes(query) ||
      s.interests.some(i => i.toLowerCase().includes(query)) ||
      s.school.toLowerCase().includes(query) ||
      s.district.toLowerCase().includes(query)
    );
  }

  return filtered;
}

/**
 * Get unique districts from students
 */
export function getUniqueDistricts(students: Student[]): string[] {
  const districts = students.map(s => s.district);
  return Array.from(new Set(districts)).sort();
}

/**
 * Get unique schools from students (optionally filtered by district)
 */
export function getUniqueSchools(students: Student[], district?: string): string[] {
  let filtered = students;
  if (district) {
    filtered = students.filter(s => s.district === district);
  }
  const schools = filtered.map(s => s.school);
  return Array.from(new Set(schools)).sort();
}

/**
 * Get unique grades from students
 */
export function getUniqueGrades(students: Student[]): number[] {
  const grades = students.map(s => s.grade);
  return Array.from(new Set(grades)).sort((a, b) => a - b);
}

/**
 * Format student name (first name + last initial for privacy)
 */
export function formatStudentName(student: Student): string {
  return `${student.firstName} ${student.lastName.charAt(0)}.`;
}

/**
 * Get grade label
 */
export function getGradeLabel(grade: number): string {
  if (grade === 6) return '6th Grade';
  if (grade === 7) return '7th Grade';
  if (grade === 8) return '8th Grade';
  if (grade === 9) return '9th Grade';
  if (grade === 10) return '10th Grade';
  if (grade === 11) return '11th Grade';
  if (grade === 12) return '12th Grade';
  return `Grade ${grade}`;
}
