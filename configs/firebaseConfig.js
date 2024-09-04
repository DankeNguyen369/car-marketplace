// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "car-marketplace-c9196.firebaseapp.com",
  projectId: "car-marketplace-c9196",
  storageBucket: "car-marketplace-c9196.appspot.com",
  messagingSenderId: "535738762869",
  appId: "1:535738762869:web:c02b10a52ea15431a69a3c",
  measurementId: "G-3RGG0FHKFE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const storage = getStorage(app);
