import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";

/**
 * Firebase web config for Beyond Learrning.
 * Restrict API key usage in Firebase Console → App Check / API restrictions,
 * and keep Firestore rules tight (see `/firestore.rules`).
 */
const firebaseConfig = {
  apiKey: "AIzaSyByYsL1CVV884kvZclfTqDJHVHcp9QvJVg",
  authDomain: "beyond-learrning.firebaseapp.com",
  projectId: "beyond-learrning",
  storageBucket: "beyond-learrning.firebasestorage.app",
  messagingSenderId: "417830914750",
  appId: "1:417830914750:web:55326e89c843e5ff95acef",
  measurementId: "G-PWJ2C8D3JM",
};

let app: FirebaseApp | undefined;
let db: Firestore | undefined;

export function getFirebaseApp(): FirebaseApp {
  if (!app) {
    app = getApps()[0] ?? initializeApp(firebaseConfig);
  }
  return app;
}

export function getDb(): Firestore {
  if (!db) {
    db = getFirestore(getFirebaseApp());
  }
  return db;
}

export const firestoreCollections = {
  registrations: "clatLiveRegistrations",
  settings: "clatLiveSettings",
} as const;

export const settingsDocId = "main";
