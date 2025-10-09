/**
 * Firestore Database Setup Script
 * Run: node scripts/setup-firestore.js
 */

const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function setupCollections() {
  console.log('🔥 Starting Firestore setup...\n');

  try {
    // Create sample workshop
    console.log('📅 Creating sample workshop...');
    const workshopRef = await db.collection('workshops').add({
      title: 'February 2025 Critical Thinking Workshop',
      date: admin.firestore.Timestamp.fromDate(new Date('2025-02-15T14:00:00')),
      startTime: '2:00 PM',
      endTime: '4:00 PM',
      timezone: 'America/New_York',
      maxCapacity: 50,
      currentEnrollment: 0,
      availableSpots: 50,
      status: 'upcoming',
      facilitators: ['AutoNateAI Team'],
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    console.log('✅ Workshop created with ID:', workshopRef.id);

    // Create sample students
    console.log('\n👨‍🎓 Creating sample students...');
    const students = [
      {
        firstName: 'Sarah',
        lastName: 'Martinez',
        grade: 8,
        school: 'Lincoln Middle School',
        district: 'Springfield District',
        bio: 'Passionate about robotics and creative writing. Loves solving puzzles and helping peers.',
        interests: ['STEM', 'Writing', 'Robotics'],
        isAvailable: true,
        publicSource: 'School Honor Roll - Spring 2024',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      },
      {
        firstName: 'Marcus',
        lastName: 'Johnson',
        grade: 10,
        school: 'Roosevelt High School',
        district: 'Springfield District',
        bio: 'Aspiring software developer with a passion for AI and machine learning.',
        interests: ['Coding', 'AI', 'Gaming'],
        isAvailable: true,
        publicSource: 'District Science Fair Winner 2024',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      },
      {
        firstName: 'Emily',
        lastName: 'Chen',
        grade: 9,
        school: 'Washington High School',
        district: 'Riverside District',
        bio: 'Debate team captain interested in law and public policy.',
        interests: ['Debate', 'Politics', 'Reading'],
        isAvailable: true,
        publicSource: 'Regional Debate Competition 2024',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      },
      {
        firstName: 'James',
        lastName: 'Williams',
        grade: 11,
        school: 'Jefferson High School',
        district: 'Springfield District',
        bio: 'Varsity basketball player with interest in sports analytics and data science.',
        interests: ['Sports', 'Data Science', 'Math'],
        isAvailable: true,
        publicSource: 'Academic All-State Team 2024',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      },
      {
        firstName: 'Aisha',
        lastName: 'Patel',
        grade: 7,
        school: 'Madison Middle School',
        district: 'Riverside District',
        bio: 'Young artist and environmental advocate. Leads school recycling program.',
        interests: ['Art', 'Environment', 'Leadership'],
        isAvailable: true,
        publicSource: 'Youth Environmental Award 2024',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      }
    ];

    for (const student of students) {
      const studentRef = await db.collection('students').add(student);
      console.log(`✅ Student created: ${student.firstName} ${student.lastName} (${studentRef.id})`);
    }

    // Initialize empty collections
    console.log('\n📋 Initializing other collections...');
    const collections = ['sponsors', 'sponsorships', 'enrollments', 'consultations'];
    
    for (const collectionName of collections) {
      const placeholderRef = await db.collection(collectionName).add({
        _placeholder: true,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });
      await placeholderRef.delete();
      console.log(`✅ Collection initialized: ${collectionName}`);
    }

    console.log('\n🎉 Firestore setup complete!');
    console.log('\n📊 Summary:');
    console.log('  - 1 workshop created');
    console.log('  - 5 sample students created');
    console.log('  - 6 collections initialized (workshops, students, sponsors, sponsorships, enrollments, consultations)');
    console.log('\n✨ Your database is ready to use!');
    console.log('\n🔗 View your data: https://console.firebase.google.com/project/' + admin.instanceId().app.options.projectId + '/firestore');

  } catch (error) {
    console.error('\n❌ Error setting up Firestore:', error);
    console.error('\nTroubleshooting:');
    console.error('  1. Make sure serviceAccountKey.json is in the project root');
    console.error('  2. Verify the service account has Firestore permissions');
    console.error('  3. Check that Firestore is enabled in your Firebase project');
    process.exit(1);
  }

  process.exit(0);
}

// Run the setup
setupCollections();
