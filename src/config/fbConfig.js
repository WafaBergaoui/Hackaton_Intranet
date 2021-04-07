import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD6n64PLZJAfdl9TImSV3IZx8Z7ka4fRkM",
  authDomain: "dnaintrasolutions.firebaseapp.com",
  databaseURL: 'https://dnaintrasolutions.firebaseapp.com',
  projectId: "dnaintrasolutions",
  storageBucket: "dnaintrasolutions.appspot.com",
  messagingSenderId: "559095998979",
  appId: "1:559095998979:web:a1a33da5bee02e8444fc36",
  measurementId: "G-YKK1V4Z966"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
