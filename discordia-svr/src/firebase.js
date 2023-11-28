// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyHf7zYurShoN5wO5MyytvKWT-XQvIYRA",
  authDomain: "discordia-db.firebaseapp.com",
  databaseURL: "https://discordia-db-default-rtdb.firebaseio.com",
  projectId: "discordia-db",
  storageBucket: "discordia-db.appspot.com",
  messagingSenderId: "1019454903719",
  appId: "1:1019454903719:web:41dc388e09311894355282",
  measurementId: "G-VRBLCZ78CD"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app)