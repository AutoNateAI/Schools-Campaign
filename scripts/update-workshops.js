const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function updateWorkshops() {
  try {
    console.log('🔄 Updating workshops in Firebase...\n');

    // Workshop dates (October 25, then 2 weeks apart)
    const workshopDates = [
      new Date('2025-10-25T14:00:00'), // 2:00 PM
      new Date('2025-11-08T14:00:00'), // 2 weeks later
      new Date('2025-11-22T14:00:00'), // 4 weeks later
      new Date('2025-12-06T14:00:00')  // 6 weeks later
    ];

    // Delete all existing workshops first
    const workshopsSnapshot = await db.collection('workshops').get();
    console.log(`Found ${workshopsSnapshot.size} existing workshop(s). Deleting...\n`);
    
    const deletePromises = workshopsSnapshot.docs.map(doc => doc.ref.delete());
    await Promise.all(deletePromises);
    
    console.log('✅ Deleted all existing workshops\n');
    console.log('Creating new workshops...\n');
    
    // Create all 4 workshops with correct schema
    for (let i = 0; i < workshopDates.length; i++) {
      const workshopData = {
        title: `${workshopDates[i].toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} Critical Thinking Workshop`,
        date: admin.firestore.Timestamp.fromDate(workshopDates[i]),
        startTime: '9:00 AM',
        endTime: '11:00 AM',
        timezone: 'America/New_York',
        maxCapacity: 25,
        currentEnrollment: 0,
        availableSpots: 25,
        status: 'upcoming',
        facilitators: [],
        notes: '',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      };

      const docRef = await db.collection('workshops').add(workshopData);
      console.log(`✅ Created workshop ${i + 1}: ${workshopDates[i].toLocaleDateString()} (ID: ${docRef.id})`);
    }

    console.log('\n🎉 Workshop update complete!\n');
    console.log('📅 Workshop Schedule:');
    console.log('   1. October 25, 2025 - Max 25 students');
    console.log('   2. November 8, 2025 - Max 25 students');
    console.log('   3. November 22, 2025 - Max 25 students');
    console.log('   4. December 6, 2025 - Max 25 students');

  } catch (error) {
    console.error('❌ Error updating workshops:', error);
  } finally {
    process.exit();
  }
}

updateWorkshops();
