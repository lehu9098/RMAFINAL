import firebase from 'firebase/app' //imports call functionality
import 'firebase/firestore' //imports database
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/functions'
require('firebase/auth')
import 'firebase/analytics';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBj8sGnQDNhtgECit1iHnmvVlyZE4patbw",
  authDomain: "rocky-mt.firebaseapp.com",
  databaseURL: "https://rocky-mt.firebaseio.com",
  projectId: "rocky-mt",
  storageBucket: "rocky-mt.appspot.com",
  messagingSenderId: "425179900450",
  appId: "1:425179900450:web:1bab5d300ca1adc668b87b",
  measurementId: "G-JBXMH0G0XM"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore() //initializes a connection to our firestore db
const auth = firebase.auth()
const storage = firebase.storage()
const functions = firebase.functions()
firebase.analytics().logEvent('notification_received');


export default{
  db,
  auth,
  storage,
  functions

}
 //allows other parts of our application to use this
