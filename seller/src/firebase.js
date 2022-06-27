// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {getStorage} from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9PpscBUNU4wLqDaREfdnUObSF3nvYfUg",
  authDomain: "store-files-f1f2a.firebaseapp.com",
  projectId: "store-files-f1f2a",
  storageBucket: "store-files-f1f2a.appspot.com",
  messagingSenderId: "911270549077",
  appId: "1:911270549077:web:ae9c5c4a2f5054951a26dc",
  measurementId: "G-4TCPX77JNW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);