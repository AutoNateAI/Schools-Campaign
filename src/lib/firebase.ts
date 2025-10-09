import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Firebase configuration
// These values are safe to expose in client-side code
const firebaseConfig = {
  apiKey: "AIzaSyC5cSZWiYrexA-YNwvqPTUTP3DSBYUQfss",
  authDomain: "sponsors-autonateai-com.firebaseapp.com",
  projectId: "sponsors-autonateai-com",
  storageBucket: "sponsors-autonateai-com.firebasestorage.app",
  messagingSenderId: "58355379697",
  appId: "1:58355379697:web:427dcd2a759982afc32850"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;
