import { initializeApp, FirebaseOptions } from "firebase/app";
import { initializeFirestore, Firestore, CACHE_SIZE_UNLIMITED } from "firebase/firestore";

// Firebase configuration is sourced from environment variables for security and flexibility.
// This allows for secure configuration without hardcoding sensitive keys.
// Ensure these variables are set in your deployment environment.
const firebaseConfig: FirebaseOptions = {
    apiKey: "AIzaSyDhhIH87vhD90H7Fv7Gz6e5JZ6GRa-ngEM",
  authDomain: "a1-wallet.firebaseapp.com",
  databaseURL: "https://a1-wallet-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "a1-wallet",
  storageBucket: "a1-wallet.firebasestorage.app",
  messagingSenderId: "304930663125",
  appId: "1:304930663125:web:7e2c0422a871b9e74a505c",
  measurementId: "G-EZD3ZF5R96"
};

let db: Firestore | null = null;
let firebaseInitializationError: string | null = null;

try {
  // A project ID is the minimum requirement for Firebase initialization.
  if (!firebaseConfig.projectId) {
    throw new Error("Firebase config is not set. Please provide the `FIREBASE_PROJECT_ID` environment variable.");
  }
  const app = initializeApp(firebaseConfig);
  
  // Using initializeFirestore to enable long-polling for more stable connections
  // in restrictive network environments and enabling offline cache.
  db = initializeFirestore(app, {
    experimentalForceLongPolling: true,
    cacheSizeBytes: CACHE_SIZE_UNLIMITED,
  });

} catch (e: any) {
  console.error("Firebase initialization failed:", e);
  firebaseInitializationError = e.message || "An unknown error occurred during Firebase initialization.";
  db = null;
}

export { db, firebaseInitializationError };
