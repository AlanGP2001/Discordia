const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
const { getFirestore } = require("firebase/firestore");

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

const app = initializeApp(firebaseConfig);

// Initialize Firebase Firestore

const auth = getAuth(app);
const db = getFirestore(app);

module.exports = { app, auth, db };
