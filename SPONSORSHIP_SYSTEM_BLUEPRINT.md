# AutoNateAI Sponsorship System - Blueprint & Implementation Guide

**Version:** 1.0  
**Last Updated:** January 8, 2025  
**Status:** Planning Phase

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [System Architecture](#system-architecture)
3. [Database Schema](#database-schema)
4. [Features & User Flows](#features--user-flows)
5. [Implementation Phases](#implementation-phases)
6. [Technical Stack](#technical-stack)
7. [Privacy & Compliance](#privacy--compliance)
8. [Future Enhancements](#future-enhancements)

---

## Overview

### Goals
Transform the AutoNateAI sponsorship experience by creating a transparent, automated, and personalized system that:

- Allows sponsors to select specific students or districts
- Provides visibility into workshop schedules and availability
- Automates invoice generation and payment tracking
- Creates personalized sponsor-to-student connections
- Tracks the entire sponsorship lifecycle

### Key Features
1. **Dual Contact Forms** - Toggle between consultation and sponsorship requests
2. **Student Catalog** - Browse and select students to sponsor
3. **Workshop Selection** - Choose specific workshop dates with real-time availability
4. **Automated Workflow** - From form submission to workshop completion
5. **Transparent Process** - Clear communication at every step

---

## System Architecture

### Technology Stack

**Frontend:**
- React (Docusaurus framework)
- TypeScript
- React Hook Form + Zod validation
- Firebase SDK

**Backend:**
- Firebase Firestore (database)
- Firebase Authentication (admin access)
- Firebase Functions (serverless)
- Firebase Storage (images)

**Integrations:**
- Stripe/PayPal (payments)
- SendGrid/Mailgun (emails)
- Discord API (cohort invites)

**Hosting:**
- Firebase Hosting or existing Docusaurus host

---

## Database Schema

### Collections

#### `students`
```typescript
{
  studentId: string          // Auto-generated
  firstName: string
  lastName: string
  grade: number              // 6-12
  school: string
  district: string
  bio: string                // Brief description
  interests: string[]        // Array of interests/hobbies
  profileImage?: string      // Storage URL
  isAvailable: boolean       // Can be sponsored
  publicSource: string       // Where info came from
  sponsoredBy?: string       // Current sponsor (if any)
  createdAt: timestamp
  updatedAt: timestamp
}
```

#### `workshops`
```typescript
{
  workshopId: string         // Auto-generated
  title: string              // e.g., "January 2025 Critical Thinking Workshop"
  date: timestamp            // Workshop date
  startTime: string          // e.g., "2:00 PM"
  endTime: string            // e.g., "4:00 PM"
  timezone: string           // e.g., "America/New_York"
  maxCapacity: number        // Maximum students
  currentEnrollment: number  // Current count
  availableSpots: number     // Calculated field
  status: 'upcoming' | 'full' | 'in-progress' | 'completed'
  discordServerId?: string   // Discord server for this cohort
  discordInviteLink?: string
  facilitators: string[]     // Array of facilitator names
  notes?: string             // Internal notes
  createdAt: timestamp
  updatedAt: timestamp
}
```

#### `sponsors`
```typescript
{
  sponsorId: string          // Auto-generated
  name: string               // Individual or organization name
  email: string
  phone: string
  type: 'school-district' | 'local-business' | 'church' | 'individual'
  organization: string       // Organization name
  address?: string
  website?: string
  createdAt: timestamp
  totalSponsored: number     // Count of students sponsored
}
```

#### `sponsorships`
```typescript
{
  sponsorshipId: string      // Auto-generated
  sponsorId: string          // Reference to sponsor
  workshopId: string         // Which workshop
  numberOfStudents: number   // How many to sponsor
  
  // Student selection
  selectedStudentIds: string[]    // Specific students chosen
  namedStudents: {                // Students not in catalog
    name: string
    school: string
    district: string
  }[]
  districtPreferences: string[]   // If letting us distribute
  
  // Financial
  amount: number             // Total sponsorship amount
  invoiceId?: string
  invoiceUrl?: string
  paymentMethod?: string
  
  // Status tracking
  status: 'pending' | 'invoice-sent' | 'paid' | 'call-scheduled' | 'students-notified' | 'completed' | 'cancelled'
  
  // Personalization
  sponsorMessage?: string    // Message to students
  sponsorBio?: string        // About the sponsor
  callScheduledDate?: timestamp
  callNotes?: string
  
  // Timestamps
  createdAt: timestamp
  invoiceSentAt?: timestamp
  paidAt?: timestamp
  callCompletedAt?: timestamp
  studentsNotifiedAt?: timestamp
}
```

#### `enrollments`
```typescript
{
  enrollmentId: string       // Auto-generated
  workshopId: string         // Reference to workshop
  studentId: string          // Reference to student
  sponsorshipId: string      // Reference to sponsorship
  
  // Status
  status: 'confirmed' | 'waitlist' | 'attended' | 'no-show' | 'cancelled'
  
  // Discord
  discordInviteSent: boolean
  discordInviteSentDate?: timestamp
  discordUserId?: string
  
  // Attendance
  checkedIn: boolean
  checkInTime?: timestamp
  
  createdAt: timestamp
  updatedAt: timestamp
}
```

#### `consultations`
```typescript
{
  consultationId: string     // Auto-generated
  name: string
  email: string
  phone: string
  organization: string
  type?: 'school-district' | 'local-business' | 'church' | 'other'
  message: string
  preferredContact?: 'email' | 'phone'
  status: 'pending' | 'contacted' | 'scheduled' | 'completed' | 'cancelled'
  notes?: string             // Internal notes
  scheduledDate?: timestamp
  createdAt: timestamp
  updatedAt: timestamp
}
```

---

## Features & User Flows

### 1. Contact Page Forms

#### UI Design
- **Toggle Tabs:** Switch between "Request Consultation" and "Sponsor Students"
- **Smooth Transitions:** Fade in/out when switching
- **Form Validation:** Real-time validation with helpful error messages

#### Consultation Form
**Fields:**
- Name (required)
- Email (required, validated)
- Phone (required, formatted)
- Organization (required)
- Organization Type (dropdown)
- Message/Questions (textarea)
- Preferred contact method (radio)

**Submission Flow:**
1. Validate all fields
2. Submit to Firestore `consultations` collection
3. Trigger email to admin
4. Show success message with next steps
5. Send confirmation email to requester

#### Sponsorship Form
**Fields:**
- Sponsor name (required)
- Email (required)
- Phone (required)
- Organization (required)
- Sponsor type (dropdown: school-district, local-business, church, individual)
- Number of students (number input, min: 1)
- Workshop selection (radio/card select, shows availability)
- Student selection method (radio):
  - Option 1: "Let AutoNateAI distribute across these districts" → Multi-select districts
  - Option 2: "I want to select specific students" → Opens catalog modal
  - Option 3: "I have specific students in mind" → Text input for names/schools
- Special message to students (optional textarea)

**Validation:**
- Check if selected workshop has enough spots
- Require at least one selection method
- Validate email and phone formats

**Submission Flow:**
1. Validate all fields
2. Check workshop capacity
3. Create sponsor record (if new)
4. Create sponsorship record with status: 'pending'
5. Temporarily reserve spots in workshop
6. Trigger Firebase Function to generate invoice
7. Send invoice email
8. Show success message
9. Update sponsorship status to 'invoice-sent'

---

### 2. Student Catalog

#### URL
`/students` - Public-facing page

#### Features
- **Grid Layout:** Card-based design, 3-4 cards per row
- **Filtering:**
  - By district (dropdown)
  - By grade (checkbox group)
  - By school (dropdown, updates based on district)
- **Search:** Real-time search by name or interests
- **Selection Mode:** 
  - Checkbox on each card
  - "Add to Sponsorship" button
  - Floating cart showing selected count
  - "Proceed to Form" button

#### Student Card Design
```
┌─────────────────────────┐
│  [Profile Image/Avatar] │
│                         │
│  Sarah M.               │
│  Grade 8 • Lincoln MS   │
│  Springfield District   │
│                         │
│  "Loves robotics and    │
│   creative writing..."  │
│                         │
│  Interests: STEM, Art   │
│                         │
│  [ ☐ Select ]          │
└─────────────────────────┘
```

#### Privacy Considerations
- Only first name + last initial
- No contact information
- Only publicly sourced information
- "Information sourced from [source]" footnote
- Clear data usage policy link

---

### 3. Workshop Selection

#### Display Format

**Workshop Card:**
```
┌─────────────────────────────────────────┐
│  Saturday, February 15, 2025            │
│  2:00 PM - 4:00 PM EST                  │
│                                         │
│  ████████████░░░░░░░░  32/50 enrolled  │
│  18 spots available                     │
│                                         │
│  ✓ Spots Available                      │
│                                         │
│  [ Select This Workshop ]               │
└─────────────────────────────────────────┘
```

**Status Indicators:**
- **Green (>10 spots):** "✓ Spots Available"
- **Yellow (≤10 spots):** "⚠️ Filling Fast - Only X spots left"
- **Red (0 spots):** "✕ Full - Join Waitlist"

#### Capacity Logic
```typescript
// Real-time updates
workshop.availableSpots = workshop.maxCapacity - workshop.currentEnrollment

// Reservation system
- Hold spots for 24 hours after form submission
- Release if invoice not paid within 48 hours
- Update real-time as sponsorships are paid
```

---

### 4. Sponsorship Process Flow

#### Step 1: Submit Sponsorship Request
**User Actions:**
- Fill out sponsorship form
- Select workshop date
- Choose student selection method
- Add optional message

**System Actions:**
- Validate form data
- Check workshop capacity
- Create sponsor record
- Create sponsorship record
- Reserve workshop spots (temporary)
- Generate invoice via Stripe/PayPal
- Send invoice email
- Send confirmation to sponsor

**Email Template:**
```
Subject: Your AutoNateAI Sponsorship Request - Invoice #12345

Hi [Sponsor Name],

Thank you for choosing to sponsor [X] students for our Critical Thinking Workshop!

Workshop Details:
- Date: [Workshop Date]
- Time: [Start] - [End] [Timezone]
- Students: [Number]

Your invoice is attached. Payment is due within 48 hours to secure your spots.

Pay Online: [Payment Link]
Invoice PDF: [PDF Link]

Questions? Reply to this email or call us at [Phone].

Thank you for investing in our students!

AutoNateAI Team
```

#### Step 2: Receive & Pay Invoice
**User Actions:**
- Review invoice
- Make payment via Stripe/PayPal

**System Actions:**
- Webhook receives payment confirmation
- Update sponsorship status to 'paid'
- Confirm workshop enrollment
- Release temporary hold, confirm spots
- Send payment confirmation email
- Trigger "Schedule Call" email

**Email Template:**
```
Subject: Payment Confirmed - Let's Personalize Your Impact!

Hi [Sponsor Name],

Your payment has been confirmed! [X] students are now enrolled in the workshop.

Next Step: Personalize Your Sponsorship
We'd love to schedule a 30-minute call to:
- Learn more about you and your organization
- Craft a personalized message to your sponsored students
- Answer any questions you have

Schedule Your Call: [Calendly Link]

Looking forward to connecting!

AutoNateAI Team
```

#### Step 3: Personalization Call (30 minutes)
**Scheduled via:**
- Calendly or similar booking tool
- Linked in payment confirmation email

**During Call:**
- Learn about sponsor's story
- Why they're investing in students
- Collect information for student outreach:
  - Sponsor bio
  - Personal message
  - Any specific students they want to connect with
- Answer questions about workshop
- Discuss ongoing engagement

**After Call:**
- Update sponsorship record with notes
- Create personalized outreach materials
- Update status to 'call-scheduled' → 'students-notified'

#### Step 4: Student Notification & Discord Access
**Timing:** 3-5 days before workshop

**System Actions:**
- Send personalized emails to students
- Include sponsor message and bio
- Provide Discord invite link
- Share workshop preparation materials

**Email Template to Students:**
```
Subject: You've Been Sponsored for AutoNateAI's Workshop!

Hi [Student Name],

Great news! [Sponsor Name/Org] has sponsored you for our upcoming Critical Thinking + AI Workshop!

Workshop Details:
- Date: [Date]
- Time: [Time]
- Where: Online via Discord

A Message from Your Sponsor:
"[Sponsor's personalized message]"

About Your Sponsor:
[Sponsor bio - who they are, why they're supporting students]

Join Our Discord:
[Discord Invite Link]
Access Code: [Code]

We can't wait to see you there!

AutoNateAI Team
```

#### Step 5: Workshop & Beyond
**3-5 Days Before:**
- Students join Discord
- Access pre-workshop materials
- Meet facilitators and peers

**Workshop Day:**
- 2-hour interactive session
- Games and simulations
- AI-powered learning

**Post-Workshop:**
- 12-month Discord access
- Ongoing learning activities
- Progress tracking

**Sponsor Updates:**
- Post-workshop summary email
- Impact report (anonymized student reflections)
- Quarterly updates on student progress

---

## Implementation Phases

### Phase 1: Firebase Setup ⏱️ 2-3 days

**Tasks:**
1. Create Firebase project
2. Set up Firestore database
3. Configure security rules
4. Set up Firebase Authentication
5. Initialize Firebase in React app
6. Create TypeScript interfaces for all collections
7. Set up environment variables

**Deliverables:**
- `firebase.config.ts` - Firebase initialization
- `firestore.rules` - Security rules
- `src/types/database.ts` - TypeScript interfaces
- `.env.local` - Environment variables

---

### Phase 2: Workshop Management ⏱️ 3-4 days

**Tasks:**
1. Create workshop admin interface (simple for now)
2. CRUD operations for workshops
3. Workshop card component
4. Workshop selection component
5. Capacity tracking logic
6. Real-time availability updates

**Deliverables:**
- `src/components/WorkshopCard.tsx`
- `src/components/WorkshopSelector.tsx`
- `src/lib/workshops.ts` - Workshop utilities
- Basic admin page for creating workshops

---

### Phase 3: Contact Page Forms ⏱️ 4-5 days

**Tasks:**
1. Create contact page with toggle
2. Build consultation form
3. Build sponsorship form
4. Form validation (Zod schemas)
5. Firebase submission handlers
6. Success/error states
7. Email notifications setup

**Deliverables:**
- `src/pages/contact.tsx` - Contact page
- `src/components/ConsultationForm.tsx`
- `src/components/SponsorshipForm.tsx`
- `src/lib/validation.ts` - Zod schemas
- `src/lib/email.ts` - Email utilities

---

### Phase 4: Student Catalog ⏱️ 5-6 days

**Tasks:**
1. Create student catalog page
2. Student card component
3. Filtering system (district, grade, school)
4. Search functionality
5. Selection mechanism
6. "Cart" for selected students
7. Integration with sponsorship form

**Deliverables:**
- `src/pages/students.tsx` - Catalog page
- `src/components/StudentCard.tsx`
- `src/components/StudentFilters.tsx`
- `src/components/StudentCart.tsx`
- `src/lib/students.ts` - Student utilities

---

### Phase 5: Update Sponsor Pages ⏱️ 2-3 days

**Tasks:**
1. Add "How It Works" section to all sponsor pages
2. Link to sponsorship form with pre-filled type
3. Update CTAs
4. Add workshop selection preview

**Deliverables:**
- Updated sponsor page components
- New "Process Flow" component

---

### Phase 6: Backend Automation ⏱️ 5-7 days

**Tasks:**
1. Set up Firebase Functions
2. Invoice generation (Stripe/PayPal integration)
3. Payment webhook handlers
4. Email automation (SendGrid/Mailgun)
5. Workshop capacity auto-updates
6. Discord invite automation
7. Status tracking logic
8. Spot reservation/release system

**Deliverables:**
- `functions/src/invoices.ts`
- `functions/src/payments.ts`
- `functions/src/emails.ts`
- `functions/src/workshops.ts`
- Email templates

---

### Phase 7: Admin Dashboard ⏱️ 7-10 days (Future)

**Tasks:**
1. Admin authentication
2. Dashboard overview
3. Manage workshops (CRUD)
4. Manage students (CRUD)
5. View sponsorships
6. Mark invoices as paid (manual override)
7. Schedule calls
8. Send manual notifications
9. Export reports

**Deliverables:**
- `src/pages/admin/dashboard.tsx`
- Admin CRUD interfaces
- Reporting tools

---

## Technical Stack

### Frontend Dependencies
```json
{
  "firebase": "^10.x.x",
  "react-hook-form": "^7.x.x",
  "zod": "^3.x.x",
  "@stripe/stripe-js": "^2.x.x",
  "date-fns": "^3.x.x",
  "react-select": "^5.x.x"
}
```

### Backend Dependencies (Firebase Functions)
```json
{
  "firebase-admin": "^12.x.x",
  "firebase-functions": "^4.x.x",
  "stripe": "^14.x.x",
  "nodemailer": "^6.x.x",
  "@sendgrid/mail": "^8.x.x"
}
```

### File Structure
```
src/
├── components/
│   ├── forms/
│   │   ├── ConsultationForm.tsx
│   │   ├── SponsorshipForm.tsx
│   │   └── FormToggle.tsx
│   ├── students/
│   │   ├── StudentCard.tsx
│   │   ├── StudentFilters.tsx
│   │   ├── StudentCart.tsx
│   │   └── StudentCatalog.tsx
│   ├── workshops/
│   │   ├── WorkshopCard.tsx
│   │   ├── WorkshopSelector.tsx
│   │   └── WorkshopCalendar.tsx
│   └── shared/
│       ├── LoadingSpinner.tsx
│       └── ErrorMessage.tsx
├── lib/
│   ├── firebase.ts
│   ├── validation.ts
│   ├── workshops.ts
│   ├── students.ts
│   ├── sponsorships.ts
│   └── email.ts
├── types/
│   ├── database.ts
│   └── forms.ts
├── pages/
│   ├── contact.tsx
│   ├── students.tsx
│   └── sponsors/
│       ├── school-districts.tsx
│       ├── local-businesses.tsx
│       └── churches.tsx
└── utils/
    ├── formatting.ts
    └── dates.ts

functions/
├── src/
│   ├── index.ts
│   ├── invoices.ts
│   ├── payments.ts
│   ├── emails.ts
│   └── workshops.ts
└── package.json
```

---

## Privacy & Compliance

### Student Data
- **Source:** Only publicly available information (school websites, local news, public honors lists)
- **Consent:** Parental consent required before adding to catalog
- **Privacy:** First name + last initial only, no contact info
- **Compliance:** FERPA and COPPA compliant
- **Data Usage Policy:** Clear statement on catalog page

### Sponsor Data
- **Collection:** Only collect necessary information
- **Storage:** Encrypted in Firestore
- **Retention:** Keep for tax/reporting purposes
- **Sharing:** Never shared with third parties

### Payment Data
- **Processing:** Via Stripe/PayPal (PCI compliant)
- **Storage:** Never store full credit card numbers
- **Receipts:** Automatically generated and emailed

---

## Future Enhancements

### Phase 8+
1. **Sponsor Dashboard:**
   - View sponsored students
   - Track workshop attendance
   - Download impact reports
   - Manage recurring sponsorships

2. **Student Portal:**
   - Students can create profiles
   - Showcase work from workshop
   - Request sponsorship

3. **Analytics:**
   - Sponsorship trends
   - Workshop capacity planning
   - Student demographics
   - Impact metrics

4. **Automated Matching:**
   - AI-powered student-sponsor matching
   - Based on interests, location, values

5. **Recurring Sponsorships:**
   - Monthly/annual sponsorship programs
   - Auto-billing
   - Multi-workshop sponsorships

6. **Mobile App:**
   - React Native app for sponsors
   - Push notifications
   - Quick sponsorship

---

## Success Metrics

### Key Performance Indicators (KPIs)
1. **Conversion Rate:** Form submissions → Paid sponsorships
2. **Time to Payment:** Average time from submission to payment
3. **Workshop Fill Rate:** % of workshop capacity filled
4. **Sponsor Satisfaction:** Post-workshop surveys
5. **Student Outcomes:** Engagement and learning metrics
6. **Return Sponsors:** % of sponsors who sponsor again

### Tracking
- Firebase Analytics
- Custom event tracking
- Email open/click rates
- Payment completion rates

---

## Development Timeline

**Total Estimated Time:** 8-12 weeks

| Phase | Duration | Dependencies |
|-------|----------|--------------|
| Phase 1: Firebase Setup | 2-3 days | None |
| Phase 2: Workshop Management | 3-4 days | Phase 1 |
| Phase 3: Contact Forms | 4-5 days | Phase 1, 2 |
| Phase 4: Student Catalog | 5-6 days | Phase 1 |
| Phase 5: Update Sponsor Pages | 2-3 days | Phase 3, 4 |
| Phase 6: Backend Automation | 5-7 days | Phase 1-5 |
| Phase 7: Admin Dashboard | 7-10 days | Phase 6 |

---

## Next Steps

### Immediate Actions
1. ✅ Review and approve this blueprint
2. ⏳ Set up Firebase project
3. ⏳ Configure environment variables
4. ⏳ Begin Phase 1 implementation

### Questions to Resolve
- [ ] Choose payment processor: Stripe or PayPal?
- [ ] Email service: SendGrid or Mailgun?
- [ ] Calendly for scheduling or build custom?
- [ ] Student catalog: Public from day 1 or admin-only initially?
- [ ] Workshop capacity: Fixed number or adjust per workshop?

---

## Appendix

### Useful Links
- [Firebase Documentation](https://firebase.google.com/docs)
- [Stripe API](https://stripe.com/docs/api)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Validation](https://zod.dev/)

### Design References
- Workshop card designs
- Student catalog wireframes
- Form layouts
- Email templates

---

**Blueprint Status:** Ready for Implementation ✅  
**Next Phase:** Phase 1 - Firebase Setup  
**Owner:** Development Team  
**Review Date:** [To be scheduled]
