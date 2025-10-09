import { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  addDoc, 
  updateDoc, 
  query, 
  where, 
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';
import { Workshop } from '../types/database';

const WORKSHOPS_COLLECTION = 'workshops';

/**
 * Get all workshops
 */
export async function getWorkshops(): Promise<Workshop[]> {
  try {
    const workshopsRef = collection(db, WORKSHOPS_COLLECTION);
    const q = query(workshopsRef, orderBy('date', 'asc'));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Workshop));
  } catch (error) {
    console.error('Error fetching workshops:', error);
    throw error;
  }
}

/**
 * Get upcoming workshops only
 */
export async function getUpcomingWorkshops(): Promise<Workshop[]> {
  try {
    const workshopsRef = collection(db, WORKSHOPS_COLLECTION);
    const q = query(workshopsRef, orderBy('date', 'asc'));
    const snapshot = await getDocs(q);
    
    // Filter in-memory to avoid needing a composite index
    const workshops = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Workshop));
    
    return workshops.filter(w => w.status === 'upcoming' || w.status === 'full');
  } catch (error) {
    console.error('Error fetching upcoming workshops:', error);
    throw error;
  }
}

/**
 * Get a single workshop by ID
 */
export async function getWorkshopById(workshopId: string): Promise<Workshop | null> {
  try {
    const workshopRef = doc(db, WORKSHOPS_COLLECTION, workshopId);
    const snapshot = await getDoc(workshopRef);
    
    if (!snapshot.exists()) {
      return null;
    }
    
    return {
      id: snapshot.id,
      ...snapshot.data()
    } as Workshop;
  } catch (error) {
    console.error('Error fetching workshop:', error);
    throw error;
  }
}

/**
 * Create a new workshop
 */
export async function createWorkshop(workshop: Omit<Workshop, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  try {
    const workshopsRef = collection(db, WORKSHOPS_COLLECTION);
    const docRef = await addDoc(workshopsRef, {
      ...workshop,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    
    return docRef.id;
  } catch (error) {
    console.error('Error creating workshop:', error);
    throw error;
  }
}

/**
 * Update workshop enrollment count
 */
export async function updateWorkshopEnrollment(
  workshopId: string, 
  enrollmentChange: number
): Promise<void> {
  try {
    const workshopRef = doc(db, WORKSHOPS_COLLECTION, workshopId);
    const workshop = await getWorkshopById(workshopId);
    
    if (!workshop) {
      throw new Error('Workshop not found');
    }
    
    const newEnrollment = workshop.currentEnrollment + enrollmentChange;
    const newAvailableSpots = workshop.maxCapacity - newEnrollment;
    
    await updateDoc(workshopRef, {
      currentEnrollment: newEnrollment,
      availableSpots: newAvailableSpots,
      status: newAvailableSpots === 0 ? 'full' : workshop.status,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error updating workshop enrollment:', error);
    throw error;
  }
}

/**
 * Check if workshop has available spots
 */
export function hasAvailableSpots(workshop: Workshop, requestedSpots: number = 1): boolean {
  return workshop.availableSpots >= requestedSpots;
}

/**
 * Get workshop status label
 */
export function getWorkshopStatusLabel(workshop: Workshop): {
  label: string;
  color: 'green' | 'yellow' | 'red';
  icon: string;
} {
  if (workshop.availableSpots === 0) {
    return { label: 'Full', color: 'red', icon: '✕' };
  }
  
  if (workshop.availableSpots <= 10) {
    return { 
      label: `Filling Fast - Only ${workshop.availableSpots} spots left`, 
      color: 'yellow', 
      icon: '⚠️' 
    };
  }
  
  return { label: 'Spots Available', color: 'green', icon: '✓' };
}

/**
 * Format workshop date for display
 */
export function formatWorkshopDate(workshop: Workshop): string {
  const date = workshop.date.toDate();
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Format workshop time for display
 */
export function formatWorkshopTime(workshop: Workshop): string {
  return `${workshop.startTime} - ${workshop.endTime} ${workshop.timezone}`;
}
