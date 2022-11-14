import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAjv4teX65PWBWDecMuYmxp8B6yBRySk70",
  authDomain: "apistrava-1c4c0.firebaseapp.com",
  projectId: "apistrava-1c4c0",
  storageBucket: "apistrava-1c4c0.appspot.com",
  messagingSenderId: "104062980263",
  appId: "1:104062980263:web:2b9edac3be9619b7370b82",
  measurementId: "G-VKMHHDDLQG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
