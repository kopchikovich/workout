import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: 'AIzaSyAwC7CYUq5hC-a3wbJ-Io9oOl7HCDes-g8',
    authDomain: 'my-awesome-workout-diary.firebaseapp.com',
    projectId: 'my-awesome-workout-diary'
});
  
const firebase_db = firebase.firestore();

export {firebase_db}