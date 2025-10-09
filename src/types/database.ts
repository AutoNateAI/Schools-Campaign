import { Timestamp } from 'firebase/firestore';

// Workshop Types
export interface Workshop {
  id?: string;
  title: string;
  date: Timestamp;
  startTime: string;
  endTime: string;
  timezone: string;
  maxCapacity: number;
  currentEnrollment: number;
  availableSpots: number;
  status: 'upcoming' | 'full' | 'in-progress' | 'completed';
  discordServerId?: string;
  discordInviteLink?: string;
  facilitators: string[];
  notes?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Student Types
export interface Student {
  id?: string;
  firstName: string;
  lastName: string;
  grade: number;
  school: string;
  district: string;
  bio: string;
  interests: string[];
  profileImage?: string;
  isAvailable: boolean;
  publicSource: string;
  sponsoredBy?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Sponsor Types
export interface Sponsor {
  id?: string;
  name: string;
  email: string;
  phone: string;
  type: 'school-district' | 'local-business' | 'church' | 'individual';
  organization: string;
  address?: string;
  website?: string;
  createdAt: Timestamp;
  totalSponsored: number;
}

// Sponsorship Types
export interface NamedStudent {
  name: string;
  school: string;
  district: string;
}

export interface Sponsorship {
  id?: string;
  sponsorId: string;
  workshopId: string;
  numberOfStudents: number;
  selectedStudentIds: string[];
  namedStudents: NamedStudent[];
  districtPreferences: string[];
  amount: number;
  invoiceId?: string;
  invoiceUrl?: string;
  paymentMethod?: string;
  status: 'pending' | 'invoice-sent' | 'paid' | 'call-scheduled' | 'students-notified' | 'completed' | 'cancelled';
  sponsorMessage?: string;
  sponsorBio?: string;
  callScheduledDate?: Timestamp;
  callNotes?: string;
  createdAt: Timestamp;
  invoiceSentAt?: Timestamp;
  paidAt?: Timestamp;
  callCompletedAt?: Timestamp;
  studentsNotifiedAt?: Timestamp;
}

// Enrollment Types
export interface Enrollment {
  id?: string;
  workshopId: string;
  studentId: string;
  sponsorshipId: string;
  status: 'confirmed' | 'waitlist' | 'attended' | 'no-show' | 'cancelled';
  discordInviteSent: boolean;
  discordInviteSentDate?: Timestamp;
  discordUserId?: string;
  checkedIn: boolean;
  checkInTime?: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Consultation Types
export interface Consultation {
  id?: string;
  name: string;
  email: string;
  phone: string;
  organization: string;
  type?: 'school-district' | 'local-business' | 'church' | 'other';
  message: string;
  preferredContact?: 'email' | 'phone';
  status: 'pending' | 'contacted' | 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  scheduledDate?: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
