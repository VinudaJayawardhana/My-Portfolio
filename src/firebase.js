import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Added Auth support for secure panels

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7jDIMrofqfgB3wNxhceJ6UCJh8PHEYJE",
  authDomain: "myportfolio-26ea6.firebaseapp.com",
  projectId: "myportfolio-26ea6",
  storageBucket: "myportfolio-26ea6.firebasestorage.app",
  messagingSenderId: "1045754409258",
  appId: "1:1045754409258:web:b26df8198b2aa905b22e53",
  measurementId: "G-HW3H80Q04T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

// Named Exports (Matches imports like: import { db, auth } from './firebase')
export { db, auth, analytics };

// Default Export (Allows fallback import: import firebaseApp from './firebase')
export default app;